# MASTER PROMPT: BEI STOCK INSIGHT (FINTECH + ANTI-SLOP)
> Salin dan gunakan prompt di bawah ini pada AI Coding Agent (Antigravity, Cursor, Claude Code, Codex, dll.) untuk mereproduksi atau mengembangkan platform ini secara utuh dari nol.

---

```markdown
Anda adalah Senior Fullstack Fintech Engineer dan Principal UI/UX Designer kelas dunia. Tugas Anda adalah membangun platform analisis saham fundamental berbasis web bernama "BEI Stock Insight" untuk Bursa Efek Indonesia (IDX/BEI), dengan target pengguna investor ritel pemula hingga menengah yang tidak memiliki latar belakang akuntansi formal ("Complex Data, Simple Experience").

PENTING: Seluruh implementasi antarmuka, copywriting, dan kode wajib mematuhi standar filter ketat ANTI-SLOP (miqdadbadjuber/anti-slop). DILARANG menggunakan desain generik khas AI, gradien ungu/biru tanpa tujuan, animasi denyut berlebih, dan dilarang menggunakan karakter em dash (—).

---

### 1. ARSITEKTUR LAYOUT & STRUKTUR TAMPILAN

Gunakan arsitektur "3-Pane Cockpit Dashboard" (Linear/Bloomberg Terminal standard):
1. Left Sidebar Navigation (Sisi Kiri - S-Curve Cutout Notch & Buka/Tutup Fleksibel):
   - Mendukung buka/tutup penuh (w-60 saat terbuka dengan label lengkap, w-20 saat mode ikon ringkas) melalui tombol di header atas maupun bagian bawah sidebar.
   - Brand Header: Logo vektor flat solid (BarChart3 di dalam kotak hijau emerald solid, tanpa 3D).
   - Menu utama menggunakan desain "S-Curve Cutout Active Notch" (rounded-l-full dengan lengkungan cekung atas dan bawah yang menyatu mulus ke kanvas utama #0d0e13):
     - [Layers] Peta Saham (01. Fundamental Stock Map)
     - [SlidersHorizontal] Smart Screener (02. Smart Fundamental Screener)
     - [TrendingUp] Benchmark Sektor (04. Sector Benchmark)
     - [MessageSquare] Penjelasan AI (05. AI Fundamental Explanation)
   - Widget acuan pasar bawah: IHSG Acuan (7.180,40 - Laporan Keuangan Q3 2024).
2. Central Main Workspace (Area Kerja Tengah - Fokus 5 Fitur Dokumentasi Sistem):
   - Top Bar (#16171f): Tombol buka/tutup sidebar, kotak pencarian emiten (tanpa tanda #), nama fitur aktif, dan tombol buka/tutup Panel AI.
   - Kanvas Utama Dalam (#0d0e13 dengan sudut melengkung rounded-tl-[28px] dan @container):
     - Baris Ringkasan 2-Grid (MarketOverviewRow):
       1. Grid 1: Cincin pertumbuhan rata-rata (+YoY) beserta metrik ringkas Perbankan, Konsumsi, dan Rata-rata ROE.
       2. Grid 2: Kapsul hijau solid (3.567 T Market Cap) beserta distribusi 3 kelompok sektor utama (Keuangan, Konsumsi, Sektor Riil).
3. Right AI & Fundamental Copilot Panel (Sisi Kanan):
   - Lebar proporsional (sm:w-[360px] 2xl:w-[400px]) dan terbuka secara default sejak awal agar pengguna langsung melihat kehadiran kapabilitas AI tanpa menyempitkan ruang kerja utama.
   - Mode A (Saat Belum Ada Saham Dipilih): Menampilkan Asisten Analis AI BEI (Sapaan panduan, 4 chip pertanyaan populer, kartu pintas saham unggulan, dan input chat bebas untuk konsultasi pasar).
   - Mode B (Saat Saham Dipilih): Otomatis bertransformasi menjadi profil keuangan lengkap emiten terpilih (Header emiten, tombol benchmark, Tier 1 metrik kinerja, Tier 2A analisis naratif otomatis, Tier 2B mini-chat interaktif emiten tersebut, dan Tier 3 rincian rasio valuasi PER/PBV/DER).

---

### 2. LIMA FITUR UTAMA SISTEM (SPESIFIKASI TEKNIS)

Setiap fitur dirancang saling terhubung dalam satu alur riset pengguna:

#### Fitur 01: Fundamental Stock Map (Treemap Solid Full-Color & Container-Responsive)
- Mengelompokkan seluruh 9 emiten utama BEI per sektor (Keuangan, Barang Konsumsi Primer, Infrastruktur & Industri, Energi) atau tampilan Peta Pasar terpadu.
- Dua Mode Tampilan Layout Berbasis Container Query (@container):
  1. Mode Kluster Sektor:
     - Baris 1 (Sektor Keuangan - 4 Bank Utama): Otomatis tampil 2x2 (@sm:grid-cols-2) saat Panel AI kanan terbuka, dan melebar menjadi 4 kolom sejajar (@3xl:grid-cols-4) saat Panel AI ditutup.
     - Baris 2 (Sektor Barang Konsumsi Primer & Sektor Infrastruktur/Industri): Ditata seimbang 2 kolom (@3xl:grid-cols-2) dengan tinggi kartu identik.
     - Baris 3 (Sektor Energi): Ditata proporsional tanpa ruang kosong yang timpang.
  2. Mode Peta Pasar (Market Heatmap): Seluruh 9 saham utama disusun berdasarkan peringkat kapitalisasi pasar, otomatis tampil dalam 2 kolom lega (@sm:grid-cols-2) saat Panel AI terbuka dan 3x3 (@3xl:grid-cols-3) saat layar penuh.
- Desain Kartu Saham Anti-Overflow (Zero Text Clipping):
  - Kontainer kartu memiliki overflow-hidden dan min-w-0.
  - Baris Atas: Ticker (font-sans text-lg @sm:text-xl font-black) di kiri + badge Market Cap (whitespace-nowrap shrink-0) di kanan.
  - Baris Tengah: Badge sektor ringkas ("Konsumsi", "Industri", dll.) + nama perusahaan satu baris (truncate min-w-0).
  - Baris Bawah: Label metrik ringkas ("Pendapatan YoY", "Laba Bersih YoY", "ROE Ekuitas", "Valuasi PER" dengan truncate min-w-0) di kiri + ikon arah tren dan angka metrik utama (text-lg @sm:text-xl font-black tabular-nums whitespace-nowrap shrink-0) di kanan.
- Warna RGBA Harmonis (Tanpa Gradien, Menyatu dengan Dark Matte Canvas #0d0e13 / #16171f):
  - Hijau Teal Utama (`bg-[rgba(20,130,102,0.88)]` / `bg-[rgba(24,100,86,0.85)]` dengan border `rgba(52,184,150,0.3)`): Kinerja pertumbuhan sangat sehat / ROE tinggi.
  - Slate Netral (`bg-[rgba(45,50,66,0.9)]` dengan border `rgba(100,110,140,0.28)`): Kinerja netral / stabil seimbang.
  - Merah Crimson (`bg-[rgba(150,52,68,0.85)]` / `bg-[rgba(126,42,58,0.88)]` dengan border `rgba(210,85,105,0.3)`): Kinerja kontraksi / penurunan laba.
- Tipografi Angka: Menggunakan font sans-serif modern tebal dengan tabular-nums (bukan typewriter mono bertanda garis slash).
- Visual Scale Legend Bar: Indikator visual skala warna di bawah selector metrik untuk pemahaman seketika.
- Selector 4 Indikator Sejajar Lurus Satu Baris (`grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-2`):
  1. Pertumbuhan Pendapatan (Revenue Growth YoY %)
  2. Pertumbuhan Laba Bersih (Net Income Growth YoY %)
  3. Efisiensi Cetak Laba (ROE %)
  4. Kewajaran Harga Saham (PER x)
- Tombol edukasi "Arti Metrik Ini?" yang membuka popover penjelasan awam.
- Klik pada tile emiten langsung membuka detail emiten di Panel Kanan.

#### Fitur 02: Smart Fundamental Screener (Clean Executive Table Model)
- Header Halaman: Judul "Smart Screener" + View Mode Switcher (Tabel List vs Grid Kartu) + subjudul ringkas dan 4 tombol preset cepat di sisi kanan ("Semua Saham", "Tumbuh > 8%", "ROE > 15%", "PER Wajar < 15x").
- Toolbar Sejajar Terpadu:
  1. Kotak pencarian lebar ("Cari kode emiten, status, atau nama perusahaan...").
  2. Stepper navigasi siklus sektor (< Semua Sektor >) untuk berpindah sektor secara cepat.
  3. Tombol "Filter" (membuka panel slider ROE & pertumbuhan pendapatan) dan tombol "Export" (mengunduh tabel ke file CSV).
- Struktur Tabel Tema Gelap/Hitam Elegan:
  - Header Tabel Solid (bg-zinc-900 / dark:bg-zinc-800/95) dengan tipografi Title Case bersih ("Emiten & Perusahaan", "Kode & Sektor", "Kapitalisasi", "Pendapatan YoY", "ROE & Valuasi", "Status").
  - Kolom 1: Avatar lingkaran inisial per sektor dengan warna solid penuh (bg-emerald-600, bg-amber-600, bg-sky-600, bg-indigo-600, bg-rose-600, teks putih tanpa gradien/transparan) + Nama Perusahaan & sub-sektor.
  - Kolom 2: Kode Saham tebal (BBCA, BBRI, TLKM tanpa tanda #) + label sektor ringkas.
  - Kolom 3-5: Angka finansial dengan font sans-serif bersih (tabular-nums) dan simbol indikator berwarna.
  - Kolom 6: Indikator ikon status bulat ("Sangat Sehat", "Stabil Wajar", "Perlu Pantauan").
  - Footer Tabel: Informasi jumlah baris ("1 - 9 dari 9 emiten") di kiri dan kontrol halaman di kanan.

#### Fitur 03: Company Fundamental Profile (Progressive Disclosure)
- Header identitas: Ticker, nama resmi, sektor, subsektor, market cap, periode laporan keuangan BEI, dan status audit terdaftar.
- Tier 1 (3-Detik Pertama): 3 kartu performa bisnis utama (Pertumbuhan Pendapatan, Pertumbuhan Laba, ROE) dengan font mono tabular yang jelas.
- Tier 3 (Rincian Teknis Lanjutan): Menu dropdown collapsible yang menampilkan rasio PER, PBV, DER, dan narasi profil lini usaha perusahaan.

#### Fitur 04: Sector Benchmark (Komparasi Sektor)
- Membandingkan fundamental emiten secara apples-to-apples dengan kompetitor sejenis dalam 1 sektor.
- Menghitung rata-rata sektor secara otomatis sebagai acuan (benchmark line).
- Visual bar komparasi horizontal interaktif untuk metrik ROE, Pertumbuhan Pendapatan, dan PER.
- Integrasi tombol satu-klik dari Company Profile untuk langsung melompat ke sektor emiten terkait.

#### Fitur 05: AI Fundamental Intelligence (Model Hybrid)
- Komponen 2A: Rangkuman Naratif Otomatis:
  - Dihasilkan seketika saat emiten dibuka.
  - Menjelaskan ringkasan kondisi bisnis, Kekuatan Fundamental Utama (bullet points terstruktur), dan Faktor yang Perlu Diperhatikan (analisis risiko bisnis).
- Komponen 2B: Tanya Analis AI (Interaktif Mini-Chat):
  - 3 Quick Prompt Chips per emiten:
    * "Apakah valuasi harga saham ini tergolong murah atau mahal?"
    * "Bagaimana kapasitas laba dan dividen emiten ini?"
    * "Apa risiko terbesar bisnis perusahaan ini?"
  - Kotak chat interaktif yang dapat merespon pertanyaan finansial bebas dengan bahasa profesional dan mudah dipahami pemula.

---

### 3. STANDAR ATURAN WAJIB ANTI-SLOP (AI-SLOP FILTER)

Terapkan standar craftsmanship tinggi dari antislop rulebook:
1. Hard Gate R-02 (Copywriting): DILARANG KERAS menggunakan karakter em dash (—) di seluruh teks UI, judul, tooltip, respon AI, maupun dokumen. Gunakan tanda titik dua (:), tanda hubung standar (-), koma (,), atau tanda kurung ().
2. Zero-Emoji Rule: DILARANG menampilkan emoji di seluruh teks, judul, tombol, kartu, badge, dan output AI. Gunakan ikon vektor presisi dari lucide-react.
3. No AI Sparkle Clichés: DILARANG menggunakan ikon sihir Sparkles sebagai dekorasi generik. Gunakan ikon yang merepresentasikan riset data nyata (FileText, BarChart3, Layers, TrendingUp, MessageSquare, SlidersHorizontal).
4. No Eyebrow Pills Above H1: DILARANG meletakkan badge pil kecil mengambang di atas judul utama H1 yang hanya mengulang isi judul. Biarkan H1 berbicara dengan tegas.
5. No Cartoonish Pseudo-3D: DILARANG menggunakan styling tebal berlebihan seperti border-b-6 border-b-black. Gunakan ketegasan micro-border modern (border border-zinc-200 dark:border-zinc-800), elevasi halus (shadow-2xs / shadow-xs), dan transisi warna state hover yang elegan.
6. No Perpetual Motion / Pulsing: DILARANG menggunakan animate-pulse tak berkesudahan pada badge status atau indikator. Gerakan hanya boleh terjadi saat proses loading nyata (animate-spin).
7. Palet Warna Terukur (WCAG AA 4.5:1+):
   - Background: bg-slate-50/70 di light mode, dark:bg-zinc-950 di dark mode.
   - Kartu & Panel: bg-white / dark:bg-zinc-900 dengan border zinc-200 / dark:border-zinc-800.
   - Teks Utama: text-zinc-950 / dark:text-zinc-50 (rasio kontras > 18:1).
   - Teks Sekunder: text-zinc-600 / dark:text-zinc-400 (rasio kontras > 7:1).
   - Tile Peta Saham: Warna solid emerald-600/700, rose-700/800, dan zinc-700 dengan teks putih tajam (rasio kontras 5.48:1 sampai 14.89:1, lolos WCAG AA & AAA).
8. Aksesibilitas & Keyboard (R-26 & R-32):
   - Seluruh elemen yang dapat diklik wajib memiliki cursor: pointer dan indikator :focus-visible.
   - Panel/Drawer wajib dapat ditutup instan menggunakan tombol keyboard Escape.
   - Seluruh input form wajib memiliki label yang terhubung atau sr-only label.
9. Typography:
   - Font sans-serif sistem modern: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif.
   - Angka metrik dan persentase di kartu peta saham menggunakan font-sans font-bold tracking-tight tabular-nums agar rapi, modern, dan tidak bergaya mesin tik kaku.
10. Dark Mode Input Hygiene:
    - Pastikan seluruh elemen input form dan chat di dark mode mempertahankan latar gelap (dark:bg-zinc-800 / dark:focus:bg-zinc-800) dan teks terang (dark:text-zinc-50) saat dalam kondisi :focus. DILARANG menggunakan kombinasi bentrok seperti focus:bg-white tanpa override dark mode yang menyebabkan teks putih di atas latar putih.
11. Responsive Viewport Cushion:
    - Ketika panel sisi kanan (Right AI Panel) terbuka pada layar desktop (xl: atau lebih lebar), kontainer konten utama wajib memiliki padding kanan yang sesuai (xl:pr-[448px]) sehingga isi peta saham, screener, dan benchmark tidak tertutup atau terpotong oleh panel.

---

### 4. STRUKTUR TEKNOLOGI & FILE REPOSITORY

- Frontend: Next.js 16 (App Router, Turbopack, TypeScript) + Tailwind CSS 4 + Lucide React.
- Backend: Express 5 (TypeScript) pada Port 5000 (/api/stocks, /api/stocks/:ticker, /api/ai/insight, /api/ai/chat).
- Next.js Rewrites: Konfigurasi next.config.ts dengan rewrites /api/:path* diarahkan ke ${BACKEND_URL}/api/:path* (Arsitektur Single-Domain, bebas CORS, cookie-friendly).
- Struktur Folder:
  final-project-webapp/
  ├── package.json (root monorepo workspaces: ["frontend", "backend"])
  ├── docs/ (dokumentasi sistem, panduan uiux, panduan deployment, master prompt)
  ├── backend/
  │   ├── src/
  │   │   ├── index.ts
  │   │   ├── config/cors.ts
  │   │   ├── data/mock-stocks.ts (Dataset LQ45 fundamental)
  │   │   └── routes/ (health, stocks, ai)
  │   ├── package.json
  │   └── tsconfig.json
  └── frontend/
      ├── app/
      │   ├── globals.css
      │   ├── layout.tsx
      │   └── page.tsx
      ├── components/
      │   ├── layout/ (Sidebar.tsx, RightAiPanel.tsx)
      │   └── modules/ (StockMap.tsx, StockScreener.tsx, SectorBenchmark.tsx)
      ├── services/ (stock-service.ts)
      ├── types/ (stock.ts)
      └── next.config.ts

Hasilkan kode yang bersih, bebas duplikasi, dan lulus validasi TypeScript (tsc --noEmit) serta linter ESLint dengan 0 error dan 0 warning.
```
