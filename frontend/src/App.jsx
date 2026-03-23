import React, { useState, useEffect, useRef } from 'react'
import InputsPanel from './components/InputsPanel'
import PriceChart from './components/PriceChart'
import InsightCards from './components/InsightCards'
import LoadingSkeleton from './components/LoadingSkeleton'
import DashboardHeader from './components/DashboardHeader'
import { ErrorState, EmptyState } from './components/States'
import { usePrediction } from './hooks/usePrediction'

export default function App() {
  const [company, setCompany] = useState('NTPC.NS')
  const [month, setMonth] = useState(5)
  const [tempChange, setTempChange] = useState(0)
  const debounceTimerRef = useRef(null)

  const { data, loading, error, backendStatus, predict, clearError } = usePrediction()

  // Auto-trigger prediction when inputs change (with debounce for slider)
  useEffect(() => {
    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new debounce timer (300ms delay so slider doesn't spam API)
    debounceTimerRef.current = setTimeout(() => {
      // Note: month is kept in UI state for context only, not sent to API
      console.log('🔵 Prediction triggered:', { company, scenarioContext: month, tempChange })
      clearError()
      predict(company, 6, tempChange) // Always use mid-year month (6) for consistent baseline
    }, 300)

    // Cleanup on unmount or when inputs change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [company, month, tempChange, predict, clearError])

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f9ff 100%)' }}>
      {/* Header */}
      <DashboardHeader backendStatus={backendStatus} />

      {/* Main layout: 3-section design */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SECTION 1: Inputs Panel (Top) */}
        <div className="mb-8">
          <InputsPanel
            company={company}
            setCompany={setCompany}
            month={month}
            setMonth={setMonth}
            tempChange={tempChange}
            setTempChange={setTempChange}
            loading={loading}
          />
        </div>

        {/* SECTION 2: Loading / Error / Chart (Center - Main Focus) */}
        {loading && <LoadingSkeleton />}

        {error && (
          <ErrorState message={error} onRetry={() => {
            console.log('🔄 Retrying prediction...')
            clearError()
            predict(company, month, tempChange)
          }} />
        )}

        {!loading && !error && !data && <EmptyState />}

        {!loading && !error && data && (
          <div className="space-y-8 fade-in-up">
            {/* Large Price Chart */}
            <div className="scale-in">
              <PriceChart prediction={data} />
            </div>

            {/* SECTION 3: Insight Cards (Bottom) */}
            <div>
              <InsightCards prediction={data} />
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="border-t border-slate-300 mt-12 py-6 px-6 text-center bg-white/50 backdrop-blur-sm">
        <p className="text-xs text-slate-600">
          Climate Finance Dashboard · 2026
        </p>
      </footer>
    </div>
  )
}

