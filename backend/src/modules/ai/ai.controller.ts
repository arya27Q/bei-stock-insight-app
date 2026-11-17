import { Request, Response } from "express";
import { stockRepository } from "../stocks/stock.repository.js";
import { aiRepository } from "./ai.repository.js";
import { geminiService } from "../../services/gemini.service.js";

export const aiController = {
  // POST /api/ai/insight - Generate ringkasan analitis fundamental otomatis via Gemini / Fallback
  async getInsight(req: Request, res: Response) {
    try {
      const { ticker } = req.body;

      if (!ticker || typeof ticker !== "string") {
        res.status(400).json({
          status: "error",
          message: "Parameter ticker wajib disertakan dalam request body.",
        });
        return;
      }

      const stockResult = await stockRepository.findByTicker(ticker);

      if (!stockResult || !stockResult.data) {
        res.status(404).json({
          status: "error",
          message: `Data fundamental untuk emiten ${ticker.toUpperCase()} tidak ditemukan.`,
        });
        return;
      }

      const stock = stockResult.data;

      // Panggil geminiService untuk memproses data fundamental
      const insight = await geminiService.generateInsight(stock);

      // Simpan atau perbarui cache analisis fundamental di database MySQL secara asynchronous
      aiRepository.saveInsight({
        stockTicker: insight.ticker,
        period: insight.period,
        summary: insight.summary,
        strengths: insight.strengths,
        considerations: insight.considerations,
        factPoints: insight.factPoints,
        interpretationPoints: insight.interpretationPoints,
        disclaimer: insight.disclaimer,
      }).catch((err) => console.warn("[aiController.getInsight] Gagal simpan cache insight:", err));

      res.json({
        status: "success",
        data: insight,
      });
    } catch (error: any) {
      console.error("[aiController.getInsight] Error processing insight:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal memproses analisis AI untuk emiten ini.",
      });
    }
  },

  // POST /api/ai/chat - Dialog tanya jawab kontekstual cerdas via Gemini / Fallback
  async chat(req: Request, res: Response) {
    try {
      const { ticker, question } = req.body;

      if (!question || typeof question !== "string") {
        res.status(400).json({
          status: "error",
          message: "Parameter question wajib disertakan.",
        });
        return;
      }

      const cleanTicker = (ticker || "MARKET").toUpperCase().trim();
      let stockContext = null;

      if (cleanTicker !== "MARKET" && cleanTicker !== "ALL") {
        const stockResult = await stockRepository.findByTicker(cleanTicker);
        stockContext = stockResult?.data || null;
      }

      // Catat pertanyaan pengguna ke tabel ai_chat_logs
      aiRepository.saveChatLog(cleanTicker, question, "user", stockContext?.period || "Q3 2024")
        .catch((err) => console.warn("[aiController.chat] Gagal simpan chat log user:", err));

      // Panggil Gemini AI atau mesin analitis cerdas
      const result = await geminiService.chat(cleanTicker, question, stockContext);

      // Catat respons asisten AI ke tabel ai_chat_logs
      aiRepository.saveChatLog(cleanTicker, result.answer, "assistant", stockContext?.period || "Q3 2024")
        .catch((err) => console.warn("[aiController.chat] Gagal simpan chat log asisten:", err));

      res.json({
        status: "success",
        data: result,
      });
    } catch (error: any) {
      console.error("[aiController.chat] Error in chat:", error);
      res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan saat memproses dialog AI.",
      });
    }
  },

  // GET /api/ai/history - Mengambil riwayat dialog chat emiten dari database MySQL
  async getHistory(req: Request, res: Response) {
    try {
      const ticker = (req.query.ticker as string) || "MARKET";
      const limit = Number(req.query.limit) || 20;

      const history = await aiRepository.getChatHistory(ticker, limit);

      res.json({
        status: "success",
        data: history,
      });
    } catch (error: any) {
      console.error("[aiController.getHistory] Error fetching history:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal mengambil riwayat chat AI.",
      });
    }
  },
};
