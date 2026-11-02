'use client';

import React, { useState } from 'react';
import {
  Database,
  Download,
  Search,
  ArrowUpDown,
  FileSpreadsheet,
  Layers,
  Calendar,
  Check,
} from 'lucide-react';
import monthlyData from '@/lib/data/monthly_merged.json';
import dailyData from '@/lib/data/weather_daily.json';
import ndviRawData from '@/lib/data/ndvi_raw.json';
import { MonthlyRecord, DailyRecord, RawNdviRecord } from '@/lib/types';

export default function DataExplorerTab() {
  const [selectedDataset, setSelectedDataset] = useState<'monthly' | 'daily' | 'rawNdvi'>('monthly');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const pageSize = 15;

  const monthly = monthlyData as unknown as MonthlyRecord[];
  const daily = dailyData as unknown as DailyRecord[];
  const rawNdvi = ndviRawData as unknown as RawNdviRecord[];

  let currentData: any[] = [];
  let downloadUrl = '';
  let downloadFilename = '';
  let datasetTitle = '';
  let datasetDescription = '';

  if (selectedDataset === 'monthly') {
    currentData = monthly;
    downloadUrl = '/data/buner_monthly_merged.csv';
    downloadFilename = 'buner_monthly_merged.csv';
    datasetTitle = 'Monthly Merged Master Dataset (buner_monthly_merged.csv)';
    datasetDescription =
      '36 continuous months (2023–2025) of fused Sentinel-2 NDVI satellite bands and Open-Meteo climate variables used to train the Random Forest model.';
  } else if (selectedDataset === 'daily') {
    currentData = daily;
    downloadUrl = '/data/buner_weather_daily.csv';
    downloadFilename = 'buner_weather_daily.csv';
    datasetTitle = 'Daily Weather Records (buner_weather_daily.csv)';
    datasetDescription =
      '1,096 continuous days (2023–2025) of micro-climate records (Tmax, Tmin, Tmean, Precipitation) for Buner District.';
  } else {
    currentData = rawNdvi;
    downloadUrl = '/data/buner_ndvi_monthly_raw.csv';
    downloadFilename = 'buner_ndvi_monthly_raw.csv';
    datasetTitle = 'Raw Sentinel-2 STAC Query (buner_ndvi_monthly_raw.csv)';
    datasetDescription =
      'Monthly cloud coverage, scene acquisition dates, and unmerged multispectral vegetation indices extracted via Microsoft Planetary Computer.';
  }

  // Filter currentData based on search query
  const filteredData = currentData.filter((row) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return Object.values(row).some((val) => String(val).toLowerCase().includes(query));
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const columns = currentData.length > 0 ? Object.keys(currentData[0]) : [];

  return (
    <div className="space-y-6">
      {/* Top Card: Dataset Switcher & Download CTA */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-1">
              <Database className="w-3.5 h-3.5" />
              Verified Empirical Datasets
            </div>
            <h2 className="text-xl font-bold text-slate-900">{datasetTitle}</h2>
            <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
              {datasetDescription}
            </p>
          </div>

          <a
            href={downloadUrl}
            download={downloadFilename}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm whitespace-nowrap self-stretch md:self-auto justify-center"
          >
            <Download className="w-4 h-4" />
            <span>Download Actual CSV</span>
          </a>
        </div>

        {/* Dataset Selection Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              setSelectedDataset('monthly');
              setPage(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedDataset === 'monthly'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Monthly Merged (36 Rows)</span>
          </button>

          <button
            onClick={() => {
              setSelectedDataset('daily');
              setPage(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedDataset === 'daily'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Daily Weather (1,096 Rows)</span>
          </button>

          <button
            onClick={() => {
              setSelectedDataset('rawNdvi');
              setPage(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              selectedDataset === 'rawNdvi'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Raw Satellite STAC (36 Rows)</span>
          </button>
        </div>
      </div>

      {/* Table Card with Search & Pagination */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Search & Meta Header */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by date, month, value..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs text-slate-600">
            <span>
              Showing <strong className="text-slate-900">{filteredData.length}</strong> matching rows
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                Prev
              </button>
              <span className="font-mono text-slate-700 text-xs">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Data Table */}
        <div className="overflow-x-auto max-h-[520px] overflow-y-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/80 text-slate-700 uppercase font-bold text-[10px] tracking-wider sticky top-0 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-slate-400 font-mono w-12">#</th>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2.5 font-mono text-slate-400">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  {columns.map((col) => {
                    const val = row[col];
                    const isNum = typeof val === 'number';
                    return (
                      <td
                        key={col}
                        className={`px-4 py-2.5 whitespace-nowrap ${
                          col === 'month' || col === 'date'
                            ? 'font-bold font-mono text-slate-900'
                            : col === 'ndvi_veg'
                            ? 'font-bold text-emerald-700'
                            : col === 'precip_mm'
                            ? 'text-sky-700 font-medium'
                            : 'text-slate-600'
                        }`}
                      >
                        {isNum
                          ? val % 1 !== 0
                            ? val.toFixed(3)
                            : val
                          : String(val)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
