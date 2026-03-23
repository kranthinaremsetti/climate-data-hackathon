import React from 'react'
import { formatPrice, formatPct, getCompanyByTicker, MONTHS } from '../utils/constants'

function StatCard({ label, value, sub, accentColor, icon }) {
  return (
    <div className="glass-card-hover p-4">
      <div className="flex items-start justify-between mb-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30">{label}</p>
        <span className="text-base opacity-70">{icon}</span>
      </div>
      <p className="font-display font-bold text-xl text-white leading-none" style={{ color: accentColor || 'white' }}>
        {value}
      </p>
      {sub && (
        <p className="text-xs font-body text-white/30 mt-1.5 leading-snug">{sub}</p>
      )}
    </div>
  )
}

export default function PredictionSummary({ prediction }) {
  if (!prediction) return null

  const company = getCompanyByTicker(prediction.company)
  const base = prediction.current_temp_scenario.predicted_price
  const plus1 = prediction.plus_1_degree_scenario.predicted_price
  const plus2 = prediction.plus_2_degree_scenario.predicted_price
  const month = MONTHS.find((m) => m.value === prediction.month)

  const delta2 = ((plus2 - base) / base) * 100
  const maxImpact = Math.max(Math.abs(((plus1 - base) / base) * 100), Math.abs(delta2))

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 fade-in-up">
      <StatCard
        label="Baseline Price"
        value={formatPrice(base)}
        sub={`${company.shortName} · ${month?.label}`}
        accentColor={company.color}
        icon="📈"
      />
      <StatCard
        label="+1°C Impact"
        value={formatPct(plus1, base)}
        sub={formatPrice(plus1)}
        accentColor={((plus1 - base) / base) >= 0 ? '#10b981' : '#ef4444'}
        icon="🌡️"
      />
      <StatCard
        label="+2°C Impact"
        value={formatPct(plus2, base)}
        sub={formatPrice(plus2)}
        accentColor={((plus2 - base) / base) >= 0 ? '#10b981' : '#ef4444'}
        icon="🔥"
      />
      <StatCard
        label="Max Sensitivity"
        value={`${maxImpact.toFixed(2)}%`}
        sub="Worst-case climate delta"
        accentColor={maxImpact < 1 ? '#10b981' : maxImpact < 3 ? '#fbbf24' : '#ef4444'}
        icon="⚡"
      />
    </div>
  )
}
