export interface MonthlyRecord {
  month: string;
  tmax: number;
  tmin: number;
  tmean: number;
  precip_mm: number;
  et0_mm: number;
  date: string;
  cloud: number;
  clear_pct: number;
  ndvi_land: number;
  ndvi_veg: number;
  veg_share: number;
  month_num?: number;
  ndvi_next?: number | null;
  stress_next?: number | null;
}

export interface DailyRecord {
  time: string;
  temperature_2m_max: number;
  temperature_2m_min: number;
  temperature_2m_mean: number;
  precipitation_sum: number;
  rain_sum: number;
  et0_fao_evapotranspiration: number;
}

export interface RawNdviRecord {
  month: string;
  date: string;
  cloud: number;
  clear_pct: number;
  ndvi_land: number;
  ndvi_veg: number;
  veg_share: number;
}

export interface PredictionInput {
  tmax: number;
  tmin: number;
  tmean: number;
  precip_mm: number;
  et0_mm: number;
  ndvi_land: number;
  ndvi_veg: number;
  veg_share: number;
  month_num: number;
}

export interface PredictionOutput {
  prediction: 0 | 1;
  probabilityStress: number;
  riskPercentage: number;
  labelEn: string;
  labelUr: string;
  badgeClass: 'danger' | 'success';
  explanationEn: string;
  explanationUr: string;
  advisoryEn: string[];
  advisoryUr: string[];
  featureContributions: {
    feature: string;
    labelEn: string;
    labelUr: string;
    value: number;
    importance: number;
    direction: 'elevates_risk' | 'lowers_risk' | 'neutral';
  }[];
}
