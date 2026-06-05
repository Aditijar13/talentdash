import type { SalaryRecord, CompanyRecord } from '@/types'

export const MOCK_COMPANIES: CompanyRecord[] = [
  { id: 'c1', name: 'Google', slug: 'google', normalized_name: 'google', industry: 'Technology', headquarters: 'Mountain View, USA', founded_year: 1998, headcount_range: '100,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c2', name: 'Amazon', slug: 'amazon', normalized_name: 'amazon', industry: 'E-Commerce / Cloud', headquarters: 'Seattle, USA', founded_year: 1994, headcount_range: '500,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c3', name: 'Microsoft', slug: 'microsoft', normalized_name: 'microsoft', industry: 'Technology', headquarters: 'Redmond, USA', founded_year: 1975, headcount_range: '200,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c4', name: 'Meta', slug: 'meta', normalized_name: 'meta', industry: 'Social Media', headquarters: 'Menlo Park, USA', founded_year: 2004, headcount_range: '50,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c5', name: 'Flipkart', slug: 'flipkart', normalized_name: 'flipkart', industry: 'E-Commerce', headquarters: 'Bengaluru, India', founded_year: 2007, headcount_range: '30,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c6', name: 'Razorpay', slug: 'razorpay', normalized_name: 'razorpay', industry: 'Fintech', headquarters: 'Bengaluru, India', founded_year: 2014, headcount_range: '3,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c7', name: 'Meesho', slug: 'meesho', normalized_name: 'meesho', industry: 'E-Commerce', headquarters: 'Bengaluru, India', founded_year: 2015, headcount_range: '5,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c8', name: 'Zepto', slug: 'zepto', normalized_name: 'zepto', industry: 'Quick Commerce', headquarters: 'Mumbai, India', founded_year: 2021, headcount_range: '2,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c9', name: 'Infosys', slug: 'infosys', normalized_name: 'infosys', industry: 'IT Services', headquarters: 'Bengaluru, India', founded_year: 1981, headcount_range: '300,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c10', name: 'NVIDIA', slug: 'nvidia', normalized_name: 'nvidia', industry: 'Semiconductors', headquarters: 'Santa Clara, USA', founded_year: 1993, headcount_range: '25,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c11', name: 'TCS', slug: 'tcs', normalized_name: 'tcs', industry: 'IT Services', headquarters: 'Mumbai, India', founded_year: 1968, headcount_range: '600,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
  { id: 'c12', name: 'Wipro', slug: 'wipro', normalized_name: 'wipro', industry: 'IT Services', headquarters: 'Bengaluru, India', founded_year: 1945, headcount_range: '200,000+', created_at: '2024-01-01', updated_at: '2024-01-01' },
]

export const MOCK_SALARIES: SalaryRecord[] = [
  // Google
  { id: 's1', company: 'Google', company_slug: 'google', role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 3200000, bonus: 640000, stock: 1200000, total_compensation: 5040000, source: 'CONTRIBUTOR', confidence_score: 0.95, is_verified: true, submitted_at: '2025-03-15' },
  { id: 's2', company: 'Google', company_slug: 'google', role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 5000000, bonus: 1000000, stock: 2500000, total_compensation: 8500000, source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true, submitted_at: '2025-04-10' },
  { id: 's3', company: 'Google', company_slug: 'google', role: 'Product Manager', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 5500000, bonus: 1100000, stock: 2800000, total_compensation: 9400000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-02-20' },
  { id: 's4', company: 'Google', company_slug: 'google', role: 'Software Engineer', level: 'L6', location: 'Bengaluru', currency: 'INR', experience_years: 11, base_salary: 7500000, bonus: 1500000, stock: 5000000, total_compensation: 14000000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-01-05' },
  { id: 's5', company: 'Google', company_slug: 'google', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 1800000, bonus: 300000, stock: 600000, total_compensation: 2700000, source: 'CONTRIBUTOR', confidence_score: 0.93, is_verified: true, submitted_at: '2025-05-01' },
  { id: 's6', company: 'Google', company_slug: 'google', role: 'Data Scientist', level: 'L5', location: 'Hyderabad', currency: 'INR', experience_years: 8, base_salary: 4800000, bonus: 960000, stock: 2400000, total_compensation: 8160000, source: 'SCRAPED', confidence_score: 0.75, is_verified: false, submitted_at: '2025-03-22' },
  { id: 's7', company: 'Google', company_slug: 'google', role: 'Software Engineer', level: 'STAFF', location: 'San Francisco', currency: 'USD', experience_years: 14, base_salary: 28000000, bonus: 5600000, stock: 14000000, total_compensation: 47600000, source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true, submitted_at: '2025-04-18' },

  // Amazon
  { id: 's8', company: 'Amazon', company_slug: 'amazon', role: 'Software Development Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 3600000, bonus: 540000, stock: 1800000, total_compensation: 5940000, source: 'CONTRIBUTOR', confidence_score: 0.94, is_verified: true, submitted_at: '2025-04-05' },
  { id: 's9', company: 'Amazon', company_slug: 'amazon', role: 'Software Development Engineer', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experience_years: 2, base_salary: 2200000, bonus: 330000, stock: 800000, total_compensation: 3330000, source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true, submitted_at: '2025-03-10' },
  { id: 's10', company: 'Amazon', company_slug: 'amazon', role: 'Software Development Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experience_years: 8, base_salary: 5200000, bonus: 780000, stock: 3000000, total_compensation: 8980000, source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true, submitted_at: '2025-02-14' },
  { id: 's11', company: 'Amazon', company_slug: 'amazon', role: 'Product Manager', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 4800000, bonus: 960000, stock: 2400000, total_compensation: 8160000, source: 'CONTRIBUTOR', confidence_score: 0.87, is_verified: true, submitted_at: '2025-01-20' },
  { id: 's12', company: 'Amazon', company_slug: 'amazon', role: 'Software Development Engineer', level: 'SDE_II', location: 'Hyderabad', currency: 'INR', experience_years: 5, base_salary: 3400000, bonus: 510000, stock: 1600000, total_compensation: 5510000, source: 'SCRAPED', confidence_score: 0.72, is_verified: false, submitted_at: '2025-04-28' },
  { id: 's13', company: 'Amazon', company_slug: 'amazon', role: 'Data Engineer', level: 'SDE_II', location: 'Mumbai', currency: 'INR', experience_years: 4, base_salary: 3000000, bonus: 0, stock: 1200000, total_compensation: 4200000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-05-05' },

  // Microsoft
  { id: 's14', company: 'Microsoft', company_slug: 'microsoft', role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 3, base_salary: 2800000, bonus: 560000, stock: 1200000, total_compensation: 4560000, source: 'CONTRIBUTOR', confidence_score: 0.93, is_verified: true, submitted_at: '2025-03-28' },
  { id: 's15', company: 'Microsoft', company_slug: 'microsoft', role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 4500000, bonus: 900000, stock: 2200000, total_compensation: 7600000, source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true, submitted_at: '2025-02-18' },
  { id: 's16', company: 'Microsoft', company_slug: 'microsoft', role: 'Product Manager', level: 'L4', location: 'Hyderabad', currency: 'INR', experience_years: 4, base_salary: 3200000, bonus: 640000, stock: 1400000, total_compensation: 5240000, source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true, submitted_at: '2025-04-12' },
  { id: 's17', company: 'Microsoft', company_slug: 'microsoft', role: 'Software Engineer', level: 'L6', location: 'Bengaluru', currency: 'INR', experience_years: 12, base_salary: 7000000, bonus: 1400000, stock: 4500000, total_compensation: 12900000, source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true, submitted_at: '2025-01-30' },
  { id: 's18', company: 'Microsoft', company_slug: 'microsoft', role: 'Data Scientist', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 4200000, bonus: 840000, stock: 2000000, total_compensation: 7040000, source: 'SCRAPED', confidence_score: 0.74, is_verified: false, submitted_at: '2025-05-10' },

  // Meta
  { id: 's19', company: 'Meta', company_slug: 'meta', role: 'Software Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 3800000, bonus: 760000, stock: 2200000, total_compensation: 6760000, source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true, submitted_at: '2025-03-18' },
  { id: 's20', company: 'Meta', company_slug: 'meta', role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 8, base_salary: 5800000, bonus: 1160000, stock: 3500000, total_compensation: 10460000, source: 'CONTRIBUTOR', confidence_score: 0.94, is_verified: true, submitted_at: '2025-02-22' },
  { id: 's21', company: 'Meta', company_slug: 'meta', role: 'Product Designer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 5, base_salary: 3200000, bonus: 640000, stock: 1600000, total_compensation: 5440000, source: 'CONTRIBUTOR', confidence_score: 0.85, is_verified: true, submitted_at: '2025-04-08' },
  { id: 's22', company: 'Meta', company_slug: 'meta', role: 'Software Engineer', level: 'PRINCIPAL', location: 'San Francisco', currency: 'USD', experience_years: 15, base_salary: 35000000, bonus: 7000000, stock: 20000000, total_compensation: 62000000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-01-15' },

  // NVIDIA
  { id: 's23', company: 'NVIDIA', company_slug: 'nvidia', role: 'Software Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 6000000, bonus: 1200000, stock: 4000000, total_compensation: 11200000, source: 'CONTRIBUTOR', confidence_score: 0.93, is_verified: true, submitted_at: '2025-04-02' },
  { id: 's24', company: 'NVIDIA', company_slug: 'nvidia', role: 'ML Engineer', level: 'L4', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 4200000, bonus: 840000, stock: 2800000, total_compensation: 7840000, source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true, submitted_at: '2025-03-05' },
  { id: 's25', company: 'NVIDIA', company_slug: 'nvidia', role: 'Software Engineer', level: 'L6', location: 'Pune', currency: 'INR', experience_years: 11, base_salary: 9000000, bonus: 0, stock: 8000000, total_compensation: 17000000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-02-08' },

  // Flipkart
  { id: 's26', company: 'Flipkart', company_slug: 'flipkart', role: 'Software Development Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2800000, bonus: 420000, stock: 900000, total_compensation: 4120000, source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true, submitted_at: '2025-03-25' },
  { id: 's27', company: 'Flipkart', company_slug: 'flipkart', role: 'Software Development Engineer', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experience_years: 2, base_salary: 1800000, bonus: 270000, stock: 500000, total_compensation: 2570000, source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true, submitted_at: '2025-04-14' },
  { id: 's28', company: 'Flipkart', company_slug: 'flipkart', role: 'Product Manager', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 5, base_salary: 3200000, bonus: 640000, stock: 1200000, total_compensation: 5040000, source: 'CONTRIBUTOR', confidence_score: 0.87, is_verified: true, submitted_at: '2025-02-28' },
  { id: 's29', company: 'Flipkart', company_slug: 'flipkart', role: 'Data Scientist', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2600000, bonus: 390000, stock: 800000, total_compensation: 3790000, source: 'SCRAPED', confidence_score: 0.70, is_verified: false, submitted_at: '2025-05-08' },

  // Razorpay
  { id: 's30', company: 'Razorpay', company_slug: 'razorpay', role: 'Software Development Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 3, base_salary: 2600000, bonus: 390000, stock: 1000000, total_compensation: 3990000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-04-20' },
  { id: 's31', company: 'Razorpay', company_slug: 'razorpay', role: 'Software Development Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 4000000, bonus: 600000, stock: 2000000, total_compensation: 6600000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-03-12' },
  { id: 's32', company: 'Razorpay', company_slug: 'razorpay', role: 'Product Manager', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 2800000, bonus: 560000, stock: 1200000, total_compensation: 4560000, source: 'CONTRIBUTOR', confidence_score: 0.85, is_verified: true, submitted_at: '2025-02-05' },

  // Meesho
  { id: 's33', company: 'Meesho', company_slug: 'meesho', role: 'Software Development Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 3, base_salary: 2400000, bonus: 360000, stock: 800000, total_compensation: 3560000, source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true, submitted_at: '2025-04-22' },
  { id: 's34', company: 'Meesho', company_slug: 'meesho', role: 'Data Analyst', level: 'SDE_I', location: 'Bengaluru', currency: 'INR', experience_years: 2, base_salary: 1400000, bonus: 210000, stock: 0, total_compensation: 1610000, source: 'CONTRIBUTOR', confidence_score: 0.87, is_verified: true, submitted_at: '2025-03-30' },
  { id: 's35', company: 'Meesho', company_slug: 'meesho', role: 'Software Development Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 3800000, bonus: 570000, stock: 1600000, total_compensation: 5970000, source: 'SCRAPED', confidence_score: 0.73, is_verified: false, submitted_at: '2025-05-12' },

  // Zepto
  { id: 's36', company: 'Zepto', company_slug: 'zepto', role: 'Software Development Engineer', level: 'SDE_II', location: 'Mumbai', currency: 'INR', experience_years: 3, base_salary: 2600000, bonus: 390000, stock: 1200000, total_compensation: 4190000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-04-16' },
  { id: 's37', company: 'Zepto', company_slug: 'zepto', role: 'Software Development Engineer', level: 'SDE_I', location: 'Mumbai', currency: 'INR', experience_years: 1, base_salary: 1600000, bonus: 240000, stock: 400000, total_compensation: 2240000, source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true, submitted_at: '2025-03-08' },
  { id: 's38', company: 'Zepto', company_slug: 'zepto', role: 'Product Manager', level: 'SDE_II', location: 'Mumbai', currency: 'INR', experience_years: 4, base_salary: 2800000, bonus: 560000, stock: 1000000, total_compensation: 4360000, source: 'CONTRIBUTOR', confidence_score: 0.84, is_verified: true, submitted_at: '2025-02-12' },

  // Infosys
  { id: 's39', company: 'Infosys', company_slug: 'infosys', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 2, base_salary: 700000, bonus: 70000, stock: 0, total_compensation: 770000, source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true, submitted_at: '2025-04-24' },
  { id: 's40', company: 'Infosys', company_slug: 'infosys', role: 'Software Engineer', level: 'L4', location: 'Pune', currency: 'INR', experience_years: 5, base_salary: 1200000, bonus: 120000, stock: 0, total_compensation: 1320000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-03-16' },
  { id: 's41', company: 'Infosys', company_slug: 'infosys', role: 'Data Analyst', level: 'L3', location: 'Hyderabad', currency: 'INR', experience_years: 3, base_salary: 800000, bonus: 0, stock: 0, total_compensation: 800000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-02-26' },
  { id: 's42', company: 'Infosys', company_slug: 'infosys', role: 'Tech Lead', level: 'L5', location: 'Chennai', currency: 'INR', experience_years: 10, base_salary: 2000000, bonus: 200000, stock: 0, total_compensation: 2200000, source: 'SCRAPED', confidence_score: 0.71, is_verified: false, submitted_at: '2025-05-14' },

  // TCS
  { id: 's43', company: 'TCS', company_slug: 'tcs', role: 'Software Engineer', level: 'L3', location: 'Mumbai', currency: 'INR', experience_years: 2, base_salary: 650000, bonus: 65000, stock: 0, total_compensation: 715000, source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true, submitted_at: '2025-04-26' },
  { id: 's44', company: 'TCS', company_slug: 'tcs', role: 'Software Engineer', level: 'L4', location: 'Mumbai', currency: 'INR', experience_years: 5, base_salary: 1100000, bonus: 110000, stock: 0, total_compensation: 1210000, source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true, submitted_at: '2025-03-20' },
  { id: 's45', company: 'TCS', company_slug: 'tcs', role: 'IT Analyst', level: 'L4', location: 'Chennai', currency: 'INR', experience_years: 4, base_salary: 950000, bonus: 95000, stock: 0, total_compensation: 1045000, source: 'CONTRIBUTOR', confidence_score: 0.87, is_verified: true, submitted_at: '2025-02-10' },
  { id: 's46', company: 'TCS', company_slug: 'tcs', role: 'Data Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 8, base_salary: 1800000, bonus: 180000, stock: 0, total_compensation: 1980000, source: 'SCRAPED', confidence_score: 0.69, is_verified: false, submitted_at: '2025-05-16' },

  // Wipro
  { id: 's47', company: 'Wipro', company_slug: 'wipro', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 2, base_salary: 680000, bonus: 68000, stock: 0, total_compensation: 748000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-04-18' },
  { id: 's48', company: 'Wipro', company_slug: 'wipro', role: 'Software Engineer', level: 'L4', location: 'Hyderabad', currency: 'INR', experience_years: 5, base_salary: 1150000, bonus: 115000, stock: 0, total_compensation: 1265000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-03-14' },
  { id: 's49', company: 'Wipro', company_slug: 'wipro', role: 'Project Manager', level: 'L5', location: 'Mumbai', currency: 'INR', experience_years: 9, base_salary: 2200000, bonus: 220000, stock: 0, total_compensation: 2420000, source: 'CONTRIBUTOR', confidence_score: 0.85, is_verified: true, submitted_at: '2025-01-28' },

  // More diverse records
  { id: 's50', company: 'Google', company_slug: 'google', role: 'ML Engineer', level: 'L5', location: 'Hyderabad', currency: 'INR', experience_years: 7, base_salary: 5200000, bonus: 1040000, stock: 2800000, total_compensation: 9040000, source: 'CONTRIBUTOR', confidence_score: 0.93, is_verified: true, submitted_at: '2025-05-02' },
  { id: 's51', company: 'Amazon', company_slug: 'amazon', role: 'ML Engineer', level: 'SDE_III', location: 'Bengaluru', currency: 'INR', experience_years: 8, base_salary: 5500000, bonus: 825000, stock: 3200000, total_compensation: 9525000, source: 'CONTRIBUTOR', confidence_score: 0.91, is_verified: true, submitted_at: '2025-04-30' },
  { id: 's52', company: 'Microsoft', company_slug: 'microsoft', role: 'Principal Engineer', level: 'PRINCIPAL', location: 'Bengaluru', currency: 'INR', experience_years: 16, base_salary: 9500000, bonus: 1900000, stock: 7000000, total_compensation: 18400000, source: 'CONTRIBUTOR', confidence_score: 0.87, is_verified: true, submitted_at: '2025-03-02' },
  { id: 's53', company: 'Flipkart', company_slug: 'flipkart', role: 'Staff Engineer', level: 'STAFF', location: 'Bengaluru', currency: 'INR', experience_years: 12, base_salary: 5000000, bonus: 1000000, stock: 3500000, total_compensation: 9500000, source: 'CONTRIBUTOR', confidence_score: 0.89, is_verified: true, submitted_at: '2025-02-16' },
  { id: 's54', company: 'Razorpay', company_slug: 'razorpay', role: 'ML Engineer', level: 'SDE_II', location: 'Bengaluru', currency: 'INR', experience_years: 4, base_salary: 3000000, bonus: 450000, stock: 1500000, total_compensation: 4950000, source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true, submitted_at: '2025-04-06' },
  { id: 's55', company: 'NVIDIA', company_slug: 'nvidia', role: 'Deep Learning Engineer', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 6, base_salary: 7000000, bonus: 1400000, stock: 5000000, total_compensation: 13400000, source: 'CONTRIBUTOR', confidence_score: 0.95, is_verified: true, submitted_at: '2025-03-28' },
  { id: 's56', company: 'Meta', company_slug: 'meta', role: 'Research Scientist', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 8, base_salary: 6500000, bonus: 1300000, stock: 4000000, total_compensation: 11800000, source: 'CONTRIBUTOR', confidence_score: 0.92, is_verified: true, submitted_at: '2025-02-24' },
  { id: 's57', company: 'Google', company_slug: 'google', role: 'Engineering Manager', level: 'L6', location: 'Bengaluru', currency: 'INR', experience_years: 13, base_salary: 8500000, bonus: 1700000, stock: 6000000, total_compensation: 16200000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-01-22' },
  { id: 's58', company: 'Amazon', company_slug: 'amazon', role: 'Applied Scientist', level: 'L5', location: 'Bengaluru', currency: 'INR', experience_years: 7, base_salary: 4600000, bonus: 920000, stock: 2800000, total_compensation: 8320000, source: 'CONTRIBUTOR', confidence_score: 0.90, is_verified: true, submitted_at: '2025-05-06' },
  { id: 's59', company: 'Zepto', company_slug: 'zepto', role: 'Backend Engineer', level: 'SDE_III', location: 'Mumbai', currency: 'INR', experience_years: 7, base_salary: 4200000, bonus: 630000, stock: 2000000, total_compensation: 6830000, source: 'CONTRIBUTOR', confidence_score: 0.86, is_verified: true, submitted_at: '2025-04-10' },
  { id: 's60', company: 'Meesho', company_slug: 'meesho', role: 'Engineering Manager', level: 'STAFF', location: 'Bengaluru', currency: 'INR', experience_years: 10, base_salary: 4500000, bonus: 900000, stock: 2500000, total_compensation: 7900000, source: 'CONTRIBUTOR', confidence_score: 0.88, is_verified: true, submitted_at: '2025-03-06' },
  { id: 's61', company: 'Microsoft', company_slug: 'microsoft', role: 'Software Engineer', level: 'L4', location: 'Pune', currency: 'INR', experience_years: 3, base_salary: 2600000, bonus: 520000, stock: 1000000, total_compensation: 4120000, source: 'SCRAPED', confidence_score: 0.73, is_verified: false, submitted_at: '2025-05-15' },
  { id: 's62', company: 'NVIDIA', company_slug: 'nvidia', role: 'Software Engineer', level: 'L3', location: 'Bengaluru', currency: 'INR', experience_years: 1, base_salary: 2800000, bonus: 420000, stock: 1200000, total_compensation: 4420000, source: 'CONTRIBUTOR', confidence_score: 0.94, is_verified: true, submitted_at: '2025-04-24' },
]

export function getCompanyBySlug(slug: string): CompanyRecord | undefined {
  return MOCK_COMPANIES.find(c => c.slug === slug)
}

export function getSalariesByCompany(slug: string): SalaryRecord[] {
  return MOCK_SALARIES.filter(s => s.company_slug === slug)
}

export function computeMedian(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

export function getLevelDistribution(salaries: SalaryRecord[]): Record<string, number> {
  return salaries.reduce((acc, s) => {
    acc[s.level] = (acc[s.level] || 0) + 1
    return acc
  }, {} as Record<string, number>)
}
