# AI-Driven Micro-Climate & Crop Health Mapping for KPK Agriculture

### Study Area: Buner District (Daggar-Jowar Valley), Khyber Pakhtunkhwa, Pakistan
**BS Data Science Capstone Project**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-teal?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-Random%20Forest-orange?style=flat&logo=scikit-learn)](https://scikit-learn.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployable-black?style=flat&logo=vercel)](https://vercel.com/)

---

## 🌾 Project Overview

Khyber Pakhtunkhwa's agricultural sector in mountainous valleys like **Buner, Swat, and Hazara** is increasingly vulnerable to rapid micro-climatic shifts, unseasonal early summer heatwaves, and erratic precipitation. Because meteorological ground stations are sparse in rugged terrain, anticipating localized crop stress before visible crop failure occurs is a significant challenge for local farmers and extension workers.

This project implements an end-to-end data pipeline fusing:
1. **Multispectral Earth Observation:** 10-meter spatial resolution Near-Infrared (Band 8) and Red (Band 4) satellite data from **Sentinel-2 L2A** via Microsoft Planetary Computer STAC API.
2. **High-Resolution Agro-Climatology:** 1,096 continuous daily meteorological records (2023–2025) harvested from the **Open-Meteo Archive API**.
3. **Machine Learning:** A trained **Random Forest Classifier** that predicts whether Buner crop vegetation will experience acute physiological stress (NDVI drop ≥ 0.03 in the upcoming month).

---

## 📊 The 9 Machine Learning Features

The model uses 9 empirical agro-climatic and satellite features:

| Feature | English Description | Urdu Description | Importance |
| :--- | :--- | :--- | :--- |
| `month_num` | Calendar Month (Seasonality) | سال کا مہینہ (موسم) | 19.2% |
| `ndvi_veg` | Crop Canopy NDVI (Vegetation) | فصل کی صحت (سبزہ) | 18.1% |
| `ndvi_land` | Regional Land NDVI (All Land) | عام زمین کی ہریالی | 14.9% |
| `veg_share` | Active Green Cover Share (%) | ہریالی کا رقبہ | 12.2% |
| `tmin` | Minimum Temperature (°C) | کم سے کم درجہ حرارت | 7.7% |
| `precip_mm` | Total Monthly Rainfall (mm) | ماہانہ بارش | 7.3% |
| `et0_mm` | Reference Evapotranspiration (mm) | پانی کا بخارات بننا | 7.1% |
| `tmean` | Mean Temperature (°C) | اوسط درجہ حرارت | 6.8% |
| `tmax` | Maximum Temperature (°C) | زیادہ سے زیادہ درجہ حرارت | 6.7% |

- **Target Variable:** `stress_next = 1` if next month's NDVI drops by $\ge 0.03$; else `0`.
- **Validation:** Strict temporal out-of-sample split (28 months train, 7 months test) achieved **85.7% accuracy**.

---

## 🚀 Key Dashboard Features

1. **Executive Overview:** Real-time KPI metrics (Crop NDVI, Monthly Rainfall, Mean Temperature, Vegetation Share), historical extremes, and Sentinel-2 satellite scene preview.
2. **NDVI Monitoring:** Interactive time-series charts (Recharts) comparing Crop NDVI vs Total Land NDVI, seasonal phenology curves (Rabi vs Kharif), and cloud-free satellite quality metrics.
3. **Weather Analytics:** Temperature range trends (Tmax, Tmin, Tmean), Rainfall vs Evapotranspiration (ET0) water balance chart, and a 1,096-day daily climate explorer.
4. **Crop Stress Prediction (AI):** Interactive real-time form with sliders and numeric steppers for all 9 features, 4 realistic preset scenarios (e.g. Dec 2025 Actual, August Monsoon, May Drought), stress gauge meter, and bilingual Urdu/English agronomic advisories.
5. **Data Explorer:** Tabular inspection with full-text search, column sorting, pagination, and one-click direct CSV download buttons for all 3 datasets.
6. **About & Methodology:** Complete academic capstone documentation, satellite STAC pipeline details, mathematical formulation, and model architecture.

---

## 🛠️ Project Structure

```
├── app/
│   ├── api/predict/route.ts       # Next.js Serverless prediction endpoint
│   ├── globals.css                # Tailwind CSS and Urdu typography styles
│   ├── layout.tsx                 # Root layout with fonts & metadata
│   └── page.tsx                   # Main dashboard application
├── components/
│   ├── Navbar.tsx                 # Header, tabs, and district badges
│   ├── OverviewTab.tsx            # KPI metrics & 36-month trend chart
│   ├── NdviTab.tsx                # Sentinel-2 vegetation health analysis
│   ├── WeatherTab.tsx             # Climatology & water balance analytics
│   ├── PredictionTab.tsx          # Real-time Random Forest prediction UI
│   ├── DataExplorerTab.tsx        # Searchable CSV viewer and downloader
│   └── AboutTab.tsx               # Academic project documentation
├── lib/
│   ├── types.ts                   # TypeScript data definitions
│   ├── ml-engine.ts               # Zero-dependency Random Forest inference engine
│   └── data/
│       ├── model_trees.json       # Exact 200 decision trees compiled from pkl
│       ├── monthly_merged.json    # 36 months of real merged observations
│       ├── weather_daily.json     # 1,096 daily weather observations
│       └── ndvi_raw.json          # Monthly raw Sentinel-2 STAC records
├── public/
│   ├── data/                      # Direct downloadable CSV files
│   │   ├── buner_monthly_merged.csv
│   │   ├── buner_weather_daily.csv
│   │   └── buner_ndvi_monthly_raw.csv
│   └── images/
│       ├── buner_ndvi_apr2025.png # Real 10m Sentinel-2 NDVI satellite map
│       └── buner_ndvi_weather_chart.png
├── backend/
│   ├── server.py                  # Standalone Python HTTP API loading buner_crop_model.pkl
│   └── requirements.txt           # Python dependencies for Render/Railway
├── buner_crop_model.pkl           # Original trained Scikit-Learn model
├── buner_week2_ndvi.ipynb         # Google Colab data science notebook
├── package.json                   # Next.js dependencies
└── README.md                      # Documentation
```

---

## 💻 Local Development

### 1. Frontend (Next.js)
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Standalone Python Backend (Optional)
If you want to run the native Python inference server loading `buner_crop_model.pkl`:
```bash
python backend/server.py
```
The Python server starts on `http://localhost:8000`.

---

## ☁️ Deployment Guide

### Deploy to Vercel (Recommended)
1. Push this repository to your **GitHub** account.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Leave the Framework Preset as **Next.js** and root directory as `./`.
5. Click **Deploy**.

> **Note:** The application uses an internal compiled tree representation of `buner_crop_model.pkl` inside `/lib/ml-engine.ts` which runs with 0ms latency, zero cold starts, and 100% reliability on Vercel Serverless without heavy Python wheel size constraints!

### Deploy Python Backend to Render (Optional)
If you prefer running the Python API separately on Render:
1. In Render, create a new **Web Service**.
2. Connect your repository.
3. Build Command: `pip install -r backend/requirements.txt`
4. Start Command: `python backend/server.py`
5. In your Vercel project environment variables, add `PYTHON_BACKEND_URL` set to your Render URL.

---

## 👥 Authors & Acknowledgments

- **Project:** BS Data Science Final Capstone Project
- **Region:** Buner District, Khyber Pakhtunkhwa, Pakistan
- **Data Providers:**
  - European Space Agency (ESA) Sentinel-2 via Microsoft Planetary Computer
  - Open-Meteo Historical Weather Archive
