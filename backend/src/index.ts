import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./config/cors.js";
import { apiRouter } from "./modules/index.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(corsMiddleware);
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Security Headers standar untuk mencegah MIME sniffing & clickjacking
app.use((_req: Request, res: Response, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Logger request sederhana untuk pemantauan endpoint
app.use((req: Request, _res: Response, next) => {
  console.log(`[API ${req.method}] ${req.url}`);
  next();
});

// Rute API terpusat di bawah prefix /api
app.use("/api", apiRouter);

// Fallback route 404 untuk API
app.use((req: Request, res: Response) => {
  console.warn(`[API 404 NOT FOUND] ${req.method} ${req.url}`);
  res.status(404).json({
    status: "error",
    message: `Endpoint ${req.method} ${req.url} tidak ditemukan di BEI Stock Insight API.`,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`BEI Stock Insight API server running at http://localhost:${PORT}`);
  console.log(`Health check ready at: http://localhost:${PORT}/api/health`);
  console.log(`Stocks endpoint ready at: http://localhost:${PORT}/api/stocks`);
  console.log(`AI Insight endpoint ready at: http://localhost:${PORT}/api/ai/insight`);
  console.log(`AI Chat endpoint ready at: http://localhost:${PORT}/api/ai/chat`);
});
