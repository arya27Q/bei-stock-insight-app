# Dokumentasi Arsitektur Backend, Sinkronisasi Data Saham, dan Prisma ORM

Dokumen ini menjelaskan rancangan arsitektur backend, mekanisme pengambilan data harga saham secara live tanpa biaya langganan API, pemisahan lapisan kode (*clean architecture*), penanganan *file lock* pada sistem operasi Windows menggunakan Prisma ORM, serta kalkulator simulasi lot saham pada platform **BEI Stock Insight**.

---

## 1. Ringkasan Ekosistem Backend

Platform backend **BEI Stock Insight** dibangun dengan fondasi teknologi:
- **Runtime & Bahasa**: Node.js dengan TypeScript (ES Modules).
- **Web Framework**: Express.js 5.x.
- **Database**: MySQL (dijalankan di Laragon port 3306, database: `bei_stock_insight`).
- **ORM & Type Safety**: Prisma ORM 6.x dengan kustomisasi target generator client.
- **Data Provider**: Yahoo Finance Public Query API (IDX / BEI tickers).

---

## 2. Mekanisme Pengambilan Data Saham Live (Yahoo Finance)

### Mengapa Menggunakan Yahoo Finance Query Endpoint?
Banyak penyedia data pasar modal mengenakan biaya langganan tinggi atau membatasi *rate limit* secara ketat. Yahoo Finance menyediakan endpoint publik yang andal untuk mengakses ringkasan harga pasar reguler saham-saham Bursa Efek Indonesia tanpa memerlukan *API Key* berbayar.

### Simbol Ticker Saham BEI
Di pasar modal internasional, seluruh emiten yang tercatat di Bursa Efek Indonesia (IDX) diberi akhiran `.JK` (Jakarta):
- Bank Central Asia Tbk: `BBCA` -> `BBCA.JK`
- Bank Rakyat Indonesia Tbk: `BBRI` -> `BBRI.JK`
- Bank Mandiri Tbk: `BMRI` -> `BMRI.JK`
- Telkom Indonesia Tbk: `TLKM` -> `TLKM.JK`
- Astra International Tbk: `ASII` -> `ASII.JK`
- Indofood CBP Sukses Makmur Tbk: `ICBP` -> `ICBP.JK`
- Alamtri Resources Indonesia Tbk: `ADRO` -> `ADRO.JK`
- Bank Negara Indonesia Tbk: `BBNI` -> `BBNI.JK`
- Unilever Indonesia Tbk: `UNVR` -> `UNVR.JK`

