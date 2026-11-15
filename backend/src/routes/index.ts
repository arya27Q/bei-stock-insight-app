import { Router } from "express";
import { healthRouter } from "./health.route.js";
import { stocksRouter } from "./stocks.route.js";
import { aiRouter } from "./ai.route.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/stocks", stocksRouter);
apiRouter.use("/ai", aiRouter);
