import { NextRequest, NextResponse } from 'next/server'
import { getCompanyBySlug, getSalariesByCompany, computeMedian, getLevelDistribution } from '@/lib/mock-data'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // --- DB path ---
  // const company = await prisma.company.findUnique({ where: { slug } })
  // if (!company) return NextResponse.json({ error: true, message: 'Company not found' }, { status: 404 })
  // const salaries = await prisma.salary.findMany({
  //   where: { company_id: company.id },
  //   orderBy: { total_compensation: 'desc' },
  // })
  // const tcs = salaries.map(s => Number(s.total_compensation))
  // const sorted = [...tcs].sort((a, b) => a - b)
  // const mid = Math.floor(sorted.length / 2)
  // const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  // const level_distribution = salaries.reduce((acc, s) => { acc[s.level] = (acc[s.level] || 0) + 1; return acc }, {})
  // return NextResponse.json({ ...company, salaries, median_total_compensation: median, level_distribution }, {
  //   headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' }
  // })
  // ---------------

  const company = getCompanyBySlug(slug)
  if (!company) {
    return NextResponse.json({ error: true, message: 'Company not found' }, { status: 404 })
  }

  const salaries = getSalariesByCompany(slug).sort((a, b) => b.total_compensation - a.total_compensation)
  const tcs = salaries.map(s => s.total_compensation)
  const median_total_compensation = computeMedian(tcs)
  const level_distribution = getLevelDistribution(salaries)

  return NextResponse.json(
    { ...company, salaries, median_total_compensation, level_distribution },
    { headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' } }
  )
}
