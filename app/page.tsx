'use client';

import React, { useState } from 'react';
import Navbar, { TabType } from '@/components/Navbar';
import OverviewTab from '@/components/OverviewTab';
import NdviTab from '@/components/NdviTab';
import WeatherTab from '@/components/WeatherTab';
import PredictionTab from '@/components/PredictionTab';
import DataExplorerTab from '@/components/DataExplorerTab';
import AboutTab from '@/components/AboutTab';
import { Sprout, Heart, Github, ExternalLink, MapPin } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            onNavigateToPredict={() => setActiveTab('predict')}
            onNavigateToNdvi={() => setActiveTab('ndvi')}
          />
        )}
        {activeTab === 'ndvi' && <NdviTab />}
        {activeTab === 'weather' && <WeatherTab />}
        {activeTab === 'predict' && <PredictionTab />}
        {activeTab === 'data' && <DataExplorerTab />}
        {activeTab === 'about' && <AboutTab />}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sprout className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900">Buner Crop Health AI</span>
            <span>—</span>
            <span>BS Data Science Project, KPK Agriculture</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Daggar & Jowar Valley, Buner District, KPK
            </span>
            <span className="text-slate-400">|</span>
            <span>Sentinel-2 L2A + Open-Meteo + Random Forest</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
