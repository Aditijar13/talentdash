// Company brand colors and logo data for UI rendering
export const COMPANY_BRANDS: Record<string, {
  bg: string
  text: string
  abbr: string
  tagline: string
  description: string
  website: string
  valuation?: string
  locations?: string[]
}> = {
  google: {
    bg: 'bg-white', text: 'text-[#1B5E20]', abbr: 'G', tagline: 'Search & Cloud',
    description: 'Google LLC is an American multinational technology company focusing on artificial intelligence, online advertising, search engine technology, cloud computing, software, quantum computing, e-commerce, and consumer electronics.',
    website: 'google.com', valuation: '$2T', locations: ['Bengaluru', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  amazon: {
    bg: 'bg-white', text: 'text-[#E65100]', abbr: 'A', tagline: 'E-Commerce & AWS',
    description: 'Amazon is the world\'s largest e-commerce and cloud computing company. Through AWS, it powers a significant portion of the internet. Amazon is known for its competitive RSU-heavy compensation packages and bar-raiser interview process.',
    website: 'amazon.com', valuation: '$2.1T', locations: ['Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata'],
  },
  microsoft: {
    bg: 'bg-white', text: 'text-[#0D47A1]', abbr: 'M', tagline: 'Cloud & Productivity',
    description: 'Microsoft Corporation is an American multinational technology company known for Windows, Azure cloud computing, and the Office suite. It is one of the highest-paying employers in India with strong RSU grants and consistent performance bonuses.',
    website: 'microsoft.com', valuation: '$3T', locations: ['Bengaluru', 'Hyderabad', 'Noida', 'Pune'],
  },
  meta: {
    bg: 'bg-white', text: 'text-[#283593]', abbr: 'M', tagline: 'Social & AI',
    description: 'Meta Platforms (formerly Facebook) builds technologies that help people connect. It owns Facebook, Instagram, WhatsApp, and is investing heavily in the metaverse and AI research. Meta offers some of the most competitive total compensation packages globally.',
    website: 'meta.com', valuation: '$1.3T', locations: ['Bengaluru', 'Mumbai'],
  },
  nvidia: {
    bg: 'bg-white', text: 'text-[#33691E]', abbr: 'N', tagline: 'GPU & AI Chips',
    description: 'NVIDIA Corporation is an American multinational technology company that designs and manufactures graphics processing units (GPUs) and system-on-chip units. NVIDIA is the frontrunner in AI compute infrastructure, making it one of the most sought-after employers in tech.',
    website: 'nvidia.com', valuation: '$3.2T', locations: ['Bengaluru', 'Pune', 'Hyderabad'],
  },
  flipkart: {
    bg: 'bg-white', text: 'text-[#311B92]', abbr: 'F', tagline: 'Indian E-Commerce',
    description: 'Flipkart is India\'s largest e-commerce platform, founded by former Amazon employees Sachin and Binny Bansal. Acquired by Walmart in 2018 for $16 billion, Flipkart continues to be a top employer for technology talent in India.',
    website: 'flipkart.com', valuation: '$35B', locations: ['Bengaluru', 'Hyderabad', 'Mumbai', 'Delhi'],
  },
  razorpay: {
    bg: 'bg-white', text: 'text-[#1A237E]', abbr: 'R', tagline: 'Payments & Fintech',
    description: 'Razorpay is India\'s leading full-stack payments and fintech company, enabling businesses to accept, process, and disburse payments. It is backed by Y Combinator, Sequoia, and GIC, and is one of India\'s most valuable fintech startups.',
    website: 'razorpay.com', valuation: '$7.5B', locations: ['Bengaluru', 'Mumbai'],
  },
  meesho: {
    bg: 'bg-white', text: 'text-[#880E4F]', abbr: 'M', tagline: 'Social Commerce',
    description: 'Meesho is India\'s fastest-growing social commerce platform, enabling small businesses and individuals to sell products online. Backed by SoftBank, Prosus, and Facebook, Meesho is disrupting e-commerce for Bharat with a strong engineering culture.',
    website: 'meesho.com', valuation: '$4.9B', locations: ['Bengaluru'],
  },
  zepto: {
    bg: 'bg-white', text: 'text-[#4A148C]', abbr: 'Z', tagline: 'Quick Commerce',
    description: 'Zepto is India\'s fastest 10-minute grocery delivery startup, founded by 19-year-old Stanford dropouts. It has rapidly expanded across major Indian cities and is known for its strong engineering talent and aggressive growth culture.',
    website: 'zeptonow.com', valuation: '$3.6B', locations: ['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Pune'],
  },
  infosys: {
    bg: 'bg-white', text: 'text-[#006064]', abbr: 'I', tagline: 'IT Services',
    description: 'Infosys is a global IT services and consulting powerhouse, co-founded by N. R. Narayana Murthy. It pioneered the Global Delivery Model and is known for structured career paths and stable work-life balance.',
    website: 'infosys.com', valuation: '$75B', locations: ['Bengaluru', 'Hyderabad', 'Pune', 'Chennai', 'Mumbai'],
  },
  tcs: {
    bg: 'bg-white', text: 'text-[#1B5E20]', abbr: 'T', tagline: 'IT Consulting',
    description: 'Tata Consultancy Services (TCS) is India\'s largest IT services company and one of the most valuable brands globally. Part of the Tata Group, TCS operates in 50+ countries and is known for its structured learning programs and global exposure.',
    website: 'tcs.com', valuation: '$170B', locations: ['Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune', 'Delhi'],
  },
  wipro: {
    bg: 'bg-white', text: 'text-[#FF6F00]', abbr: 'W', tagline: 'Technology Services',
    description: 'Wipro is a leading global IT, consulting, and business process services company headquartered in Bengaluru. It serves clients across banking, healthcare, consumer, and energy sectors with a strong focus on digital transformation.',
    website: 'wipro.com', valuation: '$28B', locations: ['Bengaluru', 'Hyderabad', 'Mumbai', 'Pune', 'Delhi'],
  },
}

export function getCompanyBrand(slug: string) {
  return COMPANY_BRANDS[slug] ?? {
    bg: 'bg-[rgba(255,255,255,0.07)]',
    text: 'text-white',
    abbr: slug[0]?.toUpperCase() ?? '?',
    tagline: '',
    description: '',
    website: '',
  }
}
