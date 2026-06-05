import { NextRequest, NextResponse } from 'next/server'
import { validateIngestPayload, normalizeCompanyName, computeSlug } from '@/lib/validation'

// When DB is connected, import prisma from '@/lib/db'
// For now we operate against in-memory mock and return structured responses

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: true, field: 'body', message: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  // Validate
  const validationError = validateIngestPayload(body)
  if (validationError) {
    return NextResponse.json(validationError, { status: 400 })
  }

  const b = body as Record<string, unknown>

  // Normalise company
  const normalizedName = normalizeCompanyName(String(b.company))
  const slug = computeSlug(String(b.company))

  // Recompute total_compensation server-side (strip client value)
  const base_salary = Number(b.base_salary)
  const bonus = Number(b.bonus ?? 0)
  const stock = Number(b.stock ?? 0)
  const total_compensation = base_salary + bonus + stock

  // Build the record
  const record = {
    id: crypto.randomUUID(),
    company: String(b.company).trim(),
    company_slug: slug,
    normalized_name: normalizedName,
    role: String(b.role).trim(),
    level: b.level,
    location: String(b.location).trim(),
    currency: b.currency,
    experience_years: Number(b.experience_years),
    base_salary,
    bonus,
    stock,
    total_compensation, // always recomputed
    source: b.source,
    confidence_score: Number(b.confidence_score),
    is_verified: false,
    submitted_at: new Date().toISOString(),
  }

  // --- DB path (uncomment when Neon DATABASE_URL is configured) ---
  // try {
  //   const company = await prisma.company.upsert({
  //     where: { normalized_name: normalizedName },
  //     update: {},
  //     create: {
  //       name: String(b.company).trim(),
  //       slug,
  //       normalized_name: normalizedName,
  //       industry: 'Unknown',
  //       headquarters: String(b.location).trim(),
  //     },
  //   })
  //
  //   // Duplicate check: same company+role+level+location within 48h, base within 10%
  //   const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000)
  //   const existing = await prisma.salary.findFirst({
  //     where: {
  //       company_id: company.id,
  //       role: record.role,
  //       level: record.level as any,
  //       location: record.location,
  //       submitted_at: { gte: fortyEightHoursAgo },
  //       base_salary: {
  //         gte: BigInt(Math.floor(base_salary * 0.9)),
  //         lte: BigInt(Math.ceil(base_salary * 1.1)),
  //       },
  //     },
  //   })
  //   if (existing) {
  //     return NextResponse.json(
  //       { error: true, field: 'duplicate', message: 'A similar record was submitted in the last 48 hours.' },
  //       { status: 409 }
  //     )
  //   }
  //
  //   const saved = await prisma.salary.create({
  //     data: {
  //       company_id: company.id,
  //       role: record.role,
  //       level: record.level as any,
  //       location: record.location,
  //       currency: record.currency as any,
  //       experience_years: record.experience_years,
  //       base_salary: BigInt(base_salary),
  //       bonus: BigInt(bonus),
  //       stock: BigInt(stock),
  //       total_compensation: BigInt(total_compensation),
  //       source: record.source as any,
  //       confidence_score: record.confidence_score,
  //       is_verified: false,
  //     },
  //   })
  //   return NextResponse.json(saved, { status: 201 })
  // } catch (err) {
  //   console.error('DB ingest error:', err)
  //   return NextResponse.json({ error: true, field: 'server', message: 'Internal server error' }, { status: 500 })
  // }
  // ---------------------------------------------------------------

  return NextResponse.json(record, { status: 201 })
}
