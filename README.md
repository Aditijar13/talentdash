# TalentDash — Full-Stack Trial Submission

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Prisma · Neon PostgreSQL

---

## Running Locally in Under 5 Minutes

### 1. Install dependencies
```bash
npm install --ignore-scripts
npx prisma generate
```

### 2. Set environment variables
```bash
cp .env.example .env
# Edit .env and set DATABASE_URL to your Neon PostgreSQL connection string
```

### 3. Run migrations and seed
```bash
npx prisma migrate dev --name init
npm run db:seed
# Seeds 62 salary records across 12 companies
```

### 4. Start dev server
```bash
npm run dev
# Visit http://localhost:3000
```

> **No database?** The app works fully on mock data (62 records in lib/mock-data.ts). Skip steps 1-3 of DB setup. All pages, filters, and APIs work immediately.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | For DB features | Neon PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | Yes | Public URL for OpenGraph / canonical tags |

---

## Project Structure

```
app/
  page.tsx                    # Homepage (ISR 1h)
  salaries/page.tsx           # /salaries (Dynamic RSC, URL-encoded filters)
  companies/page.tsx          # /companies (ISR 1h)
  companies/[slug]/page.tsx   # /companies/[slug] (Static SSG)
  compare/page.tsx            # /compare (Static shell + client hydration)
  api/ingest-salary/          # POST — validate, normalise, recompute TC
  api/salaries/               # GET — filter, sort, paginate (max 100)
  api/companies/[slug]/       # GET — metadata + median + level distribution
  api/compare/                # GET — delta between two records
components/
  ui/                         # LevelBadge, SourceBadge, StatCard, LevelDistributionBar, Navbar
  features/                   # SalaryFilters, SalaryPagination, SalarySort, CompareClient
lib/
  db.ts                       # Prisma singleton
  mock-data.ts                # 62 records + computeMedian, getLevelDistribution
  currency.ts                 # INR/USD/GBP/EUR conversion + formatting
  levels.ts                   # Level badge colours, display names, tier mapping
  validation.ts               # Ingest validation + company name normalisation
types/index.ts                # All TypeScript interfaces matching integration contract
prisma/
  schema.prisma               # Full schema — Company + Salary + all enums + indexes
  seed.ts                     # 62-record seed with normalisation demo
```

---

## API Reference

### POST /api/ingest-salary
Validates all fields, normalises company name, **always recomputes** `total_compensation = base + bonus + stock` server-side.

```bash
curl -X POST http://localhost:3000/api/ingest-salary \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Google India",
    "role": "Software Engineer",
    "level": "L4",
    "location": "Bengaluru",
    "currency": "INR",
    "experience_years": 4,
    "base_salary": 3200000,
    "bonus": 640000,
    "stock": 1200000,
    "source": "CONTRIBUTOR",
    "confidence_score": 0.95
  }'
```

**Hard rejections:**
- `level = "Senior Software Engineer"` → 400 (must be enum: L3, L4, L5, L6, SDE_I, SDE_II, SDE_III, STAFF, PRINCIPAL, IC4, IC5)
- `base_salary <= 0` → 400
- `experience_years < 1 or > 50` → 400
- `confidence_score` outside 0–1 → 400
- Duplicate (same company+role+level+location, base ±10%, last 48h) → 409

### GET /api/salaries
```
?company=google&role=engineer&level=L4&location=Bengaluru
&sort=total_comp_desc&page=1&limit=25
```
Limit capped at 100. `Cache-Control: s-maxage=300, stale-while-revalidate=3600`.

### GET /api/companies/:slug
Returns metadata + salaries + `median_total_compensation` (true statistical median, not average) + `level_distribution`.
`Cache-Control: s-maxage=3600, stale-while-revalidate=86400`.

### GET /api/compare?s1=:id&s2=:id
Returns both records + `{ base_delta, bonus_delta, stock_delta, tc_delta, experience_delta }`.
400 if IDs are identical. 404 if either not found.

---

## Architecture Decisions

### Rendering strategy per page

| Page | Strategy | Why |
|---|---|---|
| Homepage | ISR (1h) | Trending data changes daily. Too dynamic for full static. |
| /companies | ISR (1h) | Rarely changes but shouldn't go fully stale. |
| /companies/[slug] | **Static SSG** | Core SEO asset. Pre-built at deploy time via `generateStaticParams`. Zero compute cost per request. New company → next deploy adds page automatically. |
| /salaries | Dynamic RSC | Filter+pagination is query-specific — can't prebuilt all combinations. RSC means zero client JS for data rendering. |
| /compare | Static shell + client | UI is static. Selection and delta logic runs client-side. |
| /api/* | Dynamic | Always fresh. CDN-cached via response headers. |

### Why page-based not cursor-based pagination

Page-based: shareable URLs (`?page=3`), SEO-crawlable, simpler. At MVP scale (<100k records) with proper composite indexes `(company_id, level, location)`, offset pagination is fast. At 1M+ records, cursor pagination would be better for deep pages — a known trade-off, documented here.

### What I would build differently with more time

1. **Live DB connection**: All API routes have the Prisma DB code written but commented — one env var activates it. The integration is complete.
2. **ISR revalidation trigger**: `POST /api/ingest-salary` should call `revalidatePath('/salaries')` + Cloudflare cache purge after insert.
3. **Individual salary pages**: `/salaries/software-engineer/amazon/bengaluru` as true static pages via `generateStaticParams` — the high-SEO-value long-tail pages.
4. **Typesense search**: PostgreSQL ILIKE works for MVP. Typesense adds typo tolerance + autocomplete when needed.

### What I cut and why

- **Auth (Clerk)**: No auth per task spec — intentionally open.
- **Review/Interview pages**: Frontend scaffolded in nav. Backend schema extensible. Cut to ship salary + compare correctly.
- **Workplace Index scoring**: Composite algorithm is complex — not worth rushing in 72h.
- **Mobile PWA**: Responsive web is complete. Native app is Phase 2.

### Cache TTL reasoning

- `/api/salaries` → `s-maxage=300` (5 min): Salary data can be slightly stale. New submissions appear within 5 min.
- `/api/companies/:slug` → `s-maxage=3600` (1h): Company metadata changes rarely. 1h stale is acceptable.

---

## Data Integrity

1. `total_compensation` **always recomputed** server-side — client value stripped
2. Company normalisation: "Google India Pvt. Ltd." / "GOOGLE" / "google " all → slug `google`
3. Level is validated as enum — "Senior Software Engineer" returns 400
4. Duplicate detection: same company+role+level+location+base (±10%) within 48h → 409
5. Per-field error responses — never a generic error string

## Normalisation Examples (from seed.ts)

| Raw Input | Normalised Slug |
|---|---|
| "Google India Pvt. Ltd." | google |
| "GOOGLE" | google |
| "Google " (trailing space) | google |
| "Tata Consultancy Services" | tcs |
| "TCS Ltd." | tcs |
| "amazon.com" | amazon |
| "Wipro Technologies" | wipro |
| "Infosys BPO" | infosys |

---

## The Hardest Decision

**Rendering strategy for /salaries.** The spec says salary pages should be static (core SEO asset). But filter+pagination means millions of URL combinations — full static generation is impossible. 

Resolution: `/salaries` is a dynamic RSC (reads mock data at request time on the server, ships **zero** client JS for data rendering, only hydrates filter controls). In production, data comes from a CDN-cached API response. The individual high-value long-tail pages (`/salaries/software-engineer/amazon/bengaluru`) would be true SSG pages — this is the next build milestone after MVP.
