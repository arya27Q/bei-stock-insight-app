# BEI Stock Insight (Frontend)

Antarmuka web Next.js App Router untuk platform analisis fundamental saham Bursa Efek Indonesia (BEI / IDX) berbasis AI.

## Fitur Utama
- **Fundamental Stock Map**: Visualisasi peta saham lintas 9 sektor BEI berbasis metrik fundamental (Revenue Growth, Net Income Growth, ROE, PER).
- **Smart Fundamental Screener**: Penyaringan 22 emiten Papan Utama berdasarkan preset strategi dan median sektor.
- **Company Fundamental Profile & Lot Simulator**: Profil bisnis, segmen usaha, kepemilikan saham, dividen, dan simulasi pembelian per 1 lot (100 lembar) menggunakan harga live Yahoo Finance.
- **Sector Benchmark (1 vs 1)**: Komparasi head-to-head antar emiten seindustri beserta Papan Keunggulan 5 Pilar.
- **AI Fundamental Explanation & Chat**: Analisis naratif dan tanya jawab kontekstual berbasis Google Gemini dengan pemisahan Fakta Laporan Q3 2024 dan Interpretasi AI.

## Menjalankan Secara Lokal
```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser. Pastikan environment variable `BACKEND_URL` mengarah ke server Express.js.
