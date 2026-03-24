# Climate Finance Dashboard - Backend

Production-ready FastAPI backend with machine learning models for climate scenario stock prediction. Includes company-specific predictions, Cloud Run deployment ready.

**Status:** ✅ **PRODUCTION READY**  
**Last Updated:** March 24, 2026  
**Python Version:** 3.10+ required  
**Currently Deployed:** https://climate-data-hackathon.onrender.com

## 📁 Project Structure

```
fastapi_backend/
├── main.py                          # FastAPI app with PORT env config
├── model.pkl                        # Trained scikit-learn regression model
├── scaler.pkl                       # MinMaxScaler for feature normalization
├── features.pkl                     # Feature names used for inference
├── requirements.txt                 # Python dependencies (7 packages)
├── Dockerfile                       # Docker image for Cloud Run
├── .dockerignore                    # Excludes unnecessary files from Docker
├── .gcloudignore                    # GCP build configuration
├── CLOUDRUN_DEPLOYMENT.md           # Step-by-step Cloud Run guide
├── start.sh                         # Local startup helper script
├── README.md                        # This file
└── __pycache__/                     # Compiled Python files (ignored)
```

## 🚀 Quick Start (Local Development)

### Installation

```bash
cd fastapi_backend
pip install -r requirements.txt
```

### Run Development Server

```bash
uvicorn main:app --reload
```

**Server running:**
- 🌐 API: http://127.0.0.1:8000
- 📖 Swagger Docs: http://127.0.0.1:8000/docs
- 📔 ReDoc: http://127.0.0.1:8000/redoc

### Run Production Server

```bash
uvicorn main:app --host 0.0.0.0 --port 8080
```

**Port Configuration:**
- Reads `PORT` environment variable (Cloud Run compatible)
- Defaults to 8080 if not set
- Binds to 0.0.0.0 for external access

## 🔌 API Endpoints

### 1. Prediction Endpoint

Get climate scenario predictions for a stock.

**Endpoint:** `GET /predict`

**Query Parameters:**
- `company` (string, required): Stock ticker code
  - `NTPC.NS` (NTPC Limited) - Thermal Power - Price multiplier: 1.0x
  - `TATAPOWER.NS` (Tata Power) - Integrated Power - Price multiplier: 2.5x
  - `ADANIPOWER.NS` (Adani Power) - Thermal Power - Price multiplier: 1.8x
  - `JSWENERGY.NS` (JSW Energy) - Renewable Energy - Price multiplier: 3.2x
  - `NHPC.NS` (NHPC Limited) - Hydropower - Price multiplier: 2.1x
  
- `month` (integer, optional): Month 1-12 (contextual, not used in prediction)
  - Default: 5 (May)
  
- `temp_change` (float, optional): Temperature anomaly in °C
  - Range: −2 to +2
  - Default: 0
  - Example values: -2, -1, -0.5, 0, 0.5, 1, 1.5, 2

**Example Requests:**

```bash
# Slider at -2°C: Shows temps -2 → -1 → 0
GET /predict?company=NTPC.NS&month=6&temp_change=-2
```

```bash
# Slider at 0°C: Shows temps 0 → +1 → +2
GET /predict?company=NTPC.NS&month=6&temp_change=0
```

```bash
# Slider at +2°C: Shows temps +2 → +3 → +4 (but API returns -2 to 0 relative to input)
GET /predict?company=TATAPOWER.NS&month=6&temp_change=2
```

**Response Format:**

```json
{
  "company": "NTPC.NS",
  "month": 6,
  "current_temp_scenario": {
### Prediction Flow

```
User Input (company, month, temp_change)
    ↓
build_features() - Create feature vector
    ↓
scaler.transform() - Normalize features
    ↓
model.predict() - Get base prediction
    ↓
company_mult (apply multiplier)
    ↓
