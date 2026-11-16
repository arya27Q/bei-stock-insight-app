# BEI Stock Insight
> **AI-Powered Fundamental Stock Analysis Platform**

Platform analisis saham berbasis web yang memanfaatkan data Bursa Efek Indonesia (BEI) untuk membantu pengguna mengeksplorasi, menyaring, memahami, dan membandingkan kondisi fundamental perusahaan melalui visualisasi interaktif dan interpretasi berbantuan AI.

---

## 1. Tujuan Sistem & Posisi Produk (Product Positioning)

Platform **BEI Stock Insight** dirancang secara khusus sebagai **Sistem Pendukung Keputusan Investasi (*Investment Decision-Support System*)**:

### Bukan Aplikasi Broker / Eksekusi Transaksi
Sistem ini **tidak menyediakan** fitur transaksi jual/beli lembar saham maupun penampungan deposit dana nasabah seperti aplikasi sekuritas (Stockbit, Ajaib, IPOT, Mandiri Sekuritas, dll.).

### Peran Utama bagi Pengguna
Pengguna mengakses platform ini **sebelum mengeksekusi transaksi** di sekuritas pilihan mereka, dengan tujuan:
1. **Riset Objektif Berbasis Kinerja Nyata**: Menghindari keputusan investasi berbasis rumor, tren sesaat di media sosial (*FOMO*), atau aksi pom-pom saham gorengan.
2. **Penyederhanaan Dokumen Finansial (*Complex Data, Simple Experience*)**: Mengubah laporan keuangan resmi emiten BEI yang mencapai ratusan halaman penuh istilah akuntansi menjadi visualisasi warna (*Heatmap*), kurva tren mini (*Sparkline*), dan narasi bahasa manusia yang mudah dipahami pemula.
3. **Penyaringan Saham Berkualitas (*Screening*)**: Menemukan saham-saham yang mencetak efisiensi modal tinggi (ROE > 15%), pertumbuhan laba positif, dan valuasi harga yang masih wajar (PER terjangkau).
4. **Validasi & Konsultasi Berbantuan AI**: Mengetahui kekuatan dan risiko terbesar bisnis perusahaan secara instan melalui analisis otomatis dan chatbot interaktif.
5. **Perbandingan Antar-Emiten (*Benchmarking*)**: Memastikan emiten yang dipilih memiliki daya saing lebih unggul dibanding kompetitor di sektor yang sama sebelum modal diinvestasikan.

### Masalah Nyata yang Dihadapi Pengguna (User Pain Points)
Sistem ini dirancang dengan memetakan secara mendalam permasalahan nyata yang dihadapi masyarakat awam dan investor ritel pemula di Indonesia:

1. **Kendala Latar Belakang Finansial (Bukan Orang Keuangan)**:
   * Laporan keuangan resmi BEI (*financial statements*) rata-rata setebal 80 hingga 150 halaman berformat PDF dengan ribuan baris angka padat.
   * Istilah teknis seperti *Return on Equity (ROE)*, *Price to Earnings Ratio (PER)*, *Price to Book Value (PBV)*, dan *Debt to Equity Ratio (DER)* terasa asing dan mengintimidasi bagi pengguna tanpa latar belakang akuntansi atau manajemen keuangan.

2. **Kendala Satuan Transaksi Lot (1 Lot = 100 Lembar) & Alokasi Modal Terbatas**:
   * Saham di BEI wajib dibeli minimal 1 lot (100 lembar saham).
   * Mayoritas investor ritel pemula memulai dengan modal awal terbatas (misal Rp 100.000 hingga Rp 2.000.000). Mereka sering kesulitan dan bingung menghitung secara manual berapa lot yang sanggup dibeli dengan modal yang mereka miliki saat ini.
   * Kebingungan ini sering meninggalkan sisa saldo mengendap (*idle cash*) di Rekening Dana Nasabah (RDN) karena pemula tidak tahu saham sehat apa lagi yang terjangkau dengan sisa dana tersebut.

