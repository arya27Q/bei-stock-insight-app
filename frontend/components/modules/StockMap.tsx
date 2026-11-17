"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Layers,
  LayoutGrid,
  Grid3X3,
  TrendingUp,
  TrendingDown,
  Minus,
  Bookmark,
} from "lucide-react";
import { StockFundamental, MetricType } from "../../types/stock";
import { METRIC_DEFINITIONS, getHistoricalTrend } from "../../services/stock-service";
import { Sparkline } from "../ui/Sparkline";
import { DropdownSelect } from "../ui/DropdownSelect";
import { useDashboard } from "@/context/DashboardContext";

interface StockMapProps {
  stocks: StockFundamental[];
  onSelectStock: (stock: StockFundamental) => void;
  selectedTicker?: string;
  selectedMetric?: MetricType;
  onSelectMetric?: (metric: MetricType) => void;
}

type ViewLayoutMode = "sectors" | "market";

export const StockMap: React.FC<StockMapProps> = ({
  stocks,
  onSelectStock,
  selectedTicker,
  selectedMetric: controlledMetric,
  onSelectMetric,
}) => {
  const [internalMetric, setInternalMetric] = useState<MetricType>("revenueGrowth");
  const selectedMetric = controlledMetric ?? internalMetric;
  const handleMetricChange = (metric: MetricType) => {
    setInternalMetric(metric);
    if (onSelectMetric) onSelectMetric(metric);
  };

  const { watchlist, isWatchlisted, toggleWatchlist } = useDashboard();
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [onlyWatchlist, setOnlyWatchlist] = useState<boolean>(false);
  const [layoutMode, setLayoutMode] = useState<ViewLayoutMode>("sectors");
  const [showTooltip, setShowTooltip] = useState(false);

  const activeDef = METRIC_DEFINITIONS[selectedMetric];

  const sectors = ["all", ...Array.from(new Set(stocks.map((s) => s.sector)))];

  const filteredStocks = stocks.filter((s) => {
    const matchesSector = selectedSector === "all" || s.sector === selectedSector;
    const matchesWatchlist = !onlyWatchlist || watchlist.includes(s.ticker);
    return matchesSector && matchesWatchlist;
  });

  // Warna RGBA harmonis yang menyatu dengan palet dark #16171f namun tetap tajam (WCAG AA >= 5.2:1 terhadap teks putih)
  const getSolidTileStyle = (val: number) => {
    if (selectedMetric === "revenueGrowth" || selectedMetric === "netIncomeGrowth") {
      if (val >= 10) {
        return {
          bg: "bg-[rgba(20,130,102,0.88)] hover:bg-[rgba(24,148,116,0.95)] active:bg-[rgba(16,112,88,0.95)]",
          border: "border-[rgba(74,222,128,0.25)]",
          icon: TrendingUp,
        };
      }
      if (val >= 0) {
        return {
          bg: "bg-[rgba(24,100,86,0.85)] hover:bg-[rgba(28,116,100,0.92)] active:bg-[rgba(20,86,74,0.95)]",
          border: "border-[rgba(52,211,153,0.2)]",
          icon: TrendingUp,
        };
      }
      if (val >= -5) {
        return {
          bg: "bg-[rgba(150,52,68,0.85)] hover:bg-[rgba(168,60,78,0.92)] active:bg-[rgba(132,44,58,0.95)]",
          border: "border-[rgba(251,113,133,0.22)]",
          icon: TrendingDown,
        };
      }
      return {
        bg: "bg-[rgba(126,42,58,0.88)] hover:bg-[rgba(144,48,66,0.94)] active:bg-[rgba(110,36,50,0.95)]",
        border: "border-[rgba(244,63,94,0.25)]",
        icon: TrendingDown,
      };
    }

    if (selectedMetric === "roe") {
      if (val >= 18) {
        return {
          bg: "bg-[rgba(20,130,102,0.88)] hover:bg-[rgba(24,148,116,0.95)] active:bg-[rgba(16,112,88,0.95)]",
          border: "border-[rgba(74,222,128,0.25)]",
          icon: TrendingUp,
        };
      }
      if (val >= 12) {
        return {
          bg: "bg-[rgba(24,100,86,0.85)] hover:bg-[rgba(28,116,100,0.92)] active:bg-[rgba(20,86,74,0.95)]",
          border: "border-[rgba(52,211,153,0.2)]",
          icon: TrendingUp,
        };
      }
      if (val >= 8) {
        return {
          bg: "bg-[rgba(45,50,66,0.9)] hover:bg-[rgba(55,62,80,0.95)] active:bg-[rgba(38,42,56,0.95)]",
          border: "border-[rgba(148,163,184,0.2)]",
          icon: Minus,
        };
      }
      return {
        bg: "bg-[rgba(126,42,58,0.88)] hover:bg-[rgba(144,48,66,0.94)] active:bg-[rgba(110,36,50,0.95)]",
        border: "border-[rgba(244,63,94,0.25)]",
        icon: TrendingDown,
      };
    }

    // Kewajaran Harga (PER)
    if (val > 0 && val <= 12) {
      return {
        bg: "bg-[rgba(20,130,102,0.88)] hover:bg-[rgba(24,148,116,0.95)] active:bg-[rgba(16,112,88,0.95)]",
        border: "border-[rgba(74,222,128,0.25)]",
        icon: TrendingUp,
      };
    }
    if (val > 0 && val <= 18) {
      return {
        bg: "bg-[rgba(24,100,86,0.85)] hover:bg-[rgba(28,116,100,0.92)] active:bg-[rgba(20,86,74,0.95)]",
        border: "border-[rgba(52,211,153,0.2)]",
        icon: TrendingUp,
      };
    }
    if (val > 0 && val <= 25) {
      return {
        bg: "bg-[rgba(45,50,66,0.9)] hover:bg-[rgba(55,62,80,0.95)] active:bg-[rgba(38,42,56,0.95)]",
        border: "border-[rgba(148,163,184,0.2)]",
        icon: Minus,
      };
    }
    return {
      bg: "bg-[rgba(126,42,58,0.88)] hover:bg-[rgba(144,48,66,0.94)] active:bg-[rgba(110,36,50,0.95)]",
      border: "border-[rgba(244,63,94,0.25)]",
      icon: TrendingDown,
    };
  };

  const getMetricDisplay = (stock: StockFundamental) => {
    const val = stock[selectedMetric];
    if (typeof val !== "number") return "-";
    if (selectedMetric === "revenueGrowth" || selectedMetric === "netIncomeGrowth") {
      return `${val > 0 ? "+" : ""}${val}%`;
    }
    if (selectedMetric === "roe") return `${val}%`;
    return `${val}x`;
  };

  // Label ringkas agar tidak pernah memotong atau mendorong angka keluar kartu
  const getMetricShortBadge = () => {
    if (selectedMetric === "revenueGrowth") return "Pendapatan YoY";
    if (selectedMetric === "netIncomeGrowth") return "Laba Bersih YoY";
    if (selectedMetric === "roe") return "Laba atas Modal (ROE)";
    return "Valuasi Harga (PER)";
  };

  // Skala legenda warna dinamis sesuai indikator yang sedang aktif
  const getLegendItems = () => {
    if (selectedMetric === "revenueGrowth" || selectedMetric === "netIncomeGrowth") {
      return [
        { color: "bg-[rgba(126,42,58,0.88)]", label: "< -5% (Turun Tajam)" },
        { color: "bg-[rgba(150,52,68,0.85)]", label: "-5% s/d 0% (Menurun)" },
        { color: "bg-[rgba(24,100,86,0.85)]", label: "0% s/d +10% (Tumbuh Stabil)" },
        { color: "bg-[rgba(20,130,102,0.88)]", label: "> +10% (Tumbuh Kuat)" },
      ];
    }
    if (selectedMetric === "roe") {
      return [
        { color: "bg-[rgba(126,42,58,0.88)]", label: "< 8% (ROE Rendah)" },
        { color: "bg-[rgba(45,50,66,0.9)]", label: "8% s/d 12% (Moderat)" },
        { color: "bg-[rgba(24,100,86,0.85)]", label: "12% s/d 18% (Efisien)" },
        { color: "bg-[rgba(20,130,102,0.88)]", label: "> 18% (Sangat Efisien)" },
      ];
    }
    return [
      { color: "bg-[rgba(20,130,102,0.88)]", label: "≤ 12x (PER Lebih Rendah)" },
      { color: "bg-[rgba(24,100,86,0.85)]", label: "12x s/d 18x (PER Moderat)" },
      { color: "bg-[rgba(45,50,66,0.9)]", label: "18x s/d 25x (PER Premium)" },
      { color: "bg-[rgba(126,42,58,0.88)]", label: "> 25x (PER Tinggi)" },
    ];
  };

  // Nama sektor singkat untuk badge di dalam kartu Peta Pasar
  const getShortSectorBadge = (sector: string) => {
    if (sector === "Barang Konsumsi Primer") return "Konsumsi";
    if (sector === "Perindustrian") return "Industri";
    if (sector === "Infrastruktur") return "Infra";
    if (sector === "Bahan Baku") return "Bahan Baku";
    if (sector === "Teknologi") return "Tekno";
    if (sector === "Kesehatan") return "Kesehatan";
    if (sector === "Utilitas") return "Utilitas";
    return sector;
  };

  // Warna indikator titik dot untuk setiap sektor
  const getSectorColorDot = (sector: string) => {
    switch (sector) {
      case "Keuangan":
        return "bg-emerald-500";
      case "Barang Konsumsi Primer":
        return "bg-amber-500";
      case "Bahan Baku":
        return "bg-purple-500";
      case "Infrastruktur":
        return "bg-sky-500";
      case "Perindustrian":
        return "bg-indigo-500";
      case "Energi":
        return "bg-rose-500";
      case "Teknologi":
        return "bg-cyan-500";
      case "Kesehatan":
        return "bg-pink-500";
      case "Utilitas":
        return "bg-teal-500";
      default:
        return "bg-zinc-400";
    }
  };

  const formatShortCap = (marketCap: number) => {
    const inTrillion = marketCap / 1000000000000;
    return `Rp ${inTrillion.toLocaleString("id-ID", { maximumFractionDigits: 0 })} T`;
  };

  // Kelompokkan emiten per sektor secara dinamis agar seluruh 9 sektor & 16 emiten tampil
  const sectorGroups = React.useMemo(() => {
    const map = new Map<string, StockFundamental[]>();
    for (const stock of filteredStocks) {
      if (!map.has(stock.sector)) {
        map.set(stock.sector, []);
      }
      map.get(stock.sector)!.push(stock);
    }

    const sectorPriority = [
      "Keuangan",
      "Bahan Baku",
      "Barang Konsumsi Primer",
      "Infrastruktur",
      "Perindustrian",
      "Energi",
      "Teknologi",
      "Kesehatan",
      "Utilitas",
    ];

    const result: { sector: string; stocks: StockFundamental[]; totalCap: number }[] = [];
    for (const sec of sectorPriority) {
      if (map.has(sec)) {
        const list = map.get(sec)!;
        result.push({
          sector: sec,
          stocks: list,
          totalCap: list.reduce((a, b) => a + b.marketCap, 0),
        });
        map.delete(sec);
      }
    }

    for (const [sec, list] of map.entries()) {
      result.push({
        sector: sec,
        stocks: list,
        totalCap: list.reduce((a, b) => a + b.marketCap, 0),
      });
    }

    return result;
  }, [filteredStocks]);

  // Komponen Kartu Saham Responsif (Zero Overflow, Container-Aware Typography)
  const renderStockTile = (
    stock: StockFundamental,
    options?: { showSectorTag?: boolean }
  ) => {
    const metricValue = stock[selectedMetric];
    const style = getSolidTileStyle(metricValue);
    const trendData = getHistoricalTrend(stock, selectedMetric);
    const isSelected = selectedTicker === stock.ticker;
    const isPositiveTrend = trendData[trendData.length - 1] >= trendData[0];

    return (
      <button
        key={stock.ticker}
        onClick={() => onSelectStock(stock)}
        title={`Klik untuk membuka rangkuman AI & konsultasi chatbot ${stock.ticker}`}
        className={`group relative overflow-hidden min-w-0 rounded-xl p-3.5 text-left transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md hover:brightness-105 active:scale-[0.99] border ${style.border} ${style.bg} ${
          isSelected
            ? "ring-2 ring-white/95 ring-offset-2 ring-offset-[#0d0e13] shadow-lg"
            : ""
        } text-white flex flex-col justify-between h-[116px] min-h-[116px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
      >
        {/* Baris Atas: Kode Saham & Kapitalisasi Pasar */}
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-sans text-base @sm:text-lg font-bold tracking-tight text-white leading-none">
                {stock.ticker}
              </span>
              {isSelected && (
                <span className="text-[9px] font-bold uppercase tracking-wider bg-white text-zinc-950 px-1.5 py-0.5 rounded shrink-0">
                  AI Aktif
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWatchlist(stock.ticker);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    toggleWatchlist(stock.ticker);
                  }
                }}
                title={isWatchlisted(stock.ticker) ? `Hapus ${stock.ticker} dari watchlist` : `Simpan ${stock.ticker} ke watchlist`}
                className={`p-1 rounded-md transition-all cursor-pointer ${
                  isWatchlisted(stock.ticker)
                    ? "text-amber-300 hover:text-amber-200 bg-black/30"
                    : "text-white/60 hover:text-white hover:bg-black/20"
                }`}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isWatchlisted(stock.ticker) ? "fill-amber-300" : ""}`} />
              </span>

              <span className="text-[11px] font-semibold text-white/95 px-2 py-0.5 rounded-md bg-black/20 border border-white/10 tabular-nums whitespace-nowrap shrink-0">
                {stock.marketCapLabel}
              </span>
            </div>
          </div>

          {/* Baris Tengah: Badge Sektor Ringkas & Nama Perusahaan Lengkap Tanpa Truncate */}
          <div className="mt-1.5 flex items-start gap-1.5 min-w-0">
            {options?.showSectorTag && (
              <span className="text-[10px] font-medium text-white/95 bg-black/20 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap mt-0.5">
                {getShortSectorBadge(stock.sector)}
              </span>
            )}
            <span className="text-xs font-normal text-white/90 leading-snug min-w-0 block truncate">
              {stock.name}
            </span>
          </div>
        </div>

        {/* Baris Bawah: Label Singkat & Sparkline Mini + Angka Metrik Utama */}
        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 min-w-0">
          <span className="text-[11px] font-medium text-white/85 leading-snug min-w-0">
            {getMetricShortBadge()}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sparkline SVG Super Mini - Visual Tren Historis Kuartalan */}
            <div
              title={`Tren 4 Kuartal (${activeDef.label}): [${trendData.map((v) => `${v}${activeDef.unit}`).join(" → ")}]`}
              className="flex items-center rounded bg-black/15 px-1 py-0.5"
            >
              <Sparkline
                data={trendData}
                width={36}
                height={16}
                isPositive={isPositiveTrend}
              />
            </div>
            <span className="font-sans text-base @sm:text-lg font-bold text-white tracking-tight tabular-nums whitespace-nowrap leading-none">
              {getMetricDisplay(stock)}
            </span>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. Panel Kontrol Terpadu: Indikator Metrik Sejajar Lurus & Filter Tampilan */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xs dark:border-zinc-800/80 dark:bg-[#16171f] space-y-3">
        {/* Baris Atas: Label Indikator di Kiri + Kontrol Tampilan di Kanan */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <Layers className="h-3.5 w-3.5 shrink-0 text-[rgba(52,211,153,0.9)]" aria-hidden="true" />
            <span>Pilih Indikator Fundamental:</span>
          </div>

          {/* Baris Aksi: Mode Layout, Filter Sektor, & Penjelasan Metrik */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-[#0d0e13]">
              <button
                onClick={() => {
                  setSelectedSector("all");
                  setLayoutMode("sectors");
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  layoutMode === "sectors"
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#1e2029] dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
                title="Tampilan Kluster Sektor"
              >
                <Grid3X3 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Kluster Sektor</span>
              </button>
              <button
                onClick={() => {
                  setSelectedSector("all");
                  setLayoutMode("market");
                }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  layoutMode === "market"
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#1e2029] dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                }`}
                title="Tampilan Peta Pasar 3x3"
              >
                <LayoutGrid className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Peta Pasar (3x3)</span>
              </button>
            </div>

            <DropdownSelect
              ariaLabel="Filter Sektor"
              value={selectedSector}
              onChange={(val) => setSelectedSector(val)}
              options={sectors.map((s) => ({
                value: s,
                label: s === "all" ? `Semua Sektor (${stocks.length} Emiten)` : s,
                dotColor: s === "all" ? "bg-emerald-400" : getSectorColorDot(s),
              }))}
            />

            <button
              type="button"
              onClick={() => setOnlyWatchlist((prev) => !prev)}
              className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                onlyWatchlist
                  ? "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-xs"
                  : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
              title={onlyWatchlist ? "Tampilkan semua emiten" : "Filter hanya emiten di watchlist"}
            >
              <Bookmark className={`h-3.5 w-3.5 ${onlyWatchlist ? "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" : ""}`} />
              <span suppressHydrationWarning>Watchlist ({watchlist.length})</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-300 transition-colors cursor-pointer whitespace-nowrap"
                aria-expanded={showTooltip}
              >
                <HelpCircle className="h-3.5 w-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
                <span>Panduan & Arti Metrik</span>
              </button>

              {showTooltip && (
                <div className="absolute right-0 top-10 z-30 w-80 rounded-xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-[#1e2029] text-xs text-zinc-700 dark:text-zinc-200 space-y-2.5">
                  <div>
                    <div className="font-bold text-zinc-950 dark:text-zinc-50 mb-0.5">
                      {activeDef.label} ({activeDef.subLabel})
                    </div>
                    <p className="leading-relaxed text-zinc-600 dark:text-zinc-300 text-[11px]">
                      {activeDef.tooltip}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100 mb-0.5 text-[11px]">
                      Mengapa ukuran kotak dibuat sama besar?
                    </div>
                    <p className="leading-relaxed text-zinc-500 dark:text-zinc-400 text-[11px]">
                      Peta ini menggunakan format Heatmap Grid berukuran seragam agar nama perusahaan, nilai kapitalisasi pasar (Rp Triliun), dan grafik tren 4 kuartal tetap terbaca jelas bagi investor pemula.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Baris Tengah: 4 Tombol Indikator Sejajar dalam Grid Tanpa Truncate */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @5xl:grid-cols-4 gap-2.5">
          {(Object.keys(METRIC_DEFINITIONS) as MetricType[]).map((key) => {
            const def = METRIC_DEFINITIONS[key];
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => handleMetricChange(key)}
                className={`w-full flex items-center justify-center min-h-[42px] rounded-xl px-3.5 py-2 text-xs font-semibold text-center leading-snug transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-100 ${
                  isSelected
                    ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100 dark:bg-[#0d0e13] dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-[#1e2029]"
                }`}
              >
                {def.label}
              </button>
            );
          })}
        </div>

        {/* 2. Bar Legenda Skala Warna Dinamis Sesuai Indikator */}
        <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-zinc-600 dark:text-zinc-300 text-xs">
              Arti Warna ({activeDef.label}):
            </span>
            {selectedMetric === "per" && (
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                *Wajib dibandingkan dengan median sektor sejenis
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            {getLegendItems().map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className={`h-3 w-4 rounded-xs ${item.color} inline-block`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. TAMPILAN A: Kluster Sektor Proporsional (Grid Diperbesar & Tanpa Truncate) */}
      {layoutMode === "sectors" && (
        <div className="space-y-4">
          {selectedSector !== "all" ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50">
                    Sektor {selectedSector}
                  </h2>
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {filteredStocks.length} Emiten
                  </span>
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tabular-nums">
                  Total: {formatShortCap(filteredStocks.reduce((a, b) => a + b.marketCap, 0))}
                </span>
              </div>
              <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-3 gap-3.5">
                {filteredStocks.map((stock) => renderStockTile(stock))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {sectorGroups.map((group) => (
                <div
                  key={group.sector}
                  className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${getSectorColorDot(group.sector)} shrink-0`}
                      />
                      <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50">
                        Sektor {group.sector}
                      </h2>
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 shrink-0">
                        {group.stocks.length} Emiten
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tabular-nums shrink-0">
                      Total: {formatShortCap(group.totalCap)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-3 gap-3.5">
                    {group.stocks.map((stock) => renderStockTile(stock))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TAMPILAN B: Peta Pasar Terpadu (2 Kolom Saat Panel AI Buka, 3x3 Saat Layar Penuh) */}
      {layoutMode === "market" && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50">
                Peta Panas Saham BEI (Peringkat Kapitalisasi Pasar)
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Diurutkan berdasarkan nilai kapitalisasi pasar terbesar di Bursa Efek Indonesia
              </p>
            </div>
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg shrink-0">
              {filteredStocks.length} Emiten Terpilih
            </span>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-3 gap-3.5">
            {filteredStocks
              .slice()
              .sort((a, b) => b.marketCap - a.marketCap)
              .map((stock) => renderStockTile(stock, { showSectorTag: true }))}
          </div>
        </div>
      )}
    </div>
  );
};
