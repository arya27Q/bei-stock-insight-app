import { Router } from "express";
import { aiController } from "./ai.controller.js";

export const aiRouter = Router();

// POST /api/ai/insight - Generate ringkasan analitis otomatis via Gemini / Fallback
aiRouter.post("/insight", aiController.getInsight);

// POST /api/ai/chat - Dialog tanya jawab kontekstual
aiRouter.post("/chat", aiController.chat);

// GET /api/ai/sessions - Daftar semua sesi riwayat chat per emiten
aiRouter.get("/sessions", aiController.getSessions);

// GET /api/ai/history - Riwayat chat per emiten
aiRouter.get("/history", aiController.getHistory);

// DELETE /api/ai/history - Hapus riwayat chat per emiten
aiRouter.delete("/history", aiController.clearHistory);
