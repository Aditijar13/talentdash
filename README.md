# TalentDash — Full Stack Salary Intelligence Platform
link : https://talentdash-3t6txecp4-aditijar13-6440s-projects.vercel.app/

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS · Prisma · PostgreSQL (Neon)

---

## 🚀 Quick Start (Local Setup in Minutes)

### 1. Install dependencies

```bash
npm install --ignore-scripts
npx prisma generate
```

### 2. Environment setup

```bash
cp .env.example .env
```

Update `.env` with your PostgreSQL (Neon) connection string.

---

### 3. Run database migrations & seed data

```bash
npx prisma migrate dev --name init
npm run db:seed
```

This initializes the database with **62 sample salary records across 12 companies**.

---

### 4. Start development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

### ⚡ No Database Mode (Mock Data Fallback)

If you don’t configure a database, the app still works fully using local mock data (`lib/mock-data.ts`).

All features including:

* salary listing
* filtering
* comparison
* API responses

work without DB setup.

---

## 🔐 Environment Variables

| Variable            | Required               | Purpose                             |
| ------------------- | ---------------------- | ----------------------------------- |
| DATABASE_URL        | Optional (for DB mode) | PostgreSQL connection string (Neon) |
| NEXT_PUBLIC_APP_URL | Required               | Public app URL for metadata / SEO   |

---

## 📁 Project Structure

```
app/
  page.tsx                    → Homepage (ISR cached)
  salaries/page.tsx          → Salary explorer (server-rendered filters)
  companies/page.tsx         → Company listing (ISR cached)
  companies/[slug]/page.tsx  → Company profile (SSG)
  compare/page.tsx           → Salary comparison tool (client-driven)

  api/
    salaries/                → Filtering, sorting, pagination API
    companies/[slug]/       → Company stats + analytics
    compare/                → Record comparison API
    ingest-salary/          → Salary validation + normalization API

components/
  ui/                        → Reusable UI components (badges, cards, navbar)
  features/                 → Feature modules (filters, pagination, compare UI)

lib/
  db.ts                     → Prisma singleton client
  mock-data.ts             → In-memory dataset (62 records)
  currency.ts              → Multi-currency formatting utilities
  levels.ts                → Role level mapping + styling logic
  validation.ts            → Input validation + normalization rules

prisma/
  schema.prisma            → Database schema (Company, Salary, enums)
  seed.ts                  → Seed script for demo dataset

types/
  index.ts                 → Shared TypeScript interfaces
```

---

## 🔌 API Overview

### ➤ POST `/api/ingest-salary`

Validates incoming salary data and always recalculates total compensation server-side.

Key rules:

* Invalid role levels rejected (must match enum)
* Salary must be positive
* Experience limited between 1–50 years
* Confidence score must be 0–1
* Duplicate entries within 48 hours are blocked

---

### ➤ GET `/api/salaries`

Supports filtering, sorting, and pagination:

```
?company=google&role=engineer&level=L4&location=Bengaluru
&sort=total_comp_desc&page=1&limit=25
```

* Max limit: 100
* Server-side filtering optimized with indexes
* CDN cache: 5 minutes

---

### ➤ GET `/api/companies/:slug`

Returns:

* company metadata
* salary records
* median compensation
* level-wise distribution

Cache:

* 1 hour edge caching
* 24 hour stale revalidation

---

### ➤ GET `/api/compare`

Compares two salary records:

```
?s1=id1&s2=id2
```

Returns:

* base, bonus, stock differences
* total compensation delta
* experience difference

---

## 🧠 Architecture Decisions

### Rendering Strategy

| Route             | Strategy    | Reason                               |
| ----------------- | ----------- | ------------------------------------ |
| /                 | ISR         | homepage changes moderately          |
| /companies        | ISR         | low volatility                       |
| /companies/[slug] | SSG         | SEO-critical pages                   |
| /salaries         | Dynamic RSC | filters create infinite combinations |
| /compare          | Client-side | UI only, no heavy server logic       |

---

## 📊 Pagination Approach

Used **page-based pagination** instead of cursor-based because:

* URLs are shareable and SEO-friendly
* Simpler implementation for MVP
* Works efficiently under ~100k records with indexing

Cursor pagination would be considered at large scale (1M+ records).

---

## ⚙️ Key Engineering Decisions

* Total compensation is **always computed on server**
* Company names are normalized into consistent slugs
* Strict enum validation for job levels
* Duplicate detection prevents repeated submissions
* API responses are cache-optimized using CDN headers

---

## 🧪 Data Normalization Examples

| Input                     | Normalized |
| ------------------------- | ---------- |
| Google India Pvt Ltd      | google     |
| GOOGLE                    | google     |
| Tata Consultancy Services | tcs        |
| TCS Ltd                   | tcs        |
| amazon.com                | amazon     |
| Infosys BPO               | infosys    |

---

## 🚧 Trade-offs & Future Improvements

### What was intentionally not included

* Authentication system (kept open for simplicity)
* Advanced interview/workplace scoring system
* PWA/mobile app layer

### Future enhancements

* Full DB-powered live ingestion pipeline
* ISR revalidation on new salary submission
* SEO-rich individual salary pages
* Advanced search (Typesense / ElasticSearch)
* Performance scoring engine for companies

---

## 💡 Key Product Decision

The `/salaries` page is intentionally **server-rendered with dynamic filtering** instead of fully static generation.

Why:

* Filter combinations are infinite
* Full static generation is not feasible
* RSC ensures minimal client-side JavaScript
* API layer allows CDN caching in production

Future evolution:
→ Generate high-value SEO pages like:
`/salaries/software-engineer/google/bengaluru` using SSG

---

## 🏁 Summary

TalentDash is a scalable salary intelligence platform designed with:

* SEO-first architecture
* Server-heavy data validation
* Minimal client-side overhead
* Strong type safety with TypeScript
* Production-ready Prisma schema design

It is built to scale from MVP → full production analytics platform with minimal refactoring.
