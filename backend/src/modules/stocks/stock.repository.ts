import { prisma } from "../../config/prisma.js";
import { MOCK_STOCKS } from "../../data/mock-stocks.js";

export interface StockFilterParams {
  sector?: string;
  q?: string;
}

export interface SaveLotSimulationInput {
  stockTicker: string;
  pricePerShare: number;
  pricePerLot: number;
  targetBudget: number;
  brokerFeePercent: number;
  calculatedLots: number;
  totalStockCost: number;
  brokerFeeAmount: number;
  totalSpent: number;
  remainingCash: number;
  aiCommentary?: string;
}

export const stockRepository = {
  // Ambil semua daftar saham dari database MySQL dengan filter opsional
  async findAll(filter: StockFilterParams = {}) {
    const whereClause: Record<string, unknown> = {};

    if (filter.sector && filter.sector.trim() !== "") {
      whereClause.sector = filter.sector;
    }

    if (filter.q && filter.q.trim() !== "") {
      const query = filter.q.trim();
      whereClause.OR = [
        { ticker: { contains: query } },
        { name: { contains: query } },
      ];
    }

    try {
      const stocks = await prisma.stock.findMany({
        where: whereClause,
        orderBy: { marketCap: "desc" },
      });

      if (stocks.length > 0) {
        return { data: stocks, source: "database" as const };
      }
    } catch (error) {
      console.error("[stockRepository.findAll] Database query error, using fallback:", error);
    }

    // Fallback data jika database belum terisi atau sedang reconnect
    let fallbackData = [...MOCK_STOCKS];
    if (filter.sector && filter.sector.trim() !== "") {
      fallbackData = fallbackData.filter(
        (s) => s.sector.toLowerCase() === filter.sector!.toLowerCase()
      );
    }
    if (filter.q && filter.q.trim() !== "") {
      const query = filter.q.toLowerCase();
      fallbackData = fallbackData.filter(
        (s) => s.ticker.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
      );
    }
    return { data: fallbackData, source: "fallback" as const };
  },

  // Cari 1 emiten berdasarkan ticker kode saham (misal BBCA)
  async findByTicker(ticker: string) {
    const sym = ticker.toUpperCase();

    try {
      const stock = await prisma.stock.findUnique({
        where: { ticker: sym },
      });
      if (stock) {
        return { data: stock, source: "database" as const };
      }
    } catch (error) {
      console.error(`[stockRepository.findByTicker] Error querying ${sym}:`, error);
    }

    const fallbackStock = MOCK_STOCKS.find((s) => s.ticker === sym);
    if (fallbackStock) {
      return { data: fallbackStock, source: "fallback" as const };
    }
    return null;
  },

  // Simpan hasil perhitungan simulasi lot ke tabel lot_simulations
  async saveLotSimulation(data: SaveLotSimulationInput) {
    return prisma.lotSimulation.create({
      data: {
        stockTicker: data.stockTicker,
        pricePerShare: data.pricePerShare,
        pricePerLot: data.pricePerLot,
        targetBudget: data.targetBudget,
        brokerFeePercent: data.brokerFeePercent,
        calculatedLots: data.calculatedLots,
        totalStockCost: data.totalStockCost,
        brokerFeeAmount: data.brokerFeeAmount,
        totalSpent: data.totalSpent,
        remainingCash: data.remainingCash,
        aiCommentary: data.aiCommentary,
      },
    });
  },
};
