import { StockFundamental, AIInsightData, MetricDefinition, MetricType } from "../types/stock";

export const METRIC_DEFINITIONS: Record<MetricType, MetricDefinition> = {
  revenueGrowth: {
    id: "revenueGrowth",
    label: "Pertumbuhan Pendapatan",
    subLabel: "Revenue Growth (YoY)",
    unit: "%",
    tooltip: "Kenaikan total penerimaan penjualan bisnis dibanding periode yang sama tahun lalu.",
    benchmarkRule: (v) => (v >= 10 ? "positive" : v >= 0 ? "neutral" : "caution"),
  },
  netIncomeGrowth: {
    id: "netIncomeGrowth",
    label: "Pertumbuhan Laba Bersih",
    subLabel: "Net Income Growth (YoY)",
    unit: "%",
    tooltip: "Kenaikan keuntungan bersih perusahaan setelah dikurangi seluruh biaya operasional dan pajak.",
    benchmarkRule: (v) => (v >= 10 ? "positive" : v >= 0 ? "neutral" : "caution"),
  },
  roe: {
    id: "roe",
    label: "Efisiensi Cetak Laba",
    subLabel: "Return on Equity (ROE)",
    unit: "%",
    tooltip: "Mengukur keahlian perusahaan dalam menghasilkan laba dari setiap modal pemegang saham. Di atas 15% tergolong efisien.",
    benchmarkRule: (v) => (v >= 15 ? "positive" : v >= 8 ? "neutral" : "caution"),
  },
  per: {
    id: "per",
    label: "Kewajaran Harga Saham",
    subLabel: "Price to Earnings (PER)",
    unit: "x",
    tooltip: "Membandingkan harga saham dengan laba per lembar saham. Semakin rendah biasanya semakin murah secara relatif.",
    benchmarkRule: (v) => (v > 0 && v <= 15 ? "positive" : v <= 22 ? "neutral" : "caution"),
  },
};

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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Bank swasta terbesar di Indonesia dengan keunggulan transaksi digital dan dana murah (CASA) yang dominan.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Bank fokus pembiayaan segmen UMKM dan mikro terbesar dengan jaringan kantor cabang terluas di seluruh nusantara.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Bank korporasi dan komersial terkemuka dengan pertumbuhan segmen ritel digital Livin' by Mandiri yang ekspansif.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Konglomerasi telekomunikasi digital terbesar di Indonesia penyedia jaringan fiber optic, seluler (Telkomsel), dan data center.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Perusahaan konglomerasi multisektor yang memimpin pasar otomotif, jasa keuangan, pertambangan, dan agribisnis.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Produsen barang konsumsi terkemuka dengan merek mi instan global Indomie, susu olahan, dan makanan ringan.",
  },
  {
    ticker: "ADRO",
    name: "Adaro Energy Indonesia Tbk",
    sector: "Energi",
    subSector: "Batu Bara & Energi Hijau",
    marketCap: 118000000000000,
    marketCapLabel: "Rp 118 T",
    revenueGrowth: -11.5,
    netIncomeGrowth: -14.2,
    roe: 23.8,
    per: 4.5,
    pbv: 0.9,
    der: 0.3,
    period: "Kuartal III 2024",
    hasData: true,
    description: "Produsen energi terintegrasi dan batu bara termal berbiaya rendah yang aktif berekspansi ke proyek energi terbarukan.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Bank BUMN yang berfokus pada pembiayaan korporasi berskala global dan pembiayaan perdagangan internasional.",
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
    period: "Kuartal III 2024",
    hasData: true,
    description: "Produsen barang kebutuhan harian konsumen rumah tangga dan perawatan tubuh terkemuka di Indonesia.",
  },
];

