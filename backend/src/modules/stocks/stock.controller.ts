import { Request, Response } from "express";
import { stockRepository } from "./stock.repository.js";
import { syncAllStockPrices } from "../../services/yahoo-finance.service.js";

export const stockController = {
  // GET /api/stocks
  async getAllStocks(req: Request, res: Response) {
    const { sector, q } = req.query;

    const result = await stockRepository.findAll({
      sector: typeof sector === "string" ? sector : undefined,
      q: typeof q === "string" ? q : undefined,
    });

    res.json({
      status: "success",
      source: result.source,
      total: result.data.length,
      data: result.data,
    });
  },

  // GET /api/stocks/compare
  async compareStocks(req: Request, res: Response) {
    const { tickerA, tickerB } = req.query;

    if (!tickerA || !tickerB || typeof tickerA !== "string" || typeof tickerB !== "string") {
      res.status(400).json({
        status: "error",
        message: "Parameter tickerA dan tickerB wajib disertakan (contoh: ?tickerA=BBCA&tickerB=BBRI).",
      });
      return;
    }

    const symA = tickerA.trim().toUpperCase();
    const symB = tickerB.trim().toUpperCase();

    try {
      const [resultA, resultB] = await Promise.all([
        stockRepository.findByTicker(symA),
        stockRepository.findByTicker(symB),
      ]);

      if (!resultA || !resultB) {
        res.status(404).json({
          status: "error",
          message: `Salah satu emiten tidak ditemukan di database (${!resultA ? symA : symB}).`,
        });
        return;
      }

      const stockA = resultA.data;
      const stockB = resultB.data;

      // Evaluasi 5 Pilar Analisis Fundamental
      const valuationWinner =
        stockA.per > 0 && stockB.per > 0
          ? stockA.per < stockB.per
            ? symA
            : stockB.per < stockA.per
            ? symB
            : "TIE"
          : "TIE";

      const profitabilityWinner =
        stockA.roe > stockB.roe ? symA : stockB.roe > stockA.roe ? symB : "TIE";

      const growthWinner =
        stockA.revenueGrowth > stockB.revenueGrowth && stockA.netIncomeGrowth > stockB.netIncomeGrowth
          ? symA
          : stockB.revenueGrowth > stockA.revenueGrowth && stockB.netIncomeGrowth > stockA.netIncomeGrowth
          ? symB
          : stockA.roe > stockB.roe
          ? symA
          : symB;

      const healthWinner =
        (stockA.der ?? 1) < (stockB.der ?? 1)
          ? symA
          : (stockB.der ?? 1) < (stockA.der ?? 1)
          ? symB
          : "TIE";

      const dividendWinner =
        (stockA.dividendYield || 0) > (stockB.dividendYield || 0)
          ? symA
          : (stockB.dividendYield || 0) > (stockA.dividendYield || 0)
          ? symB
          : "TIE";

      res.json({
        status: "success",
        source: resultA.source,
        data: {
          stockA,
          stockB,
          evaluation: {
            valuationWinner,
            profitabilityWinner,
            growthWinner,
            healthWinner,
            dividendWinner,
          },
        },
      });
    } catch (error) {
      console.error("[stockController.compareStocks] Error:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal memproses komparasi saham dari database.",
      });
    }
  },

  // GET /api/stocks/:ticker
  async getStockByTicker(req: Request, res: Response) {
    const rawTicker = req.params.ticker;
    const ticker = (typeof rawTicker === "string" ? rawTicker : rawTicker?.[0] || "").toUpperCase();

    const result = await stockRepository.findByTicker(ticker);

    if (!result) {
      res.status(404).json({
        status: "error",
        message: `Emiten dengan ticker ${ticker} tidak ditemukan.`,
      });
      return;
    }

    res.json({
      status: "success",
      source: result.source,
      data: result.data,
    });
  },

  // POST /api/stocks/:ticker/simulate-lot
  async simulateLot(req: Request, res: Response) {
    const rawTicker = req.params.ticker;
    const ticker = (typeof rawTicker === "string" ? rawTicker : rawTicker?.[0] || "").toUpperCase();
    const { budget, feePercent = 0.15 } = req.body;

    const targetBudget = Number(budget);
    const parsedFee = Number(feePercent);
    if (!targetBudget || targetBudget <= 0 || !Number.isFinite(targetBudget)) {
      res.status(400).json({
        status: "error",
        message: "Target modal pembelian (budget) harus berupa angka positif.",
      });
      return;
    }
    if (Number.isNaN(parsedFee) || parsedFee < 0 || parsedFee > 10) {
      res.status(400).json({
        status: "error",
        message: "Persentase biaya broker (feePercent) harus berada di antara 0% hingga 10%.",
      });
      return;
    }

    try {
      const result = await stockRepository.findByTicker(ticker);
      if (!result) {
        res.status(404).json({
          status: "error",
          message: `Emiten ${ticker} tidak ditemukan.`,
        });
        return;
      }

      const stock = result.data;
      const pricePerShare = stock.pricePerShare || 1000;
      const pricePerLot = stock.pricePerLot || pricePerShare * 100;
      const feeRate = Number(feePercent) / 100;

      const costPerLotWithFee = pricePerLot * (1 + feeRate);
      const calculatedLots = Math.floor(targetBudget / costPerLotWithFee);
      const totalStockCost = calculatedLots * pricePerLot;
      const brokerFeeAmount = Math.round(totalStockCost * feeRate);
      const totalSpent = totalStockCost + brokerFeeAmount;
      const remainingCash = Math.round(targetBudget - totalSpent);

      let aiCommentary = "";
      if (calculatedLots === 0) {
        aiCommentary = `Modal Anda (Rp ${targetBudget.toLocaleString("id-ID")}) belum mencukupi untuk membeli 1 lot ${ticker} (Rp ${pricePerLot.toLocaleString("id-ID")}/lot + fee). Diperlukan tambahan dana minimal Rp ${Math.round(costPerLotWithFee - targetBudget).toLocaleString("id-ID")}.`;
      } else if (remainingCash > pricePerLot * 0.4) {
        aiCommentary = `Dengan modal Rp ${targetBudget.toLocaleString("id-ID")}, Anda mendapatkan ${calculatedLots} Lot (${calculatedLots * 100} lembar). Terdapat sisa kas Rp ${remainingCash.toLocaleString("id-ID")} (${Math.round((remainingCash / targetBudget) * 100)}% dari modal). Pertimbangkan mengalokasikan sisa kas ke saham defensif lain untuk diversifikasi portofolio.`;
      } else {
        aiCommentary = `Alokasi modal sangat optimal: ${calculatedLots} Lot (${calculatedLots * 100} lembar) saham ${ticker} dengan sisa kas minimal Rp ${remainingCash.toLocaleString("id-ID")}. Pertimbangkan strategi Dollar Cost Averaging (DCA) bertahap untuk menjaga risiko harga.`;
      }

      const simulation = await stockRepository.saveLotSimulation({
        stockTicker: ticker,
        pricePerShare,
        pricePerLot,
        targetBudget,
        brokerFeePercent: Number(feePercent),
        calculatedLots,
        totalStockCost,
        brokerFeeAmount,
        totalSpent,
        remainingCash,
        aiCommentary,
      });

      res.json({
        status: "success",
        message: `Simulasi lot untuk ${ticker} berhasil dihitung dan disimpan.`,
        data: simulation,
      });
    } catch (error) {
      console.error("[stockController.simulateLot] Error:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal menghitung simulasi lot saham.",
      });
    }
  },

  // POST /api/stocks/sync
  async syncYahooPrices(_req: Request, res: Response) {
    try {
      const quotes = await syncAllStockPrices();
      res.json({
        status: "success",
        message: `Berhasil menyinkronkan ${quotes.length} harga saham dari Yahoo Finance.`,
        data: quotes,
      });
    } catch (error) {
      console.error("[stockController.syncYahooPrices] Error:", error);
      res.status(500).json({
        status: "error",
        message: "Gagal melakukan sinkronisasi harga dari Yahoo Finance.",
      });
    }
  },
};
