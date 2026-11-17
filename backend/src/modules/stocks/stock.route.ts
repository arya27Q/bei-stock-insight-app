import { Router } from "express";
import { stockController } from "./stock.controller.js";

export const stockRouter = Router();

// POST /api/stocks/sync - Sinkronisasi harga live dari Yahoo Finance
stockRouter.post("/sync", stockController.syncYahooPrices);

// POST /api/stocks/:ticker/simulate-lot - Hitung simulasi lot modal & simpan ke lot_simulations
stockRouter.post("/:ticker/simulate-lot", stockController.simulateLot);

// GET /api/stocks - Ambil semua daftar saham
stockRouter.get("/", stockController.getAllStocks);

// GET /api/stocks/compare - Komparasi Head-to-Head 2 emiten (harus sebelum :ticker)
stockRouter.get("/compare", stockController.compareStocks);

// GET /api/stocks/:ticker - Detail profil fundamental 1 emiten
stockRouter.get("/:ticker", stockController.getStockByTicker);
