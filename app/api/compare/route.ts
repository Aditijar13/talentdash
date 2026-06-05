import { NextRequest, NextResponse } from 'next/server'
import { MOCK_SALARIES } from '@/lib/mock-data'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const s1Id = searchParams.get('s1')
  const s2Id = searchParams.get('s2')

  if (!s1Id || !s2Id) {
    return NextResponse.json(
      { error: true, message: 'Both s1 and s2 query parameters are required' },
      { status: 400 }
    )
  }

  if (s1Id === s2Id) {
    return NextResponse.json(
      { error: true, message: 'Cannot compare a record with itself. s1 and s2 must be different.' },
      { status: 400 }
    )
  }

  // --- DB path ---
  // const [r1, r2] = await Promise.all([
  //   prisma.salary.findUnique({ where: { id: s1Id }, include: { company: true } }),
  //   prisma.salary.findUnique({ where: { id: s2Id }, include: { company: true } }),
  // ])
  // if (!r1) return NextResponse.json({ error: true, message: `Record s1 (${s1Id}) not found` }, { status: 404 })
  // if (!r2) return NextResponse.json({ error: true, message: `Record s2 (${s2Id}) not found` }, { status: 404 })
  // ---------------

  const r1 = MOCK_SALARIES.find(s => s.id === s1Id)
  const r2 = MOCK_SALARIES.find(s => s.id === s2Id)

  if (!r1) {
    return NextResponse.json({ error: true, message: `Record s1 (${s1Id}) not found` }, { status: 404 })
  }
  if (!r2) {
    return NextResponse.json({ error: true, message: `Record s2 (${s2Id}) not found` }, { status: 404 })
  }

  const delta = {
    base_delta: r1.base_salary - r2.base_salary,
    bonus_delta: r1.bonus - r2.bonus,
    stock_delta: r1.stock - r2.stock,
    tc_delta: r1.total_compensation - r2.total_compensation,
    experience_delta: r1.experience_years - r2.experience_years,
  }

  return NextResponse.json({ record1: r1, record2: r2, delta })
}
