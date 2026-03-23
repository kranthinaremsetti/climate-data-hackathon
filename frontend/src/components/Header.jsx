import React from 'react'

export default function Header({ backendStatus }) {
  const statusMap = {
    online: { dot: 'bg-jade-400', text: 'API Online', glow: 'shadow-jade-400/50' },
    offline: { dot: 'bg-crimson-400', text: 'API Offline', glow: 'shadow-crimson-400/50' },
    unknown: { dot: 'bg-amber-400 animate-pulse', text: 'Connecting...', glow: '' },
  }
  const s = statusMap[backendStatus] || statusMap.unknown

  return (
    <header className="relative border-b border-white/5 bg-carbon-950/80 backdrop-blur-xl">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-jade-500/60 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 flex-shrink-0">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-jade-500 to-sky-500 opacity-20 blur-sm" />
            <div className="relative w-9 h-9 rounded-lg bg-carbon-800 border border-jade-500/30 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-jade-400">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-lg leading-none tracking-tight">
              Climate<span className="text-gradient-jade">Quant</span>
            </h1>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest mt-0.5">
              Energy Stock Forecasting
            </p>
          </div>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {['Forecast', 'History', 'Scenarios', 'Docs'].map((item, i) => (
            <button
              key={item}
              className={`px-4 py-2 rounded-lg text-sm font-body transition-all duration-200 ${
                i === 0
                  ? 'bg-jade-500/10 text-jade-300 border border-jade-500/20'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Status badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-carbon-800 border border-white/5">
          <span className={`w-2 h-2 rounded-full ${s.dot} shadow-sm ${s.glow}`} />
          <span className="text-xs font-mono text-white/50">{s.text}</span>
        </div>
      </div>
    </header>
  )
}
