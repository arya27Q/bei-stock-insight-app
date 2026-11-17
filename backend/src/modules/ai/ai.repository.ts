import { prisma } from "../../config/prisma.js";

export const aiRepository = {
  // Ambil data insight dari tabel ai_insights
  async findInsightByTicker(ticker: string) {
    try {
      return await prisma.aiInsight.findFirst({
        where: { stockTicker: ticker.toUpperCase() },
      });
    } catch (error) {
      console.error(`[aiRepository.findInsightByTicker] Error querying ${ticker}:`, error);
      return null;
    }
  },

  // Simpan atau perbarui cache analisis fundamental di tabel ai_insights
  async saveInsight(data: {
    stockTicker: string;
    period: string;
    summary: string;
    strengths: string[];
    considerations: string[];
    factPoints?: any;
    interpretationPoints?: any;
    disclaimer?: string;
  }) {
    try {
      const ticker = data.stockTicker.toUpperCase();
      const existing = await prisma.aiInsight.findFirst({
        where: { stockTicker: ticker },
      });

      if (existing) {
        return await prisma.aiInsight.update({
          where: { id: existing.id },
          data: {
            summary: data.summary,
            strengths: data.strengths,
            considerations: data.considerations,
            factPoints: data.factPoints,
            interpretationPoints: data.interpretationPoints,
            disclaimer: data.disclaimer,
            period: data.period,
            lastUpdated: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
          },
        });
      }

      return await prisma.aiInsight.create({
        data: {
          stockTicker: ticker,
          period: data.period,
          summary: data.summary,
          strengths: data.strengths,
          considerations: data.considerations,
          factPoints: data.factPoints,
          interpretationPoints: data.interpretationPoints,
          disclaimer: data.disclaimer,
          lastUpdated: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        },
      });
    } catch (error) {
      console.error(`[aiRepository.saveInsight] Error saving insight for ${data.stockTicker}:`, error);
      return null;
    }
  },

  // Simpan riwayat interaksi chat ke tabel ai_chat_logs
  async saveChatLog(stockTicker: string, message: string, sender: "user" | "assistant" = "user", period: string = "Q3 2024") {
    try {
      const ticker = stockTicker.toUpperCase();
      // Lewati foreign key check jika ticker umum "MARKET"
      if (ticker === "MARKET" || ticker === "ALL") {
        return null;
      }

      return await prisma.aiChatLog.create({
        data: {
          stockTicker: ticker,
          sender,
          message,
          period,
        },
      });
    } catch (error) {
      console.error("[aiRepository.saveChatLog] Error saving log:", error);
      return null;
    }
  },

  // Ambil riwayat chat terbaru untuk suatu emiten
  async getChatHistory(stockTicker: string, limit: number = 20) {
    try {
      const ticker = stockTicker.toUpperCase();
      if (ticker === "MARKET" || ticker === "ALL") return [];

      return await prisma.aiChatLog.findMany({
        where: { stockTicker: ticker },
        orderBy: { createdAt: "desc" },
        take: limit,
      });
    } catch (error) {
      console.error(`[aiRepository.getChatHistory] Error fetching logs for ${stockTicker}:`, error);
      return [];
    }
  },
};
