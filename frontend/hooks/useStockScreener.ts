import { useState, useMemo, useCallback } from "react";
import { StockFundamental } from "../types/stock";

export type ScreenerPreset = "all" | "stable_growth" | "high_roe" | "fair_valuation";
export type ScreenerViewMode = "table" | "cards";

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
      setMinRevenueGrowth(8);
      setMinRoe(5);
    } else if (preset === "high_roe") {
      setMinRevenueGrowth(-20);
      setMinRoe(15);
    } else if (preset === "fair_valuation") {
      setMinRevenueGrowth(0);
      setMinRoe(8);
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
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const match =
          stock.ticker.toLowerCase().includes(q) ||
          stock.name.toLowerCase().includes(q) ||
          stock.sector.toLowerCase().includes(q);
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
      if (activePreset === "fair_valuation" && (stock.per > 15 || stock.netIncomeGrowth <= 0)) {
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
      "Kapitalisasi",
      "Pendapatan YoY (%)",
      "Laba Bersih YoY (%)",
      "ROE (%)",
      "PER (x)",
    ];
    const rows = filteredStocks.map((s) => [
      s.ticker,
      `"${s.name}"`,
      `"${s.sector}"`,
      `"${s.marketCapLabel}"`,
      s.revenueGrowth,
      s.netIncomeGrowth,
      s.roe,
      s.per,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "screener-saham-bei.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredStocks]);

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
