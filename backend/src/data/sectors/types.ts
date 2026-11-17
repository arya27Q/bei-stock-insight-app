export interface BusinessSegment {
  name: string;
  percentage: number;
}

export interface SectorSpecificMetric {
  label: string;
  value: string;
}

export interface StockFundamental {
  ticker: string;
  name: string;
  sector: string;
  subSector: string;
  pricePerShare?: number | null;
  pricePerLot?: number | null;
  marketCap: number; // Dalam Rupiah
  marketCapLabel: string;
  revenueGrowth: number; // Persentase (misal 12.4%)
  netIncomeGrowth: number; // Persentase (misal 10.1%)
  roe: number; // Persentase (misal 18.5%)
  per: number; // Rasio (misal 21.2)
  pbv?: number | null;
  der?: number | null;
  revenueLabel?: string | null;
  netIncomeLabel?: string | null;
  totalAssetsLabel?: string | null;
  totalEquityLabel?: string | null;
  period: string; // Standar "Q3 2024"
  lastUpdated?: string | null;
  dataSource?: string | null;
  dataStatus?: string | null;
  hasData?: boolean; // Flag untuk data integrity
  description?: string | null;
  ipoYear?: number | null;
  listingBoard?: string | null;
  controllingShareholder?: string | null;
  controllingPercentage?: number | null;
  publicShareholder?: string | null;
  publicPercentage?: number | null;
  businessSegments?: any;
  dividendYield?: number | null;
  dividendPayoutRatio?: number | null;
  dividendDateNote?: string | null;
  netProfitMargin?: number | null;
  npm?: number | null;
  sectorSpecificMetric?: any;
  keyMoat?: string | null;
  keyRisk?: string | null;
}

export type StockData = StockFundamental;

export interface SectorInfo {
  name: string;
  slug: string;
  description: string;
  totalMarketCapLabel: string;
  tickers: string[];
}
