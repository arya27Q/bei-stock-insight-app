# Panduan Strategi Hosting & Deployment
## BEI Stock Insight — Solusi Satu Domain & Analisis Biaya

Dokumen ini menjelaskan 3 alternatif arsitektur hosting untuk menjalankan **Frontend (Next.js)**, **Backend (Express.js)**, dan **Database (PostgreSQL)** secara optimal, stabil, dan ramah anggaran (mulai dari 100% Gratis hingga budget Rp 50.000–60.000/bulan).

---

## 1. Perbandingan Cepat 3 Opsi Hosting

| Parameter | OPSI 1: Modern Cloud (Rekomendasi) | OPSI 2: Hostinger Web Hosting | OPSI 3: VPS Mandiri (Unmanaged) |
|---|---|---|---|
| **Estimasi Biaya** | **Rp 0 / Bulan (100% Gratis)** | Rp 40.000 – 60.000 / Bulan | Rp 30.000 – 60.000 / Bulan |
| **Frontend** | Vercel (Free Tier) | Hostinger Shared Node.js | VPS (Nginx + Node/PM2) |
| **Backend** | Koyeb / Render (Free Tier) | Hostinger Shared Node.js | VPS (PM2 / Docker) |
| **Database** | Supabase (Free Tier 500MB) | Supabase / Remote Postgres | PostgreSQL lokal di VPS / Supabase |
| **Solusi 1 Domain** | **Next.js Rewrites (Reverse Proxy)** | Custom Server (`express + next`) | Nginx Reverse Proxy |
| **Masalah CORS & Cookie** | **Selesai otomatis (Same-Origin)** | Selesai otomatis (1 proses) | Selesai otomatis (via Nginx) |
| **Tingkat Kesulitan** | Sangat Mudah (Git Push auto-deploy) | Sedang (Rawan limit RAM build) | Lanjutan (Perlu konfigurasi Linux) |
| **Kelebihan Utama** | Performa cepat, auto-scaling, bebas OOM | Cocok jika sudah langganan Hostinger | Kontrol penuh sistem operasi |

---

## 2. OPSI 1: Modern Cloud Stack (100% GRATIS) — REKOMENDASI UTAMA

Arsitektur ini memisahkan beban kerja frontend dan backend secara independen tanpa membebani server lokal/shared, tetapi **tetap menyajikannya ke pengguna dalam SATU DOMAIN yang sama**.

```
[Pengguna / Browser]
        │
        ▼ (Semua request ke: https://bei-stock-insight.vercel.app)
 ┌────────────────────────────────────────────────────────┐
 │ VERCEL EDGE & SERVERLESS (Frontend Next.js)            │
 │                                                        │
 │ 1. Halaman Web (/, /profile, /screener) -> Next.js     │
 │ 2. Request API (/api/*)                 -> REWRITE     │
 └─────────────────────────┬──────────────────────────────┘
                           │ (Diteruskan di balik layar / Reverse Proxy)
                           ▼
 ┌────────────────────────────────────────────────────────┐
 │ KOYEB / RENDER CONTAINER (Backend Express.js)          │
 │ Endpoint: /api/health, /api/stocks, /api/ai/insight    │
 └─────────────────────────┬──────────────────────────────┘
                           │
                           ▼
 ┌────────────────────────────────────────────────────────┐
 │ SUPABASE (Managed PostgreSQL Cloud Database)           │
 └────────────────────────────────────────────────────────┘
```

### Rahasia Solusi "Satu Domain & Bebas Masalah Cookie":
Di file `frontend/next.config.ts`, Next.js memiliki fitur bawaan **Rewrites**:
```ts
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};
```

**Dampaknya bagi Pengguna & Browser:**
1. Browser menganggap seluruh panggilan API (`/api/stocks`, `/api/health`) berada di domain yang sama dengan web.
2. **Bebas Error CORS** karena tidak ada panggilan lintas domain (*cross-origin*).
3. **Cookie Login Berfungsi Sempurna** sebagai *first-party cookie (Same-Origin)* tanpa risiko diblokir browser pihak ketiga (Safari/Chrome ITP).

### Langkah Deployment Opsi 1 (Step-by-Step):

