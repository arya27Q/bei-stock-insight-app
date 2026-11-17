import { Router } from "express";
import { aiController } from "./ai.controller.js";

export const aiRouter = Router();

// POST /api/ai/insight - Generate ringkasan analitis otomatis via Gemini / Fallback
aiRouter.post("/insight", aiController.getInsight);

// POST /api/ai/chat - Dialog tanya jawab kontekstual
aiRouter.post("/chat", aiController.chat);

// GET /api/ai/history - Riwayat chat per emiten
aiRouter.get("/history", aiController.getHistory);
