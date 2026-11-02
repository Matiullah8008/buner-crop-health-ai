"""Buner Crop Health - Python ML Inference Backend Server
Loads 'buner_crop_model.pkl' using joblib and provides a lightweight HTTP API.
Zero framework dependencies: built with Python standard library `http.server`.
Deployable to Render, Railway, or run locally on port 8000.
"""

import json
import os
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
import numpy as np
import joblib

PORT = int(os.environ.get("PORT", 8000))
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "buner_crop_model.pkl")

# Load model on server startup
print(f"[*] Loading Machine Learning model from: {MODEL_PATH}")
try:
    model = joblib.load(MODEL_PATH)
    print(f"[✓] Model loaded successfully: {type(model).__name__}")
    print(f"[✓] Model features: {getattr(model, 'feature_names_in_', 'None')}")
except Exception as e:
    print(f"[!] Warning: Could not load buner_crop_model.pkl ({e})")
    model = None

FEATURES = ['tmax', 'tmin', 'tmean', 'precip_mm', 'et0_mm', 'ndvi_land', 'ndvi_veg', 'veg_share', 'month_num']

class CropHealthHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status=200, content_type="application/json"):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(204)

    def do_GET(self):
        if self.path == "/" or self.path == "/health":
            self._set_headers(200)
            res = {
                "status": "healthy",
                "service": "Buner Crop Health ML Python Backend",
                "model_loaded": model is not None,
                "district": "Buner, KPK, Pakistan"
            }
            self.wfile.write(json.dumps(res, indent=2).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode('utf-8'))

    def do_POST(self):
        if self.path == "/predict":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode('utf-8')
            try:
                data = json.loads(body)
                vals = [float(data[f]) for f in FEATURES]
            except Exception as e:
                self._set_headers(400)
                self.wfile.write(json.dumps({"error": f"Invalid input parameters: {e}"}).encode('utf-8'))
                return

            if model is None:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": "ML model file not loaded"}).encode('utf-8'))
                return

            try:
                x = np.array([vals])
                proba = model.predict_proba(x)[0]
                pred = int(model.predict(x)[0])
                risk_pct = round(float(proba[1]) * 100, 1)

                is_stress = pred == 1
                response = {
                    "prediction": pred,
                    "probabilityStress": round(float(proba[1]), 4),
                    "riskPercentage": risk_pct,
                    "labelEn": "HIGH STRESS RISK" if is_stress else "NORMAL / LOW STRESS",
                    "labelUr": "فصل پر دباؤ کا خطرہ ہے (خطرناک)" if is_stress else "فصل کی صحت تسلی بخش ہے (معمول)",
                    "badgeClass": "danger" if is_stress else "success",
                    "explanationEn": f"Scikit-Learn Random Forest predicts {risk_pct}% probability of upcoming NDVI drop >= 0.03.",
                    "explanationUr": f"سکائیکٹ لرن رینڈم فاریسٹ ماڈل کے مطابق اگلے مہینے دباؤ کا امکان {risk_pct}٪ ہے۔",
                    "backend": "python-joblib-scikit-learn"
                }

                self._set_headers(200)
                self.wfile.write(json.dumps(response).encode('utf-8'))
            except Exception as e:
                self._set_headers(500)
                self.wfile.write(json.dumps({"error": f"Inference execution failed: {e}"}).encode('utf-8'))
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"error": "Not Found"}).encode('utf-8'))

def run(port=PORT):
    server_address = ('', port)
    httpd = HTTPServer(server_address, CropHealthHandler)
    print(f"[*] Buner Crop Health Python Backend serving on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[*] Server stopped.")
        httpd.server_close()

if __name__ == '__main__':
    run()
