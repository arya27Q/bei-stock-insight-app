# Panduan Desain UI/UX & Standar Sistem
## BEI Stock Insight — AI-Powered Fundamental Stock Analysis Platform

Dokumen ini menjadi standar acuan resmi (design system, arsitektur UI/UX, prinsip interaksi, dan pedoman prompt AI) dalam pengembangan antarmuka BEI Stock Insight.

---

## 1. Filosofi & Prinsip Desain

Prinsip utama sistem: **"Complex Data, Simple Experience"**.
Analisis laporan keuangan diolah secara mendalam di tingkat sistem, namun disajikan ke pengguna dalam bentuk visual yang intuitif, bersih, dan tidak mengintimidasi pengguna pemula.

### Prinsip Utama:
1. **Visual First, Numbers Second:** Utamakan hierarki warna visual dan bagan perbandingan sebelum menyajikan tabel angka finansial mentah.
2. **Progressive Disclosure:** Informasi disajikan bertingkat (3 detik pertama: kesimpulan kesehatan bisnis -> 2-3 metrik ringkas -> narasi AI -> opsi membuka detail rasio teknis bagi yang membutuhkan).
3. **Dual-Labeling (Bahasa Awam + Istilah Resmi):** Hindari jargon tanpa konteks. Tampilkan fungsi riil indikator sebagai judul utama, dan istilah teknis pasar modal sebagai sub-label atau pelengkap.
4. **Zero-Emoji & Zero-Slop Standard:** Dilarang menggunakan emoji atau karakter stiker di seluruh antarmuka web maupun output teks AI. Seluruh kebutuhan visual wajib menggunakan icon vektor standar (Lucide React) yang proporsional.
5. **Objektivitas Faktual:** Dilarang menggunakan terminologi rekomendasi transaksi pasar seperti "Strong Buy", "Sell", "Target Harga Spekulatif", atau "Pom-pom". Sajikan kesimpulan analitis berbasis data laporan keuangan historis resmi.
6. **Penanganan Integritas Data:** Jangan menampilkan angka `0%` untuk data yang belum dilaporkan atau emiten yang baru tercatat. Wajib menampilkan badge status eksplisit: `"Data Belum Dirilis"` atau `"Belum Tersedia"`.

---

## 2. Design Tokens & Visual Hierarchy (Tailwind CSS)

### Tipografi
* **Font Antarmuka (Interface):** Sans-serif modern dan netral (`font-sans`, Geist / Inter).
* **Font Angka & Rasio:** Monospace atau tabular figures (`tabular-nums font-mono`) untuk memastikan data numerik sejajar rapi saat diperbandingkan.

### Palet Warna (Fintech Neutral Palette)
* **Background Utama:** Neutral Slate / Zinc (`bg-zinc-50` / `dark:bg-zinc-950`).
* **Permukaan Kartu (Surface):** Putih murni dengan border tipis terdefinisi (`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800`).
* **Warna Metrik Positif / Bertumbuh:** Emerald Muted (`text-emerald-700 bg-emerald-50 border-emerald-200`). Bukan hijau neon trading.
* **Warna Metrik Perhatian / Penurunan:** Rose Muted (`text-rose-700 bg-rose-50 border-rose-200`). Bukan merah alarm menyala.
* **Aksen Analisis AI:** Indigo / Slate Deep (`text-indigo-900 bg-indigo-50/70 border-indigo-200/80`) dengan icon `Sparkles` vektor.
* **Teks Primer:** `text-zinc-900 dark:text-zinc-50`.
* **Teks Sekunder & Label Sub-metrik:** `text-zinc-500 dark:text-zinc-400`.

### Radius & Elevasi
* **Container & Kartu:** `rounded-xl` hingga `rounded-2xl`.
* **Elevasi:** `shadow-xs` hingga `shadow-sm` lembut untuk memisahkan bidang informasi tanpa kesan bertumpuk.

---

## 3. Kamus Copywriting & Dual-Labeling

Gunakan pemetaan label berikut di seluruh antarmuka pengguna:

