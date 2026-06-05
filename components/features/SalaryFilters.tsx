'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition, useState, useEffect } from 'react'
import { ALL_LEVELS, LEVEL_DISPLAY } from '@/lib/levels'
import type { Level } from '@/types'

const LOCATIONS = [
  'Bengaluru', 'Mumbai', 'Hyderabad', 'Pune', 'Delhi',
  'Chennai', 'San Francisco', 'London', 'Remote',
]
const ROLES = [
  'Software Engineer', 'Software Development Engineer', 'Product Manager',
  'Data Scientist', 'ML Engineer', 'Data Analyst', 'Data Engineer',
  'Product Designer', 'Backend Engineer', 'Research Scientist',
  'Applied Scientist', 'Deep Learning Engineer', 'Engineering Manager',
  'Principal Engineer', 'Staff Engineer', 'Tech Lead', 'IT Analyst', 'Project Manager',
]
const CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'INR ₹' },
  { code: 'USD', symbol: '$', label: 'USD $' },
  { code: 'GBP', symbol: '£', label: 'GBP £' },
  { code: 'EUR', symbol: '€', label: 'EUR €' },
]

export default function SalaryFilters() {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [company,        setCompany]        = useState(searchParams.get('company') ?? '')
  const [role,           setRole]           = useState(searchParams.get('role') ?? '')
  const [location,       setLocation]       = useState(searchParams.get('location') ?? '')
  const [currency,       setCurrency]       = useState(searchParams.get('currency') ?? 'INR')
  const [selectedLevels, setSelectedLevels] = useState<Level[]>(
    (searchParams.get('level')?.split(',').filter(Boolean) as Level[]) ?? []
  )
  const [showLevels, setShowLevels] = useState(false)

  // Debounced company search (300 ms)
  useEffect(() => {
    const timer = setTimeout(() => pushFilters({ companyOverride: company }), 300)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company])

  const pushFilters = useCallback(
    ({ companyOverride }: { companyOverride?: string } = {}) => {
      const params = new URLSearchParams()
      const c = companyOverride ?? company
      if (c)                      params.set('company',  c)
      if (role)                   params.set('role',     role)
      if (location)               params.set('location', location)
      if (currency !== 'INR')     params.set('currency', currency)
      if (selectedLevels.length)  params.set('level',    selectedLevels.join(','))
      params.set('page', '1')
      startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }))
    },
    [company, role, location, currency, selectedLevels, pathname, router]
  )

  const toggleLevel = (level: Level) => {
    const newLevels = selectedLevels.includes(level)
      ? selectedLevels.filter(l => l !== level)
      : [...selectedLevels, level]
    setSelectedLevels(newLevels)
    const params = new URLSearchParams(searchParams.toString())
    if (newLevels.length) params.set('level', newLevels.join(','))
    else params.delete('level')
    params.set('page', '1')
    startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }))
  }

  const handleSelect = (key: string, val: string, setter: (v: string) => void) => {
    setter(val)
    const params = new URLSearchParams(searchParams.toString())
    if (val) params.set(key, val)
    else     params.delete(key)
    params.set('page', '1')
    startTransition(() => router.push(`${pathname}?${params.toString()}`, { scroll: false }))
  }

  const clearAll = () => {
    setCompany(''); setRole(''); setLocation(''); setCurrency('INR'); setSelectedLevels([])
    startTransition(() => router.push(pathname, { scroll: false }))
  }

  const hasFilters = company || role || location || currency !== 'INR' || selectedLevels.length > 0

  return (
    <div className="dark-card rounded-2xl p-5">
      <div className="flex flex-wrap gap-3 items-end">

        {/* Company search */}
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Company
          </label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            placeholder="e.g. Google, Amazon..."
            className="input-dark w-full px-3 py-2.5 rounded-xl text-[14px]"
          />
        </div>

        {/* Role */}
        <div className="min-w-[160px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Role
          </label>
          <select
            value={role}
            onChange={e => handleSelect('role', e.target.value, setRole)}
            className="input-dark w-full px-3 py-2.5 rounded-xl text-[14px] appearance-none cursor-pointer"
          >
            <option value="">All Roles</option>
            {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Location */}
        <div className="min-w-[140px]">
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Location
          </label>
          <select
            value={location}
            onChange={e => handleSelect('location', e.target.value, setLocation)}
            className="input-dark w-full px-3 py-2.5 rounded-xl text-[14px] appearance-none cursor-pointer"
          >
            <option value="">All Cities</option>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Level multi-select */}
        <div className="min-w-[140px] relative">
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Level
          </label>
          <button
            onClick={() => setShowLevels(!showLevels)}
            className="input-dark w-full px-3 py-2.5 rounded-xl text-[14px] text-left"
          >
            {selectedLevels.length === 0
              ? <span style={{ color: "rgba(255,255,255,0.35)" }}>All Levels</span>
              : <span className="text-white">{selectedLevels.length} selected</span>
            }
          </button>
          {showLevels && (
            <div className="absolute top-full left-0 mt-1 z-20 rounded-2xl shadow-xl p-3 w-56" style={{ background: "#1A1A2A", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                {ALL_LEVELS.map(level => (
                  <label key={level} className="flex items-center gap-2 cursor-pointer hover:bg-white/[05] rounded-lg px-2 py-1.5">
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleLevel(level)}
                      className="w-3.5 h-3.5 rounded accent-[#FF5A5F]"
                    />
                    <span className="text-[13px] text-white/70 font-medium">{LEVEL_DISPLAY[level]}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => setShowLevels(false)}
                className="mt-2 w-full text-[12px] font-bold text-[#FF5A5F] hover:text-[#E04E53] py-1"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Currency — full 4-option segmented control */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Currency
          </label>
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => handleSelect('currency', c.code, setCurrency)}
                title={c.label}
                className={`px-3 py-2.5 text-[12px] font-bold transition-colors last:border-0 ${
                  currency === c.code
                    ? 'bg-[#FF5A5F] text-white'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {c.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Clear */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="px-4 py-2.5 text-[13px] font-bold text-red-400 hover:text-red-300 rounded-xl transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Active level chips */}
      {selectedLevels.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3">
          {selectedLevels.map(l => (
            <button
              key={l}
              onClick={() => toggleLevel(l)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[12px] font-bold rounded-full transition-colors text-white/70 hover:text-red-400" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {LEVEL_DISPLAY[l]} ×
            </button>
          ))}
        </div>
      )}

      {isPending && (
        <div className="mt-2 flex items-center gap-2 text-[12px] text-white/40">
          <div className="w-3 h-3 border-2 border-[#FF5A5F] border-t-transparent rounded-full animate-spin" />
          Filtering…
        </div>
      )}
    </div>
  )
}
