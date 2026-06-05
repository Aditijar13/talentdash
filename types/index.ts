export type Level =
  | 'L3' | 'L4' | 'L5' | 'L6'
  | 'SDE_I' | 'SDE_II' | 'SDE_III'
  | 'STAFF' | 'PRINCIPAL' | 'IC4' | 'IC5'

export type Currency = 'INR' | 'USD' | 'GBP' | 'EUR'
export type Source = 'CONTRIBUTOR' | 'SCRAPED' | 'AI_INFERRED'

export interface SalaryRecord {
  id: string
  company: string
  company_slug: string
  role: string
  level: Level
  location: string
  currency: Currency
  experience_years: number
  base_salary: number
  bonus: number
  stock: number
  total_compensation: number
  source: Source
  confidence_score: number
  is_verified: boolean
  submitted_at: string
}

export interface CompanyRecord {
  id: string
  name: string
  slug: string
  normalized_name: string
  industry: string
  headquarters: string
  founded_year: number | null
  headcount_range: string | null
  created_at: string
  updated_at: string
}

export interface CompanyWithStats extends CompanyRecord {
  median_total_compensation: number
  min_tc: number
  max_tc: number
  record_count: number
  level_distribution: Record<string, number>
  salaries: SalaryRecord[]
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SalaryListResponse {
  data: SalaryRecord[]
  meta: PaginationMeta
}

export interface DeltaObject {
  base_delta: number
  bonus_delta: number
  stock_delta: number
  tc_delta: number
  experience_delta: number
}

export interface CompareResponse {
  record1: SalaryRecord
  record2: SalaryRecord
  delta: DeltaObject
}

export interface IngestPayload {
  company: string
  role: string
  level: Level
  location: string
  currency: Currency
  experience_years: number
  base_salary: number
  bonus?: number
  stock?: number
  source: Source
  confidence_score: number
}

export type SortOption = 'total_comp_desc' | 'total_comp_asc' | 'date_desc'

export interface SalaryFilters {
  company?: string
  role?: string
  level?: Level
  location?: string
  currency?: Currency
  sort?: SortOption
  page?: number
  limit?: number
}
