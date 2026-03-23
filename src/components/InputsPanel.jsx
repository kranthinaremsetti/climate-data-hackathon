import React from 'react'
import { COMPANIES, MONTHS } from '../utils/constants'

export default function InputsPanel({
  company,
  setCompany,
  month,
  setMonth,
  tempChange,
  setTempChange,
  loading,
}) {
  const selectedCompany = COMPANIES.find((c) => c.ticker === company)
  const selectedMonth = MONTHS.find((m) => m.value === month)

  return (
    <div className="card p-6 shadow-sm">
      <h2 className="heading-md mb-6">Climate Scenario Simulation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Company Selector */}
        <div>
          <label className="label-text block mb-2">Company</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input-field"
            disabled={loading}
          >
            {COMPANIES.map((c) => (
              <option key={c.ticker} value={c.ticker}>
                {c.shortName} · {c.sector}
              </option>
            ))}
          </select>
          {selectedCompany && (
            <p className="text-xs text-slate-500 mt-2">{selectedCompany.name}</p>
          )}
        </div>

        {/* Scenario Context (Optional) */}
        <div>
          <label className="label-text block mb-2">Scenario Context<span className="text-slate-400 font-normal text-xs ml-1">(Optional)</span></label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="input-field"
            disabled={loading}
          >
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          {selectedMonth && (
            <p className="text-xs text-slate-500 mt-2">For reference: {selectedMonth.label}</p>
          )}
        </div>

        {/* Temperature Anomaly Slider */}
        <div>
          <label className="label-text block mb-2">
            Temperature Change: <span className="text-blue-600 font-semibold">{tempChange.toFixed(1)}°C</span>
          </label>
          <input
            type="range"
            min="-2"
            max="3"
            step="0.1"
            value={tempChange}
            onChange={(e) => setTempChange(Number(e.target.value))}
            disabled={loading}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200"
            style={{
              background: `linear-gradient(to right, #ef4444 0%, #fbbf24 50%, #10b981 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>-2°C</span>
            <span>+3°C</span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-300">
        <p className="text-xs text-blue-900">
          <span className="font-semibold">📊 How it works:</span> Adjusting company, month, or temperature will automatically trigger a new prediction. {loading && <span className="inline ml-2 animate-spin">⏳</span>}
          {loading && <span className="ml-2 inline text-blue-700 font-medium">Running climate simulation...</span>}
        </p>
      </div>
    </div>
  )
}
