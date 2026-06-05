/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * TalentDash Database Seed Script
 * Run AFTER: npx prisma generate && npx prisma migrate dev
 * Command:   npm run db:seed
 *
 * NORMALISATION DEMO:
 *   "Google India Pvt. Ltd." → "google"
 *   "GOOGLE"                 → "google"
 *   "Google " (trailing)     → "google"
 *   "Tata Consultancy Services" → "tcs"
 *   "TCS Ltd."               → "tcs"
 *   "amazon.com"             → "amazon"
 *   "Wipro Technologies"     → "wipro"
 *   "Infosys BPO"            → "infosys"
 */

const ALIASES: Record<string, string> = {
  'google india':                  'google',
  'google india pvt ltd':          'google',
  'amazon.com':                    'amazon',
  'amazon web services':           'aws',
  'tata consultancy services':     'tcs',
  'tata consultancy':              'tcs',
  'tcs ltd':                       'tcs',
  'infosys bpo':                   'infosys',
  'infosys limited':               'infosys',
  'wipro technologies':            'wipro',
  'wipro limited':                 'wipro',
  'flipkart internet pvt ltd':     'flipkart',
}

function normalizeCompany(raw: string): string {
  const lower = raw.toLowerCase().trim()
    .replace(/\s+(pvt\.?\s*ltd\.?|private\s+limited|limited|inc\.?|llc\.?|ltd\.?|corp\.?|technologies|technology|services|solutions|india|\.com)$/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
  return ALIASES[lower] ?? lower.replace(/\s+/g, '-')
}

async function main() {
  // require avoids build-time TS error when prisma generate hasn't run yet
  const { PrismaClient } = require('@prisma/client') as { PrismaClient: new () => any }
  const prisma = new PrismaClient()

  console.log('🌱 Starting TalentDash seed…\n')
  console.log('📋 Normalisation demo:')
  ;['Google India Pvt. Ltd.', 'GOOGLE', 'Google ', 'Tata Consultancy Services',
    'TCS Ltd.', 'amazon.com', 'Wipro Technologies', 'Infosys BPO'].forEach(raw =>
    console.log(`   "${raw}" → "${normalizeCompany(raw)}"`)
  )
  console.log()

  await prisma.salary.deleteMany()
  await prisma.company.deleteMany()
  console.log('🗑  Cleared existing data\n')

  const companySeed = [
    { name: 'Google',    slug: 'google',    normalized_name: 'google',    industry: 'Technology',         headquarters: 'Mountain View, USA', founded_year: 1998, headcount_range: '100,000+' },
    { name: 'Amazon',    slug: 'amazon',    normalized_name: 'amazon',    industry: 'E-Commerce / Cloud', headquarters: 'Seattle, USA',       founded_year: 1994, headcount_range: '500,000+' },
    { name: 'Microsoft', slug: 'microsoft', normalized_name: 'microsoft', industry: 'Technology',         headquarters: 'Redmond, USA',       founded_year: 1975, headcount_range: '200,000+' },
    { name: 'Meta',      slug: 'meta',      normalized_name: 'meta',      industry: 'Social Media',       headquarters: 'Menlo Park, USA',    founded_year: 2004, headcount_range: '50,000+'  },
    { name: 'Flipkart',  slug: 'flipkart',  normalized_name: 'flipkart',  industry: 'E-Commerce',         headquarters: 'Bengaluru, India',   founded_year: 2007, headcount_range: '30,000+'  },
    { name: 'Razorpay',  slug: 'razorpay',  normalized_name: 'razorpay',  industry: 'Fintech',            headquarters: 'Bengaluru, India',   founded_year: 2014, headcount_range: '3,000+'   },
    { name: 'Meesho',    slug: 'meesho',    normalized_name: 'meesho',    industry: 'E-Commerce',         headquarters: 'Bengaluru, India',   founded_year: 2015, headcount_range: '5,000+'   },
    { name: 'Zepto',     slug: 'zepto',     normalized_name: 'zepto',     industry: 'Quick Commerce',     headquarters: 'Mumbai, India',      founded_year: 2021, headcount_range: '2,000+'   },
    { name: 'Infosys',   slug: 'infosys',   normalized_name: 'infosys',   industry: 'IT Services',        headquarters: 'Bengaluru, India',   founded_year: 1981, headcount_range: '300,000+' },
    { name: 'NVIDIA',    slug: 'nvidia',    normalized_name: 'nvidia',    industry: 'Semiconductors',     headquarters: 'Santa Clara, USA',   founded_year: 1993, headcount_range: '25,000+'  },
    { name: 'TCS',       slug: 'tcs',       normalized_name: 'tcs',       industry: 'IT Services',        headquarters: 'Mumbai, India',      founded_year: 1968, headcount_range: '600,000+' },
    { name: 'Wipro',     slug: 'wipro',     normalized_name: 'wipro',     industry: 'IT Services',        headquarters: 'Bengaluru, India',   founded_year: 1945, headcount_range: '200,000+' },
  ]

  const cmap: Record<string, string> = {}
  for (const c of companySeed) {
    const row = await prisma.company.create({ data: c })
    cmap[c.slug] = row.id
    console.log(`✅ Company: ${c.name}`)
  }

  const salaries = [
    { cs:'google',    role:'Software Engineer',         level:'L4',        loc:'Bengaluru',     cur:'INR', exp:4,  base:3200000,  bonus:640000,  stock:1200000,  src:'CONTRIBUTOR', conf:0.95, ver:true  },
    { cs:'google',    role:'Software Engineer',         level:'L5',        loc:'Bengaluru',     cur:'INR', exp:7,  base:5000000,  bonus:1000000, stock:2500000,  src:'CONTRIBUTOR', conf:0.92, ver:true  },
    { cs:'google',    role:'Software Engineer',         level:'L6',        loc:'Bengaluru',     cur:'INR', exp:11, base:7500000,  bonus:1500000, stock:5000000,  src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'google',    role:'Software Engineer',         level:'L3',        loc:'Bengaluru',     cur:'INR', exp:1,  base:1800000,  bonus:300000,  stock:600000,   src:'CONTRIBUTOR', conf:0.93, ver:true  },
    { cs:'google',    role:'Product Manager',           level:'L5',        loc:'Bengaluru',     cur:'INR', exp:6,  base:5500000,  bonus:1100000, stock:2800000,  src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'google',    role:'Data Scientist',            level:'L5',        loc:'Hyderabad',     cur:'INR', exp:8,  base:4800000,  bonus:960000,  stock:2400000,  src:'SCRAPED',     conf:0.75, ver:false },
    { cs:'google',    role:'ML Engineer',               level:'L5',        loc:'Hyderabad',     cur:'INR', exp:7,  base:5200000,  bonus:1040000, stock:2800000,  src:'CONTRIBUTOR', conf:0.93, ver:true  },
    { cs:'google',    role:'Engineering Manager',       level:'L6',        loc:'Bengaluru',     cur:'INR', exp:13, base:8500000,  bonus:1700000, stock:6000000,  src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'google',    role:'Software Engineer',         level:'STAFF',     loc:'San Francisco', cur:'USD', exp:14, base:28000000, bonus:5600000, stock:14000000, src:'CONTRIBUTOR', conf:0.91, ver:true  },
    { cs:'amazon',    role:'Software Development Engineer', level:'SDE_II', loc:'Bengaluru',   cur:'INR', exp:4,  base:3600000,  bonus:540000,  stock:1800000,  src:'CONTRIBUTOR', conf:0.94, ver:true  },
    { cs:'amazon',    role:'Software Development Engineer', level:'SDE_I',  loc:'Bengaluru',   cur:'INR', exp:2,  base:2200000,  bonus:330000,  stock:800000,   src:'CONTRIBUTOR', conf:0.92, ver:true  },
    { cs:'amazon',    role:'Software Development Engineer', level:'SDE_III',loc:'Bengaluru',   cur:'INR', exp:8,  base:5200000,  bonus:780000,  stock:3000000,  src:'CONTRIBUTOR', conf:0.89, ver:true  },
    { cs:'amazon',    role:'Product Manager',           level:'L5',        loc:'Bengaluru',     cur:'INR', exp:6,  base:4800000,  bonus:960000,  stock:2400000,  src:'CONTRIBUTOR', conf:0.87, ver:true  },
    { cs:'amazon',    role:'Data Engineer',             level:'SDE_II',    loc:'Mumbai',        cur:'INR', exp:4,  base:3000000,  bonus:0,       stock:1200000,  src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'amazon',    role:'ML Engineer',               level:'SDE_III',   loc:'Bengaluru',     cur:'INR', exp:8,  base:5500000,  bonus:825000,  stock:3200000,  src:'CONTRIBUTOR', conf:0.91, ver:true  },
    { cs:'amazon',    role:'Applied Scientist',         level:'L5',        loc:'Bengaluru',     cur:'INR', exp:7,  base:4600000,  bonus:920000,  stock:2800000,  src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'microsoft', role:'Software Engineer',         level:'L4',        loc:'Bengaluru',     cur:'INR', exp:3,  base:2800000,  bonus:560000,  stock:1200000,  src:'CONTRIBUTOR', conf:0.93, ver:true  },
    { cs:'microsoft', role:'Software Engineer',         level:'L5',        loc:'Bengaluru',     cur:'INR', exp:7,  base:4500000,  bonus:900000,  stock:2200000,  src:'CONTRIBUTOR', conf:0.91, ver:true  },
    { cs:'microsoft', role:'Software Engineer',         level:'L6',        loc:'Bengaluru',     cur:'INR', exp:12, base:7000000,  bonus:1400000, stock:4500000,  src:'CONTRIBUTOR', conf:0.89, ver:true  },
    { cs:'microsoft', role:'Product Manager',           level:'L4',        loc:'Hyderabad',     cur:'INR', exp:4,  base:3200000,  bonus:640000,  stock:1400000,  src:'CONTRIBUTOR', conf:0.86, ver:true  },
    { cs:'microsoft', role:'Principal Engineer',        level:'PRINCIPAL', loc:'Bengaluru',     cur:'INR', exp:16, base:9500000,  bonus:1900000, stock:7000000,  src:'CONTRIBUTOR', conf:0.87, ver:true  },
    { cs:'meta',      role:'Software Engineer',         level:'L4',        loc:'Bengaluru',     cur:'INR', exp:4,  base:3800000,  bonus:760000,  stock:2200000,  src:'CONTRIBUTOR', conf:0.92, ver:true  },
    { cs:'meta',      role:'Software Engineer',         level:'L5',        loc:'Bengaluru',     cur:'INR', exp:8,  base:5800000,  bonus:1160000, stock:3500000,  src:'CONTRIBUTOR', conf:0.94, ver:true  },
    { cs:'meta',      role:'Research Scientist',        level:'L5',        loc:'Bengaluru',     cur:'INR', exp:8,  base:6500000,  bonus:1300000, stock:4000000,  src:'CONTRIBUTOR', conf:0.92, ver:true  },
    { cs:'meta',      role:'Software Engineer',         level:'PRINCIPAL', loc:'San Francisco', cur:'USD', exp:15, base:35000000, bonus:7000000, stock:20000000, src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'nvidia',    role:'Software Engineer',         level:'L5',        loc:'Bengaluru',     cur:'INR', exp:7,  base:6000000,  bonus:1200000, stock:4000000,  src:'CONTRIBUTOR', conf:0.93, ver:true  },
    { cs:'nvidia',    role:'ML Engineer',               level:'L4',        loc:'Bengaluru',     cur:'INR', exp:4,  base:4200000,  bonus:840000,  stock:2800000,  src:'CONTRIBUTOR', conf:0.91, ver:true  },
    { cs:'nvidia',    role:'Software Engineer',         level:'L6',        loc:'Pune',          cur:'INR', exp:11, base:9000000,  bonus:0,       stock:8000000,  src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'nvidia',    role:'Deep Learning Engineer',    level:'L5',        loc:'Bengaluru',     cur:'INR', exp:6,  base:7000000,  bonus:1400000, stock:5000000,  src:'CONTRIBUTOR', conf:0.95, ver:true  },
    { cs:'nvidia',    role:'Software Engineer',         level:'L3',        loc:'Bengaluru',     cur:'INR', exp:1,  base:2800000,  bonus:420000,  stock:1200000,  src:'CONTRIBUTOR', conf:0.94, ver:true  },
    { cs:'flipkart',  role:'Software Development Engineer', level:'SDE_II', loc:'Bengaluru',   cur:'INR', exp:4,  base:2800000,  bonus:420000,  stock:900000,   src:'CONTRIBUTOR', conf:0.91, ver:true  },
    { cs:'flipkart',  role:'Software Development Engineer', level:'SDE_I',  loc:'Bengaluru',   cur:'INR', exp:2,  base:1800000,  bonus:270000,  stock:500000,   src:'CONTRIBUTOR', conf:0.89, ver:true  },
    { cs:'flipkart',  role:'Staff Engineer',            level:'STAFF',     loc:'Bengaluru',     cur:'INR', exp:12, base:5000000,  bonus:1000000, stock:3500000,  src:'CONTRIBUTOR', conf:0.89, ver:true  },
    { cs:'flipkart',  role:'Data Scientist',            level:'SDE_II',    loc:'Bengaluru',     cur:'INR', exp:4,  base:2600000,  bonus:390000,  stock:800000,   src:'SCRAPED',     conf:0.70, ver:false },
    { cs:'razorpay',  role:'Software Development Engineer', level:'SDE_II', loc:'Bengaluru',   cur:'INR', exp:3,  base:2600000,  bonus:390000,  stock:1000000,  src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'razorpay',  role:'Software Development Engineer', level:'SDE_III',loc:'Bengaluru',   cur:'INR', exp:7,  base:4000000,  bonus:600000,  stock:2000000,  src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'razorpay',  role:'ML Engineer',               level:'SDE_II',    loc:'Bengaluru',     cur:'INR', exp:4,  base:3000000,  bonus:450000,  stock:1500000,  src:'CONTRIBUTOR', conf:0.86, ver:true  },
    { cs:'meesho',    role:'Software Development Engineer', level:'SDE_II', loc:'Bengaluru',   cur:'INR', exp:3,  base:2400000,  bonus:360000,  stock:800000,   src:'CONTRIBUTOR', conf:0.89, ver:true  },
    { cs:'meesho',    role:'Data Analyst',              level:'SDE_I',     loc:'Bengaluru',     cur:'INR', exp:2,  base:1400000,  bonus:210000,  stock:0,        src:'CONTRIBUTOR', conf:0.87, ver:true  },
    { cs:'meesho',    role:'Engineering Manager',       level:'STAFF',     loc:'Bengaluru',     cur:'INR', exp:10, base:4500000,  bonus:900000,  stock:2500000,  src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'zepto',     role:'Software Development Engineer', level:'SDE_II', loc:'Mumbai',      cur:'INR', exp:3,  base:2600000,  bonus:390000,  stock:1200000,  src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'zepto',     role:'Software Development Engineer', level:'SDE_I',  loc:'Mumbai',      cur:'INR', exp:1,  base:1600000,  bonus:240000,  stock:400000,   src:'CONTRIBUTOR', conf:0.86, ver:true  },
    { cs:'zepto',     role:'Backend Engineer',          level:'SDE_III',   loc:'Mumbai',        cur:'INR', exp:7,  base:4200000,  bonus:630000,  stock:2000000,  src:'CONTRIBUTOR', conf:0.86, ver:true  },
    { cs:'infosys',   role:'Software Engineer',         level:'L3',        loc:'Bengaluru',     cur:'INR', exp:2,  base:700000,   bonus:70000,   stock:0,        src:'CONTRIBUTOR', conf:0.92, ver:true  },
    { cs:'infosys',   role:'Software Engineer',         level:'L4',        loc:'Pune',          cur:'INR', exp:5,  base:1200000,  bonus:120000,  stock:0,        src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'infosys',   role:'Data Analyst',              level:'L3',        loc:'Hyderabad',     cur:'INR', exp:3,  base:800000,   bonus:0,       stock:0,        src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'infosys',   role:'Tech Lead',                 level:'L5',        loc:'Chennai',       cur:'INR', exp:10, base:2000000,  bonus:200000,  stock:0,        src:'SCRAPED',     conf:0.71, ver:false },
    { cs:'tcs',       role:'Software Engineer',         level:'L3',        loc:'Mumbai',        cur:'INR', exp:2,  base:650000,   bonus:65000,   stock:0,        src:'CONTRIBUTOR', conf:0.91, ver:true  },
    { cs:'tcs',       role:'Software Engineer',         level:'L4',        loc:'Mumbai',        cur:'INR', exp:5,  base:1100000,  bonus:110000,  stock:0,        src:'CONTRIBUTOR', conf:0.89, ver:true  },
    { cs:'tcs',       role:'IT Analyst',                level:'L4',        loc:'Chennai',       cur:'INR', exp:4,  base:950000,   bonus:95000,   stock:0,        src:'CONTRIBUTOR', conf:0.87, ver:true  },
    { cs:'tcs',       role:'Data Engineer',             level:'L5',        loc:'Bengaluru',     cur:'INR', exp:8,  base:1800000,  bonus:180000,  stock:0,        src:'SCRAPED',     conf:0.69, ver:false },
    { cs:'wipro',     role:'Software Engineer',         level:'L3',        loc:'Bengaluru',     cur:'INR', exp:2,  base:680000,   bonus:68000,   stock:0,        src:'CONTRIBUTOR', conf:0.90, ver:true  },
    { cs:'wipro',     role:'Software Engineer',         level:'L4',        loc:'Hyderabad',     cur:'INR', exp:5,  base:1150000,  bonus:115000,  stock:0,        src:'CONTRIBUTOR', conf:0.88, ver:true  },
    { cs:'wipro',     role:'Project Manager',           level:'L5',        loc:'Mumbai',        cur:'INR', exp:9,  base:2200000,  bonus:220000,  stock:0,        src:'CONTRIBUTOR', conf:0.85, ver:true  },
  ]

  console.log('\n📊 Seeding salaries…')
  let created = 0
  for (const s of salaries) {
    const cid = cmap[s.cs]
    if (!cid) { console.warn(`⚠️  No company for slug: ${s.cs}`); continue }
    const tc = s.base + s.bonus + s.stock
    await prisma.salary.create({
      data: {
        company_id:        cid,
        role:              s.role,
        level:             s.level,
        location:          s.loc,
        currency:          s.cur,
        experience_years:  s.exp,
        base_salary:       BigInt(s.base),
        bonus:             BigInt(s.bonus),
        stock:             BigInt(s.stock),
        total_compensation: BigInt(tc),
        source:            s.src,
        confidence_score:  s.conf,
        is_verified:       s.ver,
      },
    })
    created++
  }

  console.log(`\n✅ Seeded ${created} salary records across ${companySeed.length} companies`)
  console.log('🎉 Seed complete!\n')
  await prisma.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
