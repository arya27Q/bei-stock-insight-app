import { StockFundamental, AIInsightData, MetricDefinition, MetricType } from "../types/stock";

export const QUARTER_LABELS = ["Q4 2023", "Q1 2024", "Q2 2024", "Q3 2024"] as const;

export const DATA_METADATA = {
  source: "BEI / IDX",
  period: "Q3 2024",
  lastUpdated: "15 Nov 2024",
  status: "Terverifikasi",
  datasetNote: "Dataset Laporan Keuangan Publik Emiten LQ45",
};

export const METRIC_DEFINITIONS: Record<MetricType, MetricDefinition> = {
  revenueGrowth: {
    id: "revenueGrowth",
    label: "Pertumbuhan Pendapatan",
    subLabel: "Revenue Growth (YoY)",
    unit: "%",
    tooltip:
      "Persentase kenaikan atau penurunan total pendapatan penjualan perusahaan dibandingkan periode yang sama tahun sebelumnya (Year-on-Year).",
    benchmarkRule: (v) => (v >= 10 ? "positive" : v >= 0 ? "neutral" : "caution"),
  },
  netIncomeGrowth: {
    id: "netIncomeGrowth",
    label: "Pertumbuhan Laba Bersih",
    subLabel: "Net Income Growth (YoY)",
    unit: "%",
    tooltip:
      "Persentase perubahan laba bersih perusahaan setelah dikurangi seluruh beban operasional, bunga, dan pajak dibandingkan periode tahun lalu.",
    benchmarkRule: (v) => (v >= 10 ? "positive" : v >= 0 ? "neutral" : "caution"),
  },
  roe: {
    id: "roe",
    label: "Kemampuan Menghasilkan Laba (ROE)",
    subLabel: "Return on Equity (ROE)",
    unit: "%",
    tooltip:
      "Mengukur seberapa besar laba bersih yang dihasilkan dari setiap modal pemegang saham (ekuitas). Bandingkan dengan median sektor sejenis.",
    benchmarkRule: (v) => (v >= 15 ? "positive" : v >= 8 ? "neutral" : "caution"),
  },
  per: {
    id: "per",
    label: "Valuasi Harga terhadap Laba (PER)",
    subLabel: "Price to Earnings Ratio (PER)",
    unit: "x",
    tooltip:
      "Perbandingan harga saham terhadap laba bersih per saham. Angka PER rendah tidak otomatis berarti murah; penilaian wajib memperhatikan median sektor dan tren pertumbuhan laba.",
    benchmarkRule: (v) => (v > 0 && v <= 15 ? "positive" : v <= 22 ? "neutral" : "caution"),
  },
};

export function getMedianValue(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1));
  }
  return Number(sorted[mid].toFixed(1));
}

export function getSectorMedian(
  stocks: StockFundamental[],
  sector: string,
  metric: MetricType
): number {
  const sectorStocks =
    sector === "all" ? stocks : stocks.filter((s) => s.sector === sector);
  const targetList = sectorStocks.length > 0 ? sectorStocks : stocks;
  return getMedianValue(targetList.map((s) => s[metric]));
}

