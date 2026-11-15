import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./config/cors.js";
import { apiRouter } from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute API terpusat di bawah prefix /api
app.use("/api", apiRouter);

// Fallback route 404 untuk API
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint tidak ditemukan di BEI Stock Insight API.",
  });
});

app.listen(PORT, () => {
  console.log(`BEI Stock Insight API server running at http://localhost:${PORT}`);
  console.log(`Health check ready at: http://localhost:${PORT}/api/health`);
  console.log(`Stocks endpoint ready at: http://localhost:${PORT}/api/stocks`);
});
