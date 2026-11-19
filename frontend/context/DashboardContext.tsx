"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StockFundamental, MetricType } from "@/types/stock";
import { INITIAL_STOCKS } from "@/services/stock-service";
import { useStocks, useStockSearch } from "@/hooks";
import { useAuth } from "@/hooks/useAuth";
import {
  getStoredWatchlist,
  saveStoredWatchlist,
  fetchWatchlist,
  toggleWatchlistApi,
  DEFAULT_WATCHLIST_TICKERS,
} from "@/services/watchlist-service";

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

  // Fitur Watchlist Saham Dinamis
  watchlist: string[];
  watchlistStocks: StockFundamental[];
  isWatchlisted: (ticker: string) => boolean;
  toggleWatchlist: (ticker: string) => Promise<void>;

  // Fitur Pencarian Cepat Global (Command Palette Ctrl + K)
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (v: boolean) => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  // Fitur Penguncian & Modal Autentikasi Pengguna
  isAuthModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (action: () => void, reason?: string) => boolean;
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
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Auth State & Interception Gate
  const { user, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalReason, setAuthModalReason] = useState<string>("Fitur Riset Fundamental & Analisis AI");

  const openAuthModal = useCallback((reason = "Fitur Riset Fundamental & Analisis AI") => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const requireAuth = useCallback(
    (action: () => void, reason = "Fitur Riset Fundamental & Analisis AI") => {
      if (isAuthenticated) {
        action();
        return true;
      }
      openAuthModal(reason);
      return false;
    },
    [isAuthenticated, openAuthModal]
  );

  // Khusus layar mobile/tablet (< 1024px), tutup Panel AI secara default saat awal buka agar halaman utama langsung terlihat
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      queueMicrotask(() => {
        setIsRightAiOpen(false);
      });
    }
  }, []);

  // Keyboard shortcut global: Ctrl + K atau Cmd + K untuk Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);

  // Watchlist State: Inisialisasi awal seragam (DEFAULT_WATCHLIST_TICKERS) agar SSR dan Client Hydration sinkron
  const [watchlist, setWatchlist] = useState<string[]>(DEFAULT_WATCHLIST_TICKERS);

  // Sinkronisasi data watchlist dari localStorage & backend setelah hydration selesai di client
  useEffect(() => {
    let isMounted = true;

    // 1. Baca cache lokal di microtask agar tidak memicu cascading synchronous render
    queueMicrotask(() => {
      if (!isMounted) return;
      const stored = getStoredWatchlist();
      if (stored && stored.length > 0) {
        setWatchlist(stored);
      }
    });

    // 2. Ambil data terbaru dari backend MySQL sesuai email user aktif
    fetchWatchlist(user?.email).then((list) => {
      if (isMounted && list && list.length > 0) {
        setWatchlist(list);
        saveStoredWatchlist(list);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const isWatchlisted = useCallback(
    (ticker: string) => {
      if (!ticker) return false;
      return watchlist.includes(ticker.toUpperCase().trim());
    },
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    async (ticker: string) => {
      if (!ticker) return;
      const cleanTicker = ticker.toUpperCase().trim();

      // Optimistic UI update
      setWatchlist((prev) =>
        prev.includes(cleanTicker)
          ? prev.filter((t) => t !== cleanTicker)
          : [cleanTicker, ...prev]
      );

      // Sinkronisasi API & storage sesuai email user aktif
      const res = await toggleWatchlistApi(cleanTicker, user?.email);
      if (res && res.tickers) {
        setWatchlist(res.tickers);
      }
    },
    [user?.email]
  );

  const watchlistStocks = useMemo(() => {
    if (!stocks || stocks.length === 0) return [];
    return stocks.filter((s) => watchlist.includes(s.ticker));
  }, [stocks, watchlist]);

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
      watchlist,
      watchlistStocks,
      isWatchlisted,
      toggleWatchlist,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      openCommandPalette,
      closeCommandPalette,
      isAuthModalOpen,
      authModalReason,
      openAuthModal,
      closeAuthModal,
      requireAuth,
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
      watchlist,
      watchlistStocks,
      isWatchlisted,
      toggleWatchlist,
      isCommandPaletteOpen,
      openCommandPalette,
      closeCommandPalette,
      isAuthModalOpen,
      authModalReason,
      openAuthModal,
      closeAuthModal,
      requireAuth,
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