3. **Jebakan Bias "Harga Nominal Murah" vs "Valuasi Fundamental Murah" (*The Nominal Price Illusion*)**:
   * Pemula sering terjebak membeli saham berharga nominal rendah (misal Rp 50 atau Rp 100 per lembar, setara Rp 5.000 s/d Rp 10.000 per lot) dengan asumsi keliru bahwa saham tersebut pasti "murah" dan mudah naik, padahal perusahaan tersebut merugi, bermasalah, dan valuasinya tergolong sangat mahal.
   * Sebaliknya, pemula merasa takut membeli saham berfundamental prima (seperti BBCA atau BMRI di kisaran Rp 10.000/lembar = Rp 1.000.000 per lot) karena merasa "terlalu mahal", padahal secara valuasi laba dan dividen posisinya sangat wajar dan menguntungkan dalam jangka panjang.

4. **Ketergantungan pada Rumor Media Sosial (*FOMO*) Tanpa Alat Riset Mandiri**:
   * Karena tidak memiliki alat analisis yang mudah dipahami, pemula cenderung bergantung pada rekomendasi *influencer*, grup obrolan instan, atau rumor pasar, yang sering berujung pada kerugian modal besar.

### Posisi dalam Alur Keputusan Investor (Investor Journey)
```
[Tahap 1: Riset & Analisis di BEI Stock Insight]
Eksplorasi Heatmap Pasar -> Filter Screener -> Bedah Rasio & Chat AI -> Benchmark Sektor
                                   │
                                   ▼
          [Keputusan Investasi Matang, Rasional, & Terukur]
                                   │
                                   ▼
[Tahap 2: Eksekusi Transaksi di Aplikasi Sekuritas Pengguna]
(Pembelian saham secara mandiri di broker seperti Stockbit, Ajaib, IPOT, dll.)
```

---

## 2. Lima Fitur Utama

Setiap fitur dirancang memiliki fungsi yang spesifik dan saling mendukung dalam satu alur riset pengguna:

| No | Fitur | Status / Prioritas | Deskripsi Singkat |
|---|---|---|---|
| **01** | **Fundamental Stock Map** | **P0 (Fitur Utama)** | Visualisasi *treemap* seluruh saham BEI berdasarkan sektor, kapitalisasi pasar (*market cap*), dan indikator fundamental pilihan. |
| **02** | **Smart Fundamental Screener** | **P0 (Dasar)** | Menyaring saham berdasarkan kriteria fundamental kustom (Pertumbuhan Laba, ROE, PER, Pertumbuhan Pendapatan). |
| **03** | **Company Fundamental Profile** | **P0 (Utama)** | Menampilkan profil keuangan perusahaan, laporan keuangan, rasio kunci, dan tren pertumbuhan antarperiode. |
| **04** | **Sector Benchmark** | **P1 (Lanjutan)** | Membandingkan kondisi fundamental suatu emiten dengan emiten sejenis dalam sektor yang sama. |
| **05** | **AI Fundamental Explanation** | **P1 (Integrasi AI)** | Menyajikan ringkasan dan penjelasan otomatis mengenai kondisi keuangan perusahaan secara naratif berbantuan AI. |

---

## 3. Pemetaan & Analisis Kompetitor (StockMap by Oyenza)

Pengembangan sistem ini mengadopsi struktur dashboard dari **StockMap by Oyenza**, namun memfokuskan seluruh indikator pada **analisis fundamental**:

| Fitur StockMap (Kompetitor) | Konsep yang Diambil | Pengembangan di BEI Stock Insight | Catatan Diferensiasi |
|---|---|---|---|
| **Explore / Market Map** | *Treemap* & pengelompokan sektor | **Fundamental Stock Map** | Warna peta merefleksikan metrik fundamental, bukan sekadar pergerakan harga harian. |
| **Screener** | Filter & aturan penyaringan saham | **Smart Fundamental Screener** | Lebih terarah pada kriteria fundamental (Pertumbuhan Laba, ROE, PER, Revenue Growth). |
| **Models** | Model keuangan kuartalan berbasis laporan | **Company Fundamental Profile** | Mengambil ide transparansi data & tren keuangan tanpa spreadsheet forecasting yang terlalu rumit. |
| **Compare** | Membandingkan pergerakan saham | **Sector Benchmark** | Membandingkan fundamental emiten secara *apples-to-apples* dengan kompetitor sejenis di satu sektor. |
| **Ask Oyenza** | Interaksi berbantuan AI | **AI Fundamental Explanation** | Memberikan narasi otomatis atas angka-angka rasio keuangan agar mudah dipahami pemula. |

