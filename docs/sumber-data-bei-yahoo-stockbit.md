# Panduan Manajemen & Perbandingan Sumber Data: BEI (IDX), Yahoo Finance, dan Stockbit

Dokumen ini menjelaskan pembagian arsitektur, pemisahan tanggung jawab (*separation of concerns*), serta pemetaan kolom basis data antara data resmi **Bursa Efek Indonesia (BEI / IDX)**, data harga live **Yahoo Finance**, dan posisi **Stockbit** pada platform **BEI Stock Insight**.

---

## 1. Ringkasan Ekosistem & Tiga Pilar Data

Platform **BEI Stock Insight** membagi data menjadi dua kategori teknis utama yang saling melengkapi, serta memposisikan Stockbit sebagai produk sekuritas pembanding:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   BEI Stock Insight Data Engine                        │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
┌─────────────────────────────────┐         ┌─────────────────────────────────┐
│     1. Web Resmi BEI / IDX      │         │     2. Yahoo Finance API        │
│   (Kinerja Fundamental Emiten)  │         │    (Harga Pasar Real-Time)      │
├─────────────────────────────────┤         ├─────────────────────────────────┤
│ • Laporan Keuangan Kuartal Q3   │         │ • Harga per Lembar Saham        │
│ • Laba Bersih & Pendapatan      │         │ • Harga 1 Lot (100 Lembar)      │
│ • ROE, DER, Net Profit Margin   │         │ • Kapitalisasi Pasar Dinamis    │
│ • Struktur Kepemilikan Saham    │         │ • Rasio PER & PBV Terkini       │
│ • Sifat: Statik per Kuartal     │         │ • Sifat: Dinamis Harian/Live    │
└─────────────────────────────────┘         └─────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       3. Posisi Produk Stockbit                        │
├────────────────────────────────────────────────────────────────────────┤
│ • Aplikasi sekuritas mitra untuk eksekusi transaksi beli/jual riil.    │
│ • Bukan penyedia API sistem ini (menghindari scraping & pelanggaran). │
│ • Investor melakukan riset objektif di platform ini sebelum membuka   │
│   aplikasi sekuritas (Stockbit, Ajaib, IPOT, dll.) untuk bertransaksi.│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Tabel Matriks Perbandingan Sumber Data

