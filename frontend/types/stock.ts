export type MetricType = "revenueGrowth" | "netIncomeGrowth" | "roe" | "per";

export interface StockFundamental {
  ticker: string;
  name: string;
  sector: string;
  subSector: string;
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
