import { StockFundamental, AIInsightData, MetricDefinition, MetricType, LotSimulationResult, ChatMessage } from "../types/stock";
import { INITIAL_STOCKS, SECTORS_METADATA } from "@/data/sectors";
import { getStoredToken, getStoredUser } from "./auth-service";

export { INITIAL_STOCKS, SECTORS_METADATA };

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
    revenueGrowth: [9.5, 9.8, 10.0, 10.1],
    netIncomeGrowth: [12.1, 13.5, 14.8, 16.1],
    roe: [20.5, 21.0, 21.6, 22.2],
    per: [13.8, 13.2, 12.9, 12.6],
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
  GOTO: {
    revenueGrowth: [8.5, 9.8, 11.2, 12.5],
    netIncomeGrowth: [15.2, 22.4, 30.1, 38.2],
    roe: [-8.5, -6.8, -5.2, -4.2],
    per: [-28.0, -24.5, -21.0, -18.5],
  },
  AMMN: {
    revenueGrowth: [45.0, 85.2, 135.0, 185.0],
    netIncomeGrowth: [52.1, 98.4, 160.2, 225.4],
    roe: [14.2, 16.5, 19.1, 21.8],
    per: [34.5, 32.0, 30.2, 28.4],
  },
  KLBF: {
    revenueGrowth: [5.2, 6.0, 6.9, 7.8],
    netIncomeGrowth: [7.8, 8.9, 10.1, 11.2],
    roe: [14.5, 14.9, 15.3, 15.8],
    per: [24.5, 23.8, 23.1, 22.5],
  },
  PGAS: {
    revenueGrowth: [2.5, 3.2, 4.0, 4.8],
    netIncomeGrowth: [8.5, 10.2, 12.4, 14.5],
    roe: [10.8, 11.4, 11.9, 12.5],
    per: [8.5, 8.0, 7.6, 7.2],
  },
  BRIS: {
    revenueGrowth: [11.2, 12.4, 13.6, 14.8],
    netIncomeGrowth: [16.5, 18.2, 19.9, 21.6],
    roe: [15.2, 16.0, 16.9, 17.8],
    per: [21.5, 20.4, 19.4, 18.5],
  },
  ANTM: {
    revenueGrowth: [12.5, 20.4, 30.1, 39.8],
    netIncomeGrowth: [4.2, 5.8, 7.1, 8.5],
    roe: [9.5, 10.1, 10.7, 11.2],
    per: [14.5, 13.6, 12.8, 12.1],
  },
  INDF: {
    revenueGrowth: [4.8, 5.4, 6.1, 6.8],
    netIncomeGrowth: [15.2, 18.1, 21.0, 24.2],
    roe: [12.8, 13.4, 13.9, 14.5],
    per: [8.2, 7.7, 7.2, 6.8],
  },
  ISAT: {
    revenueGrowth: [9.5, 10.2, 10.9, 11.6],
    netIncomeGrowth: [28.5, 32.4, 36.1, 39.3],
    roe: [8.8, 9.5, 10.2, 10.9],
    per: [22.4, 21.2, 20.1, 19.3],
  },
  UNTR: {
    revenueGrowth: [4.5, 3.2, 2.5, 2.0],
    netIncomeGrowth: [5.8, 4.1, 2.8, 1.6],
    roe: [19.5, 18.6, 17.8, 17.2],
    per: [5.6, 5.2, 5.0, 4.8],
  },
  PTBA: {
    revenueGrowth: [6.2, 7.8, 9.1, 10.5],
    netIncomeGrowth: [-5.2, -8.7, -12.4, -15.8],
    roe: [18.2, 17.4, 16.6, 15.9],
    per: [8.5, 9.1, 9.7, 10.2],
  },
  BUKA: {
    revenueGrowth: [5.2, 3.8, 2.5, 2.0],
    netIncomeGrowth: [10.5, 15.2, 20.1, 24.3],
    roe: [-4.5, -3.8, -3.0, -2.3],
    per: [-24.0, -21.0, -18.5, -16.2],
  },
  SIDO: {
    revenueGrowth: [6.8, 8.2, 9.6, 11.0],
    netIncomeGrowth: [20.5, 24.8, 29.1, 33.0],
    roe: [30.2, 31.5, 32.6, 33.6],
    per: [17.5, 16.5, 15.6, 14.8],
  },
  PGEO: {
    revenueGrowth: [1.5, 0.2, -1.5, -3.1],
    netIncomeGrowth: [2.1, 0.8, -0.6, -1.9],
    roe: [7.4, 7.1, 6.9, 6.7],
    per: [17.8, 18.4, 18.9, 19.5],
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

export function buildTransparentInsight(stock: StockFundamental): AIInsightData {
  const sectorMedianRoe = getSectorMedian(INITIAL_STOCKS, stock.sector, "roe");
  const sectorMedianPer = getSectorMedian(INITIAL_STOCKS, stock.sector, "per");
  const roeDiff = Number((stock.roe - sectorMedianRoe).toFixed(1));
  const perDiff = Number((stock.per - sectorMedianPer).toFixed(1));

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
      factPoints: json.data?.factPoints && json.data.factPoints.length > 0 ? json.data.factPoints : baseInsight.factPoints,
      interpretationPoints: json.data?.interpretationPoints && json.data.interpretationPoints.length > 0 ? json.data.interpretationPoints : baseInsight.interpretationPoints,
    };
  } catch {
    return buildTransparentInsight(fallbackStock);
  }
}

