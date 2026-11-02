'use client';

import React, { useState, useEffect } from 'react';
import {
  BrainCircuit,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Gauge,
  Sliders,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';
import { PredictionInput, PredictionOutput } from '@/lib/types';
import { runPrediction, FEATURE_INFO, FEATURE_ORDER } from '@/lib/ml-engine';

export default function PredictionTab() {
  // Default values matching latest actual dataset record (Dec 2025)
  const [formData, setFormData] = useState<PredictionInput>({
    tmax: 17.85,
    tmin: 5.96,
    tmean: 10.93,
    precip_mm: 89.1,
    et0_mm: 45.25,
    ndvi_land: 0.246,
    ndvi_veg: 0.298,
    veg_share: 55.4,
    month_num: 12,
  });

  const [result, setResult] = useState<PredictionOutput | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>('dec2025');

  // Compute prediction whenever formData changes
  useEffect(() => {
    // Fast instant prediction using the native random forest engine
    const res = runPrediction(formData);
    setResult(res);
  }, [formData]);

  const handleInputChange = (field: keyof PredictionInput, value: number) => {
    setActivePreset('custom');
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    if (presetName === 'dec2025') {
      // Recent Actual (Dec 2025)
      setFormData({
        tmax: 17.85,
        tmin: 5.96,
        tmean: 10.93,
        precip_mm: 89.1,
        et0_mm: 45.25,
        ndvi_land: 0.246,
        ndvi_veg: 0.298,
        veg_share: 55.4,
        month_num: 12,
      });
    } else if (presetName === 'monsoon') {
      // August Peak Kharif (Healthy)
      setFormData({
        tmax: 31.38,
        tmin: 22.54,
        tmean: 27.02,
        precip_mm: 198.0,
        et0_mm: 120.0,
        ndvi_land: 0.45,
        ndvi_veg: 0.457,
        veg_share: 97.5,
        month_num: 8,
      });
    } else if (presetName === 'heatwave') {
      // May Early Summer Heatwave (High Stress)
      setFormData({
        tmax: 38.5,
        tmin: 24.0,
        tmean: 32.0,
        precip_mm: 15.0,
        et0_mm: 190.0,
        ndvi_land: 0.25,
        ndvi_veg: 0.28,
        veg_share: 62.0,
        month_num: 5,
      });
    } else if (presetName === 'spring') {
      // April Transition (Harvest Period)
      setFormData({
        tmax: 24.78,
        tmin: 12.9,
        tmean: 18.84,
        precip_mm: 120.0,
        et0_mm: 129.1,
        ndvi_land: 0.349,
        ndvi_veg: 0.368,
        veg_share: 89.2,
        month_num: 4,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              Trained Random Forest Inference Engine
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Crop Stress Risk Prediction (فصل پر دباؤ کی پیشگوئی)
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">
              Predicts whether Buner crop vegetation will experience acute physiological stress
              (NDVI drop ≥ 0.03 in the following month) based on 9 micro-climate & satellite features.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Load Realistic Buner Scenarios:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              <button
                onClick={() => applyPreset('dec2025')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  activePreset === 'dec2025'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Dec 2025 Actual
              </button>
              <button
                onClick={() => applyPreset('monsoon')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  activePreset === 'monsoon'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Monsoon Peak (Healthy)
              </button>
              <button
                onClick={() => applyPreset('heatwave')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  activePreset === 'heatwave'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                May Heatwave (Stress)
              </button>
              <button
                onClick={() => applyPreset('spring')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  activePreset === 'spring'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                April Harvest
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = 9 Input Sliders, Right = Live Result & Advisory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 9 Features Input Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Input Climatic & Satellite Parameters (9 Features)</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Real-time inference</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURE_ORDER.map((feat) => {
              const info = FEATURE_INFO[feat];
              const value = formData[feat];

              return (
                <div
                  key={feat}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block">
                        {info.labelEn}
                      </label>
                      <span className="text-[11px] text-emerald-800 font-urdu block">
                        {info.labelUr}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-900 shadow-2xs">
                      {typeof value === 'number' ? (info.step < 1 ? value.toFixed(feat === 'ndvi_veg' || feat === 'ndvi_land' ? 3 : 1) : value) : value}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">{info.unit}</span>
                    </span>
                  </div>

                  {feat === 'month_num' ? (
                    <select
                      value={value}
                      onChange={(e) => handleInputChange('month_num', parseInt(e.target.value))}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    >
                      {[
                        'January (1)',
                        'February (2)',
                        'March (3)',
                        'April (4)',
                        'May (5)',
                        'June (6)',
                        'July (7)',
                        'August (8)',
                        'September (9)',
                        'October (10)',
                        'November (11)',
                        'December (12)',
                      ].map((m, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={info.min}
                        max={info.max}
                        step={info.step}
                        value={value}
                        onChange={(e) => handleInputChange(feat, parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                  )}

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Min: {info.min}</span>
                    <span>Max: {info.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Model Output & Bilingual Advisory (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {result && (
            <>
              {/* Primary Risk Status Card */}
              <div
                className={`rounded-2xl p-6 text-white shadow-md transition-all ${
                  result.prediction === 1
                    ? 'bg-gradient-to-br from-rose-600 via-rose-700 to-red-900 border border-rose-500'
                    : 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900 border border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-xs uppercase tracking-wider font-bold opacity-90 flex items-center gap-1.5">
                    <Gauge className="w-4 h-4" />
                    Forecast Outcome (پیشگوئی نتیجہ)
                  </span>
                  <span className="text-xs font-mono bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {result.prediction === 1 ? 'Class: 1 (Stress)' : 'Class: 0 (Normal)'}
                  </span>
                </div>

                <div className="my-5 flex flex-col items-center text-center space-y-2">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm mb-1">
                    {result.prediction === 1 ? (
                      <ShieldAlert className="w-10 h-10 text-white animate-pulse" />
                    ) : (
                      <ShieldCheck className="w-10 h-10 text-white" />
                    )}
                  </div>

                  <h3 className="text-2xl font-black tracking-tight">{result.labelEn}</h3>
                  <div className="text-base font-urdu font-semibold text-emerald-100 max-w-sm">
                    {result.labelUr}
                  </div>

                  {/* Risk Percentage Gauge */}
                  <div className="w-full mt-4 bg-white/10 p-3 rounded-xl backdrop-blur-sm space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span>Stress Risk Probability:</span>
                      <span className="text-sm font-bold">{result.riskPercentage}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          result.prediction === 1 ? 'bg-amber-300' : 'bg-emerald-300'
                        }`}
                        style={{ width: `${result.riskPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/70">
                      <span>0% (Safe)</span>
                      <span>50% Threshold</span>
                      <span>100% (Critical)</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-white/90 bg-black/20 p-3 rounded-xl leading-relaxed">
                  <p className="font-medium">{result.explanationEn}</p>
                  <p className="font-urdu mt-1 text-white/80">{result.explanationUr}</p>
                </div>
              </div>

              {/* Top Feature Drivers (Model Explainability) */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    Key Decision Drivers (سب سے اہم وجوہات)
                  </h4>
                  <span className="text-[11px] text-slate-400">Random Forest Weights</span>
                </div>

                <div className="space-y-2">
                  {result.featureContributions.slice(0, 4).map((f) => (
                    <div key={f.feature} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-700">{f.labelEn}</span>
                        <span className="font-mono text-slate-500">{(f.importance * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${Math.min(100, f.importance * 400)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agricultural Extension Advisory (Bilingual Urdu/English) */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Agronomic Advisory for Buner Farmers (زرعی ہدایات)
                  </h4>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs space-y-1.5">
                    <span className="font-bold text-emerald-900 block">English Advisory:</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                      {result.advisoryEn.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <span className="font-bold text-slate-900 block text-right font-urdu">
                      مقامی کسانوں کے لیے اردو ہدایات:
                    </span>
                    <ul className="list-disc pr-4 space-y-1 text-slate-800 text-[11px] font-urdu text-right">
                      {result.advisoryUr.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