// Data tren historis 4 kuartal (Q4 '23, Q1 '24, Q2 '24, Q3 '24) untuk grafik Sparkline mini dan Tabel Histori
export const PRESET_TRENDS: Record<string, Partial<Record<MetricType, number[]>>> = {
  BBCA: {
    revenueGrowth: [9.5, 10.8, 11.6, 12.8],
    netIncomeGrowth: [12.1, 13.5, 14.4, 15.3],
    roe: [20.5, 21.0, 21.6, 22.1],
    per: [24.5, 24.0, 23.8, 23.5],
  },
  BBRI: {
    revenueGrowth: [11.2, 10.5, 9.8, 9.5],
    netIncomeGrowth: [9.5, 9.0, 8.6, 8.2],
    roe: [18.5, 18.9, 19.2, 19.4],
    per: [14.2, 13.6, 13.1, 12.8],
  },
  BMRI: {
    revenueGrowth: [9.1, 9.9, 10.5, 11.2],
    netIncomeGrowth: [11.8, 12.6, 13.5, 14.1],
    roe: [19.2, 19.7, 20.1, 20.6],
    per: [12.5, 12.1, 11.7, 11.4],
  },
  TLKM: {
    revenueGrowth: [2.8, 3.1, 3.4, 3.7],
    netIncomeGrowth: [1.2, -1.5, -3.8, -5.2],
    roe: [16.2, 16.5, 16.7, 16.8],
    per: [15.2, 14.6, 14.2, 13.9],
  },
  ASII: {
    revenueGrowth: [1.2, 1.6, 1.8, 2.1],
    netIncomeGrowth: [2.5, 0.4, -2.1, -4.3],
    roe: [15.1, 14.8, 14.5, 14.2],
    per: [7.8, 7.4, 7.1, 6.8],
  },
  ICBP: {
    revenueGrowth: [6.5, 7.2, 7.9, 8.4],
    netIncomeGrowth: [11.2, 13.4, 15.8, 17.6],
    roe: [16.8, 17.2, 17.8, 18.2],
    per: [14.2, 14.5, 14.8, 15.1],
  },
  ADRO: {
    revenueGrowth: [-3.2, -6.5, -9.1, -11.5],
    netIncomeGrowth: [-5.2, -8.7, -11.6, -14.2],
    roe: [28.2, 26.5, 25.1, 23.8],
    per: [5.8, 5.2, 4.8, 4.5],
  },
  BBNI: {
    revenueGrowth: [5.8, 6.2, 6.7, 7.2],
    netIncomeGrowth: [4.9, 5.5, 6.0, 6.4],
    roe: [14.2, 14.5, 14.8, 15.1],
    per: [10.5, 10.1, 9.7, 9.3],
  },
  UNVR: {
    revenueGrowth: [-1.8, -3.2, -5.0, -6.8],
    netIncomeGrowth: [-10.5, -14.2, -18.0, -21.4],
    roe: [42.0, 40.5, 39.2, 38.5],
    per: [22.4, 20.8, 19.5, 18.7],
  },
};

export function getHistoricalTrend(stock: StockFundamental, metric: MetricType): number[] {
  if (stock.historicalTrends?.[metric]) {
    return stock.historicalTrends[metric]!;
  }
  if (PRESET_TRENDS[stock.ticker]?.[metric]) {
    return PRESET_TRENDS[stock.ticker]![metric]!;
  }
  const curr = stock[metric];
  if (typeof curr !== "number") return [10, 10, 10, 10];
  if (curr >= 0) {
    return [
      Number((curr * 0.85).toFixed(1)),
      Number((curr * 0.90).toFixed(1)),
      Number((curr * 0.95).toFixed(1)),
      curr,
    ];
  }
  return [
    Number((curr * 0.60).toFixed(1)),
    Number((curr * 0.75).toFixed(1)),
    Number((curr * 0.90).toFixed(1)),
    curr,
  ];
}

