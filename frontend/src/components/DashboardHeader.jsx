import React from 'react'

export default function DashboardHeader({ backendStatus }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-lg">Climate Finance Dashboard</h1>
            <p className="text-sm text-slate-600 mt-1">
              Predict stock price impact of climate scenarios
            </p>
          </div>
          
          {/* Backend Status Badge */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div
                className={`w-2 h-2 rounded-full ${
                  backendStatus === 'online' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              />
              {backendStatus === 'online' && (
                <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-50 animate-pulse" />
              )}
            </div>
            <span className="text-xs font-medium text-slate-600">
              {backendStatus === 'online' ? 'Backend Ready' : 'Backend Offline'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
