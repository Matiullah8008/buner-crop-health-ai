'use client';

import React from 'react';
import {
  BookOpen,
  GraduationCap,
  MapPin,
  Satellite,
  CloudSun,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Server,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
} from 'lucide-react';

export default function AboutTab() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Project Title Header */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            BS Data Science Capstone Project
          </span>
          <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Buner District, KPK, Pakistan
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI-Driven Micro-Climate & Crop Health Mapping for KPK Agriculture
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          An end-to-end data science and applied machine learning framework engineered to monitor vegetation
          dynamics and forecast localized agricultural stress in Khyber Pakhtunkhwa using open satellite earth observation
          and high-resolution climate modeling.
        </p>

        <div className="pt-3 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-t border-slate-100">
          <div>
            <strong className="text-slate-800">Target Region:</strong> Buner Valley (Daggar-Jowar)
          </div>
          <div>
            <strong className="text-slate-800">Time Horizon:</strong> 2023–2025 (36 Months)
          </div>
          <div>
            <strong className="text-slate-800">Primary Model:</strong> Optimized Random Forest (200 Trees)
          </div>
          <div>
            <strong className="text-slate-800">Test Accuracy:</strong> 85.7% Temporal Split
          </div>
        </div>
      </div>

      {/* Two Column Section: Problem & Objective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Problem */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <span className="p-1.5 rounded-lg bg-rose-100">⚠️</span>
            <h3>The Core Regional Problem in KPK</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Khyber Pakhtunkhwa’s agricultural sector (especially in valleys like Swat, Buner, and Hazara)
            is highly vulnerable to rapid micro-climatic shifts, unseasonal heatwaves, and abrupt drought cycles.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conventional ground weather stations are sparse across rugged mountainous districts. Smallholder farmers
            lack localized foresight to anticipate crop stress (chlorophyll degradation) before visible yield loss occurs.
          </p>
        </div>

        {/* Project Objective */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <span className="p-1.5 rounded-lg bg-emerald-100">🎯</span>
            <h3>The Research Objective</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Build a lightweight, automated data pipeline fusing free public earth observation satellite imagery
            (ESA Sentinel-2) and atmospheric weather reanalysis (Open-Meteo) to track vegetation vigor.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            Train a predictive Machine Learning model that anticipates next month’s vegetation stress
            (drop in NDVI ≥ 0.03) based on current temperature anomalies and moisture deficits.
          </p>
        </div>
      </div>

      {/* Methodology & Data Engineering */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Layers className="w-5 h-5 text-emerald-600" />
          <span>Data Science & Engineering Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1: Satellite STAC */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <Satellite className="w-4 h-4 text-emerald-600" />
              <span>1. Sentinel-2 Satellite STAC</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Queried Microsoft Planetary Computer STAC catalog across Buner bounding box <code className="text-[10px] bg-white px-1 py-0.5 rounded border border-slate-200">[72.40, 34.33, 72.54, 34.45]</code>.
              Extracted 10m resolution Red (B04) and Near-Infrared (B08) surface reflectance for each cloud-free monthly observation.
            </p>
          </div>

          {/* Step 2: Open-Meteo Weather */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <CloudSun className="w-4 h-4 text-sky-600" />
              <span>2. Climate Reanalysis (Open-Meteo)</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Harvested 1,096 continuous daily meteorological records (2023–2025) for Daggar Buner: daily maximum temp (<code className="text-[10px]">tmax</code>), minimum (<code className="text-[10px]">tmin</code>), mean (<code className="text-[10px]">tmean</code>), precipitation (<code className="text-[10px]">precip_mm</code>), and evapotranspiration (<code className="text-[10px]">et0_mm</code>).
            </p>
          </div>

          {/* Step 3: Feature Engineering & Target */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
              <BrainCircuit className="w-4 h-4 text-purple-600" />
              <span>3. Target Definition & Modeling</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Aligned monthly time-series. Target label was established as acute vegetation drop:
              <span className="block mt-1 font-mono text-[10px] text-purple-900 bg-purple-50 p-1 rounded">
                stress_next = (ndvi_veg - ndvi_next &gt;= 0.03)
              </span>
              Trained 200-estimator Random Forest with temporal cross-validation.
            </p>
          </div>
        </div>

        {/* Mathematical Formulations */}
        <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3 text-xs">
          <div className="font-bold text-emerald-400 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span>Mathematical Formulations</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-slate-400 text-[11px]">Normalized Difference Vegetation Index (NDVI):</span>
              <div className="p-2.5 rounded bg-slate-800 font-mono text-emerald-300">
                NDVI = (NIR - RED) / (NIR + RED)
              </div>
              <p className="text-[11px] text-slate-400">
                NIR = Band 8 (842 nm), RED = Band 4 (665 nm). Values range from -1 to +1; Buner healthy crops span 0.28 to 0.47.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 text-[11px]">Forward Stress Criterion (Target):</span>
              <div className="p-2.5 rounded bg-slate-800 font-mono text-amber-300">
                {'y_t = 1 if (NDVI_t - NDVI_{t+1}) ≥ 0.03 else 0'}
              </div>
              <p className="text-[11px] text-slate-400">
                Captures sharp chlorophyll decline driven by early summer heat anomalies and monsoon delays.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance & Validation */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Model Architecture & Empirical Evaluation</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-slate-900">200</span>
            <span className="text-xs text-slate-500 block">Ensemble Estimators</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-slate-900">3</span>
            <span className="text-xs text-slate-500 block">Max Tree Depth (Overfitting guard)</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-emerald-600">85.7%</span>
            <span className="text-xs text-slate-500 block">Out-of-Sample Accuracy</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-2xl font-black text-purple-600">9</span>
            <span className="text-xs text-slate-500 block">Input Feature Variables</span>
          </div>
        </div>

        {/* Feature Importance Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mt-2">
          <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-800">
            Empirical Feature Importance Ranking (Scikit-Learn Gini Importance)
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {[
              { feat: 'month_num', desc: 'Saal ka Mahina / Seasonality', imp: '19.2%' },
              { feat: 'ndvi_veg', desc: 'Fasal ki Sehat / Current Crop NDVI', imp: '18.1%' },
              { feat: 'ndvi_land', desc: 'Aam Zameen ki Hariyali / Land NDVI', imp: '14.9%' },
              { feat: 'veg_share', desc: 'Hariyali ka Hissa % / Green Cover Share', imp: '12.2%' },
              { feat: 'tmin', desc: 'Kam se Kam Tapman / Min Temperature', imp: '7.7%' },
              { feat: 'precip_mm', desc: 'Mahine ki Barish / Rainfall', imp: '7.3%' },
              { feat: 'et0_mm', desc: 'Pani ka Bukharaat Banna / Evapotranspiration', imp: '7.1%' },
              { feat: 'tmean', desc: 'Ausat Tapman / Mean Temperature', imp: '6.8%' },
              { feat: 'tmax', desc: 'Zyada se Zyada Tapman / Max Temperature', imp: '6.7%' },
            ].map((f, i) => (
              <div key={f.feat} className="px-4 py-2 flex items-center justify-between hover:bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 w-4">{i + 1}.</span>
                  <code className="font-bold text-slate-900">{f.feat}</code>
                  <span className="text-slate-500 hidden sm:inline">({f.desc})</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {f.imp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment & Architecture Guide */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-5 h-5 text-emerald-600" />
          <span>Production Architecture & Vercel / Render Deployment</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="font-bold text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Vercel-Native Deployment (Recommended)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              The Next.js App Router incorporates an optimized tree inference engine compiled directly from
              <code className="bg-white px-1 py-0.5 rounded border border-emerald-200 text-emerald-800 mx-1">buner_crop_model.pkl</code>.
              It executes with 0ms cold starts, zero heavy C-extension dependencies, and passes 100% of Vercel’s serverless build checks.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-2">
            <div className="font-bold text-sky-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-600" />
              <span>Standalone Python Backend (Render / Local)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Included in <code className="bg-white px-1 py-0.5 rounded border border-sky-200 text-sky-800 mx-1">backend/server.py</code> is a
              dependency-free Python HTTP server that uses <code className="text-slate-800">joblib.load()</code> to serve live Scikit-Learn predictions on port 8000.
              Set <code className="bg-white px-1 py-0.5 rounded border border-sky-200 text-sky-800 mx-1">PYTHON_BACKEND_URL</code> to connect Next.js.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
