import { useState, useCallback } from "react";
import { StockFundamental } from "../types/stock";

export type DashboardTab = "map" | "screener" | "benchmark";

export interface UseDashboardLayoutReturn {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  selectedStock: StockFundamental | null;
  setSelectedStock: (stock: StockFundamental | null) => void;
  selectStock: (stock: StockFundamental) => void;
  clearSelectedStock: () => void;
  benchmarkSector: string;
  setBenchmarkSector: (sector: string) => void;
  navigateToBenchmark: (sector: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
  isRightAiOpen: boolean;
  setIsRightAiOpen: (open: boolean) => void;
  toggleRightAi: () => void;
  openGeneralAi: () => void;
  getTabTitle: () => string;
}

export function useDashboardLayout(): UseDashboardLayoutReturn {
  const [activeTab, setActiveTab] = useState<DashboardTab>("map");
  const [selectedStock, setSelectedStock] = useState<StockFundamental | null>(null);
  const [benchmarkSector, setBenchmarkSector] = useState<string>("Keuangan");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isRightAiOpen, setIsRightAiOpen] = useState<boolean>(true);

  const selectStock = useCallback((stock: StockFundamental) => {
    setSelectedStock(stock);
    setIsRightAiOpen(true);
  }, []);

  const clearSelectedStock = useCallback(() => {
    setSelectedStock(null);
  }, []);

  const navigateToBenchmark = useCallback((sector: string) => {
    setBenchmarkSector(sector);
    setActiveTab("benchmark");
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const toggleRightAi = useCallback(() => {
    setIsRightAiOpen((prev) => !prev);
  }, []);

  const openGeneralAi = useCallback(() => {
    setSelectedStock(null);
    setIsRightAiOpen(true);
  }, []);

  const getTabTitle = useCallback(() => {
    if (activeTab === "map") return "Fundamental Stock Map";
    if (activeTab === "screener") return "Smart Fundamental Screener";
    return "Sector Benchmark";
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    selectedStock,
    setSelectedStock,
    selectStock,
    clearSelectedStock,
    benchmarkSector,
    setBenchmarkSector,
    navigateToBenchmark,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isRightAiOpen,
    setIsRightAiOpen,
    toggleRightAi,
    openGeneralAi,
    getTabTitle,
  };
}
