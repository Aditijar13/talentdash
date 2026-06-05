import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import WebGLBackground from '@/components/ui/WebGLBackground'

export const metadata: Metadata = {
  title: {
    default: "TalentDash — India's Career Intelligence Platform",
    template: '%s | TalentDash',
  },
  description:
    'Discover real salary data, company reviews, interview experiences and career insights for top Indian and global tech companies.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://talentdash.com'),
  openGraph: {
    type: 'website',
    siteName: 'TalentDash',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="page-bg">
        <WebGLBackground />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