Peta relasi ini dikelola di dalam [yahoo-finance.service.ts](file:///c:/laragon/www/final-project-webapp/backend/src/services/yahoo-finance.service.ts).

### Endpoint dan Format Permintaan
Backend memanggil endpoint HTTP:
```text
https://query1.finance.yahoo.com/v8/finance/chart/{ticker}.JK?interval=1d&range=1d
```

Header `User-Agent` disertakan untuk memastikan permintaan dikenali sebagai klien web standar. Parameter respons yang diekstraksi meliputi:
- `regularMarketPrice`: Harga per lembar saham penutupan atau sesi live terkini.
- `chartPreviousClose`: Harga penutupan hari bursa sebelumnya.
- `regularMarketDayHigh`: Harga tertinggi pada hari bursa berjalan.
- `regularMarketDayLow`: Harga terendah pada hari bursa berjalan.

### Kalkulasi Aturan Fraksi BEI (Lot Saham)
Sesuai regulasi perdagangan bursa saham Indonesia, satuan perdagangan minimal investor ritel adalah **1 Lot = 100 lembar**.
Backend secara otomatis mengkalkulasi:
```typescript
const pricePerShare = quote.regularMarketPrice;
const pricePerLot = pricePerShare * 100;
```
Setelah dikalkulasi, data harga dan *timestamp* pembaruan langsung disimpan ke tabel `stocks` di database MySQL.

---

## 3. Pemisahan Tanggung Jawab (*Clean Architecture: Routes vs Services*)

Struktur folder backend dirancang dengan prinsip *Separation of Concerns*:

```text
backend/src/
├── config/
│   └── prisma.ts               # Inisialisasi PrismaClient tunggal (Singleton)
├── data/
│   └── mock-stocks.ts          # Dataset dasar 9 emiten unggulan BEI
├── routes/
│   ├── stocks.route.ts         # Controller HTTP (request, validasi, response JSON)
│   └── ai.route.ts             # Controller endpoint analisis Gemini AI
├── services/
│   └── yahoo-finance.service.ts # Logika bisnis komunikasi ke Yahoo Finance
└── generated/
    └── client/                 # TypeScript Client hasil kompilasi Prisma
```

### Keuntungan Arsitektur Ini
1. **Lapisan Route ([stocks.route.ts](file:///c:/laragon/www/final-project-webapp/backend/src/routes/stocks.route.ts))**:
   Hanya fokus menangani protokol HTTP, membaca parameter URL/body, memvalidasi input, dan mengembalikan HTTP status code (`200`, `400`, `404`, `500`).
2. **Lapisan Service ([yahoo-finance.service.ts](file:///c:/laragon/www/final-project-webapp/backend/src/services/yahoo-finance.service.ts))**:
   Fokus pada kalkulasi dan pemanggilan API eksternal. Fungsi `syncAllStockPrices()` bersifat independen, sehingga dapat dipanggil dari:
   - API Endpoint: `POST /api/stocks/sync`
   - Skrip CLI: `npm run db:sync-prices`
   - *Cron Job* atau *scheduled worker* di masa mendatang tanpa perlu duplikasi kode.

---

## 4. Prisma ORM dan Solusi File Lock Windows (`src/generated/client`)

### Apa Peran Prisma ORM?
Prisma berfungsi sebagai jembatan antara tabel relasional MySQL dan kode TypeScript. Prisma membaca berkas skema di [schema.prisma](file:///c:/laragon/www/final-project-webapp/backend/prisma/schema.prisma) dan mengubahnya menjadi antarmuka TypeScript (*types*) yang menyediakan *IntelliSense* dan *autocomplete* otomatis di editor.

### Mengapa Terjadi Error EPERM di Windows?
Secara bawaan, generator Prisma menaruh berkas klien ke:
```text
backend/node_modules/.prisma/client/query_engine-windows.dll.node
```
Di sistem operasi Windows, saat server backend aktif berjalan (`tsx watch src/index.ts` atau `npm run dev`), Node.js memuat berkas DLL native tersebut ke dalam memori proses. Ketika developer menjalankan `prisma generate`, sistem operasi Windows menolak proses penggantian berkas DLL tersebut dengan galat:
```text
EPERM: operation not permitted, rename query_engine-windows.dll.node.tmp -> query_engine-windows.dll.node
```

### Solusi Permanen yang Diterapkan
Pada berkas [schema.prisma](file:///c:/laragon/www/final-project-webapp/backend/prisma/schema.prisma), generator diarahkan langsung ke direktori internal proyek:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/client"
}
```

Kemudian pada berkas [prisma.ts](file:///c:/laragon/www/final-project-webapp/backend/src/config/prisma.ts), klien diimpor dari lokasi baru:
```typescript
import { PrismaClient } from "../generated/client/index.js";

export const prisma = new PrismaClient();
export * from "../generated/client/index.js";
```

**Dampak Positif**:
- Proses `npx prisma generate` dapat dieksekusi secara mulus kapan saja tanpa tertahan *file lock*.
- Semua tipe data seperti `pricePerShare`, `pricePerLot`, `aiInsight`, `aiChatLog`, dan `lotSimulation` langsung tersedia secara penuh di VS Code.

---

## 5. Logika Kalkulator Simulasi Pembelian Lot Saham

Endpoint `POST /api/stocks/:ticker/simulate-lot` dirancang untuk membantu investor pemula menghitung alokasi modal secara presisi sebelum melakukan transaksi di sekuritas riil.

### Formula Perhitungan
1. **Biaya per Lot Termasuk Estimasi Broker Fee**:
   $$\text{Fee Rate} = \frac{\text{feePercent}}{100} \quad (\text{default: } 0.0015 \text{ atau } 0.15\%)$$
   $$\text{Biaya 1 Lot dengan Fee} = \text{pricePerLot} \times (1 + \text{Fee Rate})$$

2. **Jumlah Lot Maksimal yang Dapat Dibeli**:
   $$\text{Calculated Lots} = \left\lfloor \frac{\text{Target Budget}}{\text{Biaya 1 Lot dengan Fee}} \right\rfloor$$

3. **Total Dana Terpakai dan Estimasi Broker Fee**:
   $$\text{Total Stock Cost} = \text{Calculated Lots} \times \text{pricePerLot}$$
   $$\text{Broker Fee Amount} = \text{round}(\text{Total Stock Cost} \times \text{Fee Rate})$$
   $$\text{Total Spent} = \text{Total Stock Cost} + \text{Broker Fee Amount}$$

4. **Sisa Kas Tersisa (*Cash Leftover*)**:
   $$\text{Remaining Cash} = \text{Target Budget} - \text{Total Spent}$$

5. **Komentar Edukasi Risiko Otomatis**:
   Sistem mengevaluasi sisa kas dan memberikan saran manajemen portofolio (misalnya saran diversifikasi jika sisa kas lebih dari 40% dari harga 1 lot, atau saran *Dollar Cost Averaging* jika alokasi sudah optimal).

Hasil perhitungan disimpan ke tabel `lot_simulations` untuk riwayat dan reviu investor.

---

## 6. Struktur Skema Database MySQL (4 Tabel)

Tabel-tabel yang aktif pada database `bei_stock_insight`:

| Nama Tabel | Deskripsi | Kaitan Relasi |
| :--- | :--- | :--- |
| `stocks` | Master profil fundamental emiten (harga per lembar, harga per lot, ROE, PER, PBV, DER, dividen, pemegang saham) | Tabel utama (Foreign Key target) |
| `ai_insights` | Cache ringkasan analisis fundamental mendalam, keunggulan, dan pertimbangan risiko | Berelasi ke `stocks(ticker)` (1:N) |
| `ai_chat_logs` | Riwayat percakapan interaktif investor dengan AI per emiten | Berelasi ke `stocks(ticker)` (1:N) |
| `lot_simulations` | Riwayat simulasi lot modal, estimasi fee sekuritas, sisa kas, dan catatan risiko | Berelasi ke `stocks(ticker)` (1:N) |

---

## 7. Panduan Perintah CLI

Seluruh alur kerja data dapat dijalankan melalui perintah terminal berikut:

### 1. Menghasilkan Tipe Klien Prisma
```bash
npm run prisma:generate
```
*Dijalankan saat ada perubahan struktur pada `backend/prisma/schema.prisma`.*

### 2. Melakukan Seeding Data Awal ke MySQL
```bash
cd backend
npm run db:seed
```
*Mengisi 9 emiten utama, 1 insight fundamental AI, 2 riwayat chat contoh, dan 1 contoh simulasi lot.*

### 3. Memperbarui Harga Saham Live dari Yahoo Finance
```bash
cd backend
npm run db:sync-prices
```
*Mengambil harga live 9 saham dari Yahoo Finance dan langsung menyimpannya ke MySQL.*

### 4. Menjalankan Server Backend
```bash
npm run dev:backend
```
*Server aktif di `http://localhost:5000` dengan endpoint kesehatan di `/api/health`.*
