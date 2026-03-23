import React, { useState } from 'react'
import { COMPANIES, getCompanyByTicker } from '../utils/constants'

export default function CompanySelector({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const selected = getCompanyByTicker(value)

  const sectorIcons = {
    'Thermal Power': '🔥',
    'Integrated Power': '⚡',
    'Renewable Energy': '🌿',
    'Hydropower': '💧',
  }

  return (
    <div className="relative">
      <span className="label-text">Company</span>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-carbon-900/80 border border-white/10 hover:border-jade-500/30 transition-all duration-200 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: selected.color, boxShadow: `0 0 6px ${selected.color}80` }}
          />
          <div>
            <p className="text-white font-body text-sm font-medium leading-none">{selected.name}</p>
            <p className="text-white/30 font-mono text-xs mt-1">{selected.ticker}</p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 rounded-xl bg-carbon-800 border border-white/10 shadow-2xl overflow-hidden">
          {COMPANIES.map((company) => (
            <button
              key={company.ticker}
              onClick={() => { onChange(company.ticker); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-150 text-left hover:bg-white/5 ${
                value === company.ticker ? 'bg-jade-500/10' : ''
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: company.color, boxShadow: `0 0 6px ${company.color}80` }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-body text-sm font-medium truncate">{company.name}</p>
                <p className="text-white/30 font-mono text-xs">{sectorIcons[company.sector]} {company.sector}</p>
              </div>
              <span className="text-white/20 font-mono text-xs flex-shrink-0">{company.ticker.split('.')[0]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
