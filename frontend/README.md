# Climate Finance Dashboard - Frontend

Production-ready React 18 + Vite + Tailwind CSS frontend for climate scenario stock prediction. Modern UI with real-time predictions and stunning animations.

**Status:** ✅ **PRODUCTION READY**  
**Last Updated:** March 24, 2026  
**Node Version:** 18+ required

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── App.jsx                 # Main app with gradient background
│   │   ├── PriceChart.jsx           # Recharts visualization (dynamic temp labels)
│   │   ├── InsightCards.jsx         # Risk score, trend analysis, impact display
│   │   ├── InputsPanel.jsx          # Company selector, temperature slider, month picker
│   │   ├── TempSlider.jsx           # Interactive −2°C to +2°C slider
│   │   ├── CompanySelector.jsx      # Dropdown for 5 energy stocks
│   │   ├── ControlPanel.jsx         # Main control interface
│   │   ├── DashboardHeader.jsx      # Title and backend status badge
│   │   ├── FeatureContributionPanel.jsx
│   │   ├── HistoryChart.jsx
│   │   ├── MonthSelector.jsx
│   │   ├── PredictionSummary.jsx
│   │   ├── RiskCard.jsx
│   │   ├── ScenarioChart.jsx
│   │   ├── LoadingSkeleton.jsx      # Skeleton loading state
│   │   ├── States.jsx               # ErrorState, EmptyState components
│   │   └── Header.jsx
│   ├── hooks/
│   │   └── usePrediction.js         # Custom hook for API calls & state management
│   ├── utils/
│   │   ├── api.js                   # API service layer (environment-based URL)
│   │   └── constants.js             # Companies, months, formatters, utilities
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles + animations + semantic colors
├── public/                          # Static assets
│   └── favicon.svg
├── index.html                       # HTML template
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Dependency lock file
├── vite.config.js                   # Vite bundler config
├── tailwind.config.js               # Tailwind CSS config
├── postcss.config.js                # PostCSS plugins
├── .env                             # Environment variables (git ignored)
├── .env.example                     # Template for env vars
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview

# dist/ folder ready for deployment
```

## 🔧 Environment Configuration

### Create `.env` file

```bash
cp .env.example .env
```

**Edit `.env` with your settings:**

**Option 1: Use deployed backend**
```
VITE_API_URL=https://climate-data-hackathon.onrender.com
```

**Option 2: Use local backend**
```
VITE_API_URL=http://127.0.0.1:8000
```

**Option 3: Custom backend**
```
VITE_API_URL=https://your-custom-backend.com
```

ℹ️ Backend must be running and have CORS enabled for frontend to work.

## 🎨 Features Implemented

### UI/UX Components ✅
- Modern gradient background (slate → cyan)
- Semantic color system (green/red/blue/orange)
- Interactive card components with hover effects
- Smooth animations (fade-in, scale-in, stagger)
- Loading skeleton states
- Error boundaries with retry logic
- Responsive grid layouts

### Predictions & Charts ✅
- Dynamic Recharts LineChart with smooth animations (800ms ease-in-out)
- Custom tooltip with price and % change display
- Dynamic temperature labels (chart updates based on slider position)
- Company-specific predictions with price multipliers
- Scenario comparison cards (0°C / +1°C / +2°C)

### Interactive Slider ✅
- Temperature range: −2°C to +2°C
- Real-time prediction updates (300ms debounce)
- Color-coded slider (blue/green/yellow/red)
- Visual indicators for selected temperature
- Dynamic chart updates showing correct temperature progression

### Data Display ✅
- Risk score calculation (Low/Medium/High)
- Confidence display ("Moderate based on historical patterns")
- Price formatting (₹ currency)
- Percentage change calculations with arrows (↑/↓)
- Historical prediction tracking

## 🔌 API Integration

### usePrediction Hook

Custom hook handling all API communication:

```javascript
const { data, loading, error, history, backendStatus, predict } = usePrediction()
```

### API Calls

All requests go through `api.js` service layer:
- `fetchPrediction(company, month, tempChange)` - Get predictions
- `checkHealth()` - Backend health check
- Environment-based URL switching

### Debouncing

Slider triggers predictions with 300ms debounce to prevent API spam.

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "vite": "^5.x",
  "tailwindcss": "^3.x",
  "recharts": "^2.x"
}
```

See `package.json` for complete list with versions.

## 🎯 Component Hierarchy

```
App (main with route logic)
├── DashboardHeader (title + backend status)
├── InputsPanel (controls)
│   ├── CompanySelector
│   ├── TempSlider (−2°C to +2°C)
│   └── MonthSelector
├── LoadingSkeleton (shows while loading)
├── ErrorState (shows on error)
├── EmptyState (shows on first load)
└── Results (when data loaded)
    ├── PriceChart (with dynamic labels)
    └── InsightCards (risk, trend, metrics)
```

## 💻 Build & Deployment

### Local Development

```bash
npm run dev
# HMR (Hot Module Replacement) enabled
# Changes reflect instantly in browser
```

### Production Build

```bash
npm run build
# Outputs to dist/ directory
# Optimized bundle: ~250 KB gzipped
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
# Follow prompts, set VITE_API_URL during deployment
```

### Deploy to Netlify

```bash
# Build locally then upload dist/
npm run build

# Or connect GitHub repo to Netlify
# Set environment variable VITE_API_URL in Netlify dashboard
```

### Deploy anywhere

```bash
npm run build
# Copy contents of dist/ to your web server
# Serve as static files (SPA routing requires config)
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Slider moves smoothly from −2°C to +2°C
- [ ] Chart labels update dynamically (e.g., −2°C, −1°C, 0°C when slider at −2)
- [ ] Company selection updates predictions instantly
- [ ] Error message displays on backend failure
- [ ] Loading skeleton shows while fetching
- [ ] All animations play smoothly (no jank)
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Color scheme is consistent throughout

### Debugging

1. **Check browser console** for errors
2. **Network tab** to inspect API calls
3. **React DevTools** to inspect component state
4. **Tailwind config** to verify styling

## 🐛 Troubleshooting

### Issue: "Cannot find module" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: API connection errors

1. Check `VITE_API_URL` in `.env`
2. Verify backend is running
3. Check CORS headers in backend
4. Check network tab for 404/500 errors

### Issue: Slider not updating chart

1. Verify `usePrediction` hook is called
2. Check debounce timer (300ms)
3. Verify API returns data
4. Check console for errors

### Issue: Styling not applied

1. Run `npm run dev` to trigger Tailwind rebuilding
2. Clear browser cache (Ctrl+Shift+Delete)
3. Check tailwind.config.js includes src/**
4. Verify no Tailwind conflicts in index.css

### Issue: Build fails

```bash
# Clear Vite cache
rm -rf .vite
npm run build
```

## 📚 Documentation

- [Root README](../README.md) - Project overview
- [Backend README](../fastapi_backend/README.md) - API documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)

## 🔐 Security Notes

- ✅ API URLs in environment variables (no hardcoding)
- ✅ .env file in .gitignore (not committed to git)
- ✅ No credentials or secrets in source code
- ✅ CORS requests properly validated
- ✅ Input sanitization on all user inputs

## 📝 Notes

- Uses Tailwind's responsive design system
- Custom hook `usePrediction` manages all backend state
- Animations use CSS keyframes with Tailwind utilities
- Component props follow React best practices
- All components are functional components with hooks

- Environment variables are configured through `.env` file
- The `.env` file is gitignored for security
- Use `.env.example` as a template for setting up environment variables
