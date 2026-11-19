import { Router } from "express";
import { aiController } from "./ai.controller.js";
import { createRateLimiter } from "../../config/rate-limit.js";

export const aiRouter = Router();

// Batasi panggilan LLM maks 30 request per menit per IP untuk melindungi kuota API
const aiRateLimiter = createRateLimiter(30, 60 * 1000);

// POST /api/ai/insight - Generate ringkasan analitis otomatis via Gemini / Fallback
aiRouter.post("/insight", aiRateLimiter, aiController.getInsight);

// POST /api/ai/chat - Dialog tanya jawab kontekstual
aiRouter.post("/chat", aiRateLimiter, aiController.chat);

// GET /api/ai/sessions - Daftar semua sesi riwayat chat per emiten
aiRouter.get("/sessions", aiController.getSessions);

// GET /api/ai/history - Riwayat chat per emiten
aiRouter.get("/history", aiController.getHistory);

// DELETE /api/ai/history - Hapus riwayat chat per emiten
aiRouter.delete("/history", aiController.clearHistory);
