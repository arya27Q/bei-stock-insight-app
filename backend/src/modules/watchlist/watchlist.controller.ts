import { Request, Response } from "express";
import { WatchlistRepository } from "./watchlist.repository.js";
import { verifyToken } from "../auth/auth.utils.js";

function resolveUserEmail(req: Request, fallbackEmail?: string): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const payload = verifyToken(authHeader.substring(7).trim());
    if (payload?.email) {
      return payload.email;
    }
  }
  if (fallbackEmail && typeof fallbackEmail === "string" && fallbackEmail.includes("@")) {
    return fallbackEmail.toLowerCase().trim();
  }
  return "investor@beistockinsight.id";
}

export class WatchlistController {
  private watchlistRepo = new WatchlistRepository();

  /**
   * GET /api/watchlist
   * Mengambil daftar watchlist pengguna
   */
  getWatchlist = async (req: Request, res: Response) => {
    try {
      const email = resolveUserEmail(req, req.query.email as string);
      const result = await this.watchlistRepo.getWatchlistByUser(email);

      return res.json({
        status: "success",
        userEmail: email,
        source: result.source,
        total: result.items.length,
        tickers: result.tickers,
        data: result.items,
      });
    } catch (err: unknown) {
      console.error("[WatchlistController] Error getWatchlist:", err);
      return res.status(500).json({
        status: "error",
        message: "Gagal memuat daftar watchlist.",
      });
    }
  };

  /**
   * POST /api/watchlist/toggle
   * Toggle bookmark saham di watchlist (tambah jika belum ada, hapus jika sudah ada)
   */
  toggleWatchlist = async (req: Request, res: Response) => {
    try {
      const email = resolveUserEmail(req, req.body?.email);
      const ticker = req.body?.ticker;

      if (!ticker || typeof ticker !== "string" || ticker.trim().length > 10) {
        return res.status(400).json({
          status: "error",
          message: "Parameter 'ticker' wajib disertakan dengan format yang valid.",
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
    } catch (err: unknown) {
      console.error("[WatchlistController] Error toggleWatchlist:", err);
      return res.status(500).json({
        status: "error",
        message: "Gagal memperbarui status watchlist.",
      });
    }
  };
}
