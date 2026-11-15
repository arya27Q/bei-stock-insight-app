import { Router, Request, Response } from "express";
import { MOCK_STOCKS } from "../data/mock-stocks.js";

export const aiRouter = Router();

// POST /api/ai/insight - Generate ringkasan analitis otomatis
aiRouter.post("/insight", async (req: Request, res: Response) => {
  const { ticker } = req.body;

  if (!ticker || typeof ticker !== "string") {
    res.status(400).json({
      status: "error",
      message: "Parameter ticker wajib disertakan dalam request body.",
    });
    return;
  }

  const stock = MOCK_STOCKS.find((s) => s.ticker === ticker.toUpperCase());

  if (!stock) {
    res.status(404).json({
      status: "error",
      message: `Data fundamental untuk emiten ${ticker.toUpperCase()} tidak ditemukan.`,
    });
    return;
  }

  const isRevenueGrowthPositive = stock.revenueGrowth > 0;
  const isNetIncomeGrowthPositive = stock.netIncomeGrowth > 0;
  const isRoeHigh = stock.roe >= 15;

  const summary = `${stock.name} (${stock.ticker}) mencatatkan kondisi kinerja ${
    isRevenueGrowthPositive ? "pertumbuhan positif" : "penurunan"
  } pada periode ${stock.period}. Perusahaan memiliki kapitalisasi pasar sebesar ${
    stock.marketCapLabel
  } di sektor ${stock.sector}.`;

  const strengthPoints = [];
  if (isRevenueGrowthPositive) {
    strengthPoints.push(`Pertumbuhan pendapatan sebesar +${stock.revenueGrowth}% menandakan permintaan bisnis yang terus berkembang.`);
  }
  if (isNetIncomeGrowthPositive) {
    strengthPoints.push(`Laba bersih bertumbuh +${stock.netIncomeGrowth}%, menunjukkan efisiensi operasional yang terjaga.`);
  }
  if (isRoeHigh) {
    strengthPoints.push(`Tingkat pengembalian modal (ROE) mencapai ${stock.roe}%, tergolong sangat efisien dalam menghasilkan laba dari ekuitas.`);
  }

  const considerationPoints = [];
  if (!isRevenueGrowthPositive) {
    considerationPoints.push(`Pendapatan mengalami kontraksi sebesar ${stock.revenueGrowth}%, perlu dicermati faktor siklus industri.`);
  }
  if (!isNetIncomeGrowthPositive) {
    considerationPoints.push(`Pertumbuhan laba bersih tercatat minus (${stock.netIncomeGrowth}%), dipengaruhi peningkatan beban atau normalisasi laba.`);
  }
  if (stock.per > 20) {
    considerationPoints.push(`Rasio PER tercatat sebesar ${stock.per}x, mengindikasikan valuasi pasar yang cukup premium dibanding rata-rata emiten.`);
  } else if (stock.per < 10) {
    considerationPoints.push(`Rasio PER sebesar ${stock.per}x tergolong relatif murah secara historis.`);
  }

  res.json({
    status: "success",
    data: {
      ticker: stock.ticker,
      name: stock.name,
      period: stock.period,
      summary,
      strengths: strengthPoints.length > 0 ? strengthPoints : ["Kinerja operasional relatif stabil pada periode laporan berjalan."],
      considerations: considerationPoints.length > 0 ? considerationPoints : ["Tetap perhatikan stabilitas makroekonomi dan persaingan di sektor sejenis."],
      disclaimer: "Analisis ini disajikan secara otomatis berdasarkan data keuangan historis publik BEI dan bukan merupakan ajakan membeli atau menjual efek tertentu.",
    },
  });
});

