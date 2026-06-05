import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MOCK_COMPANIES, MOCK_SALARIES, computeMedian,
  getCompanyBySlug, getSalariesByCompany, getLevelDistribution,
} from '@/lib/mock-data'
import { formatCurrency } from '@/lib/currency'
import { getCompanyBrand } from '@/lib/company-logos'
import LevelBadge from '@/components/ui/LevelBadge'
import SourceBadge from '@/components/ui/SourceBadge'
import CompanyLogo from '@/components/ui/CompanyLogo'

export async function generateStaticParams() {
  return MOCK_COMPANIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const company  = getCompanyBySlug(slug)
  if (!company) return { title: 'Company Not Found' }
  const salaries = getSalariesByCompany(slug)
  const median   = computeMedian(salaries.map(s => s.total_compensation))
  return {
    title: `${company.name} Salaries | TalentDash`,
    description: `${company.name} compensation data: median TC ${formatCurrency(median)} across ${salaries.length} verified records.`,
  }
}

export default async function CompanyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug }  = await params
  const company   = getCompanyBySlug(slug)
  if (!company) notFound()

  const brand         = getCompanyBrand(slug)
  const salaries      = getSalariesByCompany(slug).sort((a, b) => b.total_compensation - a.total_compensation)
  const tcs           = salaries.map(s => s.total_compensation)
  const medianTC      = computeMedian(tcs)
  const minTC         = tcs.length > 0 ? Math.min(...tcs) : 0
  const maxTC         = tcs.length > 0 ? Math.max(...tcs) : 0
  const levelDist     = getLevelDistribution(salaries)
  const verifiedCount = salaries.filter(s => s.is_verified).length

  const levelDistSorted = Object.entries(levelDist).sort((a, b) => b[1] - a[1])
  const maxLevelCount   = Math.max(...Object.values(levelDist), 1)

  const uniqueLocations = [...new Set(salaries.map(s => s.location))]

  return (
    <div className="min-h-screen">

      {/* ── Company header ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <CompanyLogo slug={slug} name={company.name} size="lg" />

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-[30px] font-black text-white">{company.name}</h1>
              </div>

              {/* Short description */}
              {brand.description && (
                <p className="text-[14px] leading-relaxed mb-3 max-w-2xl"
                  style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {brand.description}
                </p>
              )}

              {/* Meta info row */}
              <div className="flex flex-wrap gap-4 text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                <span>📋 {salaries.length} Records</span>
                {uniqueLocations.length > 0 && <span>📍 {uniqueLocations.length} Locations</span>}
                {brand.valuation && <span>💰 {brand.valuation} Valuation</span>}
                {company.headcount_range && <span>👥 {company.headcount_range} Employees</span>}
              </div>
            </div>

            <div className="flex gap-2 flex-shrink-0">
              <Link
                href={`/compare?c1=${slug}`}
                className="px-4 py-2 rounded-xl font-bold text-[13px] text-white transition-colors"
                style={{ border: '2px solid rgba(96,165,250,0.5)', background: 'transparent' }}
              >
                Compare
              </Link>
              <Link
                href={`/salaries?company=${encodeURIComponent(company.name)}`}
                className="px-4 py-2 bg-gradient-to-r from-[#FF5A5F] to-[#FF7060] text-white font-bold rounded-xl hover:from-[#E04E53] hover:to-[#E06050] transition-all text-[13px]"
              >
                Apply for jobs →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Median Total Comp', value: medianTC > 0 ? formatCurrency(medianTC) : '—', accent: true },
            { label: 'Salary Records',    value: String(salaries.length),                        accent: false },
            { label: 'Verified Records',  value: String(verifiedCount),                           accent: false },
            { label: 'Highest TC',        value: maxTC > 0 ? formatCurrency(maxTC) : '—',         accent: false },
          ].map(stat => (
            <div key={stat.label} className="dark-card rounded-2xl p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider mb-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
              <p className={`text-[22px] font-black ${stat.accent ? 'text-[#60A5FA]' : 'text-white'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Compensation Records table */}
          <div className="lg:col-span-2">
            <div className="dark-card rounded-2xl overflow-hidden">
              <div className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <h2 className="text-[16px] font-black text-white">Compensation Records</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold text-[#22C55E]">● LIVE</span>
                  <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Found {salaries.length} compensation records
                  </span>
                </div>
              </div>

              {salaries.length === 0 ? (
                <div className="p-10 text-center text-[14px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  No salary records yet.
                </div>
              ) : (
                <>
                  {/* Table header */}
                  <div className="grid grid-cols-[2fr_1fr_1.2fr_0.7fr_1.5fr] px-5 py-3"
                    style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['ROLE', 'LEVEL', 'LOCATION', 'EXP', 'TOTAL COMP'].map(h => (
                      <span key={h} className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: 'rgba(255,255,255,0.35)' }}>{h}</span>
                    ))}
                  </div>

                  {salaries.map((s, i) => (
                    <div
                      key={s.id}
                      className="grid grid-cols-[2fr_1fr_1.2fr_0.7fr_1.5fr] px-5 py-3.5 items-center salary-row"
                      style={{ borderBottom: i !== salaries.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
                    >
                      <div className="min-w-0 pr-2">
                        <p className="text-[13px] font-semibold text-white truncate">{company.name}</p>
                        <p className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.role}</p>
                      </div>
                      <div><LevelBadge level={s.level} size="sm" /></div>
                      <p className="text-[13px] truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.location}</p>
                      <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {s.experience_years < 2 ? `${s.experience_years} yr` : `${s.experience_years} yrs`}
                      </p>
                      <div>
                        <p className="text-[15px] font-black text-[#60A5FA]">
                          {formatCurrency(s.total_compensation)}
                        </p>
                        {s.stock > 0 && (
                          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            Stock: {formatCurrency(s.stock)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">

            {/* Level Distribution */}
            <div className="dark-card rounded-2xl p-5">
              <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}>LEVEL DISTRIBUTION</h3>
              <div className="space-y-3">
                {levelDistSorted.map(([level, count]) => (
                  <div key={level} className="flex items-center gap-3">
                    <span className="text-[13px] font-semibold text-white w-20 flex-shrink-0">{level}</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full rounded-full bg-[#FF5A5F]"
                        style={{ width: `${(count / maxLevelCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-[13px] font-bold text-white w-4 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TC Range */}
            <div className="dark-card rounded-2xl p-5">
              <h3 className="text-[14px] font-black text-white mb-4">Compensation Range</h3>
              <div className="space-y-3">
                {[
                  { label: 'Floor (Min)', value: minTC,    color: 'text-white/50' },
                  { label: 'Median',      value: medianTC, color: 'text-[#60A5FA]' },
                  { label: 'Top (Max)',   value: maxTC,    color: 'text-[#22C55E]' },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[13px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                    <span className={`text-[14px] font-black ${item.color}`}>
                      {item.value > 0 ? formatCurrency(item.value) : '—'}
                    </span>
                  </div>
                ))}
              </div>
              {maxTC > 0 && minTC < maxTC && (
                <div className="mt-4 relative h-2 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="absolute h-full w-full bg-gradient-to-r from-white/20 via-[#60A5FA] to-[#22C55E] rounded-full" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-[#60A5FA] rounded-full shadow"
                    style={{ left: `${((medianTC - minTC) / (maxTC - minTC)) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="dark-card rounded-2xl p-5">
              <h3 className="text-[12px] font-bold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.4)' }}>QUICK ACTIONS</h3>
              <Link
                href={`/compare?c1=${slug}`}
                className="flex items-center justify-between py-3 text-[14px] font-semibold text-white hover:text-[#60A5FA] transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
              >
                Compare with others <span>→</span>
              </Link>
              <Link
                href="/salaries"
                className="flex items-center justify-between py-3 text-[14px] font-semibold text-white hover:text-[#FF5A5F] transition-colors"
              >
                View all salaries <span>→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