| Istilah Keuangan | Label Utama Antarmuka | Sub-Label / Istilah Teknis | Penjelasan Tooltip Bantuan |
|---|---|---|---|
| **Revenue Growth** | Pertumbuhan Pendapatan | Revenue Growth (YoY) | Kenaikan total penerimaan penjualan bisnis dibanding periode yang sama tahun lalu. |
| **Net Income Growth** | Pertumbuhan Laba Bersih | Net Profit Growth (YoY) | Kenaikan keuntungan bersih perusahaan setelah dikurangi seluruh biaya operasional dan pajak. |
| **Return on Equity (ROE)** | Efisiensi Cetak Laba | Return on Equity (ROE) | Mengukur keahlian perusahaan dalam menghasilkan laba dari setiap modal yang disetor pemegang saham. |
| **Price to Earnings (PER)** | Tingkat Valuasi Harga | Price to Earnings Ratio (PER) | Membandingkan harga saham saat ini dengan laba per lembar yang dihasilkan perusahaan. |
| **Market Capitalization** | Ukuran Nilai Perusahaan | Market Cap | Total nilai pasar keseluruhan saham perusahaan yang beredar di bursa. |

---

## 4. Spesifikasi UI 5 Fitur Utama

### 01. Fundamental Stock Map (Fitur Utama - Treemap)
* **Navigasi Atas:** 
  - Selector metrik utama (Dropdown/Segmented Control dengan label awam).
  - Selector sektor (Semua Sektor, Keuangan, Energi, Barang Konsumsi, dll.).
  - Legend warna visual bergradasi yang jelas (Tertinggal -> Rata-rata -> Unggul).
* **Interaksi Treemap:**
  - Ukuran blok merepresentasikan Market Cap.
  - Warna blok merepresentasikan nilai metrik yang dipilih.
  - Tampilan teks dalam blok: Ticker Saham (Bold), Angka Persentase/Rasio, dan Nama Ringkas.
  - Interaksi Klik: Membuka **Slide-over Sheet / Drawer** dari sisi kanan layar (bukan me-redirect halaman) agar pengguna tidak kehilangan konteks peta.

### 02. Smart Fundamental Screener (Cari Saham)
* **Preset Cepat (1-Klik):**
  - "Perusahaan Laba Stabil" (Pertumbuhan Pendapatan > 10% & Laba Positif)
  - "Perusahaan Pencetak Laba Unggul" (ROE > 15% & Market Cap > Rp 50 T)
  - "Valuasi Wajar Berkinerja Baik" (PER < 15 & Kinerja Tumbuh)
* **Filter Manual Berbasis Kategori:**
  - Slider dengan rentang visual berlabel (Contoh ROE: Semua — Sedang [>8%] — Tinggi [>15%]), bukan sekadar input field angka kosong.
* **Hasil Filter:** Tabel modern dengan sorting instan, indikator tren warna, dan tombol langsung ke detail profil.

### 03. Company Fundamental Profile (Detail Perusahaan)
* **Tier 1 (Ringkasan Instan):**
  - Ticker, Nama Resmi Emiten, Sektor, Sub-industri, Nilai Market Cap.
  - 3 Kartu Metrik Inti: Pertumbuhan Pendapatan, Pertumbuhan Laba, dan ROE.
* **Tier 2 (AI Insight Card):**
  - Panel terstruktur dengan visual khusus beraksen indigo halus.
  - 3 Poin Terstruktur:
    1. *Ringkasan Kinerja:* Penjelasan status pertumbuhan bisnis.
    2. *Kekuatan Finansial:* Aspek fundamental yang solid.
    3. *Faktor Perhatian:* Hal yang perlu dicermati (misal: beban utang atau perlambatan kuartalan).
* **Tier 3 (Detail Teknis & Historis):**
  - Komponen Accordion / Tab untuk melihat: Laporan Neraca & Laba Rugi 3-5 tahun terakhir, rasio likuiditas (DER, CR), dan pergerakan tren kuartalan.

