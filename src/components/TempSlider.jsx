import React from 'react'

export default function TempSlider({ value, onChange }) {
  const pct = ((value + 2) / 4) * 100

  const getColor = (v) => {
    if (v <= -1) return '#38bdf8'
    if (v <= 0) return '#10b981'
    if (v <= 1) return '#fbbf24'
    return '#ef4444'
  }

  const color = getColor(value)

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="label-text mb-0">Temp. Anomaly (°C)</span>
        <span
          className="font-mono text-sm font-bold px-2 py-0.5 rounded-md border"
          style={{ color, borderColor: `${color}40`, background: `${color}10` }}
        >
          {value >= 0 ? `+${value.toFixed(1)}` : value.toFixed(1)}°C
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full"
          style={{
            '--thumb-color': color,
          }}
        />
        <div className="flex justify-between mt-1 px-0.5">
          {[-2, -1, 0, 1, 2].map((v) => (
            <span key={v} className="text-[10px] font-mono text-white/20">
              {v >= 0 ? `+${v}` : v}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {[
          { label: 'Baseline', val: 0, color: '#10b981' },
          { label: '+1°C', val: 1, color: '#fbbf24' },
          { label: '+2°C', val: 2, color: '#ef4444' },
        ].map((preset) => (
          <button
            key={preset.val}
            onClick={() => onChange(preset.val)}
            className="flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all duration-150 hover:scale-105"
            style={{
              color: value === preset.val ? '#050709' : preset.color,
              borderColor: `${preset.color}40`,
              background: value === preset.val ? preset.color : `${preset.color}10`,
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <p className="text-white/25 text-xs font-body mt-2">
        Simulates global temp. deviation from baseline
      </p>
    </div>
  )
}
