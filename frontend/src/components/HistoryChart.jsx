import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Area, AreaChart,
} from 'recharts'
import { COMPANIES, formatPrice } from '../utils/constants'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-carbon-800 border border-white/10 rounded-xl p-3 shadow-2xl min-w-[180px]">
      <p className="text-white/40 text-xs font-mono mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex justify-between items-center gap-4 mb-1">
          <span className="text-xs font-body" style={{ color: p.color }}>{p.name}</span>
          <span className="text-xs font-mono font-bold text-white">{formatPrice(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function HistoryChart({ history }) {
  if (!history || history.length === 0) return null

  const chartData = history.map((h, i) => ({
    name: `#${i + 1}`,
    time: h.time,
    Current: parseFloat(h.current?.toFixed(2)),
    '+1°C': parseFloat(h.plus1?.toFixed(2)),
    '+2°C': parseFloat(h.plus2?.toFixed(2)),
    company: h.company,
  }))

  const allVals = chartData.flatMap((d) => [d.Current, d['+1°C'], d['+2°C']]).filter(Boolean)
  const yMin = Math.max(0, Math.min(...allVals) - 5)
  const yMax = Math.max(...allVals) + 5

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 10, left: 10, bottom: 4 }}>
          <defs>
            <linearGradient id="gradCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPlus1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradPlus2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'JetBrains Mono' }}
          />
          <YAxis
            domain={[yMin, yMax]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#4b5563', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            tickFormatter={(v) => `₹${v.toFixed(0)}`}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={6}
            formatter={(value) => (
              <span style={{ color: '#9ca3af', fontSize: 11, fontFamily: 'DM Sans' }}>{value}</span>
            )}
          />
          <Area type="monotone" dataKey="Current" stroke="#10b981" strokeWidth={2} fill="url(#gradCurrent)" dot={{ r: 3, fill: '#10b981' }} />
          <Area type="monotone" dataKey="+1°C" stroke="#fbbf24" strokeWidth={2} fill="url(#gradPlus1)" dot={{ r: 3, fill: '#fbbf24' }} />
          <Area type="monotone" dataKey="+2°C" stroke="#ef4444" strokeWidth={2} fill="url(#gradPlus2)" dot={{ r: 3, fill: '#ef4444' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
