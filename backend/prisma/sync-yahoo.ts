import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { syncAllStockPrices } from "../src/services/yahoo-finance.service.js";
import { prisma } from "../src/config/prisma.js";

async function main() {
  console.log("Memulai sinkronisasi harga saham live dari Yahoo Finance (IDX)...");
  const quotes = await syncAllStockPrices();
  console.log(`\nBerhasil memperbarui ${quotes.length} saham di database MySQL 'bei_stock_insight'!`);
}

main()
  .catch((e) => {
    console.error("Gagal sinkronisasi harga:", e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
