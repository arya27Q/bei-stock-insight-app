import { Router } from "express";
import { WatchlistController } from "./watchlist.controller.js";

export const watchlistRouter = Router();
const controller = new WatchlistController();

// GET /api/watchlist - Daftar watchlist pengguna
watchlistRouter.get("/", controller.getWatchlist);

// POST /api/watchlist/toggle - Tambah/Hapus emiten dari watchlist
watchlistRouter.post("/toggle", controller.toggleWatchlist);
