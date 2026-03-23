import { useState, useCallback, useEffect, useRef } from 'react'
import { fetchPrediction, checkHealth } from '../utils/api'

export function usePrediction() {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  })
  const [history, setHistory] = useState([])
  const [backendStatus, setBackendStatus] = useState('unknown') // 'online' | 'offline' | 'unknown'
  const abortRef = useRef(null)

  // Health check on mount
  useEffect(() => {
    checkHealth()
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'))
  }, [])

  const predict = useCallback(async (company, month, tempChange) => {
    // Cancel previous in-flight request
    if (abortRef.current) abortRef.current()

    setState({ data: null, loading: true, error: null })

    let cancelled = false
    abortRef.current = () => { cancelled = true }

    try {
      console.log('📤 API Request:', { company, month, tempChange })
      const data = await fetchPrediction(company, month, tempChange)
      
      if (cancelled) {
        console.log('⚠️ Request cancelled')
        return
      }

      console.log('📥 API Response:', data)
      setState({ data, loading: false, error: null })

      // Append to session history
      setHistory(prev => {
        const entry = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          company,
          month,
          tempChange,
          current: data.current_temp_scenario.predicted_price,
          plus1: data.plus_1_degree_scenario.predicted_price,
          plus2: data.plus_2_degree_scenario.predicted_price,
        }
        console.log('✅ Prediction saved to history:', entry)
        return [...prev.slice(-19), entry] // keep last 20
      })
    } catch (err) {
      if (cancelled) {
        console.log('⚠️ Request cancelled during error handling')
        return
      }
      console.error('❌ API Error:', err.message)
      setState({ data: null, loading: false, error: err.message })
    }
  }, [])

  const clearError = useCallback(() => {
    setState(s => ({ ...s, error: null }))
  }, [])

  const clearHistory = useCallback(() => setHistory([]), [])

  return { ...state, history, backendStatus, predict, clearError, clearHistory }
}
