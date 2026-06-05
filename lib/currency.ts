export const CURRENCY_RATES: Record<string, number> = {
  INR_TO_USD: 0.012,
  INR_TO_GBP: 0.0094,
  INR_TO_EUR: 0.011,
  USD_TO_INR: 83.5,
  USD_TO_GBP: 0.78,
  USD_TO_EUR: 0.92,
}

export function convertCurrency(amount: number, from: string, to: string): number {
  if (from === to) return amount
  const key = `${from}_TO_${to}`
  const rate = CURRENCY_RATES[key]
  if (rate) return Math.round(amount * rate)
  // Cross conversion via INR
  const toInr = CURRENCY_RATES[`${from}_TO_INR`] ?? 1
  const fromInr = CURRENCY_RATES[`INR_TO_${to}`] ?? 1
  return Math.round(amount * toInr * fromInr)
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (currency === 'INR') {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return `₹${amount.toLocaleString('en-IN')}`
  }
  if (currency === 'USD') {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`
    if (amount >= 1000) return `$${Math.round(amount / 1000)}K`
    return `$${amount.toLocaleString()}`
  }
  if (currency === 'GBP') {
    if (amount >= 1000) return `£${Math.round(amount / 1000)}K`
    return `£${amount.toLocaleString()}`
  }
  if (currency === 'EUR') {
    if (amount >= 1000) return `€${Math.round(amount / 1000)}K`
    return `€${amount.toLocaleString()}`
  }
  return String(amount)
}

export function formatDelta(delta: number, currency: string = 'INR'): string {
  const abs = Math.abs(delta)
  const sign = delta >= 0 ? '+' : '-'
  return `${sign}${formatCurrency(abs, currency)}`
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  INR: '₹',
  USD: '$',
  GBP: '£',
  EUR: '€',
}
