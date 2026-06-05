import Link from 'next/link'

const FOOTER_LINKS = {
  Platform: [
    { label: 'Salaries', href: '/salaries' },
    { label: 'Companies', href: '/companies' },
    { label: 'Compare', href: '/compare' },
  ],
  Explore: [
    { label: 'Software Engineer', href: '/salaries?role=Software+Engineer' },
    { label: 'Product Manager', href: '/salaries?role=Product+Manager' },
    { label: 'Data Scientist', href: '/salaries?role=Data+Scientist' },
    { label: 'ML Engineer', href: '/salaries?role=ML+Engineer' },
  ],
  Companies: [
    { label: 'Google', href: '/companies/google' },
    { label: 'Amazon', href: '/companies/amazon' },
    { label: 'Microsoft', href: '/companies/microsoft' },
    { label: 'Flipkart', href: '/companies/flipkart' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer-gradient text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#FF5A5F] to-[#FF8C42] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">T</span>
              </div>
              <span className="font-black text-white text-xl tracking-tight">TalentDash</span>
            </Link>
            <p className="text-[14px] text-white/60 leading-relaxed max-w-xs mb-5">
              India's career intelligence platform. Real salary data, company reviews, and interview insights — structured, comparable, decision-ready.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#008A05] pulse-dot" />
              <span className="text-[12px] text-white/50 font-medium">Live data · Updated daily</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[12px] font-bold text-white/40 uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/65 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[13px] text-white/40">
            © {new Date().getFullYear()} TalentDash. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Use', 'Data Sources'].map(item => (
              <Link key={item} href="/" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
