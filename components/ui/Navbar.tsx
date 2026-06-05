'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home', exact: true },
  { href: '/salaries', label: 'Salaries' },
  { href: '/companies', label: 'Companies' },
  { href: '/compare', label: 'Compare' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href)

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{ background: 'rgba(13,13,26,0.85)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 relative">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 absolute left-0">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF5A5F] to-[#FF8C42] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm tracking-tight">T</span>
            </div>
            <span className="font-black text-white text-[17px] tracking-tight">TalentDash</span>
          </Link>

          {/* Desktop centered nav */}
          <nav
            className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all duration-150 ${
                  isActive(link.href, link.exact)
                    ? 'bg-[rgba(255,255,255,0.15)] text-white'
                    : 'text-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2 absolute right-0">
            <Link
              href="/salaries"
              className="px-5 py-2 bg-gradient-to-r from-[#FF5A5F] to-[#FF7060] text-white text-[13px] font-bold rounded-lg hover:from-[#E04E53] hover:to-[#E06050] transition-all shadow-lg"
            >
              Apply for jobs →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg absolute right-0"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-white/70 rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-white/70 rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white/70 rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 py-3 space-y-1 animate-fade-in"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(13,13,26,0.97)' }}
        >
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-colors ${
                isActive(link.href, link.exact)
                  ? 'bg-[rgba(255,255,255,0.12)] text-white'
                  : 'text-white/60 hover:bg-[rgba(255,255,255,0.06)] hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Link
              href="/salaries"
              onClick={() => setMobileOpen(false)}
              className="block text-center py-2.5 text-[14px] font-bold bg-gradient-to-r from-[#FF5A5F] to-[#FF7060] text-white rounded-xl"
            >
              Apply for jobs →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
