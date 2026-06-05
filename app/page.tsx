import type { Metadata } from 'next'
import Link from 'next/link'
import { MOCK_SALARIES, MOCK_COMPANIES, computeMedian } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/currency'
import CompanyLogo from '@/components/ui/CompanyLogo'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "TalentDash — India's Career Intelligence Platform",
  description:
    'Real salary data, company reviews, interview experiences. Decision-ready career intelligence for Indian professionals.',
}

const TRENDING_SEARCHES = [
  'Software Engineer', 'Data Scientist', 'Product Manager', 'ML Engineer', 'Backend Engineer',
]

const FEATURES = [
  {
    icon: '₹',
    title: 'Level-Based Data',
    desc: 'Every salary is tagged with a standardised level — L3 to Principal. Compare apples to apples.',
  },
  {
    icon: '$',
    title: 'Total Compensation',
    desc: 'Base + bonus + stock = the real number. We compute it server-side so no one games the data.',
  },
  {
    icon: '📍',
    title: 'India-First Coverage',
    desc: 'Deep data on Bengaluru, Hyderabad, Mumbai, Pune, Delhi — not just Bay Area salaries.',
  },
]

const HERO_BARS = [
  { label: 'Software Engineer', pct: 82, val: '₹42L' },
  { label: 'Product Manager',   pct: 68, val: '₹38L' },
  { label: 'Data Scientist',    pct: 55, val: '₹31L' },
  { label: 'ML Engineer',       pct: 90, val: '₹48L' },
]

export default function HomePage() {
  const allTCs   = MOCK_SALARIES.map(s => s.total_compensation)
  const medianTC = computeMedian(allTCs)

  const companyMedians = MOCK_COMPANIES
    .map(c => {
      const salaries = MOCK_SALARIES.filter(s => s.company_slug === c.slug)
      const median   = computeMedian(salaries.map(s => s.total_compensation))
      return { ...c, median, count: salaries.length }
    })
    .filter(c => c.count > 0)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="hero-animated-bg relative py-20 md:py-28 overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left copy */}
            <div className="flex-1 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6"
                style={{ background: 'rgba(255,90,95,0.15)', border: '1px solid rgba(255,90,95,0.3)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A5F] pulse-dot" />
                <span className="text-[12px] font-semibold text-[#FF5A5F]">
                  Live — {MOCK_SALARIES.length}+ verified salary records
                </span>
              </div>

              <h1 className="text-[44px] md:text-[58px] font-black text-white leading-[1.05] tracking-tight mb-5">
                Explore.{' '}
                <span className="gradient-text">Compare.</span>
                <br />Grow.
              </h1>
              <p className="text-[17px] leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Real salary data, honest company reviews, and interview
                experiences — structured, comparable, and decision-ready
                for Indian professionals.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="flex-1 relative">
                  <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none select-none"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search by job title, skill or company"
                    className="input-dark w-full pl-10 pr-4 py-3.5 rounded-xl text-[15px]"
                    readOnly
                  />
                </div>
                <Link
                  href="/salaries"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-[#FF5A5F] to-[#FF7060] text-white font-bold text-[15px] rounded-xl hover:from-[#E04E53] hover:to-[#E06050] transition-all shadow-lg whitespace-nowrap"
                >
                  Search Salaries
                </Link>
              </div>

              {/* Trending */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[12px] font-semibold" style={{ color: 'rgba(255,255,255,0.4)' }}>Trending:</span>
                {TRENDING_SEARCHES.map(t => (
                  <Link
                    key={t}
                    href={`/salaries?role=${encodeURIComponent(t)}`}
                    className="text-[12px] font-semibold rounded-full px-3 py-1 transition-colors"
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: dashboard card */}
            <div className="flex-1 max-w-md w-full hidden lg:block">
              <div className="glass-card rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider mb-1"
                      style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Avg Salary · India Tech
                    </p>
                    <p className="text-[32px] font-black text-white leading-tight">
                      ₹{(medianTC / 100000).toFixed(1)}L
                    </p>
                    <p className="text-[12px] font-semibold text-[#22C55E] mt-0.5">+18% vs last year</p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF5A5F] to-[#FF8C42] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-xl">₹</span>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {HERO_BARS.map(item => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                        <span className="text-[12px] font-bold text-[#60A5FA]">{item.val}</span>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div
                          className="h-full bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  {[
                    { val: `${MOCK_SALARIES.length}+`, lbl: 'Salary Records' },
                    { val: `${MOCK_SALARIES.filter(s => s.is_verified).length}`, lbl: 'Verified' },
                    { val: '100%', lbl: 'Free · Always' },
                  ].map(s => (
                    <div key={s.lbl} className="rounded-xl px-3 py-2 flex-1"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-[14px] font-black text-white">{s.val}</p>
                      <p className="text-[10px] font-medium leading-tight" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-around gap-4">
            {[
              { value: `${MOCK_SALARIES.length}+`,                                   label: 'Salary Records' },
              { value: `${MOCK_COMPANIES.length}`,                                   label: 'Companies' },
              { value: formatCurrency(medianTC),                                     label: 'Median TC' },
              { value: `${MOCK_SALARIES.filter(s => s.is_verified).length}`,         label: 'Verified Records' },
              { value: '100%',                                                       label: 'Free · No Paywall' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-[20px] font-black text-white">{stat.value}</p>
                <p className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* ── Top Companies grid (like screenshots) ── */}
        <section>
          <div className="mb-8">
            <h2 className="text-[28px] font-black text-white mb-1">Top Companies</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)' }} className="text-[14px]">
              Explore compensation data from India&apos;s most sought-after employers
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {companyMedians.map(c => (
              <Link
                key={c.id}
                href={`/companies/${c.slug}`}
                className="dark-card card-lift rounded-2xl p-4 flex items-center gap-3 group"
              >
                <CompanyLogo slug={c.slug} name={c.name} size="sm" />
                <span className="font-semibold text-[14px] text-white group-hover:text-[#FF5A5F] transition-colors truncate">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Feature cards ── */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="dark-card rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(255,90,95,0.15)', border: '1px solid rgba(255,90,95,0.25)' }}>
                  <span className="text-lg text-[#FF5A5F] font-black">{f.icon}</span>
                </div>
                <h3 className="text-[15px] font-bold text-white mb-1.5">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section>
          <div className="bg-gradient-to-br from-[#FF5A5F] via-[#FF6B6B] to-[#FF8C42] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white transform translate-x-20 -translate-y-20" />
              <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white transform -translate-x-16 translate-y-16" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-[28px] font-black mb-2">Help the community grow</h2>
                <p className="text-white/85 text-[15px] leading-relaxed max-w-lg">
                  Share your salary anonymously. Every submission improves data quality
                  for thousands of professionals making career decisions.
                </p>
              </div>
              <Link
                href="/salaries"
                className="inline-flex items-center px-7 py-3.5 bg-white text-[#FF5A5F] font-black rounded-2xl hover:bg-gray-50 transition-colors whitespace-nowrap shadow-lg flex-shrink-0 text-[15px]"
              >
                Add Your Salary
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
