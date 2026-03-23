// API service layer — talks to FastAPI backend
// Endpoints: GET /predict?company=&month=&temp_change=
//            GET /health

const BASE_URL = 'http://127.0.0.1:8000'

/**
 * Fetch climate-scenario stock prediction from backend.
 * @param {string} company  - Ticker e.g. "NTPC.NS"
 * @param {number} month    - 1–12
 * @param {number} tempChange - Temperature anomaly delta (°C)
 * @returns {Promise<PredictionResponse>}
 */
export async function fetchPrediction(company, month, tempChange = 0) {
  const url = new URL(`${BASE_URL}/predict`)
  url.searchParams.set('company', company)
  url.searchParams.set('month', month)
  url.searchParams.set('temp_change', tempChange)

  const response = await fetch(url.toString())

  if (!response.ok) {
    let detail = `HTTP ${response.status}`
    try {
      const err = await response.json()
      detail = err.detail || detail
    } catch {}
    throw new Error(detail)
  }

  return response.json()
}

/**
 * Check backend health.
 * @returns {Promise<{ status: string, models_loaded: boolean }>}
 */
export async function checkHealth() {
  const response = await fetch(`${BASE_URL}/health`)
  if (!response.ok) throw new Error('Backend unreachable')
  return response.json()
}
