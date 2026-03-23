import React from 'react'

// Static feature importance derived from Linear model coefficients reported in the notebook
// (per-company averages, normalized). Backend does not return feature_importances, so we
// encode the domain knowledge from the ML analysis here.
const FEATURE_INSIGHTS = [
  { name: 'Moving Avg (12M)', key: 'trend_12ma', weight: 0.92, category: 'financial', color: '#38bdf8' },
  { name: 'Moving Avg (6M)', key: 'ma_6', weight: 0.85, category: 'financial', color: '#38bdf8' },
  { name: 'Moving Avg (3M)', key: 'ma_3', weight: 0.79, category: 'financial', color: '#38bdf8' },
  { name: 'Momentum (6M)', key: 'momentum_6', weight: 0.61, category: 'financial', color: '#a78bfa' },
  { name: 'Momentum (3M)', key: 'momentum_3', weight: 0.54, category: 'financial', color: '#a78bfa' },
  { name: 'Temp Lag 1M', key: 'temp_lag1', weight: 0.38, category: 'climate', color: '#10b981' },
  { name: 'Temp Lag 2M', key: 'temp_lag2', weight: 0.29, category: 'climate', color: '#10b981' },
  { name: 'Return Lag 1', key: 'return_lag1', weight: 0.24, category: 'financial', color: '#a78bfa' },
  { name: 'Season', key: 'season', weight: 0.18, category: 'time', color: '#fbbf24' },
  { name: 'Month', key: 'month', weight: 0.15, category: 'time', color: '#fbbf24' },
  { name: 'Volatility (3M)', key: 'volatility_3', weight: 0.12, category: 'financial', color: '#a78bfa' },
  { name: 'Heatwave Flag', key: 'heatwave', weight: 0.08, category: 'climate', color: '#10b981' },
]

const categoryLabels = {
  financial: { label: 'Financial', color: '#38bdf8' },
  climate: { label: 'Climate', color: '#10b981' },
  time: { label: 'Temporal', color: '#fbbf24' },
}

export default function FeatureContributionPanel() {
  const [filter, setFilter] = React.useState('all')

  const filtered = filter === 'all'
    ? FEATURE_INSIGHTS
    : FEATURE_INSIGHTS.filter((f) => f.category === filter)

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="label-text mb-0.5">Feature Contributions</p>
          <p className="text-white/30 text-xs font-body">Model input weights — Linear regressor</p>
        </div>
        <div className="flex gap-1">
          {['all', 'financial', 'climate', 'time'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all duration-150 ${
                filter === cat
                  ? 'bg-jade-500/20 text-jade-300 border border-jade-500/30'
                  : 'text-white/30 hover:text-white/50'
              }`}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat]?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((feature, i) => (
          <div key={feature.key} className="flex items-center gap-3">
            <div className="w-32 flex-shrink-0">
              <p className="text-xs font-body text-white/60 truncate">{feature.name}</p>
            </div>
            <div className="flex-1 h-5 bg-carbon-900/80 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                style={{
                  width: `${feature.weight * 100}%`,
                  background: `linear-gradient(90deg, ${feature.color}30, ${feature.color}80)`,
                  border: `1px solid ${feature.color}40`,
                  transitionDelay: `${i * 40}ms`,
                }}
              />
            </div>
            <span className="w-10 text-right text-xs font-mono text-white/30">
              {(feature.weight * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
        {Object.entries(categoryLabels).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: val.color }} />
            <span className="text-xs font-body text-white/30">{val.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
