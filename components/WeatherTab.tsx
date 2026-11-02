'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  Calendar,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Activity,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';
import monthlyData from '@/lib/data/monthly_merged.json';
import dailyData from '@/lib/data/weather_daily.json';
import { MonthlyRecord, DailyRecord } from '@/lib/types';

export default function WeatherTab() {
  const monthly = monthlyData as MonthlyRecord[];
  const daily = dailyData as DailyRecord[];

  const [activeView, setActiveView] = useState<'monthly' | 'daily'>('monthly');
  const [selectedYear, setSelectedYear] = useState<string>('2025');

  // Daily records filtered by selected year
  const filteredDaily = daily.filter((d) => d.time.startsWith(selectedYear));

  // Extreme weather stats
  let wettest = monthly[0];
  let driest = monthly[0];
  let hottest = monthly[0];
  let coldest = monthly[0];

  monthly.forEach((m) => {
    if (m.precip_mm > wettest.precip_mm) wettest = m;
    if (m.precip_mm < driest.precip_mm) driest = m;
    if (m.tmax > hottest.tmax) hottest = m;
    if (m.tmin < coldest.tmin) coldest = m;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner and Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-sky-600" />
            <span>Open-Meteo Agro-Climate Analytics</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Micro-climate tracking across Buner District (Coordinates: 34.39°N, 72.47°E, Elevation: ~680m)
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveView('monthly')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeView === 'monthly'
                ? 'bg-sky-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Climatology (36 mo)
          </button>
          <button
            onClick={() => setActiveView('daily')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeView === 'daily'
                ? 'bg-sky-600 text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily Weather (1,096 days)
          </button>
        </div>
      </div>

      {/* 4 Agro-Climatic Extreme Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Peak Rainfall */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-lg bg-sky-100 text-sky-700">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Wettest Month</span>
            <div className="text-lg font-bold text-slate-900">{wettest.precip_mm.toFixed(0)} mm</div>
            <div className="text-xs text-sky-700 font-medium">{wettest.month} (Monsoon)</div>
          </div>
        </div>

        {/* Card 2: Driest Month */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-lg bg-amber-100 text-amber-700">
            <Sun className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Driest Month</span>
            <div className="text-lg font-bold text-slate-900">{driest.precip_mm.toFixed(1)} mm</div>
            <div className="text-xs text-amber-700 font-medium">{driest.month} (Drought risk)</div>
          </div>
        </div>

        {/* Card 3: Max Temperature */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-lg bg-rose-100 text-rose-700">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Hottest Month (Tmax)</span>
            <div className="text-lg font-bold text-slate-900">{hottest.tmax.toFixed(1)} °C</div>
            <div className="text-xs text-rose-700 font-medium">{hottest.month} (Heat anomaly)</div>
          </div>
        </div>

        {/* Card 4: Min Temperature */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="p-3 rounded-lg bg-indigo-100 text-indigo-700">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase">Coldest Month (Tmin)</span>
            <div className="text-lg font-bold text-slate-900">{coldest.tmin.toFixed(1)} °C</div>
            <div className="text-xs text-indigo-700 font-medium">{coldest.month} (Winter frost)</div>
          </div>
        </div>
      </div>

      {activeView === 'monthly' ? (
        <>
          {/* Chart 1: Temperature Dynamics (Tmax, Tmean, Tmin) */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Monthly Temperature Dynamics in Buner (2023–2025)
                </h3>
                <p className="text-xs text-slate-500">
                  Maximum, Mean, and Minimum 2-meter air temperature profiles
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-rose-600">
                  <span className="w-3.5 h-1 bg-rose-500 rounded-full" />
                  Tmax (°C)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-amber-600">
                  <span className="w-3.5 h-1 bg-amber-500 rounded-full" />
                  Tmean (°C)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-indigo-600">
                  <span className="w-3.5 h-1 bg-indigo-500 rounded-full" />
                  Tmin (°C)
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={2}
                  />
                  <YAxis
                    domain={[0, 42]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}°C`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload as MonthlyRecord;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg text-xs space-y-1">
                            <div className="font-bold text-amber-400 border-b border-slate-700 pb-1">
                              {d.month} Temperatures
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-rose-400">Max Temp:</span>
                              <span className="font-bold">{d.tmax.toFixed(1)} °C</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-amber-400">Mean Temp:</span>
                              <span className="font-bold">{d.tmean.toFixed(1)} °C</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-indigo-400">Min Temp:</span>
                              <span className="font-bold">{d.tmin.toFixed(1)} °C</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tmax"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    name="Max Temp"
                  />
                  <Line
                    type="monotone"
                    dataKey="tmean"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                    name="Mean Temp"
                  />
                  <Line
                    type="monotone"
                    dataKey="tmin"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    name="Min Temp"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Rainfall vs Evapotranspiration (ET0) Water Balance */}
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Hydro-Climatic Water Deficit: Rainfall vs Evapotranspiration (ET0)
                </h3>
                <p className="text-xs text-slate-500">
                  When Evapotranspiration (ET0) exceeds precipitation, Buner valley crops suffer soil moisture deficit
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-sky-700">
                  <span className="w-3.5 h-3 bg-sky-500 rounded-sm" />
                  Precipitation (mm)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-amber-700">
                  <span className="w-3.5 h-1 bg-amber-500 rounded-full" />
                  Evapotranspiration ET0 (mm)
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthly} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={2}
                  />
                  <YAxis
                    domain={[0, 260]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}mm`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload as MonthlyRecord;
                        const deficit = d.precip_mm - d.et0_mm;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg text-xs space-y-1">
                            <div className="font-bold text-sky-400 border-b border-slate-700 pb-1">
                              {d.month} Water Balance
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-sky-300">Precipitation:</span>
                              <span className="font-bold">{d.precip_mm.toFixed(1)} mm</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-amber-300">Evapotranspiration (ET0):</span>
                              <span className="font-bold">{d.et0_mm.toFixed(1)} mm</span>
                            </div>
                            <div className="flex justify-between gap-4 pt-1 border-t border-slate-700">
                              <span className="text-slate-300">Net Balance:</span>
                              <span
                                className={`font-bold ${
                                  deficit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                              >
                                {deficit >= 0 ? `+${deficit.toFixed(1)}` : deficit.toFixed(1)} mm
                                ({deficit >= 0 ? 'Surplus' : 'Deficit'})
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="precip_mm"
                    fill="#0ea5e9"
                    opacity={0.7}
                    radius={[3, 3, 0, 0]}
                    name="Rainfall"
                  />
                  <Line
                    type="monotone"
                    dataKey="et0_mm"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    dot={{ r: 2 }}
                    name="Evapotranspiration"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        /* Daily Weather Records View */
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Daily Climate Records ({selectedYear}) — 365 Days
              </h3>
              <p className="text-xs text-slate-500">
                Granular daily weather parameters from Open-Meteo Archive
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Filter Year:</span>
              {['2023', '2024', '2025'].map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedYear === y
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Line Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredDaily} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 10, fill: '#64748b' }}
                  tickFormatter={(val) => {
                    const parts = val.split('-');
                    return parts[2] === '01' ? `${parts[1]}/${parts[0].slice(2)}` : '';
                  }}
                  interval={0}
                />
                <YAxis
                  domain={[-5, 45]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => `${val}°C`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload as DailyRecord;
                      return (
                        <div className="bg-slate-950 text-white p-3 rounded-lg text-xs space-y-1">
                          <div className="font-bold text-sky-400">{d.time}</div>
                          <div>Max Temp: {d.temperature_2m_max}°C</div>
                          <div>Min Temp: {d.temperature_2m_min}°C</div>
                          <div>Precipitation: {d.precipitation_sum} mm</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature_2m_max"
                  stroke="#ef4444"
                  strokeWidth={1.5}
                  dot={false}
                  name="Max Temp"
                />
                <Line
                  type="monotone"
                  dataKey="temperature_2m_min"
                  stroke="#3b82f6"
                  strokeWidth={1.5}
                  dot={false}
                  name="Min Temp"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Table Preview */}
          <div className="overflow-x-auto max-h-60 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 sticky top-0 border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="px-3 py-2">Date (Time)</th>
                  <th className="px-3 py-2">Tmax (°C)</th>
                  <th className="px-3 py-2">Tmin (°C)</th>
                  <th className="px-3 py-2">Tmean (°C)</th>
                  <th className="px-3 py-2">Precipitation (mm)</th>
                  <th className="px-3 py-2">ET0 (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDaily.slice(0, 20).map((d) => (
                  <tr key={d.time} className="hover:bg-slate-50">
                    <td className="px-3 py-1.5 font-mono text-slate-900">{d.time}</td>
                    <td className="px-3 py-1.5 text-rose-600 font-semibold">{d.temperature_2m_max.toFixed(1)}</td>
                    <td className="px-3 py-1.5 text-blue-600 font-semibold">{d.temperature_2m_min.toFixed(1)}</td>
                    <td className="px-3 py-1.5 text-slate-700">{d.temperature_2m_mean.toFixed(1)}</td>
                    <td className="px-3 py-1.5 text-sky-700 font-medium">{d.precipitation_sum.toFixed(1)}</td>
                    <td className="px-3 py-1.5 text-amber-700 font-medium">{d.et0_fao_evapotranspiration.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
