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

  // Simpan riwayat interaksi chat ke tabel ai_chat_logs per akun pengguna
  async saveChatLog(
    stockTicker: string,
    message: string,
    sender: "user" | "assistant" = "user",
    period: string = "Q3 2024",
    userEmail: string = "guest@beistockinsight.id"
  ) {
    try {
      const ticker = stockTicker.toUpperCase();
      // Lewati foreign key check jika ticker umum "MARKET"
      if (ticker === "MARKET" || ticker === "ALL") {
        return null;
      }

      return await prisma.aiChatLog.create({
        data: {
          userEmail: userEmail.toLowerCase().trim(),
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

  // Ambil riwayat chat terbaru untuk suatu emiten milik akun tertentu (lama -> baru)
  async getChatHistory(
    stockTicker: string,
    limit: number = 30,
    userEmail: string = "guest@beistockinsight.id"
  ) {
    try {
      const ticker = stockTicker.toUpperCase();
      if (ticker === "MARKET" || ticker === "ALL") return [];

      const rows = await prisma.aiChatLog.findMany({
        where: {
          stockTicker: ticker,
          userEmail: userEmail.toLowerCase().trim(),
        },
        orderBy: { createdAt: "desc" },
        take: limit,
      });

      return rows.reverse();
    } catch (error) {
      console.error(`[aiRepository.getChatHistory] Error fetching logs for ${stockTicker}:`, error);
      return [];
    }
  },

  // Ambil daftar ringkasan sesi chat milik akun tertentu yang dikelompokkan per emiten (terbaru di atas)
  async getChatSessions(userEmail: string = "guest@beistockinsight.id") {
    try {
      const logs = await prisma.aiChatLog.findMany({
        where: {
          userEmail: userEmail.toLowerCase().trim(),
        },
        orderBy: { createdAt: "desc" },
        take: 300,
      });

      const sessionMap = new Map<
        string,
        {
          ticker: string;
          lastMessage: string;
          lastUserQuestion: string | null;
          messageCount: number;
          lastActiveAt: Date;
        }
      >();

      for (const log of logs) {
        const key = log.stockTicker.toUpperCase();
        const existing = sessionMap.get(key);
        if (!existing) {
          sessionMap.set(key, {
            ticker: key,
            lastMessage: log.message,
            lastUserQuestion: log.sender === "user" ? log.message : null,
            messageCount: 1,
            lastActiveAt: log.createdAt,
          });
        } else {
          existing.messageCount += 1;
          if (!existing.lastUserQuestion && log.sender === "user") {
            existing.lastUserQuestion = log.message;
          }
        }
      }

      return Array.from(sessionMap.values()).map((s) => ({
        ticker: s.ticker,
        lastMessage: (s.lastUserQuestion || s.lastMessage).slice(0, 100),
        messageCount: s.messageCount,
        lastActiveAt: s.lastActiveAt.toISOString(),
      }));
    } catch (error) {
      console.error("[aiRepository.getChatSessions] Error fetching sessions:", error);
      return [];
    }
  },

  // Hapus riwayat chat milik akun tertentu untuk suatu emiten dari tabel ai_chat_logs
  async clearChatHistory(
    stockTicker: string,
    userEmail: string = "guest@beistockinsight.id"
  ) {
    try {
      const ticker = stockTicker.toUpperCase();
      if (ticker === "MARKET" || ticker === "ALL") return { count: 0 };

      return await prisma.aiChatLog.deleteMany({
        where: {
          stockTicker: ticker,
          userEmail: userEmail.toLowerCase().trim(),
        },
      });
    } catch (error) {
      console.error(`[aiRepository.clearChatHistory] Error deleting logs for ${stockTicker}:`, error);
      return { count: 0 };
    }
  },
};
