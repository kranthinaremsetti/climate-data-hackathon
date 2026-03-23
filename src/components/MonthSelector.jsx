import React from 'react'
import { MONTHS, getSeason } from '../utils/constants'

export default function MonthSelector({ value, onChange }) {
  const season = getSeason(value)
  const selectedMonth = MONTHS.find((m) => m.value === value)

  return (
    <div>
      <span className="label-text">Forecast Month</span>
      <div className="grid grid-cols-4 gap-1.5">
        {MONTHS.map((m) => {
          const active = m.value === value
          const mSeason = getSeason(m.value)
          return (
            <button
              key={m.value}
              onClick={() => onChange(m.value)}
              className={`py-2 rounded-lg text-xs font-mono font-medium transition-all duration-150 ${
                active
                  ? 'text-carbon-950 font-bold scale-105'
                  : 'text-white/30 hover:text-white/60 bg-carbon-900/60 hover:bg-carbon-900'
              }`}
              style={
                active
                  ? { background: `linear-gradient(135deg, #10b981, #0ea5e9)`, boxShadow: '0 0 12px rgba(16,185,129,0.4)' }
                  : {}
              }
            >
              {m.short}
            </button>
          )
        })}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-sm">{season.icon}</span>
        <span className="text-white/40 text-xs font-body">
          {selectedMonth?.label} — {season.label} season
        </span>
      </div>
    </div>
  )
}
