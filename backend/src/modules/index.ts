import { Router } from "express";
import { healthRouter } from "./health/health.route.js";
import { stockRouter } from "./stocks/stock.route.js";
import { aiRouter } from "./ai/ai.route.js";
import { watchlistRouter } from "./watchlist/watchlist.route.js";

export const apiRouter = Router();

// Mounting modul-modul API terpusat
apiRouter.use("/health", healthRouter);
apiRouter.use("/stocks", stockRouter);
apiRouter.use("/ai", aiRouter);
apiRouter.use("/watchlist", watchlistRouter);
