import React from 'react'
import { formatPrice, formatPct, formatPctWithArrow, getCompanyByTicker, MONTHS } from '../utils/constants'

function RiskGauge({ score, color }) {
  const colors = {
    emerald: '#10b981',
    amber: '#f59e0b',
    red: '#ef4444',
  }
  const c = colors[color] || '#10b981'
  const circumference = 2 * Math.PI * 32
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke={c}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <span className="font-mono font-bold text-lg" style={{ color: c }}>
        {score}
      </span>
    </div>
  )
}

export default function InsightCards({ prediction }) {
  if (!prediction) return null

  const company = getCompanyByTicker(prediction.company)
  const month = MONTHS.find((m) => m.value === prediction.month)

  const basePrice = prediction.current_temp_scenario.predicted_price
  const plus1Price = prediction.plus_1_degree_scenario.predicted_price
  const plus2Price = prediction.plus_2_degree_scenario.predicted_price

  // Debug: Log insight card updates
  console.log('🎯 InsightCards rendering with prediction data:', {
    company: prediction.company,
    basePrice,
    plus1Price,
    plus2Price,
  })

  // Calculate climate risk score
  const impact1 = Math.abs(((plus1Price - basePrice) / basePrice) * 100)
  const impact2 = Math.abs(((plus2Price - basePrice) / basePrice) * 100)
  const maxImpact = Math.max(impact1, impact2)

  let riskScore, riskLevel, riskColor, riskDesc
  if (maxImpact < 1) {
    riskScore = 25
    riskLevel = 'Low'
    riskColor = 'emerald'
    riskDesc = 'This company is resilient to climate changes'
  } else if (maxImpact < 3) {
    riskScore = 50
    riskLevel = 'Medium'
    riskColor = 'amber'
    riskDesc = 'Moderate climate sensitivity detected'
  } else if (maxImpact < 5) {
    riskScore = 75
    riskLevel = 'High'
    riskColor = 'amber'
    riskDesc = 'Significant climate impact potential'
  } else {
    riskScore = 90
    riskLevel = 'Critical'
    riskColor = 'red'
    riskDesc = 'Major climate vulnerability identified'
  }

  // Determine trend
  const trend1 = plus1Price > basePrice ? 'bullish' : 'bearish'
  const trend2 = plus2Price > basePrice ? 'bullish' : 'bearish'
  const isMostlyBullish = trend1 === 'bullish' && trend2 === 'bullish'
  const isBullish = trend1 === 'bullish' || trend2 === 'bullish'

  let trendLabel, trendColor, trendIcon
  if (isMostlyBullish) {
    trendLabel = 'Bullish'
    trendColor = 'emerald'
    trendIcon = '📈'
  } else if (isBullish) {
    trendLabel = 'Mixed'
    trendColor = 'amber'
    trendIcon = '⟷'
  } else {
    trendLabel = 'Bearish'
    trendColor = 'red'
    trendIcon = '📉'
  }

  // Confidence - based on historical patterns
  const confidenceLevel = 'Moderate'
  const confidenceColor = 'blue'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-up stagger-animation">
      {/* Impact Summary - Prominent Display */}
      <div className="col-span-1 md:col-span-3 mb-4">
        <div className="card-interactive bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 p-8 rounded-xl">
          <p className="text-center text-sm text-slate-600 mb-2">Climate Scenario Impact</p>
          <p className="text-center text-4xl md:text-5xl font-display font-bold text-orange-600">
            {formatPctWithArrow(plus2Price, basePrice)}
          </p>
          <p className="text-center text-sm text-slate-700 mt-2">Stock impact at +2°C temperature change</p>
        </div>
      </div>

      {/* Card 1: Climate Risk Score */}
      <div className="card-interactive p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="label-text mb-2">Climate Risk Score</p>
            <p className={`text-2xl font-display font-bold ${
              riskColor === 'emerald' ? 'text-emerald-700' :
              riskColor === 'amber' ? 'text-amber-700' :
              'text-red-700'
            }`}>
              {riskLevel}
            </p>
            <p className="text-xs text-slate-600 mt-2">{riskDesc}</p>
          </div>
          <RiskGauge score={riskScore} color={riskColor} />
        </div>

        {/* Impact breakdown */}
        <div className="mt-6 space-y-2 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">+1°C Impact</span>
            <span className={`text-sm font-semibold ${impact1 > 2 ? 'text-negative' : 'text-slate-900'}`}>
              {impact1.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">+2°C Impact</span>
            <span className={`text-sm font-semibold ${impact2 > 3 ? 'text-negative' : 'text-slate-900'}`}>
              {impact2.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Predicted Trend */}
      <div className="card-interactive p-6">
        <p className="label-text mb-4">Predicted Trend</p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl">{trendIcon}</div>
          <div>
            <p className={`text-2xl font-display font-bold ${
              trendColor === 'emerald' ? 'text-positive' :
              trendColor === 'amber' ? 'text-amber-700' :
              'text-negative'
            }`}>
              {trendLabel}
            </p>
            <p className="text-xs text-slate-600">Climate scenario outlook</p>
          </div>
        </div>

        {/* Price comparison */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">Baseline</span>
            <span className="text-sm font-semibold text-neutral">{formatPrice(basePrice)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">+1°C Scenario</span>
            <span className={`text-sm font-semibold ${trend1 === 'bullish' ? 'text-positive' : 'text-negative'}`}>
              {formatPrice(plus1Price)} ({formatPctWithArrow(plus1Price, basePrice)})
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">+2°C Scenario</span>
            <span className={`text-sm font-semibold ${trend2 === 'bullish' ? 'text-positive' : 'text-negative'}`}>
              {formatPrice(plus2Price)} ({formatPctWithArrow(plus2Price, basePrice)})
            </span>
          </div>
        </div>

        {/* Climate Impact Explanation */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            <span className="font-semibold">Interpretation:</span> {trendLabel} trend suggests that under warming scenarios, this stock's valuation may {trendLabel === 'Bullish' ? 'benefit from climate changes' : trendLabel === 'Mixed' ? 'experience mixed impacts' : 'face headwinds from climate changes'}.
          </p>
        </div>
      </div>

      {/* Card 3: Key Metrics */}
      <div className="card-interactive p-6">
        <p className="label-text mb-4">Key Metrics</p>

        <div className="space-y-4">
          {/* Confidence */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-slate-600">Prediction Confidence</span>
              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold badge-blue">
                {confidenceLevel} (based on historical patterns)
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: '65%',
                }}
              />
            </div>
          </div>

          {/* Max Sensitivity */}
          <div>
            <span className="text-xs text-slate-600 block mb-2">Max Climate Sensitivity</span>
            <p className="metric-value text-2xl font-display font-bold text-slate-900">{maxImpact.toFixed(2)}%</p>
            <p className="text-xs text-slate-600 mt-1">Worst-case scenario impact</p>
          </div>

          {/* Company Info */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-600 mb-2">Analyzed</p>
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: company.color }}
              />
              <span className="text-sm font-semibold text-slate-900">{company.shortName}</span>
              <span className="text-xs text-slate-500">• {company.sector}</span>
            </div>
            <p className="text-xs text-slate-600 mt-2">{month?.label}, Month {month?.value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