---

## 4. Detail Fitur Tambahan

### 02: Smart Fundamental Screener
Pengguna bisa menyaring saham berdasarkan kriteria tertentu tanpa harus membuka emiten satu per satu.
* **Contoh Kriteria Filter:**
  - *Revenue Growth* di atas 10%
  - *Net Income Growth* positif
  - *ROE (Return on Equity)* di atas 15%
  - *PER (Price to Earnings Ratio)* di bawah batas tertentu
* **Output:** Daftar emiten yang memenuhi seluruh kriteria.
* **Nilai Tambah:** Membantu pengguna menemukan saham potensial secara objektif berdasarkan indikator yang ditentukan sendiri *(bukan rekomendasi beli)*.

### 03: Company Fundamental Profile
Halaman khusus saat pengguna memilih salah satu emiten (misal: **BBCA**):

| Bagian Informasi | Data yang Ditampilkan |
|---|---|
| **Company Profile** | Nama perusahaan, kode ticker, sektor, sub-industri, dan profil ringkas |
| **Financial Performance** | Pendapatan (*Revenue*), Laba Bersih (*Net Income*), Total Aset, Total Ekuitas |
| **Financial Ratios** | ROE, ROA, DER, PER, PBV |
| **Growth Analysis** | Pertumbuhan pendapatan dan pertumbuhan laba bersih |
| **Financial History** | Grafik interaktif perkembangan kinerja keuangan tahunan & kuartalan |

> **Peran Fitur:** Halaman detail ini menjadi penghubung sentral antara peta saham (*Stock Map*), hasil saringan (*Screener*), perbandingan (*Sector Benchmark*), dan penjelasan AI (*AI Explanation*).

### 06: Modul Autentikasi & Profil Investor (User Account & Lot Simulator)
Menyediakan pengelolaan identitas pengguna, preferensi riset, serta simulator keterjangkauan modal beli lot saham:

| Halaman | Rute (*Route*) | Fungsi Utama |
|---|---|---|
| **Halaman Masuk** | `/login` | Otentikasi pengguna terdaftar dengan fitur *remember me*, info akun demo praktis, dan proteksi kredensial. |
| **Halaman Pendaftaran** | `/register` | Registrasi investor baru dengan pemilihan tingkat pengalaman (Pemula, Menengah, Mahir) dan penetapan tier modal awal RDN. |
| **Pemulihan Sandi** | `/forgot-password` | Pengiriman instruksi dan tautan atur ulang kata sandi melalui email terdaftar dengan konfirmasi visual. |
| **Profil & Pengaturan** | `/profile` | Pengelolaan data investor, bio strategi investasi, daftar pantauan (*watchlist*), serta **Simulator Keterjangkauan Lot Saham (1 Lot = 100 Lembar)** untuk menghitung sisa dana mengendap secara transparan. |

---

## 5. Hubungan & Integrasi Antar-Fitur

Kelima fitur tidak berdiri sendiri, melainkan terintegrasi secara utuh dalam satu alur riset pengguna:

```
[Dashboard Utama: BEI Stock Insight]
           │
     ┌─────┴──────────────────┐
     ▼                        ▼
[Fundamental Stock Map]  [Smart Fundamental Screener]
(Eksplorasi Saham)       (Pencarian Berdasarkan Kriteria)
     │                        │
     └───────────┬────────────┘
                 ▼
     [Company Fundamental Profile]
     (Detail Kinerja & Tren Finansial Emiten)
                 │
           ┌─────┴────────────────┐
           ▼                      ▼
     [Sector Benchmark]    [AI Fundamental Explanation]
     (Perbandingan Emiten) (Interpretasi Naratif AI)
                 │                      │
                 └───────────┬──────────┘
                             ▼
                 [Hasil Analisis Fundamental]
                 Pengguna memahami kondisi kesehatan
                 dan kinerja bisnis perusahaan
```

