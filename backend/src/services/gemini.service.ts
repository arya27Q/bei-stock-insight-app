import { GoogleGenAI } from "@google/genai";
import { StockData } from "../data/sectors/types.js";
import { MOCK_STOCKS } from "../data/mock-stocks.js";

export interface AIInsightPoint {
  category: string;
  text: string;
  basisLabel: string;
}

export interface StockInsightResponse {
  ticker: string;
  name: string;
  period: string;
  summary: string;
  strengths: string[];
  considerations: string[];
  factPoints: AIInsightPoint[];
  interpretationPoints: AIInsightPoint[];
  disclaimer: string;
  source: "gemini" | "fallback";
}

export interface ChatResponse {
  ticker: string;
  question: string;
  answer: string;
  disclaimer: string;
  source: "gemini" | "fallback";
}

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private apiKey: string = "";
  // Daftar model resmi Google GenAI dengan latensi ultra-cepat (1-2 detik) dan tahan lonjakan beban
  private candidateModels: string[] = ["gemini-3.1-flash-lite", "gemini-3.5-flash-lite"];

  constructor() {
    this.initClient();
  }

  private initClient() {
    this.apiKey = process.env.GEMINI_API_KEY?.trim() || "";
    if (this.apiKey) {
      try {
        this.ai = new GoogleGenAI({ apiKey: this.apiKey });
      } catch (err) {
        console.error("[GeminiService] Gagal inisialisasi client GoogleGenAI:", err);
        this.ai = null;
      }
    }
  }

  public isAvailable(): boolean {
    if (!this.ai && process.env.GEMINI_API_KEY?.trim()) {
      this.initClient();
    }
    return Boolean(this.ai && this.apiKey);
  }

  /**
   * Helper pemanggilan model dengan failover otomatis antar model kandidat
   */
  private async executeWithFallback(params: {
    prompt: string;
    jsonMode?: boolean;
    temperature?: number;
  }): Promise<{ text: string; modelUsed: string } | null> {
    if (!this.ai || !this.apiKey) return null;

    for (const model of this.candidateModels) {
      try {
        const config: any = {
          temperature: params.temperature ?? 0.2,
        };
        if (params.jsonMode) {
          config.responseMimeType = "application/json";
        }

        const res = await this.ai.models.generateContent({
          model,
          contents: params.prompt,
          config,
        });

        const text = res.text?.trim();
        if (text) {
          return { text, modelUsed: model };
        }
      } catch (err: any) {
        console.warn(`[GeminiService] Model ${model} sibuk/gagal (${err?.status || err?.message?.slice(0, 50)}), mencoba model alternatif...`);
      }
    }
    return null;
  }

  /**
   * Menghasilkan analisis fundamental terstruktur untuk suatu emiten
   */
  async generateInsight(stock: StockData): Promise<StockInsightResponse> {
    const defaultPeriod = stock.period || "Q3 2024";
    const npmVal = stock.npm ?? stock.netProfitMargin ?? 0;
    const derVal = stock.der ?? 0;
    const pbvVal = stock.pbv ?? 0;

    // Poin fakta terverifikasi dari data laporan keuangan resmi BEI
    const defaultFactPoints: AIInsightPoint[] = [
      {
        category: "Realisasi Omset & Pertumbuhan Laba",
        text: `Pendapatan tercatat ${stock.revenueLabel || "-"} (${stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`} YoY) dengan laba bersih ${stock.netIncomeLabel || "-"} (${stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`} YoY).`,
        basisLabel: `Fakta Laporan Keuangan ${defaultPeriod} • Sumber: BEI / IDX`,
      },
      {
        category: "Efisiensi Modal & Profitabilitas (ROE & NPM)",
        text: `Tingkat pengembalian ekuitas (ROE) sebesar ${stock.roe}% dan Net Profit Margin (NPM) mencapai ${npmVal}%, mencerminkan efisiensi penciptaan laba bersih.`,
        basisLabel: `Fakta Laporan Keuangan ${defaultPeriod} • Sumber: BEI / IDX`,
      },
      {
        category: "Struktur Permodalan & Pemegang Saham",
        text: `Debt to Equity Ratio (DER) berada di level ${derVal}x dengan dukungan pemegang saham pengendali ${stock.controllingShareholder || "Masyarakat / Publik"}.`,
        basisLabel: `Fakta Laporan Keuangan ${defaultPeriod} • Sumber: BEI / IDX`,
      },
    ];

    const defaultInterpretationPoints: AIInsightPoint[] = [
      {
        category: "Valuasi Harga terhadap Laba (PER & PBV)",
        text: `Rasio PER ${stock.per}x dan PBV ${pbvVal}x mencerminkan apresiasi pasar terhadap stabilitas bisnis ${stock.name} di sektor ${stock.sector}.`,
        basisLabel: "Interpretasi Finansial AI • Materi Edukasi Riset Mandiri",
      },
      {
        category: "Keunggulan Bisnis & Posisi Pasar (Moat)",
        text: stock.keyMoat || `Posisi pasar terkemuka di sektor ${stock.sector} menopang ketahanan arus kas dan potensi dividen jangka panjang.`,
        basisLabel: "Interpretasi Finansial AI • Materi Edukasi Riset Mandiri",
      },
      {
        category: "Faktor Risiko yang Wajib Dicermati",
        text: stock.keyRisk || `Perhatikan dinamika makroekonomi, suku bunga acuan, dan fluktuasi biaya operasional di sektor ${stock.sector}.`,
        basisLabel: "Interpretasi Finansial AI • Materi Edukasi Riset Mandiri",
      },
    ];

    // Jika Gemini API Key tersedia, panggil model Google Gemini dengan multi-model failover
    if (this.isAvailable()) {
      try {
        const prompt = `Anda adalah Analis Finansial Senior Pasar Modal Bursa Efek Indonesia (BEI / IDX).
Analisis emiten berikut secara objektif, edukatif, dan tajam berdasarkan laporan keuangan resmi ${defaultPeriod}:
- Kode Saham: ${stock.ticker} (${stock.name})
- Sektor / Subsektor: ${stock.sector} / ${stock.subSector}
- Pendapatan: ${stock.revenueLabel} (Pertumbuhan: ${stock.revenueGrowth}% YoY)
- Laba Bersih: ${stock.netIncomeLabel} (Pertumbuhan: ${stock.netIncomeGrowth}% YoY)
- Profitabilitas: ROE ${stock.roe}%, NPM ${npmVal}%
- Struktur Utang: DER ${derVal}x
- Valuasi: PER ${stock.per}x, PBV ${pbvVal}x, Market Cap ${stock.marketCapLabel}
- Pemegang Saham Pengendali: ${stock.controllingShareholder || "Masyarakat / Publik"}
- Keunggulan Bisnis (Moat): ${stock.keyMoat || "-"}
- Risiko Utama: ${stock.keyRisk || "-"}

Format keluaran WAJIB berupa JSON murni dengan struktur berikut (tanpa markdown backtick):
{
  "summary": "Ringkasan analisis profesional 2-3 kalimat mengenai kondisi kinerja terkini.",
  "strengths": ["Poin keunggulan 1", "Poin keunggulan 2", "Poin keunggulan 3"],
  "considerations": ["Poin yang perlu dicermati/risiko 1", "Poin 2", "Poin 3"],
  "factPoints": [
    { "category": "Kategori Fakta 1", "text": "Uraian fakta data 1", "basisLabel": "Fakta Laporan Q3 2024 • BEI/IDX" },
    { "category": "Kategori Fakta 2", "text": "Uraian fakta data 2", "basisLabel": "Fakta Laporan Q3 2024 • BEI/IDX" }
  ],
  "interpretationPoints": [
    { "category": "Kategori Analisis 1", "text": "Uraian interpretasi 1", "basisLabel": "Interpretasi Finansial AI • Edukasi Mandiri" },
    { "category": "Kategori Analisis 2", "text": "Uraian interpretasi 2", "basisLabel": "Interpretasi Finansial AI • Edukasi Mandiri" }
  ]
}`;

        const result = await this.executeWithFallback({
          prompt,
          jsonMode: true,
          temperature: 0.2,
        });

        if (result && result.text) {
          const parsed = JSON.parse(result.text);
          return {
            ticker: stock.ticker,
            name: stock.name,
            period: defaultPeriod,
            summary: parsed.summary || `${stock.name} mencatatkan performa keuangan yang stabil pada periode ${defaultPeriod}.`,
            strengths: Array.isArray(parsed.strengths) && parsed.strengths.length > 0 ? parsed.strengths : this.buildFallbackStrengths(stock),
            considerations: Array.isArray(parsed.considerations) && parsed.considerations.length > 0 ? parsed.considerations : this.buildFallbackConsiderations(stock),
            factPoints: Array.isArray(parsed.factPoints) && parsed.factPoints.length > 0 ? parsed.factPoints : defaultFactPoints,
            interpretationPoints: Array.isArray(parsed.interpretationPoints) && parsed.interpretationPoints.length > 0 ? parsed.interpretationPoints : defaultInterpretationPoints,
            disclaimer: "Analisis ini dihasilkan otomatis oleh Google Gemini AI berdasarkan data publik BEI/IDX dan bukan merupakan anjuran transaksi beli atau jual efek tertentu.",
            source: "gemini",
          };
        }
      } catch (err: any) {
        console.warn("[GeminiService] Analisis Gemini gagal, beralih ke mesin analisis lokal:", err?.message || err);
      }
    }

    // Fallback mesin analitis lokal berbasis aturan finansial profesional
    const isRevPos = stock.revenueGrowth >= 0;
    const isNetPos = stock.netIncomeGrowth >= 0;
    const summary = `${stock.name} (${stock.ticker}) membukukan kinerja ${
      isRevPos && isNetPos ? "pertumbuhan positif di sisi omset dan laba" : isNetPos ? "peningkatan efisiensi laba bersih" : "penyesuaian siklus industri"
    } pada periode laporan ${defaultPeriod}. Perusahaan mencatatkan kapitalisasi pasar ${stock.marketCapLabel} di sektor ${stock.sector}.`;

    return {
      ticker: stock.ticker,
      name: stock.name,
      period: defaultPeriod,
      summary,
      strengths: this.buildFallbackStrengths(stock),
      considerations: this.buildFallbackConsiderations(stock),
      factPoints: defaultFactPoints,
      interpretationPoints: defaultInterpretationPoints,
      disclaimer: "Fakta numerik mengacu pada laporan keuangan resmi Q3 2024 BEI/IDX. Interpretasi analisis bersifat edukatif dan bukan rekomendasi transaksi.",
      source: "fallback",
    };
  }

  /**
   * Dialog tanya-jawab interaktif mengenai saham atau kondisi pasar
   */
  async chat(ticker: string, question: string, stockContext?: StockData | null): Promise<ChatResponse> {
    const isMarketQuery = !ticker || ticker === "MARKET" || ticker === "ALL";

    // Jika Gemini API aktif, gunakan Google GenAI
    if (this.isAvailable() && this.ai) {
      try {
        let systemPrompt = "";
        let userPrompt = "";

        if (isMarketQuery) {
          const marketSummary = MOCK_STOCKS.map(
            (s) => `${s.ticker} (${s.name}, Sektor: ${s.sector}): ROE ${s.roe}%, RevGrowth ${s.revenueGrowth}%, NetGrowth ${s.netIncomeGrowth}%, PER ${s.per}x, PBV ${s.pbv}x, DER ${s.der}x`
          ).join("\n");

          systemPrompt = `Anda adalah Analis Senior Pasar Modal BEI / IDX di platform BEI Stock Insight.
Anda memiliki akses ke dataset 22 saham terverifikasi periode Q3 2024 berikut:
${marketSummary}

Panduan Gaya Respons:
1. Skala Kompleksitas Fleksibel:
   - Jika pertanyaan santai/sederhana (seperti "halo bro", "apa kabar", "saham apa yang ROE tertinggi?"): Jawab secara simpel, ramah, to-the-point, dan langsung pada intinya tanpa penjelasan bertele-tele.
   - Jika pertanyaan meminta perbandingan atau analisis menyeluruh: Gunakan kombinasi narasi singkat dan poin-poin bullet (* atau -) dengan kata kunci penting dicetak tebal (**bold**) agar mudah dipindai mata pengguna.
2. Gunakan Bahasa Indonesia yang santun, profesional, dan mudah dipahami investor pemula.
3. Hindari penggunaan tanda em dash ("—"). Gunakan tanda hubung biasa (-) atau titik dua.
4. Selalu objektif dan bukan merupakan ajakan transaksi beli atau jual.`;

          userPrompt = `Pertanyaan Pengguna mengenai pasar BEI: "${question}"`;
        } else {
          const s = stockContext || MOCK_STOCKS.find((item) => item.ticker === ticker.toUpperCase()) || MOCK_STOCKS[0];
          systemPrompt = `Anda adalah Analis Finansial Spesialis Saham ${s.ticker} (${s.name}) di Bursa Efek Indonesia.
Fakta Laporan Keuangan Resmi Periode ${s.period || "Q3 2024"}:
- Sektor: ${s.sector} (${s.subSector})
- Harga per Lembar: Rp ${s.pricePerShare?.toLocaleString("id-ID")} (Harga per Lot: Rp ${s.pricePerLot?.toLocaleString("id-ID")})
- Kapitalisasi Pasar: ${s.marketCapLabel}
- Pertumbuhan Pendapatan (Revenue Growth): ${s.revenueGrowth}% YoY
- Pertumbuhan Laba Bersih (Net Income Growth): ${s.netIncomeGrowth}% YoY
- ROE: ${s.roe}% | NPM: ${s.npm ?? s.netProfitMargin ?? 0}% | DER: ${s.der ?? 0}x
- Valuasi: PER ${s.per}x | PBV ${s.pbv ?? 0}x
- Pengendali: ${s.controllingShareholder || "Masyarakat / Publik"}
- Keunggulan Kompetitif (Moat): ${s.keyMoat || "-"}
- Faktor Risiko: ${s.keyRisk || "-"}

Panduan Gaya Respons:
1. Skala Kompleksitas Fleksibel:
   - Jika pertanyaan sederhana/spesifik (misal: "Apakah valuasinya murah?", "Berapa laba bersihnya?", "Bagaimana dividennya?"): Berikan jawaban simpel, padat, dan langsung to-the-point dalam 1-2 paragraf ringkas.
   - Jika pertanyaan kompleks atau meminta tinjauan menyeluruh: Sajikan dalam poin-poin (* atau -) yang rapi, pisahkan fakta data Q3 2024 dan interpretasi analisisnya, dengan kata kunci penting dicetak tebal (**bold**).
2. Format teks dibuat berjarak (*spacing*) yang lega agar enak dibaca di kolom chat.
3. Hindari penggunaan tanda em dash ("—"). Gunakan tanda hubung biasa (-) atau titik dua.`;

          userPrompt = `Pertanyaan Pengguna tentang ${s.ticker}: "${question}"`;
        }

        const result = await this.executeWithFallback({
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          temperature: 0.3,
        });

        if (result && result.text) {
          return {
            ticker: isMarketQuery ? "MARKET" : ticker.toUpperCase(),
            question,
            answer: result.text,
            disclaimer: "Analisis disusun melalui kecerdasan buatan Google Gemini berbasis data publik BEI/IDX dan bukan anjuran beli atau jual.",
            source: "gemini",
          };
        }
      } catch (err: any) {
        console.warn("[GeminiService] Chat Gemini error, beralih ke mesin cerdas fallback:", err?.message || err);
      }
    }

    // Fallback respons cerdas berbasis data riil jika API key belum diisi atau error
    return this.buildFallbackChat(ticker, question, stockContext);
  }

  private buildFallbackStrengths(stock: StockData): string[] {
    const list: string[] = [];
    if (stock.revenueGrowth > 5) {
      list.push(`Pertumbuhan pendapatan +${stock.revenueGrowth}% YoY menandakan daya serap pasar yang ekspansif terhadap lini bisnis ${stock.name}.`);
    } else if (stock.revenueGrowth >= 0) {
      list.push(`Pendapatan mampu bertahan positif (+${stock.revenueGrowth}% YoY) di tengah ketatnya persaingan sektor ${stock.sector}.`);
    }
    if (stock.netIncomeGrowth > 5) {
      list.push(`Pertumbuhan laba bersih +${stock.netIncomeGrowth}% YoY membuktikan pengendalian biaya operasional yang efektif.`);
    }
    if (stock.roe >= 15) {
      list.push(`Tingkat pengembalian modal (ROE) mencapai ${stock.roe}%, tergolong sangat efisien dalam mencetak laba dari ekuitas pemegang saham.`);
    }
    if (typeof stock.der === "number" && stock.der < 1.0) {
      list.push(`Rasio utang terhadap ekuitas (DER) sebesar ${stock.der}x tergolong sangat konservatif dan minim risiko gagal bayar.`);
    }
    if (list.length === 0) {
      list.push(`Perusahaan memiliki posisi pasar yang mapan dengan dukungan pemegang saham pengendali ${stock.controllingShareholder || "Masyarakat / Publik"}.`);
    }
    return list;
  }

  private buildFallbackConsiderations(stock: StockData): string[] {
    const list: string[] = [];
    if (stock.revenueGrowth < 0) {
      list.push(`Pendapatan mengalami kontraksi sebesar ${stock.revenueGrowth}% YoY, perlu dicermati faktor siklus bisnis atau pelemahan daya beli.`);
    }
    if (stock.netIncomeGrowth < 0) {
      list.push(`Laba bersih terkoreksi ${stock.netIncomeGrowth}% YoY akibat normalisasi pendapatan atau peningkatan biaya produksi.`);
    }
    if (stock.per > 20) {
      list.push(`Rasio PER tercatat ${stock.per}x, mengindikasikan valuasi harga yang premium dibanding rata-rata emiten sejenis.`);
    } else if (stock.per <= 0) {
      list.push("Rasio PER bernilai negatif atau tidak terdefinisi karena emiten membukukan kerugian pada periode berjalan.");
    }
    if (typeof stock.der === "number" && stock.der > 2.0 && !stock.sector.toLowerCase().includes("keuangan")) {
      list.push(`Rasio DER sebesar ${stock.der}x tergolong tinggi untuk sektor non-keuangan, sensitif terhadap fluktuasi suku bunga pinjaman.`);
    }
    if (list.length === 0) {
      list.push(`Tetap pantau dinamika makroekonomi, suku bunga acuan BI, dan persaingan harga di sektor ${stock.sector}.`);
    }
    return list;
  }

  private buildFallbackChat(ticker: string, question: string, stockContext?: StockData | null): ChatResponse {
    const q = question.toLowerCase();
    const isMarketQuery = !ticker || ticker === "MARKET" || ticker === "ALL";

    if (isMarketQuery) {
      let answer = "";
      if (q.includes("halo") || q.includes("hai") || q.includes("pagi") || q.includes("sore") || q.includes("malam") || q.includes("apa kabar") || q.includes("siapa kamu")) {
        answer = "Halo, bro! Salam cuan! Saya Asisten Analis Saham BEI di BEI Stock Insight. Saya siap membantu kamu menganalisis fundamental, efisiensi ROE, batas aman utang (DER), valuasi PER/PBV, hingga perbandingan 22 emiten unggulan di bursa. Ada sektor atau saham tertentu yang ingin kita bahas hari ini?";
      } else if (q.includes("roe") || q.includes("efisiensi") || q.includes("tertinggi")) {
        const topRoe = [...MOCK_STOCKS].sort((a, b) => b.roe - a.roe).slice(0, 3);
        answer = `[Fakta Laporan Q3 2024 • BEI/IDX]: Emiten dengan ROE tertinggi di bursa saat ini adalah ${topRoe.map((s) => `${s.ticker} (${s.roe}%)`).join(", ")}. [Interpretasi Finansial AI]: ROE tinggi mencerminkan keunggulan tata kelola modal, namun investor tetap disarankan mengecek apakah pertumbuhan laba bersihnya konsisten positif.`;
      } else if (q.includes("murah") || q.includes("per") || q.includes("valuasi")) {
        const cheapPer = [...MOCK_STOCKS].filter((s) => s.per > 0).sort((a, b) => a.per - b.per).slice(0, 3);
        answer = `[Fakta Laporan Q3 2024 • BEI/IDX]: Emiten dengan Price to Earnings (PER) paling terjangkau adalah ${cheapPer.map((s) => `${s.ticker} (${s.per}x)`).join(", ")}. [Interpretasi Finansial AI]: PER rendah merupakan sinyal awal valuasi atraktif, namun pastikan tidak terjebak dalam *value trap* dengan memeriksa tingkat utang (DER) dan pertumbuhan bisnisnya.`;
      } else if (q.includes("dividen") || q.includes("laba")) {
        answer = `[Fakta Laporan Q3 2024 • BEI/IDX]: Saham perbankan berkapitalisasi besar seperti BBRI, BMRI, dan BBCA mencatatkan ROE stabil di atas 19% dengan laba bersih puluhan triliun rupiah. [Interpretasi Finansial AI]: Fundamental kas yang kokoh ini memberikan ruang yang kuat untuk pembagian dividen reguler tahunan.`;
      } else {
        answer = `[Fakta Laporan Q3 2024 • BEI/IDX]: Platform BEI Stock Insight menyajikan data fundamental terverifikasi dari 22 emiten unggulan di 9 sektor industri. [Interpretasi Finansial AI]: Anda dapat mengklik emiten mana saja di Peta Pasar untuk meninjau rincian pertumbuhan pendapatan, efisiensi ROE, batas aman utang, dan simulasi pembelian lot.`;
      }

      return {
        ticker: "MARKET",
        question,
        answer,
        disclaimer: "Analisis berbasis data publik laporan keuangan BEI Q3 2024 untuk tujuan edukasi riset mandiri.",
        source: "fallback",
      };
    }

    const s = stockContext || MOCK_STOCKS.find((item) => item.ticker === ticker.toUpperCase()) || MOCK_STOCKS[0];
    let answer = "";

    if (q.includes("murah") || q.includes("mahal") || q.includes("valuasi") || q.includes("per") || q.includes("harga")) {
      const status = s.per > 20 ? "cukup premium" : s.per <= 15 ? "relatif wajar hingga atraktif" : "seimbang dengan rata-rata pasar";
      answer = `[Fakta Laporan ${s.period} • BEI/IDX]: Rasio PER ${s.ticker} berada di level ${s.per}x dengan PBV ${s.pbv}x dan kapitalisasi pasar ${s.marketCapLabel}. [Interpretasi Finansial AI]: Valuasi saat ini tergolong ${status}. Pada sektor ${s.sector}, emiten dengan margin stabil dan pangsa pasar dominan sering kali diperdagangkan pada valuasi premium.`;
    } else if (q.includes("dividen") || q.includes("cuan") || q.includes("laba") || q.includes("untung")) {
      answer = `[Fakta Laporan ${s.period} • BEI/IDX]: ${s.name} membukukan laba bersih ${s.netIncomeLabel} (${s.netIncomeGrowth >= 0 ? `+${s.netIncomeGrowth}%` : `${s.netIncomeGrowth}%`} YoY) dengan tingkat pengembalian ekuitas (ROE) sebesar ${s.roe}%. [Interpretasi Finansial AI]: Kapasitas laba dan permodalan ini memberikan daya dukung yang sehat untuk kesinambungan dividen tahunan sesuai keputusan RUPS.`;
    } else if (q.includes("risiko") || q.includes("rugi") || q.includes("bahaya") || q.includes("utang")) {
      answer = `[Fakta Laporan ${s.period} • BEI/IDX]: Rasio utang terhadap ekuitas (DER) tercatat ${s.der}x dengan pertumbuhan pendapatan ${s.revenueGrowth >= 0 ? `+${s.revenueGrowth}%` : `${s.revenueGrowth}%`} YoY. [Interpretasi Finansial AI]: Aspek risiko utama yang perlu dicermati mencakup fluktuasi biaya operasional di sektor ${s.sector} serta dinamika suku bunga acuan yang dapat memengaruhi beban pembiayaan.`;
    } else {
      answer = `[Fakta Laporan ${s.period} • BEI/IDX]: ${s.name} (${s.ticker}) beroperasi di sektor ${s.sector} dengan nilai kapitalisasi pasar ${s.marketCapLabel}. Laporan kinerja ${s.period} mencatat pertumbuhan omset ${s.revenueGrowth >= 0 ? `+${s.revenueGrowth}%` : `${s.revenueGrowth}%`} YoY, laba bersih ${s.netIncomeGrowth >= 0 ? `+${s.netIncomeGrowth}%` : `${s.netIncomeGrowth}%`} YoY, dan ROE ${s.roe}%. [Interpretasi Finansial AI]: Profil fundamental menunjukkan kestabilan operasional jangka panjang yang layak dicermati oleh investor fundamental.`;
    }

    return {
      ticker: s.ticker,
      question,
      answer,
      disclaimer: "Analisis disusun berbasis fakta laporan keuangan resmi BEI untuk materi edukasi mandiri, bukan rekomendasi transaksi.",
      source: "fallback",
    };
  }
}

export const geminiService = new GeminiService();