#### Langkah A: Database (Supabase)
1. Buka [supabase.com](https://supabase.com) dan buat akun gratis.
2. Buat project baru (pilih region terdekat: `Singapore`).
3. Dapatkan **Connection String (URI)** di menu *Project Settings -> Database*:
   `postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres`

#### Langkah B: Backend (Koyeb / Render)
1. Rekomendasi: Gunakan **Koyeb** (lebih disukai karena tidak mengalami *cold-start sleep* 50 detik seperti Render Free).
2. Hubungkan repository GitHub kamu.
3. Atur konfigurasi build:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Run Command: `npm run start` (menjalankan `node dist/index.js`)
4. Masukkan Environment Variables di dashboard Koyeb:
   - `PORT`: `5000` (atau port dinamis Koyeb `8000`)
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: URI Supabase kamu
   - `GEMINI_API_KEY`: API Key Gemini kamu
5. Setelah selesai deploy, kamu akan mendapatkan URL backend (misal: `https://bei-backend.koyeb.app`).

#### Langkah C: Frontend (Vercel)
1. Buka [vercel.com](https://vercel.com) dan hubungkan akun GitHub.
2. Pilih repository `final-project-webapp`.
3. Set **Root Directory** ke: `frontend`.
4. Tambahkan Environment Variable:
   - `BACKEND_URL`: URL Koyeb kamu (contoh: `https://bei-backend.koyeb.app`)
5. Klik **Deploy**. Website kamu langsung aktif di `https://namaproject.vercel.app` dengan domain dan API yang menyatu.

---

## 3. OPSI 2: Hostinger Web / Shared Hosting (~Rp 40.000 – 60.000 / Bulan)

Opsi ini digunakan jika kamu **sudah memiliki paket Web Hosting Hostinger (Premium/Business)** yang memiliki fitur **Node.js Selector** di hPanel.

### Konsep Teknis: Custom Server Monolitik
Next.js dan Express digabung ke dalam satu proses Node.js menggunakan satu file server (`server.ts`):
- Express bertindak sebagai server induk yang menerima seluruh traffic.
- Request berawalan `/api/*` diproses oleh Express controller.
- Request selain `/api/*` dioper ke handler Next.js (`nextApp.getRequestHandler()`).

### ⚠️ Tantangan Utama & Solusi di Shared Hosting:
* **Tantangan:** Shared hosting memiliki batasan alokasi RAM (biasanya 512MB - 1GB per akun). Menjalankan `next build` langsung di terminal Hostinger hampir pasti mengalami kegagalan akibat limit memori (**Out of Memory / OOM**).
* **Solusi Wajib:**
  1. Kompilasi build dilakukan di komputer lokal terlebih dahulu (`npm run build` di frontend dan `tsc` di backend).
  2. Upload file hasil build (`.next/`, `dist/`, `package.json`, dan `node_modules`) ke File Manager Hostinger.
  3. Konfigurasi Node.js di hPanel:
     - Application Startup File: `dist/server.js`
     - Node.js Version: 20.x atau 22.x
     - Port: Jangan di-hardcode, gunakan `process.env.PORT` bawaan Hostinger.
  4. Database: Gunakan Supabase PostgreSQL eksternal (karena database bawaan Hostinger Shared adalah MySQL).

---

## 4. OPSI 3: VPS Mandiri / Unmanaged Cloud (Budget Rp 30.000 – 60.000 / Bulan)

Opsi ini memberikan mesin virtual privat (Virtual Private Server) dengan akses *root* penuh.

### Rekomendasi Provider VPS Murah:
1. **RackNerd (Global VPS):**
   - Harga promo tahunan sekitar $14 – $17 / tahun (setara **~Rp 20.000 – 25.000 / bulan**).
   - Spesifikasi: 1–2 GB RAM, 1–2 vCPU, IP Publik Dedicated.
2. **IDCloudHost / DomaiNesia (VPS Lokal Indonesia):**
   - Biaya mulai dari **Rp 50.000 / bulan** (lokasi datacenter Jakarta, ping sangat rendah).

### Pola Arsitektur di VPS:
* Jalankan Frontend dan Backend di port terpisah secara lokal (misal: Next.js di `3000`, Express di `5000`) menggunakan **PM2** atau **Docker Compose**.
* Pasang **Nginx** sebagai reverse proxy utama di port 80/443:
  ```nginx
  server {
      server_name domainanda.com;

      # Rute Halaman Web ke Next.js
      location / {
          proxy_pass http://localhost:3000;
          proxy_set_header Host $host;
      }

      # Rute API ke Express
      location /api/ {
          proxy_pass http://localhost:5000/api/;
          proxy_set_header Host $host;
      }
  }
  ```

---

## 5. Ringkasan Rekomendasi Keputusan

1. **Gunakan OPSI 1 saat ini:**
   - Tanpa biaya server (Rp 0).
   - Tidak ada resiko server down karena kehabisan RAM.
   - Setup reverse proxy di Next.js `next.config.ts` sudah otomatis menuntaskan masalah "satu domain" dan "cookie login".
2. **Kapan beralih ke Opsi 2 (Hostinger):**
   - Hanya jika kamu atau instansi kampus sudah terlanjur membeli akun Hostinger Web Hosting tahunan.
3. **Kapan beralih ke Opsi 3 (VPS):**
   - Jika aplikasi membutuhkan background worker berat yang berjalan 24/7 (misal cron job scraping laporan keuangan BEI non-stop setiap jam).