---

## 6. Ruang Lingkup Sistem (Input & Output)

| Fitur | Input Utama | Output Sistem |
|---|---|---|
| **Fundamental Stock Map** | Data emiten, *market cap*, indikator fundamental terpilih | Visualisasi *treemap* interaktif per sektor |
| **Smart Fundamental Screener** | Parameter batas rasio dan pertumbuhan | Tabel daftar saham yang lolos filter |
| **Company Fundamental Profile** | Ticker emiten, laporan keuangan kuartalan/tahunan | Detail kartu kinerja, tabel rasio, dan grafik tren |
| **Sector Benchmark** | Ticker terpilih & data emiten sejenis dalam 1 sektor | Tabel & grafik perbandingan rasio emiten vs sektor |
| **AI Fundamental Explanation** | Hasil rasio finansial, tren pertumbuhan, dan metrik emiten | Rangkuman narasi otomatis yang mudah dipahami |

---

## 7. Alur Pengguna (User Flow)

1. **Buka Web:** Pengguna membuka platform BEI Stock Insight.
2. **Lihat Peta Saham:** Sistem menyajikan tampilan *Fundamental Stock Map* seluruh saham BEI per sektor.
3. **Eksplorasi / Filter:** Pengguna memilih metrik visualisasi (misal: ROE) atau membuka menu *Smart Fundamental Screener* untuk menerapkan filter kustom.
4. **Pilih Emiten:** Pengguna mengklik salah satu kotak emiten (misal: **BBCA**).
5. **Akses Profil:** Sistem membuka halaman *Company Fundamental Profile*.
6. **Bandingkan Sektor:** Pengguna dapat membuka tab *Sector Benchmark* untuk membandingkan emiten dengan kompetitor seindustri.
7. **Generate AI Insight:** Pengguna menekan tombol *Generate AI Insight* untuk mendapatkan penjelasan narasi otomatis dari AI mengenai kondisi fundamental emiten tersebut.

---

## 8. Prioritas & Roadmap Pengembangan

| Fitur | Prioritas | Tingkat Pengerjaan | Fokus MVP |
|---|---|---|---|
| **Fundamental Stock Map** | **P0** | Utama | Visualisasi Treemap interaktif dengan selector metrik (Revenue Growth, Net Income Growth, ROE, PER) |
| **Company Fundamental Profile** | **P0** | Utama | Tampilan detail emiten, kartu ringkasan rasio, dan histori data |
| **Smart Fundamental Screener** | **P0** | Dasar | Filter multi-parameter dengan tabel hasil filter saham |
| **Sector Benchmark** | **P1** | Lanjutan | Komparasi metrik emiten vs rata-rata sektor/kompetitor |
| **AI Fundamental Explanation** | **P1** | Integrasi AI | Prompting AI (Gemini API) untuk interpretasi naratif atas data metrik |

---

## 9. Target Pengguna & Kesimpulan

* **Target Pengguna Utama:**
  1. **Investor Ritel Pemula & Awam:** Masyarakat yang baru mulai berinvestasi di pasar modal Indonesia, tidak memiliki latar belakang akuntansi/keuangan, dan ingin berinvestasi secara mandiri tanpa terjebak rumor atau *FOMO*.
  2. **Investor dengan Modal Awal Terbatas:** Pengguna yang membutuhkan kejelasan keterjangkauan modal beli minimum per lot (1 lot = 100 lembar) untuk mengalokasikan saldo Rekening Dana Nasabah (RDN) secara efisien ke saham-saham yang sehat secara fundamental.
* **Fokus Pembeda:** Visualisasi kondisi fundamental saham dalam satu peta interaktif, pemecah kebingungan lot/keterjangkauan modal, dan penjelasan AI naratif berbasis data keuangan faktual.
* **Strategi Pengembangan MVP:** Membatasi emiten awal pada saham-saham berkapitalisasi besar (9 emiten unggulan LQ45 dari sektor utama) untuk validasi struktur data dan formula rasio sebelum memperluas cakupan ke seluruh emiten BEI.