// POST /api/ai/chat - Dialog tanya jawab kontekstual untuk emiten atau pasar
aiRouter.post("/chat", async (req: Request, res: Response) => {
  const { ticker, question } = req.body;

  if (!question || typeof question !== "string") {
    res.status(400).json({
      status: "error",
      message: "Parameter question wajib disertakan.",
    });
    return;
  }

  // Jika ticker adalah MARKET atau umum
  if (!ticker || ticker === "MARKET" || ticker === "ALL") {
    const q = question.toLowerCase();
    let answer = "";

    if (q.includes("roe") || q.includes("efisiensi") || q.includes("tertinggi")) {
      const topRoe = [...MOCK_STOCKS].sort((a, b) => b.roe - a.roe).slice(0, 3);
      answer = `Berdasarkan data Q3 2024, emiten dengan efisiensi modal (ROE) tertinggi di BEI adalah ${topRoe.map((s) => `${s.ticker} (${s.roe}%)`).join(", ")}. Emiten dengan ROE tinggi menunjukkan kemampuan optimal dalam mencetak laba bersih dari setiap modal pemegang saham.`;
    } else if (q.includes("murah") || q.includes("per") || q.includes("valuasi")) {
      const cheapPer = [...MOCK_STOCKS].filter((s) => s.per > 0).sort((a, b) => a.per - b.per).slice(0, 3);
      answer = `Emiten dengan valuasi Price to Earnings (PER) terendah saat ini adalah ${cheapPer.map((s) => `${s.ticker} (${s.per}x)`).join(", ")}. PER yang rendah menunjukkan harga saham relatif murah terhadap laba bersih, namun pastikan tetap memeriksa pertumbuhan labanya.`;
    } else if (q.includes("dividen") || q.includes("laba")) {
      answer = `Emiten perbankan BUMN dan swasta seperti BBRI, BMRI, dan BBCA memiliki stabilitas laba bersih dan ROE di atas 19%, menjadikannya emiten dengan kapasitas pembayaran dividen yang solid bagi investor fundamental.`;
    } else {
      answer = `Saat ini BEI Stock Insight memantau 9 emiten unggulan LQ45 di sektor Keuangan, Infrastruktur, Konsumsi, dan Energi. Anda dapat mengklik emiten mana saja di peta saham untuk melihat rincian rasio keuangan dan analisis mendalam.`;
    }

    res.json({
      status: "success",
      data: {
        ticker: "MARKET",
        question,
        answer,
        disclaimer: "Analisis ini disajikan untuk edukasi mandiri dan bukan merupakan anjuran transaksi.",
      },
    });
    return;
  }

  const stock = MOCK_STOCKS.find((s) => s.ticker === ticker.toUpperCase());

  if (!stock) {
    res.status(404).json({
      status: "error",
      message: `Data emiten ${ticker.toUpperCase()} tidak ditemukan.`,
    });
    return;
  }

  const q = question.toLowerCase();
  let answer = "";

  // Logika analitis cerdas berdasarkan konteks pertanyaan
  if (q.includes("murah") || q.includes("mahal") || q.includes("valuasi") || q.includes("per") || q.includes("harga")) {
    const valuationStatus = stock.per > 20 ? "cukup premium/tinggi" : stock.per <= 15 ? "relatif wajar hingga murah" : "rata-rata pasar";
    answer = `Berdasarkan metrik Price to Earnings (PER) di level ${stock.per}x dan kapitalisasi pasar ${stock.marketCapLabel}, valuasi ${stock.ticker} saat ini tergolong ${valuationStatus}. Emiten dengan PER premium biasanya dihargai pasar karena kualitas laba yang konsisten dan risiko bisnis yang lebih terukur, namun perlu dibandingkan dengan rata-rata sektor ${stock.sector}.`;
  } else if (q.includes("dividen") || q.includes("laba") || q.includes("cuan")) {
    answer = `${stock.name} mencatatkan efisiensi cetak laba (ROE) sebesar ${stock.roe}%. Dengan perolehan laba bersih yang ${stock.netIncomeGrowth >= 0 ? `tumbuh +${stock.netIncomeGrowth}%` : `mengalami penyesuaian ${stock.netIncomeGrowth}%`}, perusahaan memiliki kapasitas arus kas yang solid untuk pembagian dividen reguler sesuai kebijakan RUPS tahunan.`;
  } else if (q.includes("risiko") || q.includes("rugi") || q.includes("bahaya") || q.includes("turun")) {
    answer = `Risiko utama yang perlu dicermati pada ${stock.ticker} (${stock.sector}) mencakup stabilitas makroekonomi, suku bunga acuan, dan daya beli pasar. Pada periode ${stock.period}, pertumbuhan pendapatan tercatat ${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`}, sehingga perubahan margin laba operasional menjadi indikator kunci yang wajib dipantau berkala.`;
  } else {
    answer = `Mengenai ${stock.name} (${stock.ticker}): Perusahaan beroperasi di sektor ${stock.sector} dengan nilai kapitalisasi ${stock.marketCapLabel}. Laporan ${stock.period} menunjukkan pertumbuhan pendapatan ${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`} dan ROE ${stock.roe}%. Kondisi neraca relatif terjaga untuk mendukung operasional jangka panjang.`;
  }

  res.json({
    status: "success",
    data: {
      ticker: stock.ticker,
      question,
      answer,
      disclaimer: "Analisis ini dihasilkan otomatis berbasis data laporan keuangan BEI dan bukan merupakan anjuran transaksi.",
    },
  });
});
