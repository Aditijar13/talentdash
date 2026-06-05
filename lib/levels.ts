import type { Level } from '@/types'

export const LEVEL_COLORS: Record<Level, string> = {
  L3: 'bg-slate-100 text-slate-700 border border-slate-200',
  SDE_I: 'bg-slate-100 text-slate-700 border border-slate-200',
  L4: 'bg-blue-50 text-blue-700 border border-blue-200',
  SDE_II: 'bg-blue-50 text-blue-700 border border-blue-200',
  L5: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  SDE_III: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
  L6: 'bg-purple-50 text-purple-700 border border-purple-200',
  STAFF: 'bg-purple-100 text-purple-800 border border-purple-300',
  PRINCIPAL: 'bg-navy-50 text-[#1e3a5f] bg-[#e8eef5] border border-[#b8ccdf]',
  IC4: 'bg-violet-50 text-violet-700 border border-violet-200',
  IC5: 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200',
}

export const LEVEL_DISPLAY: Record<Level, string> = {
  L3: 'L3',
  L4: 'L4',
  L5: 'L5',
  L6: 'L6',
  SDE_I: 'SDE-I',
  SDE_II: 'SDE-II',
  SDE_III: 'SDE-III',
  STAFF: 'Staff',
  PRINCIPAL: 'Principal',
  IC4: 'IC4',
  IC5: 'IC5',
}

export const ALL_LEVELS: Level[] = [
  'L3', 'SDE_I', 'L4', 'SDE_II', 'L5', 'SDE_III', 'L6', 'STAFF', 'PRINCIPAL', 'IC4', 'IC5',
]

export function getLevelTier(level: Level): 'junior' | 'mid' | 'senior' | 'staff' {
  if (['L3', 'SDE_I'].includes(level)) return 'junior'
  if (['L4', 'SDE_II', 'IC4'].includes(level)) return 'mid'
  if (['L5', 'SDE_III', 'L6', 'IC5'].includes(level)) return 'senior'
  return 'staff'
}

export const LEVEL_BAR_COLORS: Record<string, string> = {
  L3: '#94a3b8',
  SDE_I: '#94a3b8',
  L4: '#3b82f6',
  SDE_II: '#3b82f6',
  L5: '#6366f1',
  SDE_III: '#6366f1',
  L6: '#a855f7',
  STAFF: '#9333ea',
  PRINCIPAL: '#1e3a5f',
  IC4: '#8b5cf6',
  IC5: '#d946ef',
}
