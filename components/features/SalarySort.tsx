'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import type { SortOption } from '@/types'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'total_comp_desc', label: 'Highest TC first' },
  { value: 'total_comp_asc', label: 'Lowest TC first' },
  { value: 'date_desc', label: 'Most recent' },
]

export default function SalarySort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const currentSort = (searchParams.get('sort') as SortOption) ?? 'total_comp_desc'

  const handleSort = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sort)
    params.set('page', '1')
    startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }))
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[13px] font-medium hidden sm:inline" style={{ color: "rgba(255,255,255,0.4)" }}>Sort by:</span>
      <select
        value={currentSort}
        onChange={e => handleSort(e.target.value as SortOption)}
        className="input-dark px-3 py-2 rounded-xl text-[13px] cursor-pointer"
      >
        {SORT_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
