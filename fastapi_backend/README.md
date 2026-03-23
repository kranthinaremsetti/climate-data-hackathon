# Climate Finance Dashboard - Backend

FastAPI backend with machine learning models for climate scenario stock prediction.

## 📁 Project Structure

```
fastapi_backend/
├── main.py                  # FastAPI application
├── model.pkl                # Trained ML model
├── scaler.pkl               # Feature scaler
├── features.pkl             # Feature names/list
├── requirements.txt         # Python dependencies
└── README.md                # This file
```

## 🚀 Getting Started

### Installation

```bash
cd fastapi_backend
pip install -r requirements.txt
```

### Run Server

```bash
uvicorn main:app --reload
```

Server available at [http://127.0.0.1:8000](http://127.0.0.1:8000)

### API Documentation

Interactive API docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## 🔌 API Endpoints

### Prediction

**Endpoint:** `GET /predict`

**Parameters:**
- `company` (string): Stock ticker (e.g., "NTPC.NS")
- `month` (integer): Month 1-12
- `temp_change` (float): Temperature change in °C

**Example:**
```
GET /predict?company=NTPC.NS&month=6&temp_change=1.5
```

**Response:**
```json
{
  "company": "NTPC.NS",
  "month": 6,
  "temp_change": 1.5,
  "current_temp_scenario": {
    "predicted_price": 123.45
  },
  "plus_1_degree_scenario": {
    "predicted_price": 124.12
  },
  "plus_2_degree_scenario": {
    "predicted_price": 124.89
  }
}
```

### Health Check

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "models_loaded": true
}
```

## 📊 How It Works

1. **Input Processing**: Accept company, month, and temperature change parameters
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
