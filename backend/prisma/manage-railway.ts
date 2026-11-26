import { PrismaClient } from "../src/generated/client/index.js";
import { syncAllStockPrices } from "../src/services/yahoo-finance.service.js";

const railwayDbUrl = "mysql://root:gqsNOIjlUkSLbesrkMXvchjLrmINYXai@autorack.proxy.rlwy.net:40872/railway";
process.env.DATABASE_URL = railwayDbUrl;

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: railwayDbUrl,
    },
  },
});

async function main() {
  const action = process.argv[2] || "info";

  console.log(`[Railway Manager] Target DB: autorack.proxy.rlwy.net:40872/railway`);
  console.log(`[Railway Manager] Action: ${action}\n`);

  if (action === "info") {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        experienceLevel: true,
        createdAt: true,
      },
    });
    console.log(`[INFO] Jumlah User Terdaftar: ${users.length}`);
    users.forEach((u, i) => {
      console.log(`  ${i + 1}. Nama: ${u.name} | Email: ${u.email} | Dibuat: ${u.createdAt.toISOString()}`);
    });

    const watchlists = await prisma.watchlist.findMany();
    console.log(`\n[INFO] Jumlah Watchlist: ${watchlists.length}`);
    watchlists.forEach((w, i) => {
      console.log(`  ${i + 1}. User Email: ${w.userEmail} | Ticker: ${w.stockTicker}`);
    });

    const stockCount = await prisma.stock.count();
    console.log(`\n[INFO] Total Emiten Saham: ${stockCount}`);
  } else if (action === "sync-yahoo") {
    console.log("=== Memulai Sinkronisasi Harga Saham Live Yahoo Finance ke Hosting Railway ===");
    const tickers = [
      "BBCA", "BBRI", "BMRI", "TLKM", "ASII", "ICBP", "ADRO", "BBNI", "UNVR", "GOTO",
      "AMMN", "KLBF", "PGAS", "BRIS", "ANTM", "INDF", "ISAT", "UNTR", "PTBA", "BUKA",
      "SIDO", "PGEO"
    ];

    let successCount = 0;
    for (const ticker of tickers) {
      try {
        const symbol = `${ticker}.JK`;
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        });

        if (!res.ok) {
          console.warn(`[Sync] ${ticker}: Gagal HTTP ${res.status}`);
          continue;
        }

        const data = await res.json();
        const meta = data?.chart?.result?.[0]?.meta;
        if (!meta || typeof meta.regularMarketPrice !== "number") {
          console.warn(`[Sync] ${ticker}: Data harga tidak ditemukan`);
          continue;
        }

        const price = meta.regularMarketPrice;
        const pricePerLot = Math.round(price * 100);
        const changePercent = Number((meta.regularMarketChangePercent || 0).toFixed(2));

        const updated = await prisma.stock.update({
          where: { ticker },
          data: {
            pricePerShare: price,
            pricePerLot: pricePerLot,
          },
        });

        console.log(`[✓ Update] ${ticker}: Rp ${price.toLocaleString("id-ID")}/lbr | Rp ${pricePerLot.toLocaleString("id-ID")}/lot (${changePercent >= 0 ? "+" : ""}${changePercent}%)`);
        successCount++;
      } catch (err: any) {
        console.error(`[Sync] Error updating ${ticker}:`, err.message);
      }
    }

    console.log(`\n=== Selesai! Berhasil memperbarui ${successCount} dari ${tickers.length} saham di Railway ===`);
  } else if (action === "reset-users") {
    const deletedWatchlists = await prisma.watchlist.deleteMany();
    const deletedUsers = await prisma.user.deleteMany();
    console.log(`[RESET] Berhasil menghapus ${deletedUsers.count} user dan ${deletedWatchlists.count} watchlist dari database Railway.`);
  }
}

main()
  .catch((err) => {
    console.error("Fatal Error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
