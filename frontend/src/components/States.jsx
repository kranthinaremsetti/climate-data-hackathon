import React from 'react'

export function EmptyState() {
  return (
    <div className="card p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <p className="font-display font-semibold text-slate-900 text-lg mb-2">
        Get Started with Predictions
      </p>
      <p className="text-slate-600 text-sm font-body max-w-sm leading-relaxed">
        Select a company, choose a month, adjust the temperature slider, and click Predict to analyze climate scenarios.
      </p>
      <div className="mt-8 flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
        <span>📊</span>
        <span>No data yet — run your first prediction above</span>
      </div>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="card p-10 flex flex-col items-center justify-center text-center min-h-[300px] bg-red-50 border-red-200">
      <div className="w-16 h-16 rounded-2xl bg-red-100 border border-red-300 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-red-600">
          <path
            d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="font-display font-semibold text-red-900 text-lg mb-2">Prediction Failed</p>
      <p className="text-red-700 text-sm font-mono max-w-sm mb-2">{message}</p>
      <p className="text-slate-600 text-xs font-body mb-6">
        Make sure the FastAPI backend is running on port 8000
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
