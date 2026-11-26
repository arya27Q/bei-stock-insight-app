import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "../src/generated/client/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const railwayDbUrl = "mysql://root:gqsNOIjlUkSLbesrkMXvchjLrmINYXai@autorack.proxy.rlwy.net:40872/railway";
process.env.DATABASE_URL = railwayDbUrl;

const prisma = new PrismaClient({
  datasources: {
    db: { url: railwayDbUrl },
  },
});

const TICKER_MAP: Record<string, string> = {
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

async function fetchYahoo(ticker: string) {
  const symbol = TICKER_MAP[ticker];
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") return null;

    const price = meta.regularMarketPrice;
    return {
      ticker,
      pricePerShare: price,
      pricePerLot: Math.round(price * 100),
      changePercent: Number((meta.regularMarketChangePercent || 0).toFixed(2)),
    };
  } catch {
    return null;
  }
}

async function main() {
  console.log("=== Memulai Pembaruan Menyeluruh 22 Emiten dari Yahoo Finance ===");
  const tickers = Object.keys(TICKER_MAP);
  const updatedMap: Record<string, { pricePerShare: number; pricePerLot: number; changePercent: number }> = {};

  for (const ticker of tickers) {
    const quote = await fetchYahoo(ticker);
    if (quote) {
      updatedMap[ticker] = quote;
      try {
        await prisma.stock.update({
          where: { ticker },
          data: {
            pricePerShare: quote.pricePerShare,
            pricePerLot: quote.pricePerLot,
          },
        });
        console.log(`[DB Railway] ${ticker}: Rp ${quote.pricePerShare.toLocaleString("id-ID")}/lembar | Rp ${quote.pricePerLot.toLocaleString("id-ID")}/lot (${quote.changePercent >= 0 ? "+" : ""}${quote.changePercent}%)`);
      } catch (e: any) {
        console.error(`Gagal update DB ${ticker}:`, e.message);
      }
    }
  }

  // Sekarang update file sektor di frontend dan backend agar SSR sinkron sempurna
  const sectorDirs = [
    path.resolve(__dirname, "../../frontend/data/sectors"),
    path.resolve(__dirname, "../src/data/sectors"),
  ];

  for (const sectorDir of sectorDirs) {
    if (!fs.existsSync(sectorDir)) continue;
    const files = fs.readdirSync(sectorDir).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "types.ts");
    for (const file of files) {
      const filePath = path.join(sectorDir, file);
      let content = fs.readFileSync(filePath, "utf-8");
      let changed = false;

      for (const [ticker, quote] of Object.entries(updatedMap)) {
        // Regex untuk mengganti pricePerShare & pricePerLot spesifik emiten ini
        const tickerRegex = new RegExp(`(ticker:\\s*["']${ticker}["'][\\s\\S]*?pricePerShare:\\s*)[0-9.]+([\\s\\S]*?pricePerLot:\\s*)[0-9.]+`, "g");
        if (tickerRegex.test(content)) {
          content = content.replace(tickerRegex, `$1${quote.pricePerShare}$2${quote.pricePerLot}`);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(filePath, content, "utf-8");
        console.log(`[File Updated] ${path.relative(__dirname + "/../..", filePath)}`);
      }
    }
  }

  console.log("\n=== Seluruh 22 Emiten Berhasil Diperbarui 100%! ===");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
