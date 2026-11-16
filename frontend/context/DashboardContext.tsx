"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StockFundamental, MetricType } from "@/types/stock";
import { INITIAL_STOCKS } from "@/services/stock-service";
import { useStocks, useStockSearch } from "@/hooks";

interface DashboardContextType {
  stocks: StockFundamental[];
  selectedMetric: MetricType;
  setSelectedMetric: (metric: MetricType) => void;
  selectedStock: StockFundamental | null;
  setSelectedStock: (stock: StockFundamental | null) => void;
  selectStock: (stock: StockFundamental) => void;
  clearSelectedStock: () => void;
  benchmarkSector: string;
  setBenchmarkSector: (sector: string) => void;
  navigateToBenchmark: (sector: string) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
  toggleSidebar: () => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (v: boolean) => void;
  isRightAiOpen: boolean;
  setIsRightAiOpen: (v: boolean) => void;
  toggleRightAi: () => void;
  openGeneralAi: () => void;
  searchQuery: string;
  searchResults: StockFundamental[];
  isSearching: boolean;
  handleSearchChange: (query: string) => void;
  clearSearch: () => void;
  handleSelectFromSearch: (stock: StockFundamental) => void;
  pageTitle: string;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { stocks } = useStocks();

  const {
    searchQuery,
    searchResults,
    isSearching,
    handleSearchChange,
    clearSearch,
  } = useStockSearch(stocks);

  const [selectedMetric, setSelectedMetric] = useState<MetricType>("revenueGrowth");
  const [selectedStock, setSelectedStock] = useState<StockFundamental | null>(INITIAL_STOCKS[0]);
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

  const navigateToBenchmark = useCallback(
    (sector: string) => {
      setBenchmarkSector(sector);
      router.push("/benchmark");
    },
    [router]
  );

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

  const handleSelectFromSearch = useCallback(
    (stock: StockFundamental) => {
      selectStock(stock);
      clearSearch();
    },
    [selectStock, clearSearch]
  );

  const pageTitle = useMemo(() => {
    if (pathname === "/market-map" || pathname === "/") return "Fundamental Stock Map";
    if (pathname === "/screener") return "Smart Fundamental Screener";
    if (pathname === "/benchmark") return "Sector Benchmark";
    if (pathname === "/ai-insight") return "Pusat Analisis & Riset AI";
    if (pathname === "/profile") return "Profil Investor & Pengaturan";
    return "BEI Stock Insight";
  }, [pathname]);

  const value = useMemo(
    () => ({
      stocks,
      selectedMetric,
      setSelectedMetric,
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
      searchQuery,
      searchResults,
      isSearching,
      handleSearchChange,
      clearSearch,
      handleSelectFromSearch,
      pageTitle,
    }),
    [
      stocks,
      selectedMetric,
      selectedStock,
      selectStock,
      clearSelectedStock,
      benchmarkSector,
      navigateToBenchmark,
      isSidebarCollapsed,
      toggleSidebar,
      isMobileSidebarOpen,
      isRightAiOpen,
      toggleRightAi,
      openGeneralAi,
      searchQuery,
      searchResults,
      isSearching,
      handleSearchChange,
      clearSearch,
      handleSelectFromSearch,
      pageTitle,
    ]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
