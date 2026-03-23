export const COMPANIES = [
  {
    ticker: 'NTPC.NS',
    name: 'NTPC Limited',
    shortName: 'NTPC',
    sector: 'Thermal Power',
    color: '#10b981',
  },
  {
    ticker: 'TATAPOWER.NS',
    name: 'Tata Power Co.',
    shortName: 'Tata Power',
    sector: 'Integrated Power',
    color: '#38bdf8',
  },
  {
    ticker: 'ADANIPOWER.NS',
    name: 'Adani Power Ltd.',
    shortName: 'Adani Power',
    sector: 'Thermal Power',
    color: '#fbbf24',
  },
  {
    ticker: 'JSWENERGY.NS',
    name: 'JSW Energy Ltd.',
    shortName: 'JSW Energy',
    sector: 'Renewable Energy',
    color: '#a78bfa',
  },
  {
    ticker: 'NHPC.NS',
    name: 'NHPC Limited',
    shortName: 'NHPC',
    sector: 'Hydropower',
    color: '#fb923c',
  },
]

export const MONTHS = [
  { value: 1, label: 'January', short: 'Jan' },
  { value: 2, label: 'February', short: 'Feb' },
  { value: 3, label: 'March', short: 'Mar' },
  { value: 4, label: 'April', short: 'Apr' },
  { value: 5, label: 'May', short: 'May' },
  { value: 6, label: 'June', short: 'Jun' },
  { value: 7, label: 'July', short: 'Jul' },
  { value: 8, label: 'August', short: 'Aug' },
  { value: 9, label: 'September', short: 'Sep' },
  { value: 10, label: 'October', short: 'Oct' },
  { value: 11, label: 'November', short: 'Nov' },
  { value: 12, label: 'December', short: 'Dec' },
]

export const SEASONS = {
  1: { label: 'Winter', icon: '❄️', months: [12, 1, 2] },
  2: { label: 'Spring', icon: '🌸', months: [3, 4, 5] },
  3: { label: 'Monsoon', icon: '🌧️', months: [6, 7, 8] },
  4: { label: 'Autumn', icon: '🍂', months: [9, 10, 11] },
}

export function getSeason(month) {
  if ([3, 4, 5].includes(month)) return SEASONS[2]
  if ([6, 7, 8].includes(month)) return SEASONS[3]
  if ([9, 10, 11].includes(month)) return SEASONS[4]
  return SEASONS[1]
}

export function getCompanyByTicker(ticker) {
  return COMPANIES.find((c) => c.ticker === ticker) || COMPANIES[0]
}

export function deriveRiskLevel(current, plus1, plus2) {
  const delta1 = ((plus1 - current) / current) * 100
  const delta2 = ((plus2 - current) / current) * 100
  const maxDelta = Math.abs(Math.min(delta1, delta2))

  if (maxDelta < 0.5) return { level: 'Low', color: 'jade', score: 20, description: 'Minimal sensitivity to warming scenarios' }
  if (maxDelta < 2) return { level: 'Medium', color: 'amber', score: 55, description: 'Moderate exposure to climate-driven price swings' }
  return { level: 'High', color: 'crimson', score: 85, description: 'Significant vulnerability to temperature anomalies' }
}

export function formatPrice(value) {
  if (value == null || isNaN(value)) return '—'
  return `₹${Number(value).toFixed(2)}`
}

export function formatPct(val, ref) {
  if (!ref) return ''
  const pct = ((val - ref) / ref) * 100
  const sign = pct >= 0 ? '+' : ''
  return `${sign}${pct.toFixed(2)}%`
}

export function formatPctWithArrow(val, ref) {
  if (!ref) return ''
  const pct = ((val - ref) / ref) * 100
  const sign = pct >= 0 ? '+' : ''
  const arrow = pct >= 0 ? '↑' : '↓'
  return `${arrow} ${sign}${pct.toFixed(2)}%`
}
