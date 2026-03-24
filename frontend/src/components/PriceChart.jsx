import React from 'react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { getCompanyByTicker, MONTHS, formatPrice, formatPct, formatPctWithArrow } from '../utils/constants'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null

  const change = payload[0].payload.change
  const isPositive = change > 0

  return (
    <div className="bg-white border border-slate-300 rounded-lg p-4 shadow-2xl">
      <p className="text-xs font-semibold text-slate-900 mb-3">{label}</p>
      {payload.map((entry, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-slate-700">{entry.name}</span>
          <span className="text-xs font-semibold text-slate-900 ml-auto">
            {formatPrice(entry.value)}
          </span>
        </div>
      ))}
      {change !== null && (
        <div className="mt-2 pt-2 border-t border-slate-200">
          <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {formatPct(payload[0].value, payload[0].payload.basePrice)}
          </span>
        </div>
      )}
    </div>
  )
}

export default function PriceChart({ prediction, tempChange = 0 }) {
  if (!prediction) return null

  const company = getCompanyByTicker(prediction.company)
  const month = MONTHS.find((m) => m.value === prediction.month)
  
  const basePrice = prediction.current_temp_scenario.predicted_price
  const plus1Price = prediction.plus_1_degree_scenario.predicted_price
  const plus2Price = prediction.plus_2_degree_scenario.predicted_price

  // Calculate actual temperature values
  const temp0 = tempChange
  const temp1 = tempChange + 1
  const temp2 = tempChange + 2

  // Debug: Log chart updates
  console.log('📊 PriceChart rendering with:', {
    company: prediction.company,
    month: prediction.month,
    tempChange,
    temp0,
    temp1,
    temp2,
    basePrice,
    plus1Price,
    plus2Price,
  })

  // Create chart data with 3 scenarios - with dynamic temperature labels
  const chartData = [
    {
      label: `Baseline (${temp0}°C)`,
      price: basePrice,
      scenario: `${temp0}°C`,
      basePrice: basePrice,
      change: null,
      tempValue: temp0,
    },
    {
      label: `${temp1}°C Scenario`,
      price: plus1Price,
      scenario: `${temp1}°C`,
      basePrice: basePrice,
      change: ((plus1Price - basePrice) / basePrice) * 100,
      tempValue: temp1,
    },
    {
      label: `${temp2}°C Scenario`,
      price: plus2Price,
      scenario: `${temp2}°C`,
      basePrice: basePrice,
      change: ((plus2Price - basePrice) / basePrice) * 100,
      tempValue: temp2,
    },
  ]

  const allPrices = [basePrice, plus1Price, plus2Price]
  const minPrice = Math.min(...allPrices)
  const maxPrice = Math.max(...allPrices)
  const range = maxPrice - minPrice || 1
  const padding = range * 0.2

  return (
    <div className="card p-8">
      <div className="mb-8">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="heading-md">Projected Stock Impact</h2>
            <p className="text-sm text-slate-600 mt-1">
              {company.name} · {month?.label}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-slate-900">
              {formatPrice(basePrice)}
            </p>
            <p className="text-xs text-slate-500">Current Prediction</p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full h-80 mb-8 scale-in">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="scenario"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              domain={[minPrice - padding, maxPrice + padding]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(v) => formatPrice(v)}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#d1d5db', strokeWidth: 2 }} />
            <Legend
              verticalAlign="bottom"
              height={32}
              iconType="line"
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              name="Predicted Price"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                fill: '#3b82f6',
                r: 6,
                strokeWidth: 2,
                stroke: '#fff',
              }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Comparison Table */}
      <div className="grid grid-cols-3 gap-4 mb-6 stagger-animation">
        {[
          { label: `${temp0}°C (Current)`, price: basePrice, change: null, color: 'emerald', bgColor: 'bg-neutral' },
          { label: `${temp1}°C Scenario`, price: plus1Price, change: ((plus1Price - basePrice) / basePrice) * 100, color: 'amber', bgColor: 'bg-positive' },
          { label: `${temp2}°C Scenario`, price: plus2Price, change: ((plus2Price - basePrice) / basePrice) * 100, color: 'red', bgColor: 'bg-highlight' },
        ].map((item) => {
          const isUp = item.change > 0
          const colorClass =
            item.color === 'emerald'
              ? 'border-blue-200'
              : item.color === 'amber'
                ? 'border-emerald-200'
                : 'border-orange-200'

          const textClass =
            item.color === 'emerald'
              ? 'text-blue-700'
              : item.color === 'amber'
                ? 'text-emerald-700'
                : 'text-orange-700'

          return (
            <div key={item.label} className={`border rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${item.bgColor} ${colorClass}`}>
              <p className="text-xs font-semibold text-slate-600 mb-2">{item.label}</p>
              <p className={`text-lg font-bold ${textClass}`}>{formatPrice(item.price)}</p>
              {item.change !== null && (
                <p className={`text-sm font-semibold mt-1 ${isUp ? 'text-positive' : 'text-negative'}`}>
                  {isUp ? '↑' : '↓'} {formatPct(item.price, basePrice)}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Summary Info */}
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <p className="text-xs text-slate-700 mb-3">
          <span className="font-semibold">ℹ️ Impact Range:</span> Prices range from {formatPrice(minPrice)} to {formatPrice(maxPrice)}, showing climate scenario sensitivity.
        </p>
        <p className="text-xs text-slate-600 italic">
          📊 Scenario-based simulated projection (not actual future prices)
        </p>
      </div>

      {/* Climate Insight Section */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-100">
          <p className="text-sm font-semibold text-blue-900 mb-2">💡 Climate Insight</p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Higher temperatures can increase electricity demand, which may positively impact energy company performance. This simulation shows how {company.shortName} could be affected under different climate scenarios.
          </p>
        </div>
      </div>
    </div>
  )
}
