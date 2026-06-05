'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import type { PaginationMeta } from '@/types'

export default function SalaryPagination({ meta }: { meta: PaginationMeta }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }))
  }

  const { page, totalPages, total, limit } = meta
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-[#EBEBEB]">
      <p className="text-[13px] text-white/40">
        Showing <span className="font-semibold text-white">{start}–{end}</span> of{' '}
        <span className="font-semibold text-white">{total}</span> records
      </p>
      <div className="flex items-center gap-1.5">
        <button
          disabled={page <= 1 || isPending}
          onClick={() => goTo(page - 1)}
          className="px-3 py-1.5 text-[13px] font-medium rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white/60 hover:text-white" style={{ border: "1px solid rgba(255,255,255,0.10)", background: "transparent" }}
        >
          ← Previous
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = i + 1
          if (totalPages > 5) {
            if (page <= 3) pageNum = i + 1
            else if (page >= totalPages - 2) pageNum = totalPages - 4 + i
            else pageNum = page - 2 + i
          }
          return (
            <button
              key={pageNum}
              onClick={() => goTo(pageNum)}
              className={`w-8 h-8 text-[13px] font-medium rounded-lg transition-colors ${
                pageNum === page
                  ? 'bg-[#FF5A5F] text-white'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {pageNum}
            </button>
          )
        })}

        <button
          disabled={page >= totalPages || isPending}
          onClick={() => goTo(page + 1)}
          className="px-3 py-1.5 text-[13px] font-medium rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-white/60 hover:text-white" style={{ border: "1px solid rgba(255,255,255,0.10)", background: "transparent" }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}
