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
  period: string; // Misal: "Q3 2024"
  hasData: boolean; // Integritas data
  description?: string;
}

export interface MetricDefinition {
  id: MetricType;
  label: string;
  subLabel: string;
  unit: string;
  tooltip: string;
  benchmarkRule: (val: number) => "positive" | "neutral" | "caution";
}

export interface AIInsightData {
  ticker: string;
  name: string;
  period: string;
  summary: string;
  strengths: string[];
  considerations: string[];
  disclaimer: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  time: string;
}
