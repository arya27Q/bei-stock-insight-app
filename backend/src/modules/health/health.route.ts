import { Router } from "express";
import { healthController } from "./health.controller.js";

export const healthRouter = Router();

// GET /api/health - Cek status server
healthRouter.get("/", healthController.getHealth);