---

## 10. Standar Kualitas UX, Transparansi Data, & Usability Testing

Untuk memastikan sistem benar-benar mudah dipahami oleh investor pemula tanpa menimbulkan salah tafsir, diterapkan standar berikut:

### A. Sinkronisasi Indikator & Penyederhanaan Istilah Keuangan
1. **Ringkasan KPI Mengikuti Indikator Aktif**: Saat pengguna memilih suatu indikator pada Peta Saham, kartu ringkasan di bagian atas otomatis menyesuaikan:
   * **Pertumbuhan Pendapatan**: Menampilkan rata-rata pertumbuhan pendapatan YoY, jumlah perusahaan yang tumbuh, dan emiten tertinggi.
   * **Pertumbuhan Laba Bersih**: Menampilkan rata-rata pertumbuhan laba bersih, jumlah perusahaan yang labanya menurun vs bertumbuh, dan kenaikan tertinggi.
   * **Kemampuan Menghasilkan Laba (ROE)**: Menampilkan median ROE pasar, median sektor perbankan, dan emiten dengan ROE tertinggi.
   * **Valuasi Harga terhadap Laba (PER)**: Menampilkan median PER pasar serta perbandingan median PER antar-sektor.
2. **Standarisasi Istilah Ramah Pemula**:
   * *Pertumbuhan Pendapatan (Revenue Growth YoY)*
   * *Pertumbuhan Laba Bersih (Net Income Growth YoY)*
   * *Kemampuan Menghasilkan Laba (ROE)*
   * *Valuasi Harga terhadap Laba (PER)* disertai catatan bahwa PER rendah tidak otomatis berarti murah tanpa membandingkan dengan median sektor dan pertumbuhan laba.

### B. Status Spesifik pada Smart Screener & Acuan Median Sektor
1. **Penghapusan Label Subjektif**: Label seperti *"Sangat Sehat"* diganti dengan status berbasis indikator terukur:
   * **ROE di atas median sektor** (ketika laba bertumbuh dan ROE melampaui median sektornya).
   * **Pertumbuhan relatif stabil** (ketika laba bersih dan pendapatan bertumbuh positif).
   * **Pertumbuhan laba menurun** (ketika laba bersih mengalami kontraksi YoY, meskipun ROE tercatat tinggi).
2. **Pembanding Median pada Sector Benchmark**: Menggunakan **Median Sektor** sebagai acuan utama agar nilai ekstrem satu emiten tidak mendistorsi pembanding, disertai kalimat penjelasan eksplisit (misal: *"ROE BBCA berada 2,1 poin persentase di atas median sektor Keuangan"*).

### C. Transparansi AI & Metadata Sumber Data
1. **Metadata Sumber & Periode**: Seluruh halaman menampilkan informasi sumber data (**BEI / IDX**), periode laporan (**Q3 2024**), tanggal pembaruan (**15 Nov 2024**), dan status ketersediaan data (**9/9 Lengkap Terverifikasi**).
2. **Pemisahan Fakta vs Interpretasi AI**: Setiap poin pada panel **AI Insight** maupun jawaban chatbot memisahkan secara eksplisit antara:
   * **Fakta Laporan Keuangan**: Mengutip angka aktual, periode laporan Q3 2024, dan sumber BEI / IDX.
   * **Interpretasi AI**: Memberikan konteks perbandingan terhadap median sektor dengan keterangan tegas *"Interpretasi AI berdasarkan data tersedia. Bukan rekomendasi investasi."*

### D. Skenario Pengujian Pengguna (*Usability Testing*)
Validasi pemahaman pengguna dilakukan kepada 5 s/d 8 calon investor pemula melalui tiga skenario tugas mandiri:
1. **Tugas 1 (Eksplorasi Visual)**: Mencari saham yang memiliki pertumbuhan pendapatan positif melalui Peta Saham.
2. **Tugas 2 (Pemahaman Indikator)**: Menjelaskan kembali dengan bahasa sendiri arti *Kemampuan Menghasilkan Laba (ROE)* pada salah satu emiten menggunakan bantuan penjelasan sistem.
3. **Tugas 3 (Komparasi Sektoral)**: Membandingkan dua perusahaan dari sektor yang sama pada fitur *Sector Benchmark* dan menjelaskan perbedaan posisinya terhadap median sektor.

