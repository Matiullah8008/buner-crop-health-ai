BUNER CROP HEALTH PROJECT - DATA PACK
Project: AI-Driven Micro-Climate & Crop Health Mapping for KPK Agriculture
District: Buner (Daggar-Jowar valley area), 2023-2025
Sources (both free APIs): Weather = Open-Meteo Archive API;
Satellite = Sentinel-2 L2A via Microsoft Planetary Computer STAC API.

FILES
1) buner_monthly_merged.csv  <- MAIN FILE. One row per month (36 months).
   month      = year-month
   tmax/tmin/tmean = monthly average temperatures (C)
   precip_mm  = total rainfall of the month (mm)
   et0_mm     = total evapotranspiration of the month (mm)
   date       = satellite photo date used for that month
   cloud      = cloud % of that satellite photo
   clear_pct  = % of area visible (not covered by cloud)
   ndvi_land  = mean NDVI of all clear land
   ndvi_veg   = mean NDVI of vegetated area only  <- crop health number
   veg_share  = % of area that is vegetated
2) buner_weather_daily.csv   - daily weather, 1,096 days (2023-2025)
3) buner_ndvi_monthly_raw.csv - NDVI detail per month (before merging)
4) buner_ndvi_apr2025.png    - NDVI map of Buner (satellite photo 29 Apr 2025)
5) buner_ndvi_weather_chart.png - graph: crop health (green line) vs rainfall (bars)

NDVI scale: 0 = no vegetation, 1 = healthiest. Buner range here: 0.28 - 0.47.
Every month has a real satellite photo - no month was missing.
