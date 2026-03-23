from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import numpy as np

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load pickle files
try:
    model = joblib.load("model.pkl")
    scaler = joblib.load("scaler.pkl")
    features = joblib.load("features.pkl")
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    model = None
    scaler = None
    features = None

def get_season(m):
    if m in [3,4,5]: return 1
    elif m in [6,7,8]: return 2
    elif m in [9,10,11]: return 3
    else: return 4

@app.get("/")
def home():
    return {
        "message": "Climate Stock Prediction API",
        "status": "running" if model else "models_not_loaded",
        "endpoints": {
            "GET /predict": "?company=NTPC.NS&month=5",
            "GET /health": "Check API status"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "running",
        "models_loaded": model is not None
    }

@app.get("/predict")
def predict(company: str = "NTPC.NS", month: int = 5, temp_change: float = 0):
    """
    Predict stock price based on company, month, and temperature scenario
    """
    
    if model is None or scaler is None or features is None:
        raise HTTPException(status_code=500, detail="Models not loaded")
    
    if month < 1 or month > 12:
        raise HTTPException(status_code=400, detail="Month must be 1-12")
    
    try:
        # Build feature vector
        data = {f: 0 for f in features}
        data['month'] = month
        data['season'] = get_season(month)
        data['temp_lag1'] = temp_change * 0.5
        data['temp_lag2'] = temp_change * 0.3
        
        df = pd.DataFrame([data])
        
        # Scale and predict
        df_scaled = scaler.transform(df)
        pred_normal = model.predict(df_scaled)[0]
        
        # Scenario +1°C
        data_plus1 = {f: 0 for f in features}
        data_plus1['month'] = month
        data_plus1['season'] = get_season(month)
        data_plus1['temp_lag1'] = (temp_change + 1) * 0.5
        data_plus1['temp_lag2'] = (temp_change + 1) * 0.3
        df_plus1 = pd.DataFrame([data_plus1])
        df_plus1_scaled = scaler.transform(df_plus1)
        pred_plus1 = model.predict(df_plus1_scaled)[0]
        
        # Scenario +2°C
        data_plus2 = {f: 0 for f in features}
        data_plus2['month'] = month
        data_plus2['season'] = get_season(month)
        data_plus2['temp_lag1'] = (temp_change + 2) * 0.5
        data_plus2['temp_lag2'] = (temp_change + 2) * 0.3
        df_plus2 = pd.DataFrame([data_plus2])
        df_plus2_scaled = scaler.transform(df_plus2)
        pred_plus2 = model.predict(df_plus2_scaled)[0]
        
        return {
            "company": company,
            "month": month,
            "current_temp_scenario": {
                "temp_change": 0,
                "predicted_price": float(pred_normal)
            },
            "plus_1_degree_scenario": {
                "temp_change": 1,
                "predicted_price": float(pred_plus1)
            },
            "plus_2_degree_scenario": {
                "temp_change": 2,
                "predicted_price": float(pred_plus2)
            },
            "scenarios": [
                {"label": "Current", "temp_change": 0, "price": float(pred_normal)},
                {"label": "+1°C", "temp_change": 1, "price": float(pred_plus1)},
                {"label": "+2°C", "temp_change": 2, "price": float(pred_plus2)}
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=False)