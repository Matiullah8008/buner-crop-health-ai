'use client';

import React from 'react';
import {
  Sprout,
  Activity,
  CloudSun,
  BrainCircuit,
  Database,
  BookOpen,
  MapPin,
  Satellite,
  ShieldCheck,
} from 'lucide-react';

export type TabType = 'overview' | 'ndvi' | 'weather' | 'predict' | 'data' | 'about';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const tabs: { id: TabType; labelEn: string; labelUr: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      labelEn: 'Overview',
      labelUr: 'خلاصہ',
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: 'ndvi',
      labelEn: 'NDVI Monitoring',
      labelUr: 'سبزہ و سیٹلائٹ',
      icon: <Satellite className="w-4 h-4" />,
    },
    {
      id: 'weather',
      labelEn: 'Weather Analytics',
      labelUr: 'موسمیاتی تجزیہ',
      icon: <CloudSun className="w-4 h-4" />,
    },
    {
      id: 'predict',
      labelEn: 'Crop Stress AI',
      labelUr: 'پیشگوئی ماڈل',
      icon: <BrainCircuit className="w-4 h-4" />,
    },
    {
      id: 'data',
      labelEn: 'Data Explorer',
      labelUr: 'ڈیٹا ایکسپلورر',
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: 'about',
      labelEn: 'About & Research',
      labelUr: 'تحقیق و طریقہ کار',
      icon: <BookOpen className="w-4 h-4" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Banner with Project Context */}
      <div className="bg-gradient-to-r from-emerald-900 via-forest-800 to-emerald-950 text-white px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-200">BS Data Science Capstone:</span>
            <span className="text-emerald-50">AI-Driven Micro-Climate & Crop Health Mapping for KPK Agriculture</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-200">
            <span className="flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded-full border border-emerald-700/60">
              <MapPin className="w-3 h-3 text-emerald-300" />
              Buner District (Daggar-Jowar), KPK
            </span>
            <span className="hidden sm:flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded-full border border-emerald-700/60">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              Trained Random Forest (85.7% Acc)
            </span>
          </div>
        </div>
      </div>

      {/* Main Header & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  Buner Crop Health <span className="text-emerald-600 font-extrabold">AI</span>
                </h1>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Live Model
                </span>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span>بونیر زرعی مائیکرو کلائمیٹ اور فصل کی صحت مانیٹرنگ</span>
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.labelEn}</span>
                  <span className={`text-[11px] hidden lg:inline ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                    ({tab.labelUr})
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
