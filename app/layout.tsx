import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Buner Crop Health AI — KPK Agriculture Climate & NDVI Mapping',
  description:
    'AI-Driven Micro-Climate & Crop Health Mapping for KPK Agriculture (Buner District). Built with Sentinel-2 satellite data, Open-Meteo climate records, and Machine Learning.',
  keywords: [
    'Buner Crop Health',
    'KPK Agriculture',
    'NDVI',
    'Sentinel-2',
    'Machine Learning',
    'Crop Stress Prediction',
    'Random Forest',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
