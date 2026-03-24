# Google Cloud Run Deployment Guide

## Prerequisites

1. Google Cloud SDK installed (`gcloud`)
2. Docker installed (for local testing)
3. GCP Project with Cloud Run API enabled
4. Service account with appropriate permissions

## Local Testing (Optional)

Build and test the Docker image locally:

```bash
# Build image
docker build -t climate-backend:latest .

# Run locally
docker run -p 8080:8080 \
  -e PORT=8080 \
  climate-backend:latest

# Test
curl http://localhost:8080/health
curl "http://localhost:8080/predict?company=NTPC.NS&month=6&temp_change=0"
```

## Deploy to Cloud Run

### Step 1: Set up Google Cloud

```bash
# Set your GCP project ID
export PROJECT_ID="your-project-id"
export SERVICE_NAME="climate-backend"
export REGION="us-central1"  # or your preferred region

# Authenticate
gcloud auth login
gcloud config set project $PROJECT_ID
```

### Step 2: Deploy to Cloud Run

```bash
gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region $REGION \
  --memory 512Mi \
  --cpu 1 \
  --timeout 3600 \
  --allow-unauthenticated
```

Or build and push manually:

```bash
# Set up Artifact Registry
export IMAGE_NAME="${REGION}-docker.pkg.dev/${PROJECT_ID}/climate-backend/${SERVICE_NAME}:latest"

# Build and push
gcloud builds submit --tag $IMAGE_NAME .

# Deploy
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --memory 512Mi \
  --cpu 1 \
  --allow-unauthenticated
```

### Step 3: Get Service URL

```bash
gcloud run services describe $SERVICE_NAME --region $REGION
```

Or view in Cloud Console: https://console.cloud.google.com/run

## Environment Variables

Cloud Run automatically sets:
- `PORT`: 8080 (the app reads this)

Additional environment variables can be set during deployment:

```bash
gcloud run deploy $SERVICE_NAME \
  --update-env-vars "VAR_NAME=value"
```

## Testing the Deployed Service

```bash
# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
  --region $REGION \
  --format 'value(status.url)')

# Test health
curl $SERVICE_URL/health

# Test prediction
curl "$SERVICE_URL/predict?company=NTPC.NS&month=6&temp_change=0"
```

## Production Checklist

- ✅ PORT environment variable configuration
- ✅ CORS enabled for frontend
- ✅ Health check endpoint (`/health`)
- ✅ Error handling with meaningful messages
- ✅ Model files included in Docker image
- ✅ Dependencies in requirements.txt
- ✅ Dockerfile optimized (slim image, multi-stage optional)
- ✅ .dockerignore configured
- ✅ No hardcoded credentials
- ✅ Proper host binding (0.0.0.0)

## Monitoring

View logs:
```bash
gcloud run logs read $SERVICE_NAME --region $REGION
```

## Cost Optimization Tips

1. **Right-size resources**: Start with 256Mi memory, scale up if needed
2. **Set max instances**: Prevent runaway costs
3. **Request timeout**: Adjust based on prediction time
4. **Cloud Run pricing**: Only charged when requests are being served

## Troubleshooting

### Model files not found
- Verify model.pkl, scaler.pkl, features.pkl exist in fastapi_backend/
- Check Dockerfile COPY commands

### Port binding error
- Ensure PORT environment variable is set
- Cloud Run expects app to listen on 0.0.0.0:$PORT

### CORS errors
- CORS is configured to allow all origins ("*")
- For production, restrict to your frontend domain

### Memory issues
- If predictions timeout, increase memory
- `--memory 1Gi` for larger models

## Update Deployment

```bash
# After making code changes
gcloud run deploy $SERVICE_NAME --source .
```

## Rollback

```bash
gcloud run deploy $SERVICE_NAME \
  --image [previous-image-url] \
  --region $REGION
```

## Frontend Configuration

Update frontend `.env`:

```
VITE_API_URL=https://your-service-name-RANDOMID-region.a.run.app
```

Or set at build time:
```bash
npm run build -- --define VITE_API_URL="https://your-service-url"
```

---

**Status**: ✅ Ready for Cloud Run  
**Image Size**: ~1.2 GB (Python 3.10 slim + dependencies)
