import { Router, Request, Response } from "express";
import { MOCK_STOCKS } from "../data/mock-stocks.js";

export const stocksRouter = Router();

// GET /api/stocks - Ambil semua daftar saham atau filter berdasarkan sektor / query
stocksRouter.get("/", (req: Request, res: Response) => {
  const { sector, q } = req.query;

  let results = [...MOCK_STOCKS];

  if (typeof sector === "string" && sector.trim() !== "") {
    results = results.filter((s) => s.sector.toLowerCase() === sector.toLowerCase());
  }

  if (typeof q === "string" && q.trim() !== "") {
    const query = q.toLowerCase();
    results = results.filter(
      (s) => s.ticker.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
    );
  }

  res.json({
    status: "success",
    total: results.length,
    data: results,
  });
});

// GET /api/stocks/:ticker - Detail profil fundamental 1 emiten
stocksRouter.get("/:ticker", (req: Request, res: Response) => {
  const rawTicker = req.params.ticker;
  const ticker = (typeof rawTicker === "string" ? rawTicker : rawTicker?.[0] || "").toUpperCase();
  const stock = MOCK_STOCKS.find((s) => s.ticker === ticker);

  if (!stock) {
    res.status(404).json({
      status: "error",
      message: `Emiten dengan ticker ${ticker} tidak ditemukan.`,
    });
    return;
  }

  res.json({
    status: "success",
    data: stock,
  });
});