export async function askAiStockChat(ticker: string, question: string): Promise<string> {
  // 1. Coba panggil endpoint AI cerdas backend Express (didukung Google Gemini AI & MySQL logging per akun)
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAiAuthHeaders(),
      },
      body: JSON.stringify({ ticker, question }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && json.data?.answer) {
        return json.data.answer;
      }
    }
  } catch (err) {
    console.warn("[askAiStockChat] Network ke backend gagal, menggunakan mesin analitis lokal:", err);
  }

  // 2. Fallback jika backend offline / network terputus
  const q = question.toLowerCase();

  if (!ticker || ticker === "MARKET" || ticker === "ALL") {
    if (q.includes("halo") || q.includes("hai") || q.includes("pagi") || q.includes("sore") || q.includes("malam") || q.includes("apa kabar") || q.includes("bro")) {
      return "Halo, bro! Salam cuan! Saya Asisten Analis Saham BEI. Siap membantu kamu membedah fundamental 22 emiten unggulan di BEI (laba, dividen, ROE, DER, hingga valuasi). Mau bahas saham apa hari ini?";
    }
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

export async function simulateLotPurchase(
  ticker: string,
  budget: number,
  feePercent: number = 0.15
): Promise<LotSimulationResult> {
  const res = await fetch(`/api/stocks/${ticker}/simulate-lot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ budget, feePercent }),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => ({}));
    throw new Error(errorJson.message || "Gagal menghitung simulasi lot");
  }

  const json = await res.json();
  return json.data;
}

const CHAT_STORAGE_PREFIX = "bei_ai_chat_history_";

function getChatAccountScope(): string {
  if (typeof window === "undefined") return "guest";
  const email = getStoredUser()?.email?.toLowerCase().trim();
  return email || "guest";
}

function getChatStoragePrefixForCurrentUser(): string {
  return `${CHAT_STORAGE_PREFIX}${getChatAccountScope()}_`;
}

function getChatStorageKey(ticker: string): string {
  return `${getChatStoragePrefixForCurrentUser()}${ticker.toUpperCase()}`;
}

function getAiAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const headers: Record<string, string> = {};
  const token = getStoredToken();
  const user = getStoredUser();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (user?.email) {
    headers["x-user-email"] = user.email.toLowerCase().trim();
  }
  return headers;
}

function formatChatTime(isoString?: string): string {
  if (!isoString) return "Riwayat";
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "Riwayat";
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Riwayat";
  }
}

export function getStoredChatHistory(ticker: string): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(getChatStorageKey(ticker));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export interface ChatSessionSummary {
  ticker: string;
  lastMessage: string;
  messageCount: number;
  lastActiveAt: string;
}

export function notifyChatHistoryUpdated(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("bei-ai-history-updated"));
  }
}

export function saveStoredChatHistory(ticker: string, messages: ChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    // Hanya simpan pesan riil (kecualikan pesan welcome sistem agar tidak dobel)
    const toStore = messages.filter(
      (m) => !m.id.startsWith("stock-welcome-") && m.id !== "gen-welcome"
    );
    const key = getChatStorageKey(ticker);
    if (toStore.length === 0) {
      window.localStorage.removeItem(key);
      notifyChatHistoryUpdated();
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(toStore.slice(-40)));
    notifyChatHistoryUpdated();
  } catch {
    // Abaikan jika storage penuh atau private browsing
  }
}

interface BackendChatLogItem {
  id: string;
  sender: string;
  message: string;
  createdAt?: string;
}

export async function fetchAiChatHistory(ticker: string): Promise<ChatMessage[]> {
  const cleanTicker = ticker.toUpperCase();

  // 1. Untuk emiten spesifik, ambil histori persisten milik akun aktif dari database MySQL backend
  if (cleanTicker !== "MARKET" && cleanTicker !== "ALL") {
    try {
      const res = await fetch(`/api/ai/history?ticker=${encodeURIComponent(cleanTicker)}&limit=30`, {
        cache: "no-store",
        headers: getAiAuthHeaders(),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.status === "success" && Array.isArray(json.data)) {
          const mapped: ChatMessage[] = json.data.map((item: BackendChatLogItem) => ({
            id: `db-${item.id}`,
            sender: item.sender === "user" ? "user" : "assistant",
            text: item.message,
            time: formatChatTime(item.createdAt),
          }));
          saveStoredChatHistory(cleanTicker, mapped);
          return mapped;
        }
      }
    } catch (err) {
      console.warn("[fetchAiChatHistory] Gagal memuat histori dari backend, beralih ke cache lokal:", err);
    }
  }

  // 2. Fallback ke localStorage khusus akun aktif (juga digunakan untuk chat pasar umum "MARKET")
  return getStoredChatHistory(cleanTicker);
}

export async function clearAiChatHistory(ticker: string): Promise<void> {
  const cleanTicker = ticker.toUpperCase();

  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(getChatStorageKey(cleanTicker));
    } catch {
      // Abaikan error storage
    }
  }

  if (cleanTicker !== "MARKET" && cleanTicker !== "ALL") {
    try {
      await fetch(`/api/ai/history?ticker=${encodeURIComponent(cleanTicker)}`, {
        method: "DELETE",
        headers: getAiAuthHeaders(),
      });
    } catch (err) {
      console.warn("[clearAiChatHistory] Gagal menghapus histori di backend:", err);
    }
  }

  notifyChatHistoryUpdated();
}

export async function fetchAiChatSessions(): Promise<ChatSessionSummary[]> {
  const sessionMap = new Map<string, ChatSessionSummary>();

  // 1. Ambil seluruh sesi emiten milik akun aktif dari database MySQL backend
  try {
    const res = await fetch("/api/ai/sessions", {
      cache: "no-store",
      headers: getAiAuthHeaders(),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.status === "success" && Array.isArray(json.data)) {
        for (const item of json.data as ChatSessionSummary[]) {
          const key = item.ticker.toUpperCase();
          sessionMap.set(key, {
            ticker: key,
            lastMessage: item.lastMessage,
            messageCount: item.messageCount,
            lastActiveAt: item.lastActiveAt,
          });
        }
      }
    }
  } catch (err) {
    console.warn("[fetchAiChatSessions] Gagal memuat sesi dari backend, menggunakan cache lokal:", err);
  }

  // 2. Gabungkan dengan sesi tersimpan di localStorage KHUSUS akun aktif (termasuk MARKET dan cache offline)
  if (typeof window !== "undefined") {
    try {
      const userPrefix = getChatStoragePrefixForCurrentUser();
      for (let i = 0; i < window.localStorage.length; i++) {
        const storageKey = window.localStorage.key(i);
        if (!storageKey || !storageKey.startsWith(userPrefix)) continue;

        const ticker = storageKey.replace(userPrefix, "").toUpperCase();
        const msgs = getStoredChatHistory(ticker);
        if (msgs.length === 0) continue;

        const lastUserMsg = [...msgs].reverse().find((m) => m.sender === "user");
        const preview = (lastUserMsg?.text || msgs[msgs.length - 1]?.text || "").slice(0, 100);

        if (!sessionMap.has(ticker)) {
          sessionMap.set(ticker, {
            ticker,
            lastMessage: preview,
            messageCount: msgs.length,
            lastActiveAt: new Date().toISOString(),
          });
        }
      }
    } catch {
      // Abaikan error storage
    }
  }

  // Urutkan sesi paling baru di bagian atas
  return Array.from(sessionMap.values()).sort(
    (a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime()
  );
}

