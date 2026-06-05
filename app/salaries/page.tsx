import type { Metadata } from 'next'
import { Suspense } from 'react'
import { MOCK_SALARIES, computeMedian } from '@/lib/mock-data'
import { formatCurrency, convertCurrency } from '@/lib/currency'
import type { SalaryRecord, Level, Currency, SortOption } from '@/types'
import LevelBadge from '@/components/ui/LevelBadge'
import SourceBadge from '@/components/ui/SourceBadge'
import CompanyLogo from '@/components/ui/CompanyLogo'
import SalaryFilters from '@/components/features/SalaryFilters'
import SalaryPagination from '@/components/features/SalaryPagination'
import SalarySort from '@/components/features/SalarySort'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Software Engineer Salaries — L3 to Principal | TalentDash',
  description:
    'Browse salary data by role, level, location and company. Real compensation data from verified professionals across India and globally. Filter by L3, L4, L5, SDE-I, SDE-II and more.',
  openGraph: {
    title: 'Salary Explorer — Browse & Filter Compensation Data | TalentDash',
    description: 'Level-aware salary data for top tech companies in India. Filter by role, level, location.',
    url: 'https://talentdash.com/salaries',
  },
  alternates: { canonical: '/salaries' },
}

const PAGE_SIZE = 25

interface PageProps {
  searchParams: Promise<Record<string, string>>
}

function applyFilters(
  salaries: SalaryRecord[],
  params: Record<string, string>
): SalaryRecord[] {
  let out = [...salaries]
  if (params.company) {
    const q = params.company.toLowerCase()
    out = out.filter(s => s.company.toLowerCase().includes(q))
  }
  if (params.role) {
    const q = params.role.toLowerCase()
    out = out.filter(s => s.role.toLowerCase().includes(q))
  }
  if (params.location) {
    out = out.filter(s => s.location.toLowerCase() === params.location.toLowerCase())
  }
  if (params.level) {
    const levels = params.level.split(',') as Level[]
    out = out.filter(s => levels.includes(s.level))
  }
  return out
}

function sortRecords(salaries: SalaryRecord[], sort: SortOption): SalaryRecord[] {
  const out = [...salaries]
  if (sort === 'total_comp_asc')  out.sort((a, b) => a.total_compensation - b.total_compensation)
  else if (sort === 'date_desc')  out.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
  else                            out.sort((a, b) => b.total_compensation - a.total_compensation)
  return out
}

