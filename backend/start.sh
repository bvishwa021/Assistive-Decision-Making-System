#!/bin/bash
set -e

echo "Generating dataset..."
python generate_dataset.py

echo "Training model..."
python retrain_model.py

echo "Copying model files..."
cp scaler_v2.pkl model/scaler.pkl
cp kmeans_model_v2.pkl model/kmeans_model.pkl

echo "Starting app..."
gunicorn app:app
```

---

**Deploying the Backend on Render**

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Set these settings:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `bash start.sh`
   - **Environment:** Python 3
4. Click Deploy

Once deployed, Render gives you a URL like:
```
https://your-app-name.onrender.com