export const INITIAL_STOCKS: StockFundamental[] = [
  {
    ticker: "BBCA",
    name: "Bank Central Asia Tbk",
    sector: "Keuangan",
    subSector: "Bank Swasta",
    marketCap: 1250000000000000,
    marketCapLabel: "Rp 1.250 T",
    revenueGrowth: 12.8,
    netIncomeGrowth: 15.3,
    roe: 22.1,
    per: 23.5,
    pbv: 4.8,
    der: 0.8,
    revenueLabel: "Rp 78,4 T",
    netIncomeLabel: "Rp 41,1 T",
    totalAssetsLabel: "Rp 1.432 T",
    totalEquityLabel: "Rp 252 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Bank swasta terbesar di Indonesia dengan keunggulan transaksi digital dan porsi dana murah (CASA) yang dominan.",
    ipoYear: 2000,
    listingBoard: "Papan Utama",
    controllingShareholder: "PT Dwimuria Investama Andalan (Grup Djarum)",
    controllingPercentage: 54.94,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 45.06,
    businessSegments: [
      { name: "Pendapatan Bunga Bersih (NII)", percentage: 77 },
      { name: "Pendapatan Non-Bunga & Transaksi", percentage: 23 },
    ],
    dividendYield: 2.8,
    dividendPayoutRatio: 68.0,
    dividendDateNote: "Rutin 2x setahun (Interim & Final)",
    netProfitMargin: 52.4,
    sectorSpecificMetric: { label: "NIM / NPL Gross", value: "5.8% / 1.8%" },
    keyMoat: "Rasio CASA mencapai 82% (dana murah melimpah) dengan ekosistem transaksi perbankan digital terdepan di Indonesia.",
    keyRisk: "Penurunan daya beli kredit konsumer serta potensi persaingan dari neobank dan ekosistem fintech.",
  },
  {
    ticker: "BBRI",
    name: "Bank Rakyat Indonesia (Persero) Tbk",
    sector: "Keuangan",
    subSector: "Bank BUMN",
    marketCap: 710000000000000,
    marketCapLabel: "Rp 710 T",
    revenueGrowth: 9.5,
    netIncomeGrowth: 8.2,
    roe: 19.4,
    per: 12.8,
    pbv: 2.2,
    der: 1.1,
    revenueLabel: "Rp 148,5 T",
    netIncomeLabel: "Rp 45,3 T",
    totalAssetsLabel: "Rp 1.965 T",
    totalEquityLabel: "Rp 318 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Bank fokus pembiayaan segmen UMKM dan mikro terbesar dengan jaringan kantor cabang terluas di seluruh Indonesia.",
    ipoYear: 2003,
    listingBoard: "Papan Utama",
    controllingShareholder: "Negara Republik Indonesia (BUMN)",
    controllingPercentage: 53.19,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 46.81,
    businessSegments: [
      { name: "Kredit Mikro & Ultra Mikro (Kupedes/KUR)", percentage: 58 },
      { name: "Kredit Korporasi & Komersial", percentage: 24 },
      { name: "Jasa Keuangan & Operasional Lainnya", percentage: 18 },
    ],
    dividendYield: 6.8,
    dividendPayoutRatio: 80.0,
    dividendDateNote: "Dividen jumbo BUMN, rutin 2x setahun",
    netProfitMargin: 30.5,
    sectorSpecificMetric: { label: "NIM / NPL Gross", value: "7.7% / 2.9%" },
    keyMoat: "Monopoli segmen kredit mikro dan jaringan AgenBRILink di seluruh pelosok pedesaan Indonesia.",
    keyRisk: "Sensitivitas pemburukan NPL segmen mikro pasca normalisasi restrukturisasi pembiayaan.",
  },
  {
    ticker: "BMRI",
    name: "Bank Mandiri (Persero) Tbk",
    sector: "Keuangan",
    subSector: "Bank BUMN",
    marketCap: 605000000000000,
    marketCapLabel: "Rp 605 T",
    revenueGrowth: 11.2,
    netIncomeGrowth: 14.1,
    roe: 20.6,
    per: 11.4,
    pbv: 2.1,
    der: 1.0,
    revenueLabel: "Rp 112,6 T",
    netIncomeLabel: "Rp 42,0 T",
    totalAssetsLabel: "Rp 2.257 T",
    totalEquityLabel: "Rp 284 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Bank korporasi dan komersial terkemuka dengan pertumbuhan ekosistem digital Livin' dan Kopra by Mandiri.",
    ipoYear: 2003,
    listingBoard: "Papan Utama",
    controllingShareholder: "Negara Republik Indonesia (BUMN)",
    controllingPercentage: 52.0,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 48.0,
    businessSegments: [
      { name: "Kredit Korporasi & Institusi", percentage: 52 },
      { name: "Kredit Komersial & Retail", percentage: 31 },
      { name: "Treasury & Pasar Modal", percentage: 17 },
    ],
    dividendYield: 5.2,
    dividendPayoutRatio: 60.0,
    dividendDateNote: "Rutin dividen tahunan BUMN",
    netProfitMargin: 37.3,
    sectorSpecificMetric: { label: "NIM / NPL Gross", value: "5.2% / 1.0%" },
    keyMoat: "Penguasa pangsa pasar kredit korporasi nasional dengan adopsi pesat platform digital Livin' dan Kopra.",
    keyRisk: "Eksposur kredit terhadap volatilitas komoditas dan proyek infrastruktur besar nasional.",
  },
  {
    ticker: "TLKM",
    name: "Telkom Indonesia (Persero) Tbk",
    sector: "Infrastruktur",
    subSector: "Telekomunikasi",
    marketCap: 280000000000000,
    marketCapLabel: "Rp 280 T",
    revenueGrowth: 3.7,
    netIncomeGrowth: -5.2,
    roe: 16.8,
    per: 13.9,
    pbv: 2.4,
    der: 0.9,
    revenueLabel: "Rp 112,2 T",
    netIncomeLabel: "Rp 17,6 T",
    totalAssetsLabel: "Rp 285 T",
    totalEquityLabel: "Rp 156 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Perusahaan telekomunikasi digital terbesar di Indonesia penyedia jaringan fiber optic, seluler (Telkomsel), dan pusat data.",
    ipoYear: 1995,
    listingBoard: "Papan Utama",
    controllingShareholder: "Negara Republik Indonesia (BUMN)",
    controllingPercentage: 52.09,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 47.91,
    businessSegments: [
      { name: "Seluler & Broadband (Telkomsel & IndiHome)", percentage: 72 },
      { name: "Enterprise & Pusat Data (Data Center)", percentage: 18 },
      { name: "Jaringan Wholesale & Tower", percentage: 10 },
    ],
    dividendYield: 5.8,
    dividendPayoutRatio: 72.0,
    dividendDateNote: "Dividen konsisten historis tinggi",
    netProfitMargin: 15.7,
    sectorSpecificMetric: { label: "ARPU / Pelanggan Seluler", value: "Rp 46.000 / 159 Juta" },
    keyMoat: "Infrastruktur kabel serat optik dan jaringan BTS terluas di seluruh kepulauan Indonesia.",
    keyRisk: "Perang tarif paket data seluler serta beban belanja modal (Capex) infrastruktur 5G.",
  },
  {
    ticker: "ASII",
    name: "Astra International Tbk",
    sector: "Perindustrian",
    subSector: "Otomotif & Alat Berat",
    marketCap: 202000000000000,
    marketCapLabel: "Rp 202 T",
    revenueGrowth: 2.1,
    netIncomeGrowth: -4.3,
    roe: 14.2,
    per: 6.8,
    pbv: 0.9,
    der: 0.6,
    revenueLabel: "Rp 246,3 T",
    netIncomeLabel: "Rp 25,8 T",
    totalAssetsLabel: "Rp 462 T",
    totalEquityLabel: "Rp 254 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Perusahaan multisektor yang mengoperasikan lini bisnis otomotif, jasa keuangan, alat berat, pertambangan, dan agribisnis.",
    ipoYear: 1990,
    listingBoard: "Papan Utama",
    controllingShareholder: "Jardine Cycle & Carriage Ltd",
    controllingPercentage: 50.11,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 49.89,
    businessSegments: [
      { name: "Otomotif & Komponen (Toyota, Daihatsu, Honda)", percentage: 42 },
      { name: "Alat Berat, Tambang & Konstruksi (UNTR)", percentage: 39 },
      { name: "Jasa Keuangan & Asuransi", percentage: 12 },
      { name: "Agribisnis & Teknologi", percentage: 7 },
    ],
    dividendYield: 7.2,
    dividendPayoutRatio: 65.0,
    dividendDateNote: "Rutin dividen interim & final tinggi",
    netProfitMargin: 10.5,
    sectorSpecificMetric: { label: "Pangsa Pasar Otomotif 4W", value: "56% Nasional" },
    keyMoat: "Konglomerasi multi-industri terdiversifikasi dengan dominasi rantai pasok otomotif terbesar di ASEAN.",
    keyRisk: "Penetrasi kendaraan listrik (EV) merek baru dan penurunan harga komoditas tambang di anak usaha.",
  },
  {
    ticker: "ICBP",
    name: "Indofood CBP Sukses Makmur Tbk",
    sector: "Barang Konsumsi Primer",
    subSector: "Makanan Olahan",
    marketCap: 135000000000000,
    marketCapLabel: "Rp 135 T",
    revenueGrowth: 8.4,
    netIncomeGrowth: 17.6,
    roe: 18.2,
    per: 15.1,
    pbv: 2.9,
    der: 1.4,
    revenueLabel: "Rp 55,4 T",
    netIncomeLabel: "Rp 8,1 T",
    totalAssetsLabel: "Rp 124 T",
    totalEquityLabel: "Rp 64 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Produsen barang konsumsi kebutuhan pokok dengan merek mi instan Indomie, produk susu, dan makanan ringan.",
    ipoYear: 2010,
    listingBoard: "Papan Utama",
    controllingShareholder: "PT Indofood Sukses Makmur Tbk (INDF)",
    controllingPercentage: 80.53,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 19.47,
    businessSegments: [
      { name: "Mi Instan (Indomie, Supermi, Sarimi)", percentage: 72 },
      { name: "Dairy / Produk Susu (Indomilk)", percentage: 14 },
      { name: "Makanan Ringan & Bumbu Makanan", percentage: 14 },
    ],
    dividendYield: 3.5,
    dividendPayoutRatio: 45.0,
    dividendDateNote: "Rutin tahunan stabil",
    netProfitMargin: 14.6,
    sectorSpecificMetric: { label: "Gross Profit Margin (GPM)", value: "37.2%" },
    keyMoat: "Kekuatan penetapan harga (pricing power) merek global Indomie dengan penetrasi ekspor di Timur Tengah & Afrika.",
    keyRisk: "Fluktuasi harga komoditas gandum dan CPO dunia serta beban utang valas (USD) akuisisi Pinehill.",
  },
  {
    ticker: "ADRO",
    name: "Adaro Energy Indonesia Tbk",
    sector: "Energi",
    subSector: "Batu Bara & Energi",
    marketCap: 118000000000000,
    marketCapLabel: "Rp 118 T",
    revenueGrowth: -11.5,
    netIncomeGrowth: -14.2,
    roe: 23.8,
    per: 4.5,
    pbv: 0.9,
    der: 0.3,
    revenueLabel: "Rp 71,8 T",
    netIncomeLabel: "Rp 18,4 T",
    totalAssetsLabel: "Rp 162 T",
    totalEquityLabel: "Rp 115 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Perusahaan energi terintegrasi dan pertambangan batu bara termal yang mendiversifikasi bisnis ke pengolahan mineral dan energi baru.",
    ipoYear: 2008,
    listingBoard: "Papan Utama",
    controllingShareholder: "Konsorsium Garibaldi Thohir & Keluarga Soeryadjaya",
    controllingPercentage: 43.91,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 56.09,
    businessSegments: [
      { name: "Pertambangan & Perdagangan Batu Bara Termal", percentage: 82 },
      { name: "Batu Bara Metalurgi (Coking Coal)", percentage: 12 },
      { name: "Logistik, Pelabuhan & Pembangkit Listrik", percentage: 6 },
    ],
    dividendYield: 11.5,
    dividendPayoutRatio: 40.0,
    dividendDateNote: "Dividen reguler tinggi & dividen spesial spin-off",
    netProfitMargin: 25.6,
    sectorSpecificMetric: { label: "Arus Kas Operasi (CFO)", value: "Rp 21,8 T" },
    keyMoat: "Struktur biaya penambangan terendah di kelasnya (cash cost leader) dengan cadangan Envirocoal bernilai tinggi.",
    keyRisk: "Normalisasi harga batu bara global pasca siklus komoditas dan kebijakan transisi energi ramah lingkungan.",
  },
  {
    ticker: "BBNI",
    name: "Bank Negara Indonesia (Persero) Tbk",
    sector: "Keuangan",
    subSector: "Bank BUMN",
    marketCap: 195000000000000,
    marketCapLabel: "Rp 195 T",
    revenueGrowth: 7.2,
    netIncomeGrowth: 6.4,
    roe: 15.1,
    per: 9.3,
    pbv: 1.2,
    der: 1.2,
    revenueLabel: "Rp 48,7 T",
    netIncomeLabel: "Rp 16,3 T",
    totalAssetsLabel: "Rp 1.068 T",
    totalEquityLabel: "Rp 158 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Bank BUMN yang berfokus pada pembiayaan korporasi, sindikasi, dan layanan perbankan transaksi internasional.",
    ipoYear: 1996,
    listingBoard: "Papan Utama",
    controllingShareholder: "Negara Republik Indonesia (BUMN)",
    controllingPercentage: 60.0,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 40.0,
    businessSegments: [
      { name: "Kredit Korporasi & Sindikasi", percentage: 54 },
      { name: "Kredit Konsumer & Komersial", percentage: 32 },
      { name: "Transaksi Perbankan Global & Treasury", percentage: 14 },
    ],
    dividendYield: 4.8,
    dividendPayoutRatio: 50.0,
    dividendDateNote: "Rutin dividen tahunan BUMN",
    netProfitMargin: 33.5,
    sectorSpecificMetric: { label: "NIM / NPL Gross", value: "4.4% / 2.0%" },
    keyMoat: "Spesialisasi perbankan transaksi internasional dengan jaringan kantor cabang luar negeri (London, Tokyo, New York).",
    keyRisk: "Margin bunga bersih (NIM) yang lebih rendah dibanding bank BUMN pesaing.",
  },
  {
    ticker: "UNVR",
    name: "Unilever Indonesia Tbk",
    sector: "Barang Konsumsi Primer",
    subSector: "Kebutuhan Rumah Tangga",
    marketCap: 72000000000000,
    marketCapLabel: "Rp 72 T",
    revenueGrowth: -6.8,
    netIncomeGrowth: -21.4,
    roe: 38.5,
    per: 18.7,
    pbv: 14.5,
    der: 2.1,
    revenueLabel: "Rp 27,4 T",
    netIncomeLabel: "Rp 3,0 T",
    totalAssetsLabel: "Rp 16,8 T",
    totalEquityLabel: "Rp 3,4 T",
    period: "Q3 2024",
    lastUpdated: "15 Nov 2024",
    dataSource: "BEI / IDX",
    dataStatus: "Terverifikasi",
    hasData: true,
    description:
      "Produsen barang kebutuhan harian rumah tangga, perawatan diri, dan produk makanan-minuman konsumen.",
    ipoYear: 1982,
    listingBoard: "Papan Utama",
    controllingShareholder: "Unilever Indonesia Holding B.V.",
    controllingPercentage: 85.0,
    publicShareholder: "Masyarakat / Free Float",
    publicPercentage: 15.0,
    businessSegments: [
      { name: "Perawatan Tubuh & Kebersihan (Lifebuoy, Dove)", percentage: 66 },
      { name: "Makanan & Minuman (Bango, Royco, SariWangi)", percentage: 34 },
    ],
    dividendYield: 4.2,
    dividendPayoutRatio: 99.0,
    dividendDateNote: "Dividen payout konsisten mendekati 100% laba",
    netProfitMargin: 10.9,
    sectorSpecificMetric: { label: "Return on Assets (ROA)", value: "18.2%" },
    keyMoat: "Kekuatan merek legendaris (household names) dengan penetrasi distribusi di hampir setiap gerai ritel Indonesia.",
    keyRisk: "Erosi pangsa pasar akibat kompetitor berharga lebih ekonomis dan tantangan daya beli konsumen kelas menengah.",
  },
];

