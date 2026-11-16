import { useState, useMemo, useCallback } from "react";
import { StockFundamental } from "../types/stock";
import { getSectorMedian } from "../services/stock-service";

export type ScreenerPreset = "all" | "stable_growth" | "high_roe" | "fair_valuation";
export type ScreenerViewMode = "table" | "cards";

export function getSpecificFundamentalStatus(
  stock: StockFundamental,
  allStocks: StockFundamental[]
) {
  const sectorMedianRoe = getSectorMedian(allStocks, stock.sector, "roe");
  if (stock.netIncomeGrowth < 0) {
    return {
      label: "Pertumbuhan laba menurun",
      reason: `Laba bersih ${stock.netIncomeGrowth}% YoY`,
      variant: "caution" as const,
    };
  }
  if (stock.roe >= sectorMedianRoe) {
    return {
      label: "ROE di atas median sektor",
      reason: `ROE ${stock.roe}% vs median ${sectorMedianRoe}%`,
      variant: "positive" as const,
    };
  }
  return {
    label: "Pertumbuhan relatif stabil",
    reason: `Laba +${stock.netIncomeGrowth}% • ROE ${stock.roe}%`,
    variant: "neutral" as const,
  };
}

export interface UseStockScreenerReturn {
  viewMode: ScreenerViewMode;
  setViewMode: (mode: ScreenerViewMode) => void;
  activePreset: ScreenerPreset;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  minRevenueGrowth: number;
  setMinRevenueGrowth: (val: number) => void;
  minRoe: number;
  setMinRoe: (val: number) => void;
  showFilterPanel: boolean;
  setShowFilterPanel: (show: boolean | ((prev: boolean) => boolean)) => void;
  sectors: string[];
  filteredStocks: StockFundamental[];
  applyPreset: (preset: ScreenerPreset) => void;
  resetAllFilters: () => void;
  cycleSector: (direction: "prev" | "next") => void;
  handleExportCsv: () => void;
}

export function useStockScreener(stocks: StockFundamental[]): UseStockScreenerReturn {
  const [viewMode, setViewMode] = useState<ScreenerViewMode>("table");
  const [activePreset, setActivePreset] = useState<ScreenerPreset>("all");
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [minRevenueGrowth, setMinRevenueGrowth] = useState<number>(-20);
  const [minRoe, setMinRoe] = useState<number>(0);

  const sectors = useMemo(
    () => ["all", ...Array.from(new Set(stocks.map((s) => s.sector)))],
    [stocks]
  );

  const applyPreset = useCallback((preset: ScreenerPreset) => {
    setActivePreset(preset);
    if (preset === "all") {
      setMinRevenueGrowth(-20);
      setMinRoe(0);
    } else if (preset === "stable_growth") {
      setMinRevenueGrowth(0);
      setMinRoe(10);
    } else if (preset === "high_roe") {
      setMinRevenueGrowth(-20);
      setMinRoe(15);
    } else if (preset === "fair_valuation") {
      setMinRevenueGrowth(-20);
      setMinRoe(10);
    }
  }, []);

  const resetAllFilters = useCallback(() => {
    setActivePreset("all");
    setSearchQuery("");
    setSelectedSector("all");
    setMinRevenueGrowth(-20);
    setMinRoe(0);
  }, []);

  const cycleSector = useCallback(
    (direction: "prev" | "next") => {
      const currentIndex = sectors.indexOf(selectedSector);
      if (direction === "prev") {
        const nextIdx = currentIndex <= 0 ? sectors.length - 1 : currentIndex - 1;
        setSelectedSector(sectors[nextIdx]);
      } else {
        const nextIdx = currentIndex >= sectors.length - 1 ? 0 : currentIndex + 1;
        setSelectedSector(sectors[nextIdx]);
      }
    },
    [sectors, selectedSector]
  );

  const filteredStocks = useMemo(() => {
    return stocks.filter((stock) => {
      const statusInfo = getSpecificFundamentalStatus(stock, stocks);
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const match =
          stock.ticker.toLowerCase().includes(q) ||
          stock.name.toLowerCase().includes(q) ||
          stock.sector.toLowerCase().includes(q) ||
          statusInfo.label.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedSector !== "all" && stock.sector !== selectedSector) {
        return false;
      }
      if (stock.revenueGrowth < minRevenueGrowth) {
        return false;
      }
      if (stock.roe < minRoe) {
        return false;
      }
      const sectorMedianRoe = getSectorMedian(stocks, stock.sector, "roe");
      const sectorMedianPer = getSectorMedian(stocks, stock.sector, "per");

      if (activePreset === "stable_growth" && (stock.revenueGrowth <= 0 || stock.netIncomeGrowth <= 0)) {
        return false;
      }
      if (activePreset === "high_roe" && stock.roe < sectorMedianRoe) {
        return false;
      }
      if (activePreset === "fair_valuation" && (stock.per > sectorMedianPer || stock.netIncomeGrowth < 0)) {
        return false;
      }
      return true;
    });
  }, [stocks, searchQuery, selectedSector, minRevenueGrowth, minRoe, activePreset]);

  const handleExportCsv = useCallback(() => {
    const headers = [
      "Kode",
      "Nama Perusahaan",
      "Sektor",
      "Periode",
      "Kapitalisasi",
      "Pertumbuhan Pendapatan YoY (%)",
      "Pertumbuhan Laba Bersih YoY (%)",
      "Kemampuan Menghasilkan Laba ROE (%)",
      "Valuasi Harga terhadap Laba PER (x)",
      "Status Indikator",
    ];
    const rows = filteredStocks.map((s) => {
      const statusInfo = getSpecificFundamentalStatus(s, stocks);
      return [
        s.ticker,
        `"${s.name}"`,
        `"${s.sector}"`,
        `"${s.period}"`,
        `"${s.marketCapLabel}"`,
        s.revenueGrowth,
        s.netIncomeGrowth,
        s.roe,
        s.per,
        `"${statusInfo.label} (${statusInfo.reason})"`,
      ];
    });
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "screener-saham-bei-q3-2024.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredStocks, stocks]);

  return {
    viewMode,
    setViewMode,
    activePreset,
    searchQuery,
    setSearchQuery,
    selectedSector,
    setSelectedSector,
    minRevenueGrowth,
    setMinRevenueGrowth,
    minRoe,
    setMinRoe,
    showFilterPanel,
    setShowFilterPanel,
    sectors,
    filteredStocks,
    applyPreset,
    resetAllFilters,
    cycleSector,
    handleExportCsv,
  };
}
