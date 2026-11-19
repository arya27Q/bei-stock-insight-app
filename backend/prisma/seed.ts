import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { PrismaClient } from "../src/generated/client/index.js";
import { MOCK_STOCKS } from "../src/data/mock-stocks.js";
import { hashPassword } from "../src/modules/auth/auth.utils.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeding data saham, AI insights, chat logs, dan simulasi lot ke MySQL...");

  // 1. Seed Tabel stocks
  for (const stock of MOCK_STOCKS) {
    const upserted = await prisma.stock.upsert({
      where: { ticker: stock.ticker },
      update: {
        name: stock.name,
        sector: stock.sector,
        subSector: stock.subSector,
        pricePerShare: stock.pricePerShare || 1000,
        pricePerLot: stock.pricePerLot || 100000,
        marketCap: stock.marketCap,
        marketCapLabel: stock.marketCapLabel,
        revenueGrowth: stock.revenueGrowth,
        netIncomeGrowth: stock.netIncomeGrowth,
        roe: stock.roe,
        per: stock.per,
        pbv: stock.pbv,
        der: stock.der,
        revenueLabel: stock.revenueLabel,
        netIncomeLabel: stock.netIncomeLabel,
        totalAssetsLabel: stock.totalAssetsLabel,
        totalEquityLabel: stock.totalEquityLabel,
        period: stock.period,
        lastUpdated: stock.lastUpdated,
        dataSource: stock.dataSource,
        dataStatus: stock.dataStatus,
        hasData: stock.hasData,
        description: stock.description,
        ipoYear: stock.ipoYear,
        listingBoard: stock.listingBoard,
        controllingShareholder: stock.controllingShareholder,
        controllingPercentage: stock.controllingPercentage,
        publicShareholder: stock.publicShareholder,
        publicPercentage: stock.publicPercentage,
        businessSegments: stock.businessSegments ? JSON.parse(JSON.stringify(stock.businessSegments)) : null,
        dividendYield: stock.dividendYield,
        dividendPayoutRatio: stock.dividendPayoutRatio,
        dividendDateNote: stock.dividendDateNote,
        netProfitMargin: stock.netProfitMargin,
        sectorSpecificMetric: stock.sectorSpecificMetric ? JSON.parse(JSON.stringify(stock.sectorSpecificMetric)) : null,
        keyMoat: stock.keyMoat,
        keyRisk: stock.keyRisk,
      },
      create: {
        ticker: stock.ticker,
        name: stock.name,
        sector: stock.sector,
        subSector: stock.subSector,
        pricePerShare: stock.pricePerShare || 1000,
        pricePerLot: stock.pricePerLot || 100000,
        marketCap: stock.marketCap,
        marketCapLabel: stock.marketCapLabel,
        revenueGrowth: stock.revenueGrowth,
        netIncomeGrowth: stock.netIncomeGrowth,
        roe: stock.roe,
        per: stock.per,
        pbv: stock.pbv,
        der: stock.der,
        revenueLabel: stock.revenueLabel,
        netIncomeLabel: stock.netIncomeLabel,
        totalAssetsLabel: stock.totalAssetsLabel,
        totalEquityLabel: stock.totalEquityLabel,
        period: stock.period,
        lastUpdated: stock.lastUpdated,
        dataSource: stock.dataSource,
        dataStatus: stock.dataStatus,
        hasData: stock.hasData,
        description: stock.description,
        ipoYear: stock.ipoYear,
        listingBoard: stock.listingBoard,
        controllingShareholder: stock.controllingShareholder,
        controllingPercentage: stock.controllingPercentage,
        publicShareholder: stock.publicShareholder,
        publicPercentage: stock.publicPercentage,
        businessSegments: stock.businessSegments ? JSON.parse(JSON.stringify(stock.businessSegments)) : null,
        dividendYield: stock.dividendYield,
        dividendPayoutRatio: stock.dividendPayoutRatio,
        dividendDateNote: stock.dividendDateNote,
        netProfitMargin: stock.netProfitMargin,
        sectorSpecificMetric: stock.sectorSpecificMetric ? JSON.parse(JSON.stringify(stock.sectorSpecificMetric)) : null,
        keyMoat: stock.keyMoat,
        keyRisk: stock.keyRisk,
      },
    });

    console.log(`[✓] Seed stock: ${upserted.ticker} (Rp ${upserted.pricePerShare}/lembar - Rp ${upserted.pricePerLot}/lot)`);
  }

  // 2. Seed Tabel ai_insights (Contoh Insight BBCA)
  await prisma.aiInsight.deleteMany();
  await prisma.aiInsight.create({
    data: {
      stockTicker: "BBCA",
      period: "Q3 2024",
      summary:
        "Bank Central Asia (BBCA) membukukan kinerja stabil pada Q3 2024 didukung pertumbuhan laba bersih +15.3% YoY dan profitabilitas tinggi (ROE 22.1%). Dominasi dana murah (CASA) 82% menjadi bantalan kokoh efisiensi margin bunga di tengah rezim suku bunga tinggi.",
      strengths: [
        "Pertumbuhan laba bersih +15.3% YoY melampaui median sektor perbankan (+11.2%).",
        "Rasio CASA dominan 82% menekan beban bunga dana (Cost of Funds) secara signifikan.",
        "Kualitas aset prima dengan NPL gross terkendali di level 1.8%.",
      ],
      considerations: [
        "Valuasi PER di level 23.5x dan PBV 4.8x tergolong premium di atas rata-rata industri.",
        "Potensi perlambatan ekspansi kredit konsumer jika inflasi dan daya beli melandai.",
      ],
      disclaimer: "Analisis fundamental ini disajikan untuk kebutuhan edukasi mandiri, bukan anjuran beli/jual.",
      lastUpdated: "17 Nov 2026",
    },
  });
  console.log("[✓] Seed AI Insight untuk BBCA berhasil.");

  // 3. Seed Tabel ai_chat_logs (Contoh Chat BBCA)
  await prisma.aiChatLog.deleteMany();
  await prisma.aiChatLog.createMany({
    data: [
      {
        stockTicker: "BBCA",
        sender: "user",
        message: "Apakah valuasi harga saham BBCA tergolong murah atau mahal?",
        period: "Q3 2024",
      },
      {
        stockTicker: "BBCA",
        sender: "assistant",
        message:
          "[Fakta Q3 2024 • BEI/IDX]: Rasio PER BBCA berada di 23.5x dan PBV 4.8x dengan ROE 22.1%. [Interpretasi AI]: Secara historis valuasi ini premium dibandingkan bank lain karena pasar menghargai efisiensi CASA 82% dan profitabilitas konsisten. Bagi investor defensif jangka panjang, harga ini wajar untuk dicicil (DCA).",
        period: "Q3 2024",
      },
    ],
  });
  console.log("[✓] Seed AI Chat Log untuk BBCA berhasil.");

  // 4. Seed Tabel lot_simulations (Contoh Simulasi Lot Modal 5 Juta)
  await prisma.lotSimulation.deleteMany();
  await prisma.lotSimulation.create({
    data: {
      stockTicker: "BBCA",
      pricePerShare: 10000,
      pricePerLot: 1000000,
      targetBudget: 5000000,
      brokerFeePercent: 0.15,
      calculatedLots: 5,
      totalStockCost: 5000000,
      brokerFeeAmount: 7500,
      totalSpent: 5007500,
      remainingCash: 0,
      aiCommentary:
        "Dengan modal Rp 5.000.000, Anda dapat membeli tepat 5 Lot (500 lembar) saham BBCA. Karena seluruh dana teralokasikan pada 1 emiten perbankan, pertimbangkan diversifikasi bertahap (DCA) untuk mengantisipasi volatilitas pasar harian.",
    },
  });
  console.log("[✓] Seed Lot Simulation untuk BBCA berhasil.");

  // 5. Seed Tabel users (Akun Demo Resmi Pengujian)
  const demoEmail = "arya@beistockinsight.id";
  await prisma.user.upsert({
    where: { email: demoEmail },
    update: {
      name: "Arya Pratama",
      password: hashPassword("password123"),
      experienceLevel: "Pemula",
      initialCapital: 2500000,
      initialCapitalLabel: "Rp 2.500.000",
      preferredSectors: ["Keuangan", "Barang Konsumsi Primer"],
      bio: "Investor ritel pemula yang fokus pada saham dividen dan perbankan unggulan BEI.",
      notificationsEnabled: true,
    },
    create: {
      email: demoEmail,
      name: "Arya Pratama",
      password: hashPassword("password123"),
      experienceLevel: "Pemula",
      initialCapital: 2500000,
      initialCapitalLabel: "Rp 2.500.000",
      preferredSectors: ["Keuangan", "Barang Konsumsi Primer"],
      bio: "Investor ritel pemula yang fokus pada saham dividen dan perbankan unggulan BEI.",
      notificationsEnabled: true,
    },
  });
  console.log(`[✓] Seed Demo User (${demoEmail} / password123) berhasil.`);

  console.log("\nProses Seeding 5 Tabel Lengkap Selesai 100%!");
}

main()
  .catch((e) => {
    console.error("Gagal melakukan seed:", e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
