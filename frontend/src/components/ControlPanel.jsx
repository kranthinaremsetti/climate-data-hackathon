import React from 'react'
import CompanySelector from './CompanySelector'
import MonthSelector from './MonthSelector'
import TempSlider from './TempSlider'
import { getCompanyByTicker, MONTHS } from '../utils/constants'

export default function ControlPanel({
  company, setCompany,
  month, setMonth,
  tempChange, setTempChange,
  onPredict, loading,
}) {
  const selectedCompany = getCompanyByTicker(company)
  const selectedMonth = MONTHS.find((m) => m.value === month)

  return (
    <aside className="glass-card p-6 flex flex-col gap-6 noise-bg">
      {/* Panel title */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-jade-400 to-sky-500" />
        <h2 className="font-display font-bold text-white text-base tracking-tight">Forecast Setup</h2>
      </div>

      {/* Inputs */}
      <CompanySelector value={company} onChange={setCompany} />
      <MonthSelector value={month} onChange={setMonth} />
      <TempSlider value={tempChange} onChange={setTempChange} />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Summary preview */}
      <div className="rounded-xl bg-carbon-900/60 border border-white/5 p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/25 mb-3">Request Preview</p>
        <div className="space-y-1.5">
          {[
            { k: 'company', v: selectedCompany?.shortName },
            { k: 'month', v: selectedMonth?.label },
            { k: 'temp_change', v: tempChange >= 0 ? `+${tempChange.toFixed(1)}°C` : `${tempChange.toFixed(1)}°C` },
          ].map(({ k, v }) => (
            <div key={k} className="flex justify-between items-center">
              <span className="text-xs font-mono text-white/25">{k}</span>
              <span className="text-xs font-mono text-white/70">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[10px] font-mono text-white/20 break-all">
            GET /predict?company=<span className="text-jade-500/50">{company}</span>
            &month=<span className="text-jade-500/50">{month}</span>
            &temp_change=<span className="text-jade-500/50">{tempChange.toFixed(1)}</span>
          </p>
        </div>
      </div>

      {/* Predict button */}
      <button
        onClick={onPredict}
        disabled={loading}
        className="btn-primary w-full text-sm text-white tracking-wide"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Running Model…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            Run Forecast
          </span>
        )}
      </button>

      <p className="text-center text-[10px] font-mono text-white/15">
        Powered by FastAPI · XGBoost / RF / Linear
      </p>
    </aside>
  )
}
