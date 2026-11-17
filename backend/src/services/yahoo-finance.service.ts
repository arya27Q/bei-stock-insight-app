import { prisma } from "../config/prisma.js";

export const TICKER_MAP: Record<string, string> = {
  BBCA: "BBCA.JK",
  BBRI: "BBRI.JK",
  BMRI: "BMRI.JK",
  TLKM: "TLKM.JK",
  ASII: "ASII.JK",
  ICBP: "ICBP.JK",
  ADRO: "ADRO.JK",
  BBNI: "BBNI.JK",
  UNVR: "UNVR.JK",
  GOTO: "GOTO.JK",
  AMMN: "AMMN.JK",
  KLBF: "KLBF.JK",
  PGAS: "PGAS.JK",
  BRIS: "BRIS.JK",
  ANTM: "ANTM.JK",
  INDF: "INDF.JK",
  ISAT: "ISAT.JK",
  UNTR: "UNTR.JK",
  PTBA: "PTBA.JK",
  BUKA: "BUKA.JK",
  SIDO: "SIDO.JK",
  PGEO: "PGEO.JK",
};

export interface YahooStockQuote {
  ticker: string;
  symbol: string;
  pricePerShare: number;
  pricePerLot: number;
  changePercent: number;
  previousClose: number;
  dayHigh: number;
  dayLow: number;
}

export async function fetchQuoteFromYahoo(ticker: string): Promise<YahooStockQuote | null> {
  const symbol = TICKER_MAP[ticker.toUpperCase()];
  if (!symbol) return null;

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!res.ok) {
      console.warn(`[YahooFinance] Gagal mengambil data untuk ${symbol}: HTTP ${res.status}`);
      return null;
    }

    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") {
      return null;
    }

    const price = meta.regularMarketPrice;
    return {
      ticker: ticker.toUpperCase(),
      symbol,
      pricePerShare: price,
      pricePerLot: Math.round(price * 100),
      changePercent: Number((meta.regularMarketChangePercent || 0).toFixed(2)),
      previousClose: meta.chartPreviousClose || price,
      dayHigh: meta.regularMarketDayHigh || price,
      dayLow: meta.regularMarketDayLow || price,
    };
  } catch (error) {
    console.error(`[YahooFinance] Error fetching ${symbol}:`, error);
    return null;
  }
}

export async function syncAllStockPrices(): Promise<YahooStockQuote[]> {
  const tickers = Object.keys(TICKER_MAP);
  const results: YahooStockQuote[] = [];

  for (const ticker of tickers) {
    const quote = await fetchQuoteFromYahoo(ticker);
    if (quote) {
      results.push(quote);
      try {
        await prisma.stock.update({
          where: { ticker },
          data: {
            pricePerShare: quote.pricePerShare,
            pricePerLot: quote.pricePerLot,
          },
        });
        console.log(`[Sync] ${ticker}: Rp ${quote.pricePerShare}/lembar | Rp ${quote.pricePerLot}/lot (${quote.changePercent}%)`);
      } catch (dbErr) {
        console.error(`[Sync] Gagal update DB untuk ${ticker}:`, dbErr);
      }
    }
  }

  return results;
}
