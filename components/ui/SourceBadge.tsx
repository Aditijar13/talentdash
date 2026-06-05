import type { Source } from '@/types'

const SOURCE_CONFIG: Record<Source, { label: string; className: string }> = {
  CONTRIBUTOR: { label: 'Verified', className: 'bg-green-900/40 text-green-400 border border-green-700/40' },
  SCRAPED: { label: 'Scraped', className: 'bg-yellow-900/40 text-yellow-400 border border-yellow-700/40' },
  AI_INFERRED: { label: 'AI', className: 'bg-blue-900/40 text-blue-400 border border-blue-700/40' },
}

export default function SourceBadge({ source }: { source: Source }) {
  const config = SOURCE_CONFIG[source]
  return (
    <span className={`inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded ${config.className}`}>
      {config.label}
    </span>
  )
}