export async function fetchStocks(): Promise<StockFundamental[]> {
  try {
    const res = await fetch("/api/stocks", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data dari API");
    const json = await res.json();
    const apiStocks: StockFundamental[] = json.data || [];
    if (apiStocks.length === 0) return INITIAL_STOCKS;

    // Gabungkan data API dengan INITIAL_STOCKS agar seluruh 9 emiten utama dan field tambahan tetap lengkap
    const mergedMap = new Map<string, StockFundamental>();
    for (const item of INITIAL_STOCKS) {
      mergedMap.set(item.ticker, item);
    }
    for (const apiItem of apiStocks) {
      const existing = mergedMap.get(apiItem.ticker);
      mergedMap.set(apiItem.ticker, { ...existing, ...apiItem });
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
    return json.data;
  } catch {
    const found = INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase());
    return found || null;
  }
}

export async function fetchAiInsight(ticker: string): Promise<AIInsightData> {
  try {
    const res = await fetch("/api/ai/insight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker }),
    });
    if (!res.ok) throw new Error("Gagal memanggil AI service");
    const json = await res.json();
    return json.data;
  } catch {
    const stock = INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase()) || INITIAL_STOCKS[0];
    const isRevenueGrowthPositive = stock.revenueGrowth > 0;
    const isNetIncomeGrowthPositive = stock.netIncomeGrowth > 0;

    return {
      ticker: stock.ticker,
      name: stock.name,
      period: stock.period,
      summary: `${stock.name} (${stock.ticker}) mencatatkan kondisi kinerja ${
        isRevenueGrowthPositive ? "pertumbuhan positif" : "penyesuaian"
      } pada periode ${stock.period}. Perusahaan memiliki kapitalisasi pasar sebesar ${
        stock.marketCapLabel
      } di sektor ${stock.sector}.`,
      strengths: [
        isRevenueGrowthPositive
          ? `Pertumbuhan pendapatan mencapai +${stock.revenueGrowth}%, mencerminkan serapan produk/jasa yang kuat.`
          : `ROE tetap berada di angka ${stock.roe}%, menandakan perputaran modal masih menghasilkan profitabilitas.`,
        isNetIncomeGrowthPositive
          ? `Pertumbuhan laba bersih naik +${stock.netIncomeGrowth}%, efisiensi biaya terjaga.`
          : `Kekuatan neraca perusahaan didukung valuasi PBV di level ${stock.pbv || 1.5}x.`,
      ],
      considerations: [
        !isRevenueGrowthPositive
          ? `Penjualan terkoreksi ${stock.revenueGrowth}%, perlu memantau pemulihan daya beli konsumen.`
          : `Valuasi PER berada di angka ${stock.per}x, evaluasi kewajaran dibanding rata-rata kompetitor seindustri.`,
        "Perhatikan sentimen suku bunga acuan dan fluktuasi nilai tukar yang dapat mempengaruhi margin usaha.",
      ],
      disclaimer: "Analisis ini diproduksi secara otomatis berbasis data historis laporan keuangan publik BEI dan bukan merupakan saran atau anjuran transaksi efek.",
    };
  }
}

export async function askAiStockChat(ticker: string, question: string): Promise<string> {
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticker, question }),
    });
    if (!res.ok) throw new Error("Gagal menghubungi server");
    const json = await res.json();
    return json.data.answer;
  } catch {
    const q = question.toLowerCase();

    if (!ticker || ticker === "MARKET" || ticker === "ALL") {
      if (q.includes("roe") || q.includes("efisiensi") || q.includes("tinggi")) {
        return "Berdasarkan data Q3 2024, emiten dengan ROE tertinggi di BEI adalah BBCA (22.1%), BMRI (20.6%), dan BBRI (19.4%). Hal ini mencerminkan keahlian manajemen dalam menghasilkan laba bersih tinggi dari ekuitas.";
      }
      if (q.includes("murah") || q.includes("per") || q.includes("valuasi")) {
        return "Emiten dengan rasio Price to Earnings (PER) relatif rendah saat ini antara lain ADRO (6.2x) dan BMRI (11.4x). Valuasi rendah memberi margin of safety, namun tetap evaluasi keberlanjutan labanya.";
      }
      return "BEI Stock Insight memantau kesehatan fundamental 9 emiten LQ45. Anda dapat mengklik salah satu emiten pada peta saham untuk menganalisis laporan keuangannya secara detail.";
    }

    const stock = INITIAL_STOCKS.find((s) => s.ticker === ticker.toUpperCase()) || INITIAL_STOCKS[0];

    if (q.includes("murah") || q.includes("mahal") || q.includes("valuasi") || q.includes("per") || q.includes("harga")) {
      const status = stock.per > 20 ? "cukup tinggi/premium" : stock.per <= 15 ? "relatif wajar hingga murah" : "rata-rata pasar";
      return `Berdasarkan metrik Price to Earnings (PER) di angka ${stock.per}x dan kapitalisasi pasar ${stock.marketCapLabel}, valuasi ${stock.ticker} saat ini tergolong ${status}. Saham bervaluasi premium biasanya dihargai pasar karena stabilitas laba yang kuat, namun perlu dibandingkan dengan kompetitor di sektor ${stock.sector}.`;
    }
    if (q.includes("dividen") || q.includes("laba") || q.includes("cuan")) {
      return `${stock.name} memiliki tingkat efisiensi ekuitas (ROE) sebesar ${stock.roe}%. Dengan pertumbuhan laba ${stock.netIncomeGrowth >= 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`}, perusahaan memiliki kapasitas arus kas yang kuat untuk mendukung dividen reguler bagi pemegang saham.`;
    }
    if (q.includes("risiko") || q.includes("rugi") || q.includes("bahaya") || q.includes("turun")) {
      return `Faktor risiko utama ${stock.ticker} di sektor ${stock.sector} adalah pergerakan suku bunga dan daya beli konsumen. Dengan tren penjualan periode ${stock.period} tercatat ${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`}, efisiensi beban usaha menjadi kunci yang perlu terus diperhatikan.`;
    }
    return `Kondisi fundamental ${stock.name} (${stock.ticker}): Sektor ${stock.sector}, nilai pasar ${stock.marketCapLabel}, pertumbuhan pendapatan ${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`}, dan ROE ${stock.roe}%. Kondisi finansial tergolong terukur untuk operasional bisnis.`;
  }
}

