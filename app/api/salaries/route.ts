import { NextRequest, NextResponse } from 'next/server'
import { MOCK_SALARIES } from '@/lib/mock-data'
import type { SalaryRecord, Level, SortOption } from '@/types'

const MAX_LIMIT = 100
const DEFAULT_LIMIT = 25

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const company = searchParams.get('company') ?? ''
  const role = searchParams.get('role') ?? ''
  const level = searchParams.get('level') as Level | null
  const location = searchParams.get('location') ?? ''
  const sort = (searchParams.get('sort') ?? 'total_comp_desc') as SortOption
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const requestedLimit = parseInt(searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10)
  const limit = Math.min(isNaN(requestedLimit) || requestedLimit <= 0 ? DEFAULT_LIMIT : requestedLimit, MAX_LIMIT)

  // --- DB path (uncomment when configured) ---
  // const where: Prisma.SalaryWhereInput = {}
  // if (company) where.company = { normalized_name: { contains: company.toLowerCase() } }
  // if (role) where.role = { contains: role, mode: 'insensitive' }
  // if (level) where.level = level as any
  // if (location) where.location = { contains: location, mode: 'insensitive' }
  // const orderBy = sort === 'total_comp_asc'
  //   ? { total_compensation: 'asc' as const }
  //   : sort === 'date_desc'
  //   ? { submitted_at: 'desc' as const }
  //   : { total_compensation: 'desc' as const }
  // const [data, total] = await Promise.all([
  //   prisma.salary.findMany({ where, orderBy, skip: (page - 1) * limit, take: limit, include: { company: true } }),
  //   prisma.salary.count({ where }),
  // ])
  // return NextResponse.json({ data, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } }, {
  //   headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' }
  // })
  // -------------------------------------------

  // Mock path
  let filtered = [...MOCK_SALARIES]

  if (company) {
    const q = company.toLowerCase()
    filtered = filtered.filter(s => s.company.toLowerCase().includes(q))
  }
  if (role) {
    const q = role.toLowerCase()
    filtered = filtered.filter(s => s.role.toLowerCase().includes(q))
  }
  if (level) {
    filtered = filtered.filter(s => s.level === level)
  }
  if (location) {
    const q = location.toLowerCase()
    filtered = filtered.filter(s => s.location.toLowerCase().includes(q))
  }

  if (sort === 'total_comp_asc') filtered.sort((a, b) => a.total_compensation - b.total_compensation)
  else if (sort === 'date_desc') filtered.sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
  else filtered.sort((a, b) => b.total_compensation - a.total_compensation)

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, totalPages)
  const data = filtered.slice((safePage - 1) * limit, safePage * limit)

  return NextResponse.json(
    { data, meta: { total, page: safePage, limit, totalPages } },
    { headers: { 'Cache-Control': 's-maxage=300, stale-while-revalidate=3600' } }
  )
}
