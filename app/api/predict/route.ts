import { NextRequest, NextResponse } from 'next/server';
import { runPrediction, FEATURE_ORDER } from '@/lib/ml-engine';
import { PredictionInput } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if optional remote Python backend is configured (e.g. on Render)
    const pythonBackendUrl = process.env.PYTHON_BACKEND_URL;
    if (pythonBackendUrl) {
      try {
        const pyRes = await fetch(`${pythonBackendUrl}/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(3500),
        });
        if (pyRes.ok) {
          const pyData = await pyRes.json();
          return NextResponse.json({ ...pyData, engine: 'python-remote-joblib' });
        }
      } catch (err) {
        console.warn('Python backend unreachable, executing internal Vercel-native ML engine.', err);
      }
    }

    // Validate inputs
    const input: Partial<PredictionInput> = {};
    for (const feat of FEATURE_ORDER) {
      const val = parseFloat(body[feat]);
      if (isNaN(val)) {
        return NextResponse.json(
          { error: `Missing or invalid numerical feature: ${feat}` },
          { status: 400 }
        );
      }
      input[feat] = val;
    }

    const result = runPrediction(input as PredictionInput);

    return NextResponse.json({
      ...result,
      engine: 'vercel-serverless-random-forest',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Prediction API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error during prediction execution.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'online',
    project: 'AI-Driven Micro-Climate & Crop Health Mapping for KPK Agriculture',
    studyArea: 'Buner District, KPK, Pakistan',
    model: 'RandomForestClassifier (200 trees, max_depth=3)',
    endpoints: {
      predict: 'POST /api/predict',
    },
  });
}
