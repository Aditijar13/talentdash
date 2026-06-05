import { LEVEL_BAR_COLORS, LEVEL_DISPLAY } from '@/lib/levels'
import type { Level } from '@/types'

interface LevelDistributionBarProps {
  distribution: Record<string, number>
}

export default function LevelDistributionBar({ distribution }: LevelDistributionBarProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0)
  if (total === 0) return null

  const entries = Object.entries(distribution).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-3">
      {/* Stacked bar */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {entries.map(([level, count]) => {
          const pct = (count / total) * 100
          const color = LEVEL_BAR_COLORS[level] ?? '#94a3b8'
          return (
            <div
              key={level}
              style={{ width: `${pct}%`, backgroundColor: color }}
              title={`${LEVEL_DISPLAY[level as Level] ?? level}: ${count} (${pct.toFixed(0)}%)`}
              className="h-full transition-all"
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {entries.map(([level, count]) => {
          const pct = ((count / total) * 100).toFixed(0)
          const color = LEVEL_BAR_COLORS[level] ?? '#94a3b8'
          return (
            <div key={level} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="text-[12px] text-[#484848] font-medium">
                {LEVEL_DISPLAY[level as Level] ?? level}
              </span>
              <span className="text-[12px] text-[#717171]">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