export default async function SalariesPage({ searchParams }: PageProps) {
  const params          = await searchParams
  const displayCurrency = (params.currency ?? 'INR') as Currency
  const sort            = (params.sort ?? 'total_comp_desc') as SortOption
  const page            = Math.max(1, parseInt(params.page ?? '1', 10))

  const allFiltered = applyFilters(MOCK_SALARIES, params)
  const sorted      = sortRecords(allFiltered, sort)
  const total       = sorted.length
  const totalPages  = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage    = Math.min(page, totalPages)
  const pageItems   = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const medianTC = computeMedian(allFiltered.map(s => s.total_compensation))
  const maxTC    = allFiltered.length > 0 ? Math.max(...allFiltered.map(s => s.total_compensation)) : 0

  const fmt = (amount: number, fromCurrency: Currency = 'INR') => {
    if (displayCurrency === fromCurrency) return formatCurrency(amount, displayCurrency)
    return formatCurrency(convertCurrency(amount, fromCurrency, displayCurrency), displayCurrency)
  }

  // Dynamic JSON-LD based on active role/company filter
  const roleFilter    = params.role    ?? 'Software Engineer'
  const companyFilter = params.company ?? ''
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${roleFilter} Salary Data${companyFilter ? ` at ${companyFilter}` : ''} — TalentDash`,
    description: `Verified ${roleFilter} compensation data across India. ${total} records.`,
    url: 'https://talentdash.com/salaries',
    keywords: ['salary', 'compensation', 'India', 'tech jobs', roleFilter],
    creator: { '@type': 'Organization', name: 'TalentDash' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">

        {/* Page header */}
        <div className="" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-[11px] font-bold text-[#FF5A5F] uppercase tracking-widest mb-2">
              Compensation Data
            </p>
            <h1 className="text-[30px] font-black text-white mb-1">Salary Explorer</h1>
            <p className="text-[15px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Real compensation data from {MOCK_SALARIES.length}+ verified professionals across India and globally.
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-5">
              {[
                { label: 'Matching Records', value: String(total) },
                { label: 'Median TC',        value: formatCurrency(medianTC, displayCurrency) },
                { label: 'Highest TC',       value: maxTC > 0 ? formatCurrency(maxTC, displayCurrency) : '—' },
                { label: 'Verified',         value: `${allFiltered.filter(s => s.is_verified).length}` },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-[20px] font-black text-[#60A5FA]">{stat.value}</p>
                  <p className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">

          {/* Filters */}
          <Suspense>
            <SalaryFilters />
          </Suspense>

          {/* Results header */}
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-white/40">
              <span className="font-bold text-white">{total}</span> records found
            </p>
            <Suspense>
              <SalarySort />
            </Suspense>
          </div>

          {/* Table / empty state */}
          {pageItems.length === 0 ? (
            <div className="dark-card rounded-2xl p-16 text-center">
              <p className="text-[40px] mb-3">&#128269;</p>
              <h3 className="text-[18px] font-black text-white mb-2">No records found for these filters</h3>
              <p className="text-[14px] text-white/40 mb-5">Try removing a filter or broadening your search.</p>
              <Link
                href="/salaries"
                className="inline-flex items-center px-5 py-2.5 bg-[#FF5A5F] text-white font-bold rounded-xl hover:bg-[#E04E53] transition-colors text-[14px]"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="dark-card rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr_1.5fr] px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                {['Company', 'Role', 'Level', 'Location', 'Exp', 'Base', 'Stock', 'Total Comp'].map(h => (
                  <span key={h} className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.35)' }}>{h}</span>
                ))}
              </div>

              {/* Rows */}
              {pageItems.map((s, i) => (
                <div
                  key={s.id}
                  className={`grid grid-cols-[2fr_2fr_1fr_1fr_1fr_1fr_1fr_1.5fr] px-5 py-4 salary-row items-center ${i !== pageItems.length - 1 ? 'border-b' : ''} style={{ borderColor: 'rgba(255,255,255,0.06)' }}`}
                >
                  {/* Company */}
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <CompanyLogo slug={s.company_slug} name={s.company} size="sm" />
                    <div className="min-w-0">
                      <Link
                        href={`/companies/${s.company_slug}`}
                        className="block text-[13px] font-bold text-[#222222] hover:text-[#FF5A5F] transition-colors truncate"
                      >
                        {s.company}
                      </Link>
                      <SourceBadge source={s.source} />
                    </div>
                  </div>
                  {/* Role */}
                  <p className="text-[13px] text-white/60 truncate pr-2">{s.role}</p>
                  {/* Level */}
                  <div><LevelBadge level={s.level} size="sm" /></div>
                  {/* Location */}
                  <p className="text-[13px] text-white/55 truncate">{s.location}</p>
                  {/* Exp */}
                  <p className="text-[13px] text-white/55">{s.experience_years}y</p>
                  {/* Base */}
                  <p className="text-[13px] font-medium text-white/55">{fmt(s.base_salary, s.currency)}</p>
                  {/* Stock */}
                  <p className="text-[13px] text-white/55">{s.stock > 0 ? fmt(s.stock, s.currency) : '—'}</p>
                  {/* Total Comp */}
                  <div>
                    <p className="text-[16px] font-black text-[#60A5FA]">{fmt(s.total_compensation, s.currency)}</p>
                    {s.bonus > 0 && (
                      <p className="text-[11px] text-[#008A05]">+{fmt(s.bonus, s.currency)} bonus</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <Suspense>
                <SalaryPagination meta={{ total, page: safePage, limit: PAGE_SIZE, totalPages }} />
              </Suspense>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
