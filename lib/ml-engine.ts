import { PredictionInput, PredictionOutput } from './types';
import modelData from './data/model_trees.json';

interface TreeNode {
  children_left: number[];
  children_right: number[];
  feature: number[];
  threshold: number[];
  value: number[][];
}

interface ModelTreesData {
  feature_names: string[];
  importances: Record<string, number>;
  n_estimators: number;
  max_depth: number;
  classes: number[];
  trees: TreeNode[];
}

const data = modelData as unknown as ModelTreesData;

export const FEATURE_INFO: Record<
  string,
  { labelEn: string; labelUr: string; unit: string; min: number; max: number; step: number; default: number }
> = {
  ndvi_veg: {
    labelEn: 'Crop NDVI (Vegetation)',
    labelUr: 'فصل کی صحت (سبزہ)',
    unit: 'index (0-1)',
    min: 0.1,
    max: 0.7,
    step: 0.01,
    default: 0.32,
  },
  month_num: {
    labelEn: 'Forecast Month',
    labelUr: 'سال کا مہینہ (موسم)',
    unit: 'month (1-12)',
    min: 1,
    max: 12,
    step: 1,
    default: 4,
  },
  ndvi_land: {
    labelEn: 'Land NDVI (All Land)',
    labelUr: 'عام زمین کی ہریالی',
    unit: 'index (0-1)',
    min: 0.1,
    max: 0.6,
    step: 0.01,
    default: 0.3,
  },
  veg_share: {
    labelEn: 'Vegetation Cover Share',
    labelUr: 'ہریالی کا رقبہ',
    unit: '%',
    min: 20,
    max: 100,
    step: 0.5,
    default: 75.0,
  },
  precip_mm: {
    labelEn: 'Monthly Rainfall',
    labelUr: 'ماہانہ بارش',
    unit: 'mm',
    min: 0,
    max: 300,
    step: 1,
    default: 85,
  },
  tmin: {
    labelEn: 'Minimum Temperature',
    labelUr: 'کم سے کم درجہ حرارت',
    unit: '°C',
    min: 0,
    max: 30,
    step: 0.5,
    default: 12.0,
  },
  et0_mm: {
    labelEn: 'Evapotranspiration (ET0)',
    labelUr: 'پانی کا بخارات بننا',
    unit: 'mm',
    min: 20,
    max: 250,
    step: 1,
    default: 110,
  },
  tmean: {
    labelEn: 'Mean Temperature',
    labelUr: 'اوسط درجہ حرارت',
    unit: '°C',
    min: 5,
    max: 40,
    step: 0.5,
    default: 20.0,
  },
  tmax: {
    labelEn: 'Maximum Temperature',
    labelUr: 'زیادہ سے زیادہ درجہ حرارت',
    unit: '°C',
    min: 10,
    max: 48,
    step: 0.5,
    default: 28.0,
  },
};

export const FEATURE_ORDER: (keyof PredictionInput)[] = [
  'tmax',
  'tmin',
  'tmean',
  'precip_mm',
  'et0_mm',
  'ndvi_land',
  'ndvi_veg',
  'veg_share',
  'month_num',
];

function predictSingleTree(tree: TreeNode, x: number[]): [number, number] {
  let node = 0;
  while (tree.feature[node] !== -2) {
    const f = tree.feature[node];
    const th = tree.threshold[node];
    if (x[f] <= th) {
      node = tree.children_left[node];
    } else {
      node = tree.children_right[node];
    }
  }
  const val = tree.value[node];
  const sum = val[0] + val[1];
  if (sum === 0) return [0.5, 0.5];
  return [val[0] / sum, val[1] / sum];
}

