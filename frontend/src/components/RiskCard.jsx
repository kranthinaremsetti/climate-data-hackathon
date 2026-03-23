import React from 'react'
import { deriveRiskLevel, formatPrice, formatPct, getCompanyByTicker } from '../utils/constants'

function RiskGauge({ score, color }) {
  const colors = { jade: '#10b981', amber: '#fbbf24', crimson: '#ef4444' }
  const c = colors[color] || '#10b981'
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="44" cy="44" r="36"
          fill="none"
          stroke={c}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 4px ${c})` }}
        />
      </svg>
      <span className="font-mono font-bold text-xl" style={{ color: c }}>{score}</span>
    </div>
  )
}

export default function RiskCard({ prediction }) {
  if (!prediction) return null

  const current = prediction.current_temp_scenario.predicted_price
  const plus1 = prediction.plus_1_degree_scenario.predicted_price
  const plus2 = prediction.plus_2_degree_scenario.predicted_price
  const risk = deriveRiskLevel(current, plus1, plus2)
  const company = getCompanyByTicker(prediction.company)

  const colorMap = {
    jade: { text: 'text-jade-400', bg: 'bg-jade-500/10', border: 'border-jade-500/20', badge: '#10b981' },
    amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', badge: '#fbbf24' },
    crimson: { text: 'text-crimson-400', bg: 'bg-red-500/10', border: 'border-red-500/20', badge: '#ef4444' },
  }
  const cm = colorMap[risk.color]

  const delta1 = ((plus1 - current) / current) * 100
  const delta2 = ((plus2 - current) / current) * 100

  return (
    <div className={`glass-card p-5 ${cm.bg} border ${cm.border}`}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="label-text mb-1">Climate Risk Assessment</p>
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-display font-bold ${cm.text}`}
            >
              {risk.level} Risk
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
              style={{ color: cm.badge, borderColor: `${cm.badge}40`, background: `${cm.badge}15` }}
            >
              SCORE {risk.score}/100
            </span>
          </div>
          <p className="text-white/40 text-xs font-body mt-1.5 max-w-xs">{risk.description}</p>
        </div>
        <RiskGauge score={risk.score} color={risk.color} />
      </div>

      {/* Delta table */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: 'Baseline (0°C)', price: current, delta: null, color: '#10b981' },
          { label: '+1°C Scenario', price: plus1, delta: delta1, color: '#fbbf24' },
          { label: '+2°C Scenario', price: plus2, delta: delta2, color: '#ef4444' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl p-3 bg-carbon-900/60 border border-white/5"
          >
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-wide mb-1.5">
              {item.label}
            </p>
            <p className="font-mono font-bold text-base text-white">{formatPrice(item.price)}</p>
            {item.delta !== null && (
              <p
                className="text-xs font-mono mt-0.5"
                style={{ color: item.delta >= 0 ? '#10b981' : '#ef4444' }}
              >
                {item.delta >= 0 ? '▲' : '▼'} {Math.abs(item.delta).toFixed(2)}%
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: company.color }}
        />
        <p className="text-xs text-white/30 font-body">
          <span className="text-white/60 font-medium">{company.name}</span>
          {' · '}{company.sector}{' · '}NSE Listed
        </p>
      </div>
    </div>
  )
}
