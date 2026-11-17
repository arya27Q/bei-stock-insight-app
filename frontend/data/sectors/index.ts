import { StockFundamental, SectorInfo } from "@/types/stock";
import { KEUANGAN_STOCKS } from "./keuangan";
import { KONSUMSI_STOCKS } from "./konsumsi";
import { BAHAN_BAKU_STOCKS } from "./bahan-baku";
import { INFRASTRUKTUR_STOCKS } from "./infrastruktur";
import { PERINDUSTRIAN_STOCKS } from "./perindustrian";
import { ENERGI_STOCKS } from "./energi";
import { TEKNOLOGI_STOCKS } from "./teknologi";
import { KESEHATAN_STOCKS } from "./kesehatan";
import { UTILITAS_STOCKS } from "./utilitas";

export * from "./keuangan";
export * from "./konsumsi";
export * from "./bahan-baku";
export * from "./infrastruktur";
export * from "./perindustrian";
export * from "./energi";
export * from "./teknologi";
export * from "./kesehatan";
export * from "./utilitas";

// Metadata Rincian Sektor Saham BEI
export const SECTORS_METADATA: SectorInfo[] = [
  {
    name: "Keuangan",
    slug: "keuangan",
    description: "Perbankan konvensional dan syariah dengan kapitalisasi pasar terbesar di bursa.",
    totalMarketCapLabel: "Rp 2.333 T",
    tickers: ["BBCA", "BBRI", "BMRI", "BBNI", "BRIS"],
  },
  {
    name: "Barang Konsumsi Primer",
    slug: "barang-konsumsi-primer",
    description: "Industri makanan olahan, kebutuhan rumah tangga, dan agribisnis konsumsi pokok.",
    totalMarketCapLabel: "Rp 268 T",
    tickers: ["ICBP", "UNVR", "INDF"],
  },
  {
    name: "Bahan Baku",
    slug: "bahan-baku",
    description: "Pertambangan tembaga, emas, nikel, dan bahan mineral dasar perindustrian.",
    totalMarketCapLabel: "Rp 670 T",
    tickers: ["AMMN", "ANTM"],
  },
  {
    name: "Infrastruktur",
    slug: "infrastruktur",
    description: "Jaringan serat optik, menara telekomunikasi, dan konektivitas digital nasional.",
    totalMarketCapLabel: "Rp 355 T",
    tickers: ["TLKM", "ISAT"],
  },
  {
    name: "Perindustrian",
    slug: "perindustrian",
    description: "Manufaktur otomotif, alat berat pertambangan, dan jasa rekayasa industri.",
    totalMarketCapLabel: "Rp 301 T",
    tickers: ["ASII", "UNTR"],
  },
  {
    name: "Energi",
    slug: "energi",
    description: "Pertambangan batu bara termal & metalurgi, logistik energi, dan utilitas listrik.",
    totalMarketCapLabel: "Rp 151 T",
    tickers: ["ADRO", "PTBA"],
  },
  {
    name: "Teknologi",
    slug: "teknologi",
    description: "Layanan on-demand, financial technology, dan ekosistem transaksi digital.",
    totalMarketCapLabel: "Rp 96 T",
    tickers: ["GOTO", "BUKA"],
  },
  {
    name: "Kesehatan",
    slug: "kesehatan",
    description: "Farmasi resep, produk nutrisi konsumen, dan logistik distribusi medis.",
    totalMarketCapLabel: "Rp 86 T",
    tickers: ["KLBF", "SIDO"],
  },
  {
    name: "Utilitas",
    slug: "utilitas",
    description: "Infrastruktur pipa transmisi dan distribusi gas bumi untuk sektor industri & pembangkit.",
    totalMarketCapLabel: "Rp 77 T",
    tickers: ["PGAS", "PGEO"],
  },
];

// Agregasi seluruh 22 emiten dari 9 file sektor modular
export const INITIAL_STOCKS: StockFundamental[] = [
  ...KEUANGAN_STOCKS,
  ...KONSUMSI_STOCKS,
  ...BAHAN_BAKU_STOCKS,
  ...INFRASTRUKTUR_STOCKS,
  ...PERINDUSTRIAN_STOCKS,
  ...ENERGI_STOCKS,
  ...TEKNOLOGI_STOCKS,
  ...KESEHATAN_STOCKS,
  ...UTILITAS_STOCKS,
];

// Alias untuk konsistensi penamaan data
export const MOCK_STOCKS = INITIAL_STOCKS;
