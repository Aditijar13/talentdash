'use client'
import { useState } from 'react'
import { getCompanyBrand } from '@/lib/company-logos'

interface CompanyLogoProps {
  slug: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  logoUrl?: string
}

const SIZES = {
  sm:  { cls: 'w-9 h-9 rounded-xl text-[13px]',   px: 36 },
  md:  { cls: 'w-12 h-12 rounded-[14px] text-[16px]', px: 48 },
  lg:  { cls: 'w-16 h-16 rounded-2xl text-[22px]', px: 64 },
}

// Map company slug → their primary domain for favicon lookup
const COMPANY_DOMAINS: Record<string, string> = {
  google:    'google.com',
  amazon:    'amazon.com',
  microsoft: 'microsoft.com',
  meta:      'meta.com',
  nvidia:    'nvidia.com',
  flipkart:  'flipkart.com',
  razorpay:  'razorpay.com',
  meesho:    'meesho.com',
  zepto:     'zeptonow.com',
  infosys:   'infosys.com',
  tcs:       'tcs.com',
  wipro:     'wipro.com',
}

// Google's favicon service — reliable, high-res (128px), no auth, no rate-limit
function getLogoUrl(slug: string): string {
  const domain = COMPANY_DOMAINS[slug]
  if (!domain) return ''
  return `https://www.google.com/s2/favicons?sz=128&domain_url=https://${domain}`
}

export const COMPANY_LOGO_URLS = Object.fromEntries(
  Object.entries(COMPANY_DOMAINS).map(([slug, domain]) => [
    slug,
    `https://www.google.com/s2/favicons?sz=128&domain_url=https://${domain}`,
  ])
)

export default function CompanyLogo({ slug, name, size = 'md', logoUrl }: CompanyLogoProps) {
  const brand = getCompanyBrand(slug)
  const [imgError, setImgError] = useState(false)
  const url = logoUrl || getLogoUrl(slug)
  const { cls, px } = SIZES[size]

  if (url && !imgError) {
    return (
      <div
        className={`company-logo flex-shrink-0 ${cls}`}
        aria-label={name}
        style={{ background: 'rgba(255,255,255,0.10)' }}
      >
        <img
          src={url}
          alt={name}
          width={px}
          height={px}
          onError={() => setImgError(true)}
          style={{ width: '72%', height: '72%', objectFit: 'contain' }}
        />
      </div>
    )
  }

  // Fallback: colored initial
  return (
    <div
      className={`company-logo flex-shrink-0 ${cls} ${brand.bg} ${brand.text}`}
      aria-label={name}
    >
      {brand.abbr}
    </div>
  )
}