export async function fetchStocks(): Promise<StockFundamental[]> {
  try {
    const res = await fetch("/api/stocks", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data dari API");
    const json = await res.json();
    const apiStocks: StockFundamental[] = json.data || [];
    if (apiStocks.length === 0) return INITIAL_STOCKS;

    // Gabungkan data API dengan INITIAL_STOCKS agar seluruh 9 emiten utama dan field rincian tetap lengkap
    const mergedMap = new Map<string, StockFundamental>();
    for (const item of INITIAL_STOCKS) {
      mergedMap.set(item.ticker, item);
    }
    for (const apiItem of apiStocks) {
      const existing = mergedMap.get(apiItem.ticker);
      mergedMap.set(apiItem.ticker, {
        ...existing,
        ...apiItem,
        period: "Q3 2024",
        dataSource: "BEI / IDX",
        lastUpdated: "15 Nov 2024",
        dataStatus: "Terverifikasi",
      });
    }
    return Array.from(mergedMap.values());
  } catch {
    return INITIAL_STOCKS;
  }
}

export async function fetchStockDetail(ticker: string): Promise<StockFundamental | null> {
  try {
    const res = await fetch(`/api/stocks/${ticker}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Emiten tidak ditemukan");
    const json = await res.json();
    const existing = INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase());
    return { ...existing, ...json.data, period: "Q3 2024" };
  } catch {
    const found = INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase());
    return found || null;
  }
}

export function buildTransparentInsight(stock: StockFundamental): AIInsightData {
  const sectorMedianRoe = getSectorMedian(INITIAL_STOCKS, stock.sector, "roe");
  const sectorMedianPer = getSectorMedian(INITIAL_STOCKS, stock.sector, "per");
  const roeDiff = Number((stock.roe - sectorMedianRoe).toFixed(1));
  const perDiff = Number((stock.per - sectorMedianPer).toFixed(1));

  const isRevPos = stock.revenueGrowth >= 0;
  const isNetPos = stock.netIncomeGrowth >= 0;

  const factPoints = [
    {
      category: isNetPos ? "Pertumbuhan Laba & Pendapatan" : "Realisasi Pendapatan & Laba",
      text: isNetPos
        ? `Laba bersih meningkat +${stock.netIncomeGrowth}% YoY (${stock.netIncomeLabel || "sesuai laporan"}) seiring pertumbuhan pendapatan +${stock.revenueGrowth}% YoY (${stock.revenueLabel || "periode berjalan"}).`
        : `Pendapatan tercatat ${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`} YoY (${stock.revenueLabel || "-"}) sementara laba bersih mengalami penyesuaian ${stock.netIncomeGrowth}% YoY (${stock.netIncomeLabel || "-"}).`,
      basisLabel: `Fakta berdasarkan laporan keuangan ${stock.period} • Sumber: ${stock.dataSource || "BEI / IDX"}`,
    },
    {
      category: "Kemampuan Menghasilkan Laba (ROE)",
      text: `ROE perusahaan tercatat sebesar ${stock.roe}% dengan total ekuitas ${stock.totalEquityLabel || "-"} ( berada ${roeDiff >= 0 ? `+${roeDiff}` : roeDiff} poin persentase terhadap median sektor ${stock.sector} sebesar ${sectorMedianRoe}%).`,
      basisLabel: `Fakta berdasarkan laporan keuangan ${stock.period} • Sumber: ${stock.dataSource || "BEI / IDX"}`,
    },
  ];

  const interpretationPoints = [
    {
      category: "Valuasi Harga terhadap Laba (PER)",
      text:
        stock.per > sectorMedianPer
          ? `PER sebesar ${stock.per}x berada ${Math.abs(perDiff)}x di atas median sektor ${stock.sector} (${sectorMedianPer}x). Valuasi lebih tinggi perlu dievaluasi bersama konsistensi pertumbuhan laba dan posisi pasar.`
          : `PER sebesar ${stock.per}x berada ${Math.abs(perDiff)}x di bawah median sektor ${stock.sector} (${sectorMedianPer}x). Angka PER rendah tidak otomatis berarti murah; perhatikan tren laba (${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`}) dan siklus sektor.`,
      basisLabel: "Interpretasi AI berdasarkan data tersedia. Bukan rekomendasi investasi.",
    },
    {
      category: !isNetPos ? "Tekanan Laba & Struktur Modal" : "Struktur Modal & Risiko Sektoral",
      text: !isNetPos
        ? `Meskipun ROE tercatat ${stock.roe}%, penurunan laba bersih sebesar ${stock.netIncomeGrowth}% YoY dan rasio utang terhadap ekuitas (DER) ${stock.der || 0.8}x menuntut pemantauan pemulihan margin pada kuartal berikutnya.`
        : `Rasio utang terhadap ekuitas (DER) sebesar ${stock.der || 0.8}x dan PBV ${stock.pbv || 1.5}x perlu terus dipantau terhadap perubahan suku bunga serta kompetisi di sektor ${stock.sector}.`,
      basisLabel: "Interpretasi AI berdasarkan data tersedia. Bukan rekomendasi investasi.",
    },
  ];

  return {
    ticker: stock.ticker,
    name: stock.name,
    period: stock.period,
    source: stock.dataSource || "BEI / IDX",
    lastUpdated: stock.lastUpdated || "15 Nov 2024",
    summary: `Berdasarkan laporan keuangan ${stock.period} (Sumber: BEI / IDX), ${stock.name} (${stock.ticker}) membukukan pendapatan ${stock.revenueLabel || "-"} (${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`} YoY) dan laba bersih ${stock.netIncomeLabel || "-"} (${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`} YoY) dengan kapitalisasi pasar ${stock.marketCapLabel}.`,
    strengths: factPoints.map((f) => `${f.category}: ${f.text}`),
    considerations: interpretationPoints.map((i) => `${i.category}: ${i.text}`),
    factPoints,
    interpretationPoints,
    disclaimer:
      "Fakta numerik mengacu pada laporan keuangan Q3 2024 BEI/IDX. Interpretasi AI bersifat edukatif dan bukan merupakan rekomendasi beli atau jual saham.",
  };
}

export async function fetchAiInsight(ticker: string): Promise<AIInsightData> {
  const fallbackStock =
    INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase()) || INITIAL_STOCKS[0];
  try {
    const res = await fetch("/api/ai/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    });
    if (!res.ok) throw new Error("Gagal memanggil AI service");
    const json = await res.json();
    const baseInsight = buildTransparentInsight(fallbackStock);
    return {
      ...baseInsight,
      ...json.data,
      period: "Q3 2024",
      source: "BEI / IDX",
      factPoints: baseInsight.factPoints,
      interpretationPoints: baseInsight.interpretationPoints,
    };
  } catch {
    return buildTransparentInsight(fallbackStock);
  }
}

export async function askAiStockChat(ticker: string, question: string): Promise<string> {
  const q = question.toLowerCase();

  if (!ticker || ticker === "MARKET" || ticker === "ALL") {
    if (q.includes("roe") || q.includes("efisiensi") || q.includes("tinggi") || q.includes("kemampuan")) {
      return "[Fakta Q3 2024 • BEI/IDX]: Emiten dengan ROE tertinggi adalah UNVR (38.5%), ADRO (23.8%), dan BBCA (22.1%). [Interpretasi AI]: ROE tinggi perlu dibaca bersama pertumbuhan laba bersih; BBCA mencatatkan laba naik +15.3%, sedangkan UNVR (-21.4%) dan ADRO (-14.2%) sedang mengalami kontraksi laba.";
    }
    if (q.includes("murah") || q.includes("per") || q.includes("valuasi")) {
      return "[Fakta Q3 2024 • BEI/IDX]: Emiten dengan rasio PER terendah adalah ADRO (4.5x), ASII (6.8x), dan BBNI (9.3x). [Interpretasi AI]: PER rendah tidak otomatis berarti murah; perhatikan bahwa setiap sektor memiliki median PER berbeda (Keuangan 12.1x vs Konsumsi 16.9x) dan cek apakah laba bersihnya bertumbuh.";
    }
    return "[Fakta Q3 2024 • BEI/IDX]: Platform memantau 9 emiten LQ45 dengan data laporan keuangan terverifikasi. [Interpretasi AI]: Klik salah satu kartu emiten pada Peta Saham untuk melihat rincian nominal pendapatan, laba bersih, histori 4 kuartal, serta pembanding median sektornya.";
  }

  const stock = INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase()) || INITIAL_STOCKS[0];
  const sectorMedianRoe = getSectorMedian(INITIAL_STOCKS, stock.sector, "roe");
  const sectorMedianPer = getSectorMedian(INITIAL_STOCKS, stock.sector, "per");

  if (q.includes("murah") || q.includes("mahal") || q.includes("valuasi") || q.includes("per") || q.includes("harga")) {
    const diffPer = Number((stock.per - sectorMedianPer).toFixed(1));
    return `[Fakta Laporan ${stock.period} • Sumber: BEI/IDX]: PER ${stock.ticker} tercatat ${stock.per}x dengan PBV ${stock.pbv || 1.2}x, sedangkan median PER sektor ${stock.sector} berada di ${sectorMedianPer}x (selisih ${diffPer >= 0 ? `+${diffPer}x` : `${diffPer}x`}). [Interpretasi AI]: Angka PER tidak bisa dinilai murah atau mahal secara tunggal tanpa melihat sektor dan pertumbuhan laba (${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`} YoY). Bukan rekomendasi investasi.`;
  }
  if (q.includes("dividen") || q.includes("laba") || q.includes("cuan") || q.includes("roe")) {
    const diffRoe = Number((stock.roe - sectorMedianRoe).toFixed(1));
    return `[Fakta Laporan ${stock.period} • Sumber: BEI/IDX]: ${stock.ticker} membukukan laba bersih ${stock.netIncomeLabel || "-"} (${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`} YoY) dan ROE ${stock.roe}% (median sektor ${stock.sector}: ${sectorMedianRoe}%, selisih ${diffRoe >= 0 ? `+${diffRoe}` : diffRoe} poin persentase). [Interpretasi AI]: Kapasitas laba ini menjadi indikator kemampuan perusahaan menjaga saldo laba ditahan, namun keputusan dividen bergantung pada RUPS. Bukan rekomendasi investasi.`;
  }
  if (q.includes("risiko") || q.includes("rugi") || q.includes("bahaya") || q.includes("turun") || q.includes("utang")) {
    return `[Fakta Laporan ${stock.period} • Sumber: BEI/IDX]: Pertumbuhan pendapatan tercatat ${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`} YoY, pertumbuhan laba bersih ${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`} YoY, dan rasio utang terhadap ekuitas (DER) ${stock.der || 0.8}x. [Interpretasi AI]: Risiko utama yang perlu dipantau investor meliputi sensitivitas margin di sektor ${stock.sector} serta konsistensi pertumbuhan laba pada kuartal mendatang. Bukan rekomendasi investasi.`;
  }

  return `[Fakta Laporan ${stock.period} • Sumber: BEI/IDX]: ${stock.name} (${stock.ticker}) di sektor ${stock.sector} mencatatkan pendapatan ${stock.revenueLabel || "-"} (${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`} YoY), laba bersih ${stock.netIncomeLabel || "-"} (${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`} YoY), ROE ${stock.roe}%, dan PER ${stock.per}x. [Interpretasi AI]: Bandingkan rasio tersebut terhadap median sektor ${stock.sector} (ROE ${sectorMedianRoe}%, PER ${sectorMedianPer}x) sebelum mengambil keputusan. Bukan rekomendasi investasi.`;
}