---

## 11. Modul Autentikasi Pengguna & Standardisasi UI Dropdown

Untuk memfasilitasi personalisasi riset tanpa membebani pengguna dengan input modal yang kaku, sistem mengadopsi struktur berikut:

1. **Halaman Autentikasi Mandiri (`/login`, `/register`, `/forgot-password`, `/profile`)**:
   * Memudahkan investor menyimpan daftar saham pantauan (*watchlist*), tingkat pengalaman pasar, dan preferensi sektor industri pilihan.
   * Input modal investasi RDN dihilangkan dari form registrasi dan profil agar pengguna dapat mengeksplorasi platform secara bebas tanpa hambatan memasukkan saldo pribadi.

2. **Standardisasi Komponen `DropdownSelect`**:
   * Mengganti elemen native browser `<select>` di seluruh sistem dengan komponen `DropdownSelect` berbasis custom menu yang responsif, mendukung tema gelap/terang, dilengkapi indikator warna (*dot indicator*), serta navigasi keyboard lengkap (Arrow, Enter, Escape).
   * Menghasilkan konsistensi visual identik antara menu rasio di Peta Pasar (Treemap), penyaring Smart Screener, dan form preferensi Profil Investor.

3. **Panduan Satuan Lot Saham BEI (1 Lot = 100 Lembar)**:
   * Menjelaskan ketentuan perdagangan saham di Bursa Efek Indonesia dalam satuan 1 lot (100 lembar) secara edukatif pada panel profil.
   * Menampilkan harga per lembar vs biaya minimum 1 lot untuk emiten pilihan (misal: BBCA Rp 1.000.000/lot, BBRI Rp 465.000/lot, ICBP Rp 1.180.000/lot, TLKM Rp 285.000/lot), membantu investor pemula memahami kebutuhan modal riil tanpa perlu kalkulator modal yang rumit.

---

## 12. Arsitektur Next.js App Router (Route Groups & Shared Layout)

Struktur rute frontend ditata menggunakan pola standar industri Next.js App Router:

```text
frontend/app/
│
├── (auth)/                        # Grup Autentikasi (Standalone card layout tanpa sidebar)
│   ├── login/page.tsx             # URL: /login
│   ├── register/page.tsx          # URL: /register
│   └── forgot-password/page.tsx   # URL: /forgot-password
│
└── (dashboard)/                   # Grup Dashboard Kerja (Persistent Shared Layout)
    ├── layout.tsx                 # Menyediakan Sidebar, Header, Right AI Panel, & DashboardProvider
    ├── page.tsx                   # URL: / (Redirect ke /market-map)
    ├── market-map/page.tsx        # URL: /market-map (Peta Saham Treemap)
    ├── screener/page.tsx          # URL: /screener (Smart Fundamental Screener)
    ├── benchmark/page.tsx         # URL: /benchmark (Sector Benchmark)
    ├── ai-insight/page.tsx        # URL: /ai-insight (Pusat Riset AI)
    └── profile/page.tsx           # URL: /profile (Profil Investor)
```

* **Keuntungan Teknis:**
  1. **Zero Re-mount Shell:** Sidebar dan Right AI Panel berada di `(dashboard)/layout.tsx` sehingga tidak pernah dimuat ulang saat berpindah antar-halaman.
  2. **Preservasi State & Chat:** Konteks saham aktif (misal BBCA) dan percakapan AI tetap tersimpan di `DashboardContext` saat pengguna membuka Screener atau Benchmark.
  3. **Direct Linking & Deep Navigation:** Setiap fitur memiliki URL unik yang dapat di-*share* atau di-*bookmark*, serta tombol *Back/Forward* browser bekerja secara normal.
