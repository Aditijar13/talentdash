import type { Metadata } from 'next'
import { Suspense } from 'react'
import CompareClient from '@/components/features/CompareClient'

export const metadata: Metadata = {
  title: 'Compare Salaries & Companies',
  description: 'Side-by-side comparison of salary records and companies. See the delta in base, bonus, stock and total compensation.',
  openGraph: {
    title: 'Compare Salaries & Companies | TalentDash',
    description: 'Compare offer letters and companies side by side.',
  },
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareClient />
    </Suspense>
  )
}