| Kriteria Analisis | 1. Web Resmi BEI / IDX | 2. Yahoo Finance (Market Data) | 3. Stockbit (Sekuritas) |
| :--- | :--- | :--- | :--- |
| **Kategori Informasi** | **Laporan Keuangan Fundamental** | **Pergerakan Harga Pasar Regular** | **Aplikasi Broker & Eksekusi Jual/Beli** |
| **Frekuensi Pembaruan** | **Kuartalan (Q1, Q2, Q3, Full Year)**. Hanya diperbarui saat emiten menerbitkan lapkeu baru. | **Real-Time / End-of-Day (EOD)**. Berubah mengikuti jam bursa (Senin-Jumat). | Real-time *order book*, *running trade*, dan aksi beli/jual nasabah. |
| **Parameter Kunci** | • Laba Bersih (*Net Income*)<br>• Pendapatan Usaha (*Revenue*)<br>• Total Ekuitas & Total Aset<br>• *Return on Equity (ROE)*<br>• *Debt to Equity Ratio (DER)*<br>• *Net Profit Margin (NPM)*<br>• Pertumbuhan Tahunan (*YoY Growth*)<br>• Pemegang Saham Pengendali & Publik | • Harga per Lembar (*pricePerShare*)<br>• Harga Minimal 1 Lot (*pricePerLot*)<br>• *Market Capitalization* riil<br>• *Previous Close*, *Day High*, *Day Low*<br>• Persentase Perubahan Harian<br>• Rasio Valuasi Dinamis (*PER* & *PBV*) | • Fitur Order Beli/Jual Lembar Saham<br>• Penampungan Dana RDN Nasabah<br>• Data *Bandarmologi* (Broker Summary)<br>• Forum Komunitas / Social Stream<br>• Laporan Riset Konsensus Analis |
| **Metode Akses Sistem** | Manual validasi dari keterbukaan informasi [idx.co.id](https://www.idx.co.id) ke berkas master sektor. | Pemanggilan HTTP Query API publik berakhiran `.JK` ([yahoo-finance.service.ts](file:///c:/laragon/www/final-project-webapp/backend/src/services/yahoo-finance.service.ts)). | Pengguna mengeksekusi sendiri di aplikasi Stockbit secara mandiri. |
| **Biaya & Lisensi** | Terbuka untuk publik sebagai keterbukaan informasi emiten bursa. | Gratis, tanpa *API key* berbayar, dan stabil untuk ticker Jakarta. | Membutuhkan pembukaan akun rekening dana nasabah (RDN) sekuritas. |

---

## 3. Pemetaan Kolom pada Database MySQL (`schema.prisma`)

Seluruh data disimpan secara terpusat pada tabel `stocks` di database MySQL `bei_stock_insight`. Pemisahan asal data diatur sebagai berikut:

### A. Kolom Murni dari Web Laporan Keuangan BEI (IDX)
Kolom-kolom ini mencerminkan kinerja internal bisnis perusahaan selama periode kuartal berjalan:
* `name`: Nama resmi perseroan terdaftar di bursa.
* `sector` & `subSector`: Klasifikasi industri resmi BEI.
* `roe`: Rasio laba bersih terhadap ekuitas modal (%).
* `revenueGrowth`: Pertumbuhan pendapatan dibandingkan kuartal yang sama tahun lalu (% YoY).
* `netIncomeGrowth`: Pertumbuhan laba bersih kuartalan (% YoY).
* `der`: Rasio total utang terhadap modal ekuitas (kali).
* `netProfitMargin`: Efisiensi margin keuntungan bersih perseroan (%).
* `revenueLabel` & `netIncomeLabel`: Angka nominal rupiah ringkas (misal: `"Rp 74,2 T"` dan `"Rp 41,1 T"`).
* `totalAssetsLabel` & `totalEquityLabel`: Posisi neraca keuangan resmi.
* `controllingShareholder` & `controllingPercentage`: Pihak pengendali perseroan.
* `publicShareholder` & `publicPercentage`: Kepemilikan masyarakat di pasar modal.
* `businessSegments`: Rincian kontribusi lini pendapatan bisnis.
* `period`: Ditandai tegas sebagai `"Q3 2024"`.
* `dataSource`: Bertuliskan `"BEI / IDX"`.
* `dataStatus`: Status validitas `"Terverifikasi"`.

### B. Kolom yang Dihitung & Diperbarui dari Yahoo Finance
Kolom-kolom ini mencerminkan apresiasi pasar modal terhadap harga saham:
* `pricePerShare`: Harga terakhir per lembar saham reguler di bursa (misal: Rp 10.000 untuk BBCA).
* `pricePerLot`: Hasil kalkulasi otomatis aturan bursa Indonesia:
  $$\text{pricePerLot} = \text{pricePerShare} \times 100$$
* `marketCap`: Total nilai perseroan berdasarkan harga saham pasar:
  $$\text{marketCap} = \text{Jumlah Saham Beredar} \times \text{pricePerShare}$$
* `marketCapLabel`: Label ringkas nominal (misal: `"Rp 1.250 T"`).
* `per`: Rasio harga terhadap laba per lembar (*Price to Earnings Ratio*).
* `pbv`: Rasio harga terhadap nilai buku modal per lembar (*Price to Book Value*).
* `lastUpdated`: Waktu terakhir sinkronisasi harga pasar dijalankan.

---

## 4. Mengapa Kita Mengombinasikan BEI + Yahoo Finance (Bukan Mengambil Data Stockbit)?

1. **Integritas Legalitas & Keamanan Sistem**:
   Stockbit adalah aplikasi tertutup milik PT Stockbit Sekuritas Digital. Melakukan penarikan data (*scraping*) langsung ke server Stockbit memiliki risiko hukum, pelanggaran *Terms of Service*, serta risiko pemblokiran IP oleh Cloudflare dan CAPTCHA.
2. **Kestabilan Endpoint Yahoo Finance**:
   Yahoo Finance menyediakan endpoint terbuka untuk saham bursa Indonesia menggunakan penanda bursa Jakarta (`.JK`). Format respons JSON terstruktur dan tidak mudah berubah dibanding struktur HTML website yang di-scrape.
3. **Data BEI adalah Sumber Kebenaran Tunggal (*Single Source of Truth*)**:
   Seluruh platform keuangan (termasuk Stockbit, Bloomberg, Refinitiv, dan Ajaib) pada dasarnya mengacu pada sumber primer yang sama: berkas laporan keuangan yang diserahkan emiten ke Bursa Efek Indonesia.
4. **Independensi Riset Pengguna**:
   Platform ini memposisikan diri sebagai konsultan riset objektif tanpa konflik kepentingan komisi transaksi broker.

---

## 5. Alur Pembaruan Data (*Data Update Workflow*)

### 1. Inisialisasi Data Fundamental BEI
Data fundamental emiten BEI diarsipkan secara modular di direktori [backend/src/data/sectors/](file:///c:/laragon/www/final-project-webapp/backend/src/data/sectors/) yang terbagi menjadi 9 sektor.

Untuk memasukkan data fundamental ke database MySQL:
```bash
npm run db:seed --prefix backend
```

### 2. Sinkronisasi Harga Pasar Live dari Yahoo Finance
Untuk memperbarui harga lembar, harga lot, dan kapitalisasi pasar seluruh 22 emiten:
```bash
npm run db:sync-prices --prefix backend
```
Atau melalui HTTP Endpoint API:
```http
POST http://localhost:5000/api/stocks/sync
```

Logika sinkronisasi berjalan otomatis di latar belakang melalui [yahoo-finance.service.ts](file:///c:/laragon/www/final-project-webapp/backend/src/services/yahoo-finance.service.ts) dengan memetakan seluruh kode saham ke simbol `.JK` (contoh: `BBCA` -> `BBCA.JK`, `BBRI` -> `BBRI.JK`).

---

## 6. Alur Keputusan Investor (*User Journey*)

Platform ini melengkapi aplikasi sekuritas seperti Stockbit pada alur investasi yang sehat:

```text
[Langkah 1: Riset Fundamental di BEI Stock Insight]
Eksplorasi Peta Saham -> Filter Screener -> Komparasi Head-to-Head -> Analisis Narasi AI
                                    │
                                    ▼
       [Keputusan Rasional Berbasis Data Laporan Keuangan Nyata]
                                    │
                                    ▼
[Langkah 2: Eksekusi Transaksi di Aplikasi Sekuritas Pilihan Pengguna]
(Membeli lot saham melalui broker seperti Stockbit, Ajaib, Mirae, atau IPOT)
```

Dengan pemisahan ini, investor mendapatkan pemahaman bisnis yang mendalam sebelum mengalokasikan modal riil di pasar saham.