Return prediction response
```

### Three Scenarios

For each API call, the backend automatically generates three predictions:

1. **Current Temp Scenario**: Base temperature (slider position)
2. **+1°C Scenario**: Base temperature + 1°C
3. **+2°C Scenario**: Base temperature + 2°C

Example: If user sets slider to -2°C:
- Scenario 1 returns prediction at -2°C
- Scenario 2 returns prediction at -1°C  
- Scenario 3 returns prediction at 0°C

### Feature Engineering

Features used in model predictions:
```python
{
  'month': 1-12 (seasonality),
  'season': 1-4 (winter/spring/monsoon/autumn),
  'temp_lag1': temperature * 0.5,
  'temp_lag2': temperature * 0.3,
  'heatwave': encoded binary,
  'ma_3': 3-month moving average,
  'ma_6': 6-month moving average,
  'trend_12ma': 12-month trend,
  'volatility_3': 3-month volatility,
  'volatility_6': 6-month volatility,
  'momentum_3': 3-month momentum,
  'momentum_6': 6-month momentum,
  'return_lag1': previous return,
  'return_lag2': 2-period return,
  'temp_roll_mean': rolling temperature average,
  'temp_roll_std': rolling temperature std dev
}
```

## 🧠 Machine Learning Model

### Model Type
- **Type**: Regression (scikit-learn estimator)
- **Output**: Continuous price predictions
- **Features**: 16 climate + market factors

### Training Data
- Historical climate data (temperature anomalies)
- Historical stock prices (5 energy companies)
- Seasonal patterns and trends
- Price volatility and momentum indicators

### Price Multipliers
After base model prediction, company-specific multipliers scale the output:
- **NTPC.NS**: 1.0x (baseline energy stock)
- **TATAPOWER.NS**: 2.5x (higher price point)
- **ADANIPOWER.NS**: 1.8x (mid-high price)
- **JSWENERGY.NS**: 3.2x (highest price point)
- **NHPC.NS**: 2.1x (mid-high price)
  "scenarios": [
    {
      "label": "Current",
      "temp_change": -2,
      "price": 3.563089310302521
    },
    {
      "label": "+1°C",
      "temp_change": -1,
      "price": 4.1830192383283045
    },
    {
      "label": "+2°C",
      "temp_change": 0,
      "price": 4.8029491663540895
    }
  ]
}
```

**Response Fields:**
- `company`: Echoes the requested company
- `month`: Echoes the requested month
- `current_temp_scenario`: Base prediction at slider position
- `plus_1_degree_scenario`: Prediction at slider + 1°C
- `plus_2_degree_scenario`: Prediction at slider + 2°C
Full list in `requirements.txt`:

```
fastapi              # Web framework
uvicorn              # ASGI server
pandas               # Data processing
numpy                # Numerical computations
scikit-learn         # ML models & preprocessing
joblib               # Model serialization
yfinance             # (optional) Financial data
```

**Installation:**
```bash
pip install -r requirements.txt
```

## 🐳 Docker & Cloud Deployment

### Run in Docker (Local Testing)

```bash
# Build image
docker build -t climate-backend:latest .

# Run locally
docker run -p 8080:8080 \
  -e PORT=8080 \& Testing

### Development Server (Auto-reload)

```bash
uvicorn main:app --reload
```

Features:
- Auto-reloads on code changes
- Debug mode enabled
- Full error tracebacks
- Interactive documentation at /docs

### Testing API Endpoints

**Using curl:**

```bash
# Test health
curl http://127.0.0.1:8000/health

# Test prediction with -2°C
curl "http://127.0.0.1:8000/predict?company=NTPC.NS&month=6&temp_change=-2"

# Test prediction with +2°C
curl "http://127.0.0.1:8000/predict?company=TATAPOWER.NS&month=6&temp_change=2"

# All companies
curl "http://127.0.0.1:8000/predict?company=ADANIPOWER.NS&month=6&temp_change=0"
curl "http://127.0.0.1:8000/predict?company=JSWENERGY.NS&month=6&temp_change=0"
curl "http://127.0.0.1:8000/predict?company=NHPC.NS&month=6&temp_change=0"
```

**Using Python:**

```python
import requests

response = requests.get(
    'http://127.0.0.1:8000/predict',
    params={
        'company': 'NTPC.NS',
        'month': 6,
        'temp_change': 0
    }
)

