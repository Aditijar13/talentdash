import type { IngestPayload, Level, Currency, Source } from '@/types'

const VALID_LEVELS: Level[] = [
  'L3', 'L4', 'L5', 'L6',
  'SDE_I', 'SDE_II', 'SDE_III',
  'STAFF', 'PRINCIPAL', 'IC4', 'IC5',
]

const VALID_CURRENCIES: Currency[] = ['INR', 'USD', 'GBP', 'EUR']
const VALID_SOURCES: Source[] = ['CONTRIBUTOR', 'SCRAPED', 'AI_INFERRED']

export interface ValidationError {
  error: true
  field: string
  message: string
}

export function validateIngestPayload(body: unknown): ValidationError | null {
  const b = body as Record<string, unknown>

  const required = ['company', 'role', 'level', 'location', 'currency', 'experience_years', 'base_salary', 'source', 'confidence_score']
  for (const field of required) {
    if (b[field] === undefined || b[field] === null || b[field] === '') {
      return { error: true, field, message: `${field} is required` }
    }
  }

  if (typeof b.company !== 'string' || b.company.trim().length < 2) {
    return { error: true, field: 'company', message: 'company must be at least 2 characters' }
  }

  if (!VALID_LEVELS.includes(b.level as Level)) {
    return { error: true, field: 'level', message: `Level must be one of: ${VALID_LEVELS.join(', ')}` }
  }

  if (!VALID_CURRENCIES.includes(b.currency as Currency)) {
    return { error: true, field: 'currency', message: `Currency must be one of: ${VALID_CURRENCIES.join(', ')}` }
  }

  if (!VALID_SOURCES.includes(b.source as Source)) {
    return { error: true, field: 'source', message: `Source must be one of: ${VALID_SOURCES.join(', ')}` }
  }

  const exp = Number(b.experience_years)
  if (!Number.isInteger(exp) || exp <= 0 || exp >= 51) {
    return { error: true, field: 'experience_years', message: 'experience_years must be an integer between 1 and 50' }
  }

  const base = Number(b.base_salary)
  if (isNaN(base) || base <= 0) {
    return { error: true, field: 'base_salary', message: 'base_salary must be a positive number' }
  }

  const conf = Number(b.confidence_score)
  if (isNaN(conf) || conf < 0 || conf > 1) {
    return { error: true, field: 'confidence_score', message: 'confidence_score must be between 0.0 and 1.0' }
  }

  return null
}

export function normalizeCompanyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+(pvt\.?\s*ltd\.?|private\s+limited|limited|inc\.?|llc\.?|ltd\.?|corp\.?|co\.?|technologies|technology|services|solutions|india|\.com)$/gi, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function computeSlug(name: string): string {
  return normalizeCompanyName(name).replace(/\s+/g, '-')
}