export function runPrediction(input: PredictionInput): PredictionOutput {
  const x = FEATURE_ORDER.map((feat) => Number(input[feat]));

  let sumClass0 = 0;
  let sumClass1 = 0;

  for (const tree of data.trees) {
    const [p0, p1] = predictSingleTree(tree, x);
    sumClass0 += p0;
    sumClass1 += p1;
  }

  const n = data.trees.length;
  const probStress = Number((sumClass1 / n).toFixed(4));
  const isStress = probStress >= 0.5 ? 1 : 0;
  const riskPct = Math.round(probStress * 100);

  // Direction assessment for top features
  const featureContributions = Object.entries(data.importances)
    .sort(([, a], [, b]) => b - a)
    .map(([feat, imp]) => {
      const val = Number(input[feat as keyof PredictionInput]);
      const info = FEATURE_INFO[feat] || {
        labelEn: feat,
        labelUr: feat,
        unit: '',
        default: 0,
      };

      let direction: 'elevates_risk' | 'lowers_risk' | 'neutral' = 'neutral';
      if (feat === 'precip_mm') {
        direction = val < 40 ? 'elevates_risk' : 'lowers_risk';
      } else if (feat === 'tmax' || feat === 'tmean') {
        direction = val > 32 ? 'elevates_risk' : 'lowers_risk';
      } else if (feat === 'ndvi_veg') {
        direction = val < 0.3 ? 'elevates_risk' : 'lowers_risk';
      } else if (feat === 'et0_mm') {
        direction = val > 140 ? 'elevates_risk' : 'lowers_risk';
      }

      return {
        feature: feat,
        labelEn: info.labelEn,
        labelUr: info.labelUr,
        value: val,
        importance: imp,
        direction,
      };
    });

  const advisoryEn: string[] = isStress
    ? [
        'High Crop Stress Predicted: Expected NDVI reduction ≥ 0.03 in the upcoming month.',
        'Immediate Irrigation Advisory: Buner sub-valleys (Daggar, Jowar) show elevated moisture deficit. Increase supplemental irrigation cycles.',
        'Thermal Management: Protect exposed Rabi/Kharif crops from heat anomalies using soil mulching and organic residue cover.',
        'Soil Moisture Conservation: Restrict intensive tillage to retain residual soil moisture in rain-fed terraces.',
      ]
    : [
        'Optimal Crop Health Anticipated: Vegetation vigor is projected to remain stable (NDVI change < 0.03).',
        'Standard Maintenance: Maintain balanced nitrogen/phosphorus fertilizer schedules according to the crop phenology stage.',
        'Monitoring: Continue routine satellite and field scouting to detect localized pest emergence.',
        'Favorable Hydro-Climatic Balance: Soil moisture and precipitation levels currently support healthy biomass production in Buner.',
      ];

  const advisoryUr: string[] = isStress
    ? [
        'فصل پر دباؤ (Stress) کا شدید خطرہ: اگلے مہینے میں فصل کی ہریالی (NDVI) میں 0.03 سے زیادہ کمی متوقع ہے۔',
        'آبپاشی کا فوری انتظام: بونیر کے ڈگر اور جوڑ کے علاقوں میں نمی کی کمی ہو سکتی ہے، اضافی پانی کی فراہمی یقینی بنائیں۔',
        'گرمی اور خشکی سے بچاؤ: پودوں کو شدید درجہ حرارت سے بچانے کے لیے زمین پر ملچنگ (گھاس پھوس یا پتوں کی تہہ) کا استعمال کریں۔',
        'زمین کی نمی کا تحفظ: بارانی زمینوں میں غیر ضروری ہل چلانے سے گریز کریں تاکہ مٹی کی نمی برقرار رہے۔',
      ]
    : [
        'فصل کی حالت تسلی بخش ہے: اگلے مہینے میں فصل کے معمول کے مطابق برقرار رہنے کی امید ہے۔',
        'معمول کے زرعی امور: کھاد اور کیڑے مار ادویات کا شیڈول فصل کی بڑھوتری کے مطابق جاری رکھیں۔',
        'نگرانی جاری رکھیں: کیڑوں یا بیماریوں کے مقامی حملے سے بچاؤ کے لیے فصل کا معمول کا معائنہ کرتے رہیں۔',
        'موزوں موسمی حالات: بونیر کے اس دورانیے میں بارش اور درجہ حرارت کا تناسب پودوں کی نشوونما کے لیے موافق ہے۔',
      ];

  return {
    prediction: isStress,
    probabilityStress: probStress,
    riskPercentage: riskPct,
    labelEn: isStress ? 'HIGH STRESS RISK' : 'NORMAL / LOW STRESS',
    labelUr: isStress ? 'فصل پر دباؤ کا خطرہ ہے (خطرناک)' : 'فصل کی صحت تسلی بخش ہے (معمول)',
    badgeClass: isStress ? 'danger' : 'success',
    explanationEn: isStress
      ? `Model evaluates high likelihood (${riskPct}%) of crop stress. Driven primarily by ${featureContributions[0].labelEn} and seasonal vulnerability.`
      : `Model evaluates low likelihood (${riskPct}%) of crop stress. Climatic and vegetation indices are within safe physiological limits.`,
    explanationUr: isStress
      ? `ماڈل کے تجزیے کے مطابق اگلے مہینے فصل پر دباؤ کا خطرہ ${riskPct}٪ ہے۔ سب سے اہم وجہ ${featureContributions[0].labelUr} اور موسمی حالات ہیں۔`
      : `ماڈل کے تجزیے کے مطابق فصل پر دباؤ کا امکان صرف ${riskPct}٪ ہے، جس سے ظاہر ہوتا ہے کہ فصل کی صحت معمول کے مطابق ہے۔`,
    advisoryEn,
    advisoryUr,
    featureContributions,
  };
}
