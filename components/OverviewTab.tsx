'use client';

import React from 'react';
import {
  TrendingUp,
  Droplets,
  Thermometer,
  Trees,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Satellite,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import monthlyData from '@/lib/data/monthly_merged.json';
import { MonthlyRecord } from '@/lib/types';

interface OverviewTabProps {
  onNavigateToPredict: () => void;
  onNavigateToNdvi: () => void;
}

export default function OverviewTab({
  onNavigateToPredict,
  onNavigateToNdvi,
}: OverviewTabProps) {
  const records = monthlyData as MonthlyRecord[];
  const latest = records[records.length - 1]; // 2025-12
  const prev = records[records.length - 2];

  // Highest & lowest historical NDVI
  let peakRecord = records[0];
  let troughRecord = records[0];
  records.forEach((r) => {
    if (r.ndvi_veg > peakRecord.ndvi_veg) peakRecord = r;
    if (r.ndvi_veg < troughRecord.ndvi_veg) troughRecord = r;
  });

  const ndviDiff = ((latest.ndvi_veg - prev.ndvi_veg) / prev.ndvi_veg) * 100;

  return (
    <div className="space-y-6">
      {/* Hero Notification Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-forest-900 to-emerald-950 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Multi-Source Satellite & Climate Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Buner Micro-Climate & Crop Health Monitoring
            </h2>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Monitoring 36 months (2023–2025) of calibrated Sentinel-2 L2A multispectral observations and
              Open-Meteo agro-climatology across Daggar-Jowar valley, Buner, Khyber Pakhtunkhwa.
            </p>
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Latest Cycle: <strong className="text-white">{latest.month}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-emerald-400" />
                Satellite: <strong className="text-white">Sentinel-2 (10m Res)</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Observations: <strong className="text-white">36 Continuous Months</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={onNavigateToPredict}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-emerald-500/30 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Stress Model</span>
              <span className="text-xs opacity-80">(پیشگوئی آزمائیں)</span>
            </button>
            <button
              onClick={onNavigateToNdvi}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all backdrop-blur-sm"
            >
              <Satellite className="w-4 h-4" />
              <span>Explore Satellite Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Crop NDVI */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Crop NDVI (Sehat)
            </span>
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latest.ndvi_veg.toFixed(3)}</span>
            <span
              className={`flex items-center text-xs font-semibold ${
                ndviDiff >= 0 ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {ndviDiff >= 0 ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {Math.abs(ndviDiff).toFixed(1)}% MoM
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>فصل کی ہریالی انڈیکس</span>
            <span className="font-medium text-slate-700">Healthy range 0.28–0.47</span>
          </p>
        </div>

        {/* Metric 2: Rainfall */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Monthly Rainfall
            </span>
            <div className="p-2 rounded-lg bg-sky-100 text-sky-700">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latest.precip_mm.toFixed(0)}</span>
            <span className="text-sm font-medium text-slate-500">mm / month</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>ماہانہ بارش (اوپن میٹیو)</span>
            <span className="font-medium text-sky-700">Winter showers</span>
          </p>
        </div>

        {/* Metric 3: Mean Temperature */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Mean Temperature
            </span>
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
              <Thermometer className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latest.tmean.toFixed(1)}</span>
            <span className="text-sm font-medium text-slate-500">°C</span>
            <span className="text-xs text-slate-400">
              (Min {latest.tmin.toFixed(0)}° / Max {latest.tmax.toFixed(0)}°)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>اوسط درجہ حرارت</span>
            <span className="font-medium text-slate-700">Rabi growth season</span>
          </p>
        </div>

        {/* Metric 4: Green Cover Share */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Vegetation Share
            </span>
            <div className="p-2 rounded-lg bg-green-100 text-green-700">
              <Trees className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{latest.veg_share.toFixed(1)}</span>
            <span className="text-sm font-medium text-slate-500">% area</span>
          </div>
          <p className="mt-2 text-xs text-slate-500 flex justify-between">
            <span>ہریالی کا مجموعی حصہ</span>
            <span className="font-medium text-green-700">Valley floor canopy</span>
          </p>
        </div>
      </div>

      {/* Historical Extremes & Real Satellite Imagery Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 2 Columns - 36-Month NDVI & Weather Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>36-Month Historical Trajectory (2023–2025)</span>
                <span className="text-xs font-normal text-slate-500">(فصل کی صحت بمقابلہ بارش)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Monthly Sentinel-2 Crop NDVI against Open-Meteo precipitation in Buner
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                <span className="w-3 h-1 bg-emerald-600 rounded-full" />
                NDVI Veg
              </span>
              <span className="flex items-center gap-1.5 font-medium text-sky-700">
                <span className="w-3 h-3 bg-sky-400/40 border border-sky-500 rounded-sm" />
                Rainfall (mm)
              </span>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={records} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return parts[1] === '01' || parts[1] === '07' ? `${parts[1]}/${parts[0].slice(2)}` : '';
                  }}
                  interval={0}
                />
                <YAxis
                  yAxisId="ndvi"
                  domain={[0.15, 0.55]}
                  tick={{ fontSize: 11, fill: '#10b981' }}
                  tickFormatter={(val) => val.toFixed(2)}
                />
                <YAxis
                  yAxisId="rain"
                  orientation="right"
                  domain={[0, 260]}
                  tick={{ fontSize: 11, fill: '#0284c7' }}
                  tickFormatter={(val) => `${val}mm`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload as MonthlyRecord;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1">
                          <div className="font-bold text-emerald-400 border-b border-slate-700 pb-1">
                            {d.month} (Photo: {d.date})
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Crop NDVI:</span>
                            <span className="font-semibold text-emerald-300">{d.ndvi_veg.toFixed(3)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Land NDVI:</span>
                            <span className="font-semibold text-slate-200">{d.ndvi_land.toFixed(3)}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Rainfall:</span>
                            <span className="font-semibold text-sky-300">{d.precip_mm.toFixed(1)} mm</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Mean Temp:</span>
                            <span className="font-semibold text-amber-300">{d.tmean.toFixed(1)} °C</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-300">Green Cover:</span>
                            <span className="font-semibold text-green-300">{d.veg_share.toFixed(1)}%</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  yAxisId="rain"
                  dataKey="precip_mm"
                  fill="#38bdf8"
                  opacity={0.35}
                  radius={[3, 3, 0, 0]}
                  name="Rainfall (mm)"
                />
                <Line
                  yAxisId="ndvi"
                  type="monotone"
                  dataKey="ndvi_veg"
                  stroke="#059669"
                  strokeWidth={2.5}
                  dot={{ r: 2.5, fill: '#059669' }}
                  activeDot={{ r: 5, fill: '#10b981' }}
                  name="Crop NDVI"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-emerald-900 block">Peak Health Record (سب سے سرسبز)</span>
                <span className="text-slate-600">
                  {peakRecord.month} — Monsoon Peak Growth
                </span>
              </div>
              <span className="text-base font-extrabold text-emerald-700">
                {peakRecord.ndvi_veg.toFixed(3)} NDVI
              </span>
            </div>

            <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-amber-900 block">Vulnerability Record (سب سے کمزور)</span>
                <span className="text-slate-600">
                  {troughRecord.month} — Pre-Monsoon Heat Stress
                </span>
              </div>
              <span className="text-base font-extrabold text-amber-700">
                {troughRecord.ndvi_veg.toFixed(3)} NDVI
              </span>
            </div>
          </div>
        </div>

        {/* Right: 1 Column - Sentinel-2 Real Satellite Map Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <Satellite className="w-3.5 h-3.5" />
                Actual Sentinel-2 Scene
              </span>
              <span className="text-xs text-slate-500 font-mono">2025-04-29</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Buner Valley Satellite NDVI
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Multi-spectral reflectance (Red B04 & NIR B08) calibrated via Microsoft Planetary Computer STAC API.
            </p>
          </div>

          {/* Actual Image from user's Colab pipeline */}
          <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-950 aspect-square group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/buner_ndvi_apr2025.png"
              alt="Buner Sentinel-2 NDVI Map April 2025"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
              <div className="text-white text-xs space-y-0.5">
                <div className="font-semibold text-emerald-300">Daggar & Jowar Valley Floor</div>
                <div className="text-[11px] text-slate-300 flex items-center gap-2">
                  <span>Cloud: 0.00%</span>
                  <span>•</span>
                  <span>Clear Area: 97.0%</span>
                  <span>•</span>
                  <span>Veg: 81.2%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/80 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-emerald-600" />
              <span>زمین اور فصل کی وضاحت (Color Scale):</span>
            </div>
            <p className="text-[11px] text-slate-600">
              سبز رنگ صحت مند فصلوں اور درختوں کو ظاہر کرتا ہے، جبکہ ہلکا زرد اور سرخ رنگ غیر آباد پہاڑی چٹانوں اور خشک مٹی کی نشاندہی کرتا ہے۔
            </p>
          </div>
        </div>
      </div>

      {/* Real-time Agro-Climatic Intelligence & Extension Alert Banner */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 mt-1">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Current Status: Low Vulnerability
                </span>
                <span className="text-xs text-slate-500 font-urdu">فصل کی موجودہ صورتحال تسلی بخش ہے</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Rabi Season Moisture Reserve in Buner is Stable
              </h4>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                With 89.1 mm of rainfall recorded in December 2025 and moderate winter temperatures (Mean 10.9°C),
                the trained Random Forest model predicts minimal probability of acute stress (&lt;43% risk) for
                the upcoming wheat tillering period.
              </p>
            </div>
          </div>

          <button
            onClick={onNavigateToPredict}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors whitespace-nowrap self-stretch md:self-auto justify-center"
          >
            <span>Simulate Climate Anomaly</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
