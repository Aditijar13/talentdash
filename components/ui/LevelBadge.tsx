import type { Level } from '@/types'
import { LEVEL_DISPLAY } from '@/lib/levels'

interface LevelBadgeProps {
  level: Level
  size?: 'sm' | 'md'
}

const DARK_LEVEL_COLORS: Record<string, string> = {
  L3: 'bg-slate-700/50 text-slate-300 border border-slate-600/50',
  SDE_I: 'bg-slate-700/50 text-slate-300 border border-slate-600/50',
  L4: 'bg-blue-900/50 text-blue-300 border border-blue-700/50',
  SDE_II: 'bg-blue-900/50 text-blue-300 border border-blue-700/50',
  L5: 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50',
  SDE_III: 'bg-indigo-900/50 text-indigo-300 border border-indigo-700/50',
  L6: 'bg-purple-900/50 text-purple-300 border border-purple-700/50',
  STAFF: 'bg-purple-900/60 text-purple-200 border border-purple-600/50',
  PRINCIPAL: 'bg-sky-900/50 text-sky-300 border border-sky-700/50',
  IC4: 'bg-violet-900/50 text-violet-300 border border-violet-700/50',
  IC5: 'bg-fuchsia-900/50 text-fuchsia-300 border border-fuchsia-700/50',
}

export default function LevelBadge({ level, size = 'md' }: LevelBadgeProps) {
  const colorClass = DARK_LEVEL_COLORS[level] ?? 'bg-gray-800 text-gray-300 border border-gray-700'
  const display = LEVEL_DISPLAY[level] ?? level
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-[12px] px-2.5 py-1'

  return (
    <span className={`inline-flex items-center rounded-md font-semibold tracking-wide ${colorClass} ${sizeClass}`}>
      {display}
    </span>
  )
}
