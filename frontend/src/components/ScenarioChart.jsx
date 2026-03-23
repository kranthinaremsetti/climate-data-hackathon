import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList, ReferenceLine,
} from 'recharts'
import { formatPrice, formatPct } from '../utils/constants'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div className="bg-carbon-800 border border-jade-500/20 rounded-xl p-3 shadow-2xl min-w-[160px]">
      <p className="text-white/50 text-xs font-mono uppercase tracking-wider mb-2">{label}</p>
      <p className="text-white font-display font-bold text-lg">{formatPrice(d.value)}</p>
      {d.payload.delta !== undefined && (
        <p
          className="text-xs font-mono mt-1"
          style={{ color: d.payload.delta >= 0 ? '#10b981' : '#ef4444' }}
        >
          {d.payload.delta >= 0 ? '▲' : '▼'} {Math.abs(d.payload.delta).toFixed(2)}%
          {' vs baseline'}
        </p>
      )}
    </div>
  )
}

export default function ScenarioChart({ prediction }) {
  if (!prediction) return null

  const base = prediction.current_temp_scenario.predicted_price
  const chartData = [
    {
      label: 'Current\n(0°C)',
      displayLabel: 'Current',
      price: base,
      delta: 0,
      color: '#10b981',
    },
    {
      label: '+1°C',
      displayLabel: '+1°C',
      price: prediction.plus_1_degree_scenario.predicted_price,
      delta: ((prediction.plus_1_degree_scenario.predicted_price - base) / base) * 100,
      color: '#fbbf24',
    },
    {
      label: '+2°C',
      displayLabel: '+2°C',
      price: prediction.plus_2_degree_scenario.predicted_price,
      delta: ((prediction.plus_2_degree_scenario.predicted_price - base) / base) * 100,
      color: '#ef4444',
    },
  ]

  const allPrices = chartData.map((d) => d.price)
  const minPrice = Math.min(...allPrices)
  const maxPrice = Math.max(...allPrices)
  const padding = (maxPrice - minPrice) * 0.5 || 5
  const yMin = Math.max(0, minPrice - padding)
  const yMax = maxPrice + padding

  const CustomLabel = ({ x, y, width, value }) => (
    <text
      x={x + width / 2}
      y={y - 6}
      fill="#e2e8f0"
      textAnchor="middle"
      fontSize={11}
      fontFamily="JetBrains Mono"
      fontWeight="600"
    >
      {formatPrice(value)}
    </text>
  )

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barCategoryGap="30%" margin={{ top: 24, right: 10, left: 10, bottom: 4 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="displayLabel"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 600 }}
          />
          <YAxis
            domain={[yMin, yMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickFormatter={(v) => `₹${v.toFixed(0)}`}
            width={56}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <ReferenceLine
            y={base}
            stroke="rgba(16,185,129,0.25)"
            strokeDasharray="4 3"
          />
          <Bar dataKey="price" radius={[6, 6, 0, 0]} maxBarSize={80}>
            <LabelList content={<CustomLabel />} />
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`${entry.color}22`}
                stroke={entry.color}
                strokeWidth={1.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
