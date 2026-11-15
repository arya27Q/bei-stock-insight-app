import { Router, Request, Response } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "BEI Stock Insight API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
