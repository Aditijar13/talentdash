'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { MOCK_SALARIES, MOCK_COMPANIES, computeMedian, getSalariesByCompany } from '@/lib/mock-data'
import { formatCurrency, formatDelta } from '@/lib/currency'
import { LEVEL_DISPLAY } from '@/lib/levels'
import type { SalaryRecord, CompanyRecord } from '@/types'
import LevelBadge from '@/components/ui/LevelBadge'

type CompareMode = 'salaries' | 'companies'

function DeltaCell({ delta, currency = 'INR' }: { delta: number; currency?: string }) {
  if (delta === 0) return <span className="text-white/40 text-[13px] font-medium">—</span>
  const positive = delta > 0
  return (
    <span className={`text-[13px] font-bold ${positive ? 'text-[#008A05]' : 'text-[#D93025]'}`}>
      {formatDelta(delta, currency)}
    </span>
  )
}

function CompareRow({ label, val1, val2, delta, format, highlight }: {
  label: string; val1: React.ReactNode; val2: React.ReactNode; delta?: number; format?: string; highlight?: boolean
}) {
  return (
    <div className={`grid grid-cols-[1.5fr_2fr_2fr_1.5fr] gap-4 px-5 py-4 border-b border-[rgba(255,255,255,0.07)] items-center ${highlight ? 'bg-[rgba(96,165,250,0.08)]' : 'hover:bg-[rgba(255,255,255,0.04)]'}`}>
      <span className="text-[12px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
      <div className="text-[14px] text-white font-medium">{val1}</div>
      <div className="text-[14px] text-white font-medium">{val2}</div>
      <div>{delta !== undefined ? <DeltaCell delta={delta} /> : <span className="text-white/40">—</span>}</div>
    </div>
  )
}

