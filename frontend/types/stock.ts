export type MetricType = "revenueGrowth" | "netIncomeGrowth" | "roe" | "per";

export interface BusinessSegment {
  name: string;
  percentage: number;
}

export interface SectorSpecificMetric {
  label: string;
  value: string;
}

export interface SectorInfo {
  name: string;
  slug: string;
  description: string;
  totalMarketCapLabel: string;
  tickers: string[];
}

export interface StockFundamental {
  ticker: string;
  name: string;
  sector: string;
  subSector: string;
  pricePerShare?: number;
  pricePerLot?: number;
  marketCap: number; // Angka riil dalam Rupiah
  marketCapLabel: string; // Misal: "Rp 1.250 T"
  revenueGrowth: number; // Persentase YoY
  netIncomeGrowth: number; // Persentase YoY
  roe: number; // Persentase
  per: number; // Rasio kali
  pbv?: number; // Price to Book Value
  der?: number; // Debt to Equity Ratio
  revenueLabel?: string; // Rincian Pendapatan Kuartalan (misal: "Rp 74,2 T")
  netIncomeLabel?: string; // Rincian Laba Bersih Kuartalan (misal: "Rp 41,1 T")
  totalAssetsLabel?: string; // Total Aset (misal: "Rp 1.430 T")
  totalEquityLabel?: string; // Total Ekuitas (misal: "Rp 248 T")
  period: string; // Standar: "Q3 2024"
  lastUpdated?: string; // Tanggal pembaruan data
  dataSource?: string; // Sumber data resmi: "BEI / IDX"
  dataStatus?: "Terverifikasi" | "Data Sebagian" | "Belum Tersedia";
  hasData: boolean; // Integritas data
  description?: string;
  historicalTrends?: Partial<Record<MetricType, number[]>>; // Tren 4 kuartal (Q4 '23, Q1 '24, Q2 '24, Q3 '24)

  // Rincian Profil & Analisis Bisnis Lanjutan
  ipoYear?: number;
  listingBoard?: string;
  controllingShareholder?: string;
  controllingPercentage?: number;
  publicShareholder?: string;
  publicPercentage?: number;
  businessSegments?: BusinessSegment[];
  dividendYield?: number;
  dividendPayoutRatio?: number;
  dividendDateNote?: string;
  netProfitMargin?: number;
  sectorSpecificMetric?: SectorSpecificMetric;
  keyMoat?: string;
  keyRisk?: string;
}

export interface MetricDefinition {
  id: MetricType;
  label: string;
  subLabel: string;
  unit: string;
  tooltip: string;
  benchmarkRule: (val: number) => "positive" | "neutral" | "caution";
}

export interface AIInsightPoint {
  category: string;
  text: string;
  basisLabel: string;
}

export interface AIInsightData {
  ticker: string;
  name: string;
  period: string;
  source?: string;
  lastUpdated?: string;
  summary: string;
  strengths: string[];
  considerations: string[];
  factPoints?: AIInsightPoint[];
  interpretationPoints?: AIInsightPoint[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  time: string;
  metaBasis?: string;
}

export interface LotSimulationResult {
  id?: string;
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
  aiCommentary: string;
}
