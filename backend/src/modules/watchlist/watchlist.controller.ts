import { Request, Response } from "express";
import { WatchlistRepository } from "./watchlist.repository.js";

export class WatchlistController {
  private watchlistRepo = new WatchlistRepository();

  /**
   * GET /api/watchlist
   * Mengambil daftar watchlist pengguna
   */
  getWatchlist = async (req: Request, res: Response) => {
    try {
      const email = (req.query.email as string) || "investor@beistockinsight.id";
      const result = await this.watchlistRepo.getWatchlistByUser(email);

      return res.json({
        status: "success",
        userEmail: email,
        source: result.source,
        total: result.items.length,
        tickers: result.tickers,
        data: result.items,
      });
    } catch (err: any) {
      console.error("[WatchlistController] Error getWatchlist:", err);
      return res.status(500).json({
        status: "error",
        message: "Gagal memuat daftar watchlist.",
        error: err?.message,
      });
    }
  };

  /**
   * POST /api/watchlist/toggle
   * Toggle bookmark saham di watchlist (tambah jika belum ada, hapus jika sudah ada)
   */
  toggleWatchlist = async (req: Request, res: Response) => {
    try {
      const email = req.body.email || "investor@beistockinsight.id";
      const ticker = req.body.ticker;

      if (!ticker || typeof ticker !== "string") {
        return res.status(400).json({
          status: "error",
          message: "Parameter 'ticker' wajib disertakan.",
        });
      }

      const result = await this.watchlistRepo.toggleWatchlist(email, ticker);

      return res.json({
        status: "success",
        userEmail: email,
        action: result.action,
        ticker: result.ticker,
        tickers: result.tickers,
        message:
          result.action === "added"
            ? `Saham ${result.ticker} berhasil ditambahkan ke watchlist.`
            : `Saham ${result.ticker} telah dihapus dari watchlist.`,
      });
    } catch (err: any) {
      console.error("[WatchlistController] Error toggleWatchlist:", err);
      return res.status(500).json({
        status: "error",
        message: "Gagal memperbarui status watchlist.",
        error: err?.message,
      });
    }
  };
}
