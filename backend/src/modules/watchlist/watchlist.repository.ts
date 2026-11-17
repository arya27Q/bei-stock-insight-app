import { prisma } from "../../config/prisma.js";
import { MOCK_STOCKS } from "../../data/mock-stocks.js";

export interface WatchlistStockItem {
  id: string;
  userEmail: string;
  stockTicker: string;
  createdAt: Date;
  stock?: any;
}

// In-memory fallback jika database MySQL sedang offline
const memoryWatchlist: Map<string, Set<string>> = new Map([
  ["investor@beistockinsight.id", new Set(["BBCA", "BBRI", "ICBP", "TLKM"])],
]);

export class WatchlistRepository {
  /**
   * Mengambil semua saham yang ada di dalam watchlist pengguna
   */
  async getWatchlistByUser(userEmail: string = "investor@beistockinsight.id") {
    try {
      const records = await prisma.watchlist.findMany({
        where: { userEmail },
        include: { stock: true },
        orderBy: { createdAt: "desc" },
      });

      if (records && records.length > 0) {
        return {
          source: "database" as const,
          items: records,
          tickers: records.map((r: any) => r.stockTicker as string),
        };
      }

      // Jika database kosong untuk user ini, gunakan default inisial
      const defaultTickers = ["BBCA", "BBRI", "ICBP", "TLKM"];
      const fallbackStocks = MOCK_STOCKS.filter((s: any) => defaultTickers.includes(s.ticker));

      return {
        source: "fallback" as const,
        items: fallbackStocks.map((stock: any) => ({
          id: `fallback-${stock.ticker}`,
          userEmail,
          stockTicker: stock.ticker,
          createdAt: new Date(),
          stock,
        })),
        tickers: defaultTickers,
      };
    } catch (err) {
      console.warn("[WatchlistRepository] Database offline, fallback in-memory:", err);
      const userSet = memoryWatchlist.get(userEmail) || new Set(["BBCA", "BBRI", "ICBP", "TLKM"]);
      const tickers = Array.from(userSet);
      const fallbackStocks = MOCK_STOCKS.filter((s: any) => tickers.includes(s.ticker));

      return {
        source: "memory" as const,
        items: fallbackStocks.map((stock: any) => ({
          id: `memory-${stock.ticker}`,
          userEmail,
          stockTicker: stock.ticker,
          createdAt: new Date(),
          stock,
        })),
        tickers,
      };
    }
  }

  /**
   * Toggle status watchlist (tambah jika belum ada, hapus jika sudah ada)
   */
  async toggleWatchlist(userEmail: string = "investor@beistockinsight.id", stockTicker: string) {
    const ticker = stockTicker.toUpperCase().trim();

    try {
      // Cari apakah sudah ada di database
      const existing = await prisma.watchlist.findUnique({
        where: {
          userEmail_stockTicker: {
            userEmail,
            stockTicker: ticker,
          },
        },
      });

      if (existing) {
        // Hapus dari watchlist
        await prisma.watchlist.delete({
          where: { id: existing.id },
        });

        const current = await prisma.watchlist.findMany({
          where: { userEmail },
          select: { stockTicker: true },
        });

        return {
          action: "removed" as const,
          ticker,
          tickers: current.map((c: any) => c.stockTicker as string),
        };
      } else {
        // Tambahkan ke watchlist
        await prisma.watchlist.create({
          data: {
            userEmail,
            stockTicker: ticker,
          },
        });

        const current = await prisma.watchlist.findMany({
          where: { userEmail },
          select: { stockTicker: true },
        });

        return {
          action: "added" as const,
          ticker,
          tickers: current.map((c: any) => c.stockTicker as string),
        };
      }
    } catch (err) {
      console.warn("[WatchlistRepository] Database error saat toggle, fallback in-memory:", err);
      if (!memoryWatchlist.has(userEmail)) {
        memoryWatchlist.set(userEmail, new Set(["BBCA", "BBRI", "ICBP", "TLKM"]));
      }

      const userSet = memoryWatchlist.get(userEmail)!;
      let action: "added" | "removed" = "added";

      if (userSet.has(ticker)) {
        userSet.delete(ticker);
        action = "removed";
      } else {
        userSet.add(ticker);
        action = "added";
      }

      return {
        action,
        ticker,
        tickers: Array.from(userSet),
      };
    }
  }

  /**
   * Cek apakah emiten tertentu ada di watchlist pengguna
   */
  async isWatchlisted(userEmail: string = "investor@beistockinsight.id", stockTicker: string) {
    const ticker = stockTicker.toUpperCase().trim();
    try {
      const existing = await prisma.watchlist.findUnique({
        where: {
          userEmail_stockTicker: {
            userEmail,
            stockTicker: ticker,
          },
        },
      });
      return Boolean(existing);
    } catch {
      const userSet = memoryWatchlist.get(userEmail);
      return userSet ? userSet.has(ticker) : false;
    }
  }
}
