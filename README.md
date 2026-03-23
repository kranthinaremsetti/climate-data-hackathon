# Climate Finance Dashboard

A comprehensive climate scenario simulation dashboard for analyzing how temperature changes impact energy stock performance.

## 📋 Project Overview

This is a full-stack application that predicts stock price changes under different climate scenarios (0°C, +1°C, +2°C). It uses machine learning models and historical climate-market relationships to provide scenario-based simulations.

**Key Features:**
- Climate scenario simulation for energy stocks
- Interactive dashboard with real-time predictions
- Modern UI with semantic color coding
- Comprehensive data visualization with charts and insights
- RESTful API backend with ML models

## 📁 Project Structure

```
climate-finance-dashboard/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── hooks/               # Custom hooks
│   │   ├── utils/               # Utilities & API service
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                  # Static assets
│   ├── index.html
│   ├── package.json
│   └── README.md                # Frontend documentation
│
├── fastapi_backend/             # FastAPI backend with ML models
│   ├── main.py
│   ├── model.pkl                # ML model
│   ├── scaler.pkl               # Data scaler
│   ├── features.pkl             # Feature list
│   ├── requirements.txt
│   └── README.md                # Backend documentation
│
├── .env.example                 # Environment variables template
├── .gitignore
└── README.md                    # This file
```

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Backend Setup

```bash
cd fastapi_backend
pip install -r requirements.txt
uvicorn main:app --reload
```

API running at [http://127.0.0.1:8000](http://127.0.0.1:8000)

## 🔧 Environment Configuration

### Frontend (.env in frontend/)

```
VITE_API_URL=https://climate-data-hackathon.onrender.com
```

For local development:

```
VITE_API_URL=http://127.0.0.1:8000
```

## 📊 API Endpoints

### Prediction

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

```
GET /health
```

## 🎨 Design System

**Color Palette:**
- 🟢 Green: Positive changes, bullish trends, resilience
- 🔴 Red: Negative changes, bearish trends, vulnerability
- 🔵 Blue: Neutral, baseline scenarios, current state
- 🟠 Orange: Highlights, +2°C impact, critical insights

**Components:**
- Modern card-based layout
- Interactive hover effects
- Smooth animations and transitions
- Responsive grid system

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Recharts (visualization)

**Backend:**
- FastAPI
- scikit-learn (ML models)
- pandas (data processing)

## ✨ Features

1. **Climate Scenario Simulation** - Model stock impact at different temperature scenarios
2. **Interactive Charts** - Visual representation of climate-market relationships
3. **Risk Assessment** - Calculate climate sensitivity and financial risk
4. **Trend Analysis** - Determine bullish/bearish outcomes
5. **Key Metrics** - Display prediction confidence and sensitivity scores
6. **Company Selection** - Analyze different energy stocks
7. **Scenario Context** - Optional month-based analysis

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔐 Security

- Environment variables for sensitive data
- .env files excluded from version control
- API URL configuration through environment

## 📚 Documentation

- [Frontend README](./frontend/README.md) - Frontend-specific documentation
- [Backend README](./fastapi_backend/README.md) - Backend-specific documentation

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to GitHub
5. Open a pull request

## 📄 License

MIT License - Feel free to use this project for your hackathons and learning!

## 🎯 Use Case

Perfect for:
- Financial analysis
- Climate risk assessment
- Hackathons
- Educational purposes
- Energy sector research

---

**Status:** ✅ Production Ready  
**Last Updated:** March 23, 2026  
**Deployed Backend:** https://climate-data-hackathon.onrender.com