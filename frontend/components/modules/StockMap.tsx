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
} from "lucide-react";
import { StockFundamental, MetricType } from "../../types/stock";
import { METRIC_DEFINITIONS } from "../../services/stock-service";

interface StockMapProps {
  stocks: StockFundamental[];
  onSelectStock: (stock: StockFundamental) => void;
}

type ViewLayoutMode = "sectors" | "market";

export const StockMap: React.FC<StockMapProps> = ({ stocks, onSelectStock }) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("revenueGrowth");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [layoutMode, setLayoutMode] = useState<ViewLayoutMode>("sectors");
  const [showTooltip, setShowTooltip] = useState(false);

  const activeDef = METRIC_DEFINITIONS[selectedMetric];

  const sectors = ["all", ...Array.from(new Set(stocks.map((s) => s.sector)))];

  const filteredStocks = selectedSector === "all"
    ? stocks
    : stocks.filter((s) => s.sector === selectedSector);

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
    if (selectedMetric === "roe") return "ROE Ekuitas";
    return "Valuasi PER";
  };

  // Nama sektor singkat untuk badge di dalam kartu Peta Pasar
  const getShortSectorBadge = (sector: string) => {
    if (sector === "Barang Konsumsi Primer") return "Konsumsi";
    if (sector === "Perindustrian") return "Industri";
    return sector;
  };

  const formatShortCap = (marketCap: number) => {
    const inTrillion = marketCap / 1000000000000;
    return `Rp ${inTrillion.toLocaleString("id-ID", { maximumFractionDigits: 0 })} T`;
  };

  // Kelompokkan emiten per sektor
  const keuanganStocks = filteredStocks.filter((s) => s.sector === "Keuangan");
  const konsumsiStocks = filteredStocks.filter((s) => s.sector === "Barang Konsumsi Primer");
  const infraIndustriStocks = filteredStocks.filter(
    (s) => s.sector === "Infrastruktur" || s.sector === "Perindustrian"
  );
  const energiStocks = filteredStocks.filter((s) => s.sector === "Energi");

  // Komponen Kartu Saham Responsif (Zero Overflow, Container-Aware Typography)
  const renderStockTile = (
    stock: StockFundamental,
    options?: { showSectorTag?: boolean }
  ) => {
    const metricValue = stock[selectedMetric];
    const style = getSolidTileStyle(metricValue);
    const StatusIcon = style.icon;

    return (
      <button
        key={stock.ticker}
        onClick={() => onSelectStock(stock)}
        className={`group relative overflow-hidden min-w-0 rounded-xl p-3.5 text-left transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md hover:brightness-105 active:scale-[0.99] border ${style.border} ${style.bg} text-white flex flex-col justify-between min-h-[112px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white`}
      >
        {/* Baris Atas: Kode Saham & Kapitalisasi Pasar */}
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-2 min-w-0">
            <span className="font-sans text-base @sm:text-lg font-bold tracking-tight text-white leading-none truncate">
              {stock.ticker}
            </span>
            <span className="text-[11px] font-semibold text-white/95 px-2 py-0.5 rounded-md bg-black/20 border border-white/10 tabular-nums whitespace-nowrap shrink-0">
              {stock.marketCapLabel}
            </span>
          </div>

          {/* Baris Tengah: Badge Sektor Ringkas & Nama Perusahaan */}
          <div className="mt-1.5 flex items-center gap-1.5 min-w-0">
            {options?.showSectorTag && (
              <span className="text-[10px] font-medium text-white/95 bg-black/20 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">
                {getShortSectorBadge(stock.sector)}
              </span>
            )}
            <span className="text-xs font-normal text-white/90 truncate min-w-0 block">
              {stock.name}
            </span>
          </div>
        </div>

        {/* Baris Bawah: Label Singkat & Angka Metrik Utama (Anti-Overflow) */}
        <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 min-w-0">
          <span className="text-[11px] font-medium text-white/85 truncate min-w-0">
            {getMetricShortBadge()}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            <StatusIcon className="h-3.5 w-3.5 text-white/90 shrink-0" aria-hidden="true" />
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

            <div>
              <label htmlFor="map-sector-select" className="sr-only">Filter Sektor</label>
              <select
                id="map-sector-select"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-200 focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Sektor</option>
                {sectors.filter((s) => s !== "all").map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowTooltip(!showTooltip)}
                className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-300 transition-colors cursor-pointer whitespace-nowrap"
                aria-expanded={showTooltip}
              >
                <HelpCircle className="h-3.5 w-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
                <span>Arti Metrik?</span>
              </button>

              {showTooltip && (
                <div className="absolute right-0 top-10 z-30 w-72 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-xl dark:border-zinc-700 dark:bg-[#1e2029] text-xs text-zinc-700 dark:text-zinc-200">
                  <div className="font-bold text-zinc-950 dark:text-zinc-50 mb-1">
                    {activeDef.label} ({activeDef.subLabel})
                  </div>
                  <p className="leading-relaxed text-zinc-600 dark:text-zinc-300 text-[11px]">
                    {activeDef.tooltip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Baris Tengah: 4 Tombol Indikator Sejajar Lurus dalam 1 Baris Grid */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-2">
          {(Object.keys(METRIC_DEFINITIONS) as MetricType[]).map((key) => {
            const def = METRIC_DEFINITIONS[key];
            const isSelected = selectedMetric === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedMetric(key)}
                className={`w-full rounded-xl px-3 py-2 text-xs font-semibold text-center transition-all cursor-pointer truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-100 ${
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

        {/* 2. Bar Legenda Skala Warna RGBA */}
        <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-medium text-zinc-500 dark:text-zinc-400 text-xs">
            Skala warna ({activeDef.label}):
          </span>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-xs bg-[rgba(126,42,58,0.88)] inline-block" />
              <span>&lt; -5%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-xs bg-[rgba(150,52,68,0.85)] inline-block" />
              <span>-5% s/d 0%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-xs bg-[rgba(45,50,66,0.9)] inline-block" />
              <span>Netral</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-xs bg-[rgba(24,100,86,0.85)] inline-block" />
              <span>0% s/d +10%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-4 rounded-xs bg-[rgba(20,130,102,0.88)] inline-block" />
              <span>&gt; +10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TAMPILAN A: Kluster Sektor Proporsional (Responsif Terhadap Lebar Container) */}
      {layoutMode === "sectors" && (
        <div className="space-y-4">
          {selectedSector !== "all" ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
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
              <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-3 gap-3">
                {filteredStocks.map((stock) => renderStockTile(stock))}
              </div>
            </div>
          ) : (
            <>
              {/* Baris 1: Kluster Sektor Keuangan (4 Bank Utama: 2x2 saat panel AI buka, 4 kolom sejajar saat layar lebar) */}
              {keuanganStocks.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
                        Sektor Keuangan (Perbankan Utama)
                      </h2>
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 shrink-0">
                        {keuanganStocks.length} Emiten
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tabular-nums shrink-0">
                      Total: {formatShortCap(keuanganStocks.reduce((a, b) => a + b.marketCap, 0))}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-4 gap-3">
                    {keuanganStocks.map((stock) => renderStockTile(stock))}
                  </div>
                </div>
              )}

              {/* Baris 2: Kluster Barang Konsumsi & Infrastruktur/Industri (2 Kolom Seimbang, Tinggi Identik) */}
              <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-4">
                {/* 1. Barang Konsumsi Primer (2 Emiten: ICBP, UNVR) */}
                {konsumsiStocks.length > 0 && (
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
                            Sektor Barang Konsumsi Primer
                          </h2>
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 shrink-0">
                            {konsumsiStocks.length} Emiten
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tabular-nums shrink-0">
                          Total: {formatShortCap(konsumsiStocks.reduce((a, b) => a + b.marketCap, 0))}
                        </span>
                      </div>
                      <div className={`grid gap-3 ${konsumsiStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 @sm:grid-cols-2"}`}>
                        {konsumsiStocks.map((stock) => renderStockTile(stock))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Infrastruktur & Perindustrian (2 Emiten: TLKM, ASII) */}
                {infraIndustriStocks.length > 0 && (
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
                            Sektor Infrastruktur & Industri
                          </h2>
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 shrink-0">
                            {infraIndustriStocks.length} Emiten
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tabular-nums shrink-0">
                          Total: {formatShortCap(infraIndustriStocks.reduce((a, b) => a + b.marketCap, 0))}
                        </span>
                      </div>
                      <div className={`grid gap-3 ${infraIndustriStocks.length === 1 ? "grid-cols-1" : "grid-cols-1 @sm:grid-cols-2"}`}>
                        {infraIndustriStocks.map((stock) => renderStockTile(stock, { showSectorTag: true }))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Baris 3: Kluster Sektor Energi (ADRO) */}
              {energiStocks.length > 0 && (
                <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs">
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
                        Sektor Energi & Sumber Daya Alam
                      </h2>
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 shrink-0">
                        {energiStocks.length} Emiten
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold tabular-nums shrink-0">
                      Total: {formatShortCap(energiStocks.reduce((a, b) => a + b.marketCap, 0))}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-3 gap-3">
                    {energiStocks.map((stock) => renderStockTile(stock))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 4. TAMPILAN B: Peta Pasar Terpadu (2 Kolom Saat Panel AI Buka, 3x3 Saat Layar Penuh) */}
      {layoutMode === "market" && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800 mb-4">
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 truncate">
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

          <div className="grid grid-cols-1 @sm:grid-cols-2 @3xl:grid-cols-3 gap-3.5">
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
