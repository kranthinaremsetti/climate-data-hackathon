# Climate Finance Dashboard - Frontend

React + Tailwind CSS + Vite frontend for the Climate Finance Dashboard.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── InputsPanel.jsx
│   │   ├── PriceChart.jsx
│   │   ├── InsightCards.jsx
│   │   ├── DashboardHeader.jsx
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   └── usePrediction.js
│   ├── utils/             # Utility functions
│   │   ├── api.js         # API service layer
│   │   └── constants.js
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html             # HTML template
├── package.json           # Dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── .env                   # Environment variables (local only)
```

## 🚀 Getting Started

### Install Dependencies

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Environment Variables

Create a `.env` file in this directory:

```
VITE_API_URL=https://climate-data-hackathon.onrender.com
```

For local development, use:

```
VITE_API_URL=http://127.0.0.1:8000
```

## 🎨 Features

- **Modern UI/UX**: Built with Tailwind CSS and React
- **Responsive Design**: Works on all device sizes
- **Interactive Charts**: Using Recharts for data visualization
- **Real-time Predictions**: Connects to FastAPI backend
- **Climate Scenarios**: Simulates stock price impact under different temperature scenarios
- **Semantic Colors**: Green (positive), Red (negative), Blue (neutral), Orange (highlight)
- **Smooth Animations**: Fade-in and scale animations
- **Hover Effects**: Interactive card hovering

## 🔌 API Integration

Connects to the FastAPI backend at `VITE_API_URL` endpoint:

- `GET /predict?company=&month=&temp_change=` - Get climate scenario predictions
- `GET /health` - Health check

## 📦 Dependencies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS
- **Recharts** - Chart library

## 🌊 Backend API

See the [FastAPI Backend](../fastapi_backend/README.md) for backend setup.

## 📝 Notes

- Environment variables are configured through `.env` file
- The `.env` file is gitignored for security
- Use `.env.example` as a template for setting up environment variables