export default function ComparePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = (searchParams.get('mode') as CompareMode) ?? 'salaries'

  const [s1Id, setS1Id] = useState(searchParams.get('s1') ?? '')
  const [s2Id, setS2Id] = useState(searchParams.get('s2') ?? '')
  const [c1Slug, setC1Slug] = useState(searchParams.get('c1') ?? '')
  const [c2Slug, setC2Slug] = useState(searchParams.get('c2') ?? '')

  const s1 = MOCK_SALARIES.find(s => s.id === s1Id)
  const s2 = MOCK_SALARIES.find(s => s.id === s2Id)
  const c1 = MOCK_COMPANIES.find(c => c.slug === c1Slug)
  const c2 = MOCK_COMPANIES.find(c => c.slug === c2Slug)

  const setMode = (m: CompareMode) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('mode', m)
    router.push(`/compare?${params.toString()}`, { scroll: false })
  }

  const updateSalaryParams = (id: string, which: 's1' | 's2') => {
    const params = new URLSearchParams(searchParams.toString())
    if (id) params.set(which, id)
    else params.delete(which)
    router.push(`/compare?${params.toString()}`, { scroll: false })
  }

  const updateCompanyParams = (slug: string, which: 'c1' | 'c2') => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) params.set(which, slug)
    else params.delete(which)
    router.push(`/compare?${params.toString()}`, { scroll: false })
  }

  // Compute salary deltas
  const salaryDelta = s1 && s2 ? {
    base: s1.base_salary - s2.base_salary,
    bonus: s1.bonus - s2.bonus,
    stock: s1.stock - s2.stock,
    tc: s1.total_compensation - s2.total_compensation,
    exp: s1.experience_years - s2.experience_years,
  } : null

  // Company stats
  const getCompanyStats = (company: CompanyRecord | undefined) => {
    if (!company) return null
    const salaries = getSalariesByCompany(company.slug)
    const median = computeMedian(salaries.map(s => s.total_compensation))
    const max = salaries.length > 0 ? Math.max(...salaries.map(s => s.total_compensation)) : 0
    const min = salaries.length > 0 ? Math.min(...salaries.map(s => s.total_compensation)) : 0
    return { median, max, min, count: salaries.length, verified: salaries.filter(s => s.is_verified).length }
  }

  const c1Stats = getCompanyStats(c1)
  const c2Stats = getCompanyStats(c2)

  const companyDelta = c1Stats && c2Stats ? {
    median: c1Stats.median - c2Stats.median,
    max: c1Stats.max - c2Stats.max,
    count: c1Stats.count - c2Stats.count,
  } : null

  const winner = salaryDelta ? (salaryDelta.tc > 0 ? s1 : salaryDelta.tc < 0 ? s2 : null) : null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-[32px] font-bold text-white mb-1">Compare</h1>
          <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Side-by-side comparison of salary records and companies.</p>

          {/* Mode toggle */}
          <div className="flex mt-5 rounded-xl p-1 w-fit" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}>
            {([['salaries', 'Salary Records'], ['companies', 'Companies']] as const).map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-5 py-2 rounded-lg text-[14px] font-semibold transition-colors ${
                  mode === m ? 'text-white shadow-sm' : 'text-white/40 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mode === 'salaries' ? (
          <div className="space-y-6">
            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                { which: 's1' as const, value: s1Id, set: setS1Id, label: 'Salary Record A' },
                { which: 's2' as const, value: s2Id, set: setS2Id, label: 'Salary Record B' },
              ]).map(({ which, value, set, label }) => {
                const selected = MOCK_SALARIES.find(s => s.id === value)
                return (
                  <div key={which} className="dark-card rounded-2xl p-5">
                    <p className="text-[12px] font-bold uppercase tracking-wider mb-3 text-white/40">{label}</p>
                    <select
                      value={value}
                      onChange={e => { set(e.target.value); updateSalaryParams(e.target.value, which) }}
                      className="input-dark w-full px-3 py-2.5 rounded-xl text-[14px] appearance-none"
                    >
                      <option value="">Select a salary record...</option>
                      {MOCK_SALARIES.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.company} — {s.role} ({LEVEL_DISPLAY[s.level]}) · {formatCurrency(s.total_compensation)}
                        </option>
                      ))}
                    </select>
                    {selected && (
                      <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[14px] text-white">{selected.company}</p>
                            <p className="text-[13px] text-white/45">{selected.role} · {selected.location}</p>
                          </div>
                          <p className="text-[18px] font-bold text-[#60A5FA]">{formatCurrency(selected.total_compensation)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Comparison table */}
            {s1 && s2 ? (
              <div className="dark-card rounded-2xl overflow-hidden">
                {/* Winner banner */}
                {winner && (
                  <div className="px-5 py-3 bg-gradient-to-r from-[#008A05] to-[#00a806] text-white flex items-center gap-3">
                    <span className="text-lg">🏆</span>
                    <span className="font-semibold text-[15px]">
                      {winner.company} ({winner.role}) offers higher total compensation by{' '}
                      {formatCurrency(Math.abs(salaryDelta!.tc))}
                    </span>
                    <span className="ml-auto text-[12px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Higher TC</span>
                  </div>
                )}

                {/* Column headers */}
                <div className="grid grid-cols-[1.5fr_2fr_2fr_1.5fr] gap-4 px-5 py-3 bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.07)]">
                  <span className="text-[11px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Field</span>
                  <div>
                    <p className="text-[11px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Record A</p>
                    <p className="text-[13px] font-semibold text-white mt-0.5">{s1.company}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Record B</p>
                    <p className="text-[13px] font-semibold text-white mt-0.5">{s2.company}</p>
                  </div>
                  <span className="text-[11px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delta (A − B)</span>
                </div>

                <CompareRow label="Company" val1={s1.company} val2={s2.company} />
                <CompareRow label="Role" val1={s1.role} val2={s2.role} />
                <CompareRow label="Level" val1={<LevelBadge level={s1.level} size="sm" />} val2={<LevelBadge level={s2.level} size="sm" />} />
                <CompareRow label="Location" val1={s1.location} val2={s2.location} />
                <CompareRow label="Experience" val1={`${s1.experience_years}y`} val2={`${s2.experience_years}y`} delta={salaryDelta?.exp} />
                <CompareRow label="Base Salary" val1={formatCurrency(s1.base_salary)} val2={formatCurrency(s2.base_salary)} delta={salaryDelta?.base} />
                <CompareRow label="Bonus" val1={s1.bonus > 0 ? formatCurrency(s1.bonus) : '—'} val2={s2.bonus > 0 ? formatCurrency(s2.bonus) : '—'} delta={salaryDelta?.bonus} />
                <CompareRow label="Stock / RSU" val1={s1.stock > 0 ? formatCurrency(s1.stock) : '—'} val2={s2.stock > 0 ? formatCurrency(s2.stock) : '—'} delta={salaryDelta?.stock} />
                <CompareRow label="Total Comp" val1={<span className="text-[16px] font-bold text-[#60A5FA]">{formatCurrency(s1.total_compensation)}</span>} val2={<span className="text-[16px] font-bold text-[#60A5FA]">{formatCurrency(s2.total_compensation)}</span>} delta={salaryDelta?.tc} highlight />
              </div>
            ) : (
              <div className="dark-card rounded-2xl p-16 text-center">
                <p className="text-[48px] mb-3">⇄</p>
                <p className="text-[18px] font-bold text-white mb-2">Select two salary records to compare</p>
                <p className="text-[14px] text-white/40">Choose Record A and Record B from the dropdowns above.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Company selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                { which: 'c1' as const, value: c1Slug, set: setC1Slug, label: 'Company A' },
                { which: 'c2' as const, value: c2Slug, set: setC2Slug, label: 'Company B' },
              ]).map(({ which, value, set, label }) => {
                const selected = MOCK_COMPANIES.find(c => c.slug === value)
                const stats = getCompanyStats(selected)
                return (
                  <div key={which} className="dark-card rounded-2xl p-5">
                    <p className="text-[12px] font-bold uppercase tracking-wider mb-3 text-white/40">{label}</p>
                    <select
                      value={value}
                      onChange={e => { set(e.target.value); updateCompanyParams(e.target.value, which) }}
                      className="input-dark w-full px-3 py-2.5 rounded-xl text-[14px] appearance-none"
                    >
                      <option value="">Select a company...</option>
                      {MOCK_COMPANIES.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                    </select>
                    {selected && stats && (
                      <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[14px] text-white">{selected.name}</p>
                            <p className="text-[13px] text-white/45">{selected.industry}</p>
                          </div>
                          <p className="text-[18px] font-bold text-[#60A5FA]">{formatCurrency(stats.median)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Company comparison */}
            {c1 && c2 && c1Stats && c2Stats ? (
              <div className="dark-card rounded-2xl overflow-hidden">
                {/* Winner */}
                {companyDelta && companyDelta.median !== 0 && (
                  <div className="px-5 py-3 bg-gradient-to-r from-[#0369A1] to-[#0284c7] text-white flex items-center gap-3">
                    <span className="text-lg">📊</span>
                    <span className="font-semibold text-[15px]">
                      {companyDelta.median > 0 ? c1.name : c2.name} pays higher median TC by{' '}
                      {formatCurrency(Math.abs(companyDelta.median))}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-[1.5fr_2fr_2fr_1.5fr] gap-4 px-5 py-3 bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.07)]">
                  <span className="text-[11px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Metric</span>
                  <p className="text-[13px] font-bold text-white">{c1.name}</p>
                  <p className="text-[13px] font-bold text-white">{c2.name}</p>
                  <span className="text-[11px] font-bold text-white/35" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delta</span>
                </div>

                <CompareRow label="Industry" val1={c1.industry} val2={c2.industry} />
                <CompareRow label="Headquarters" val1={c1.headquarters} val2={c2.headquarters} />
                <CompareRow label="Founded" val1={c1.founded_year ?? '—'} val2={c2.founded_year ?? '—'} />
                <CompareRow label="Headcount" val1={c1.headcount_range ?? '—'} val2={c2.headcount_range ?? '—'} />
                <CompareRow label="Salary Records" val1={String(c1Stats.count)} val2={String(c2Stats.count)} delta={companyDelta?.count} />
                <CompareRow label="Min TC" val1={formatCurrency(c1Stats.min)} val2={formatCurrency(c2Stats.min)} />
                <CompareRow label="Median TC" val1={<span className="text-[16px] font-bold text-[#60A5FA]">{formatCurrency(c1Stats.median)}</span>} val2={<span className="text-[16px] font-bold text-[#60A5FA]">{formatCurrency(c2Stats.median)}</span>} delta={companyDelta?.median} highlight />
                <CompareRow label="Max TC" val1={<span className="font-bold text-[#008A05]">{formatCurrency(c1Stats.max)}</span>} val2={<span className="font-bold text-[#008A05]">{formatCurrency(c2Stats.max)}</span>} delta={companyDelta?.max} />
              </div>
            ) : (
              <div className="dark-card rounded-2xl p-16 text-center">
                <p className="text-[48px] mb-3">🏢</p>
                <p className="text-[18px] font-bold text-white mb-2">Select two companies to compare</p>
                <p className="text-[14px] text-white/40">Pick Company A and Company B from the dropdowns above.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