### 04. Sector Benchmark (Bandingkan Saham)
* **Pilihan Komparasi:** Memilih 2 hingga 4 emiten di sektor yang sama atau membandingkan emiten terpilih terhadap Rata-rata Sektor (Sector Average).
* **Bagan Visual:** Diagram batang horizontal perbandingan (Bar Chart) yang memperlihatkan posisi emiten dibanding kompetitor secara proporsional.

### 05. AI Fundamental Explanation (AI Insight Engine)
* **Aturan Output AI:**
  - Format ringkas, objektif, berbasis data historis laporan keuangan.
  - Maksimal 3 paragraf pendek atau daftar poin terarah.
  - Wajib menyertakan disclaimer standar di akhir analisis.

---

## 5. Master Prompt untuk AI System & Frontend Generator

Gunakan prompt di bawah ini saat menginstruksikan AI / generator kode untuk membangun antarmuka dan modul analisis BEI Stock Insight:

```markdown
Anda adalah Principal UI/UX Engineer dan Senior Full-Stack Next.js Developer untuk proyek "BEI Stock Insight".

Misi Proyek:
Membangun platform analisis fundamental saham Bursa Efek Indonesia (BEI) berbasis web yang dirancang khusus untuk investor ritel pemula hingga menengah yang tidak memiliki latar belakang akuntansi atau keuangan.

Aturan Desain & Antarmuka (Wajib Dipatuhi):
1. ZERO EMOJI POLICY:
   - Dilarang keras menggunakan emoji atau karakter gambar stiker di teks, label, card, badge, maupun output AI.
   - Gunakan icon vektor dari library 'lucide-react' (seperti Search, SlidersHorizontal, Layers, TrendingUp, Info, ExternalLink, ShieldCheck, Sparkles).
2. NO AI SLOP / CORPORATE JARGON FLUFF:
   - Tulis teks dan antarmuka secara lugas, to-the-point, informatif, dan terstruktur.
   - Hindari basa-basi pembuka/penutup yang tidak berguna.
3. DUAL-LABELING SYSTEM:
   - Label utama wajib menggunakan bahasa Indonesia yang komunikatif dan ramah pemula (contoh: "Pertumbuhan Pendapatan", "Efisiensi Cetak Laba", "Kewajaran Harga").
   - Cantumkan istilah pasar modal resmi sebagai teks sekunder (contoh: "Revenue Growth", "Return on Equity (ROE)", "Price to Earnings (PER)").
4. PROGRESSIVE DISCLOSURE:
   - Jangan membanjiri pengguna dengan tabel angka 20 baris secara serentak.
   - Sajikan kesimpulan visual terlebih dahulu, 2-3 indikator kunci, narasi AI terstruktur, lalu sediakan tombol lipat (accordion/tabs) untuk rincian data finansial mendalam.
5. INTEGRITAS DATA:
   - Dilarang menampilkan nilai '0%' jika data laporan keuangan belum dilaporkan atau tidak tersedia. Wajib tampilkan badge 'Data Belum Tersedia' atau 'N/A'.
   - Selalu sertakan periode laporan keuangan (contoh: "Kuartal III 2024 (Tahunan)").
   - Jangan pernah menyajikan rekomendasi beli/jual saham spekulatif ("Strong Buy", "Cutloss"). Sajikan evaluasi faktual kesehatan bisnis.

Cakupan 5 Fitur Sistem:
- Feature 01: Fundamental Stock Map (Treemap interaktif per sektor industri, ukuran berdasarkan Market Cap, warna berdasarkan metrik fundamental).
- Feature 02: Smart Fundamental Screener (Filter saham berbasis kriteria pertumbuhan dan rasio tanpa rumus rumit, dengan preset cepat).
- Feature 03: Company Fundamental Profile (Halaman detail emiten dengan kartu indikator, grafik histori, dan data laporan keuangan).
- Feature 04: Sector Benchmark (Bagan komparasi emiten terhadap kompetitor sejenis dalam satu sektor).
- Feature 05: AI Fundamental Explanation (Analisis naratif kontekstual faktual dari Gemini AI mengenai kondisi emiten).

Teknologi:
- Frontend: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React, Shadcn/Radix-compatible primitives.
- Backend: Express + TypeScript, Prisma ORM, PostgreSQL.
```

