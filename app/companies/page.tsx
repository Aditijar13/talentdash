import type { Metadata } from 'next'
import Link from 'next/link'
import { MOCK_COMPANIES, MOCK_SALARIES, computeMedian } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/currency'
import CompanyLogo from '@/components/ui/CompanyLogo'
import { getCompanyBrand } from '@/lib/company-logos'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Companies — Browse Top Employers | TalentDash',
  description:
    'Explore salary data, reviews and interview experiences for top tech companies in India. Ranked by verified compensation data.',
}

const INDUSTRY_COLORS: Record<string, string> = {
  Technology:           'text-blue-400',
  'E-Commerce / Cloud': 'text-orange-400',
  'E-Commerce':         'text-orange-400',
  'Social Media':       'text-indigo-400',
  Fintech:              'text-emerald-400',
  Semiconductors:       'text-green-400',
  'IT Services':        'text-slate-400',
  'Quick Commerce':     'text-violet-400',
}

function industryColor(industry: string) {
  return INDUSTRY_COLORS[industry] ?? 'text-gray-400'
}

export default function CompaniesPage() {
  const companies = MOCK_COMPANIES.map(c => {
    const salaries = MOCK_SALARIES.filter(s => s.company_slug === c.slug)
    const median   = computeMedian(salaries.map(s => s.total_compensation))
    const verified = salaries.filter(s => s.is_verified).length
    const brand    = getCompanyBrand(c.slug)
    return { ...c, median, count: salaries.length, verified, description: brand.description, website: brand.website }
  }).sort((a, b) => b.median - a.median)

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-[32px] font-black text-white mb-1">Companies</h1>
          <p style={{ color: 'rgba(255,255,255,0.45)' }} className="text-[15px]">
            Explore verified compensation data across top technology companies.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search companies..."
            className="input-dark w-full max-w-sm px-4 py-3 rounded-xl text-[14px]"
            readOnly
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map(c => (
            <div
              key={c.id}
              className="dark-card card-lift rounded-2xl p-6 block relative overflow-hidden flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-start gap-4 mb-4">
                <CompanyLogo slug={c.slug} name={c.name} size="lg" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-black text-[18px] text-white truncate mb-0.5">
                    {c.name}
                  </h2>
                  <span className={`text-[12px] font-semibold ${industryColor(c.industry)}`}>
                    {c.industry}
                  </span>
                </div>
              </div>

              {/* Description */}
              {c.description && (
                <p className="text-[13px] leading-relaxed mb-5 line-clamp-3"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {c.description.length > 140 ? c.description.slice(0, 140) + '...' : c.description}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/companies/${c.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-semibold text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  View Salaries
                </Link>
                <Link
                  href={`/salaries?company=${encodeURIComponent(c.name)}`}
                  className="flex-1 text-center py-2.5 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-[#FF5A5F] to-[#FF7060] transition-all hover:from-[#E04E53] hover:to-[#E06050]"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