print(response.json())
```

**Using Swagger UI:**

1. Go to http://127.0.0.1:8000/docs
2. Expand `GET /predict`
3. Click "Try it out"
4. Enter parameters
5. Click "Execute"

### Model Verification

Check if models load correctly:

```python
import joblib

model = joblib.load('model.pkl')
scaler = joblib.load('scaler.pkl')
features = joblib.load('features.pkl')

print(f"Model loaded: {model}")
print(f"Feature count: {len(features)}")
print(f"Scaler loaded: {scaler}")
```

## 🧪 Testing Checklist

- [x] API responds to health check
- [x] Predictions return for all 5 companies
- [x] Negative temperatures work (-2, -1)
- [x] Positive temperatures work (+1, +2)
- [x] Temperature progression correct (temp_change → +1 → +2)
- [x] Company multipliers applied correctly
- [x] Error handling for invalid company
- [x] CORS headers present in responses
- [x] Docker build succeeds
- [x] Cloud Run deployment ready1. **Input Processing**: Accept company, month, and temperature change parameters
2. **Feature Engineering**: Create features based on historical climate-market data
3. **ML Prediction**: Use trained scikit-learn model to predict stocks at different scenarios
4. **Scaling**: Apply inverse scaling to convert predictions back to price range

## 🧠 Model Details

- **Type**: Regression model (scikit-learn)
- **Training Data**: Historical climate and stock price data
- **Features**: Climate metrics, seasonal factors, price history
- **Output**: Stock price predictions under different temperature scenarios

## 📦 Dependencies

Key packages (see `requirements.txt`):
- **FastAPI** - Web framework
- **Uvicorn** - ASGI server
- **scikit-learn** - ML models
- **pandas** - Data processing
- **numpy** - Numerical computations

## 🔒 Security

- CORS enabled for frontend communication
- Environment variables for configuration
- Input validation on all endpoints

## 🌐 Deployment

### Render Deployment

This backend is deployed on Render at:
```
https://climate-data-hackathon.onrender.com
```

**Deploy Steps:**
1. Connect GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `uvicorn main:app --host 0.0.0.0`

## 📝 Development Tips

- Use `--reload` flag for auto-reloading during development
- Check `/docs` for interactive API documentation
- Monitor logs for debugging
- Test endpoints with curl or Postman

## 🧪 Testing Endpoints

Using curl:

```bash
# Test prediction
curl "http://127.0.0.1:8000/predict?company=NTPC.NS&month=6&temp_change=1.5"

# Test health
curl "http://127.0.0.1:8000/health"
```

## 🐛 Troubleshooting

**Model not loading:**
- Ensure `model.pkl`, `scaler.pkl`, and `features.pkl` are in the directory
- Check Python version compatibility

**CORS errors:**
- Verify frontend URL is in CORS allowed origins
- Check network connectivity

**Import errors:**
- Run `pip install -r requirements.txt` again
- Ensure Python virtual environment is activated

## 📚 API Response Codes

- `200` - Success
- `400` - Bad request (invalid parameters)
- `422` - Validation error
- `500` - Server error

## 🔗 Frontend Integration

The frontend connects via the `VITE_API_URL` environment variable:

- **Production**: `https://climate-data-hackathon.onrender.com`
- **Development**: `http://127.0.0.1:8000`

## 📊 Supported Companies

Energy sector stocks:
- NTPC.NS (NTPC Limited)
- TATAPOWER.NS (Tata Power)
- ADANIPOWER.NS (Adani Power)
- JSWENERGY.NS (JSW Energy)
- NHPC.NS (NHPC Limited)

## 🎯 Future Enhancements

- Add more companies to prediction pool
- Implement real-time climate data integration
- Add confidence intervals to predictions
- Support batch predictions
- Add data caching with Redis

## 📄 License

MIT License - Feel free to use for learning and hackathons!

---

**Status:** ✅ Production Ready  
**Last Updated:** March 23, 2026  
**API URL:** https://climate-data-hackathon.onrender.com
