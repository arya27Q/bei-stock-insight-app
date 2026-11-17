"use client";

import React from "react";
import {
  SlidersHorizontal,
  Download,
  ChevronLeft,
  ChevronRight,
  List,
  LayoutGrid,
  CheckCircle2,
  MinusCircle,
  AlertCircle,
  RotateCcw,
  Bookmark,
} from "lucide-react";
import { StockFundamental } from "../../types/stock";
import {
  useStockScreener,
  ScreenerPreset,
  getSpecificFundamentalStatus,
} from "../../hooks/useStockScreener";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { SearchInput } from "../ui/SearchInput";
import { DropdownSelect } from "../ui/DropdownSelect";
import { useDashboard } from "@/context/DashboardContext";

interface StockScreenerProps {
  stocks: StockFundamental[];
  onSelectStock: (stock: StockFundamental) => void;
}

export const StockScreener: React.FC<StockScreenerProps> = ({ stocks, onSelectStock }) => {
  const { isWatchlisted, toggleWatchlist } = useDashboard();
  const {
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
  } = useStockScreener(stocks);

  // Status fundamental spesifik berbasis indikator dan median sektor
  const getFundamentalStatus = (stock: StockFundamental) => {
    const info = getSpecificFundamentalStatus(stock, stocks);
    if (info.variant === "positive") {
      return {
        label: info.label,
        reason: info.reason,
        icon: CheckCircle2,
        iconColor: "text-[rgba(52,184,150,0.95)]",
        textColor: "text-zinc-800 dark:text-zinc-200",
      };
    }
    if (info.variant === "neutral") {
      return {
        label: info.label,
        reason: info.reason,
        icon: MinusCircle,
        iconColor: "text-[rgba(224,154,64,0.95)]",
        textColor: "text-zinc-700 dark:text-zinc-300",
      };
    }
    return {
      label: info.label,
      reason: info.reason,
      icon: AlertCircle,
      iconColor: "text-[rgba(220,90,110,0.95)]",
      textColor: "text-zinc-600 dark:text-zinc-300",
    };
  };

  return (
    <div className="space-y-5 font-sans">
      {/* 1. Header Halaman (Model Referensi Bilde: Judul + View Switcher di Kiri, Aksi Utama di Kanan) */}
      <div className="flex flex-col gap-3 @xl:flex-row @xl:items-center @xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Smart Screener
            </h2>

            {/* View Switcher Icons (Tabel vs Kartu) */}
            <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                onClick={() => setViewMode("table")}
                className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                  viewMode === "table"
                    ? "bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
                title="Tampilan Tabel"
                aria-label="Tampilan Tabel"
              >
                <List className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => setViewMode("cards")}
                className={`rounded-md p-1.5 transition-colors cursor-pointer ${
                  viewMode === "cards"
                    ? "bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                }`}
                title="Tampilan Grid Kartu"
                aria-label="Tampilan Grid Kartu"
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Menyaring perusahaan berdasarkan pertumbuhan pendapatan, laba bersih, dan perbandingan terhadap median sektor (Laporan Q3 2024).
          </p>
        </div>

        {/* Quick Preset Pills di Kanan Atas (Berbasis Median Sektor & Pertumbuhan) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "Semua Saham" },
            { id: "stable_growth", label: "Pendapatan & Laba Tumbuh" },
            { id: "high_roe", label: "ROE ≥ Median Sektor" },
            { id: "fair_valuation", label: "PER ≤ Median Sektor" },
          ].map((preset) => {
            const active = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id as ScreenerPreset)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Toolbar Pencarian & Kontrol Sejajar (Persis Referensi Bilde: Search + Stepper < Sektor > + Filter + Export) */}
      <div className="flex flex-col gap-2.5 @2xl:flex-row @2xl:items-center">
        {/* Search Input Lebar */}
        <div className="flex-1">
          <SearchInput
            id="screener-search"
            placeholder="Cari kode emiten, status, atau nama perusahaan..."
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery("")}
          />
        </div>

        {/* Kontrol Kanan: Stepper Sektor + Tombol Filter + Tombol Export */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {/* Stepper Sektor (< Semua Sektor >) Tanpa Truncate */}
          <div className="inline-flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 min-w-[235px]">
            <button
              onClick={() => cycleSector("prev")}
              className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer shrink-0"
              aria-label="Sektor sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="px-2.5 whitespace-nowrap text-center">
              {selectedSector === "all" ? "Semua Sektor" : selectedSector}
            </span>
            <button
              onClick={() => cycleSector("next")}
              className="rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer shrink-0"
              aria-label="Sektor berikutnya"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Tombol Filter */}
          <button
            onClick={() => setShowFilterPanel((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              showFilterPanel
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            }`}
            aria-expanded={showFilterPanel}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span>Filter</span>
          </button>

          {/* Tombol Export CSV */}
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Panel Filter Tambahan (Muncul Saat Tombol Filter Diklik) */}
      {showFilterPanel && (
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-xs @xl:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-900">
          <div>
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1.5">
              Pilih Sektor Spesifik
            </span>
            <DropdownSelect
              ariaLabel="Pilih Sektor Spesifik"
              align="left"
              className="w-full"
              buttonClassName="py-2 text-xs sm:text-sm"
              value={selectedSector}
              onChange={(val) => setSelectedSector(val)}
              options={sectors.map((s) => ({
                value: s,
                label: s === "all" ? "Semua Sektor" : s,
                dotColor:
                  s === "Keuangan"
                    ? "bg-[rgba(38,166,134,0.95)]"
                    : s === "Barang Konsumsi Primer"
                    ? "bg-[rgba(224,154,64,0.95)]"
                    : s === "Infrastruktur"
                    ? "bg-[rgba(56,155,210,0.95)]"
                    : s === "Perindustrian"
                    ? "bg-[rgba(120,130,220,0.95)]"
                    : s === "Energi"
                    ? "bg-[rgba(220,90,110,0.95)]"
                    : "bg-zinc-400",
              }))}
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              <label htmlFor="screener-roe-range">Minimal ROE Ekuitas</label>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">≥ {minRoe}%</span>
            </div>
            <input
              id="screener-roe-range"
              type="range"
              min="0"
              max="25"
              step="1"
              value={minRoe}
              onChange={(e) => setMinRoe(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1.5">
              <label htmlFor="screener-rev-range">Minimal Pertumbuhan Pendapatan</label>
              <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">≥ {minRevenueGrowth}%</span>
            </div>
            <input
              id="screener-rev-range"
              type="range"
              min="-20"
              max="20"
              step="1"
              value={minRevenueGrowth}
              onChange={(e) => setMinRevenueGrowth(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="@xl:col-span-3 flex justify-end pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>
      )}

      {/* 3A. TAMPILAN TABEL BERSIH (Model Referensi Bilde "Invoices" dalam Tema Hitam/Gelap Elegan) */}
      {viewMode === "table" ? (
        <div className="rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-2xs dark:border-zinc-800/90 dark:bg-zinc-900/90">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" aria-label="Tabel Smart Screener Emiten BEI">
              {/* Header Bar Solid Hitam/Charcoal dengan Huruf Title Case Bersih */}
              <thead>
                <tr className="bg-zinc-900 text-white dark:bg-zinc-800/95 dark:text-zinc-100 text-xs sm:text-[13px] font-semibold border-b border-zinc-800">
                  <th scope="col" className="py-3.5 px-5 first:rounded-tl-lg">Emiten & Perusahaan</th>
                  <th scope="col" className="py-3.5 px-4">Kode & Sektor</th>
                  <th scope="col" className="py-3.5 px-4">Kapitalisasi</th>
                  <th scope="col" className="py-3.5 px-4">Pendapatan & Laba YoY</th>
                  <th scope="col" className="py-3.5 px-4">Kemampuan Laba (ROE) & PER</th>
                  <th scope="col" className="py-3.5 px-5 last:rounded-tr-lg">Status Indikator</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/70 text-xs sm:text-[13px]">
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-zinc-500">
                      <p className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Tidak ada emiten yang memenuhi kriteria saringan saat ini.
                      </p>
                      <button
                        onClick={resetAllFilters}
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Reset Saringan</span>
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((stock) => {
                    const status = getFundamentalStatus(stock);
                    const StatusIcon = status.icon;
                    const isRevPos = stock.revenueGrowth >= 0;
                    const isNetPos = stock.netIncomeGrowth >= 0;

                    return (
                      <tr
                        key={stock.ticker}
                        onClick={() => onSelectStock(stock)}
                        className="group hover:bg-zinc-50/90 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
                      >
                        {/* Kolom 1: Avatar Lingkaran Solid + Nama Perusahaan */}
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3 min-w-[220px]">
                            <Avatar ticker={stock.ticker} sector={stock.sector} size="md" />
                            <div className="min-w-0">
                              <span className="font-medium group-hover:font-semibold text-zinc-900 dark:text-zinc-100 leading-snug block">
                                {stock.name}
                              </span>
                              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block leading-snug">
                                {stock.subSector} • {stock.period}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Kolom 2: Kode Emiten & Sektor */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWatchlist(stock.ticker);
                              }}
                              title={isWatchlisted(stock.ticker) ? "Hapus dari Watchlist" : "Simpan ke Watchlist"}
                              className={`p-1 rounded-md transition-all cursor-pointer ${
                                isWatchlisted(stock.ticker)
                                  ? "text-amber-500 hover:text-amber-600 dark:text-amber-400"
                                  : "text-zinc-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300"
                              }`}
                            >
                              <Bookmark className={`h-3.5 w-3.5 ${isWatchlisted(stock.ticker) ? "fill-current" : ""}`} />
                            </button>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">
                              {stock.ticker}
                            </span>
                            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                              {stock.sector === "Barang Konsumsi Primer" ? "Konsumsi" : stock.sector}
                            </span>
                          </div>
                        </td>

                        {/* Kolom 3: Kapitalisasi Pasar */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-medium text-zinc-700 dark:text-zinc-300 tabular-nums">
                          {stock.marketCapLabel}
                        </td>

                        {/* Kolom 4: Pertumbuhan Pendapatan & Laba Bersih YoY */}
                        <td className="py-3.5 px-4 whitespace-nowrap tabular-nums">
                          <div>
                            <span
                              className={`font-bold mr-1 ${
                                isRevPos
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {isRevPos ? "▲" : "▼"}
                            </span>
                            <span className="font-medium text-zinc-800 dark:text-zinc-200">
                              Pendapatan {isRevPos ? `+${stock.revenueGrowth}%` : `${stock.revenueGrowth}%`}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            Laba bersih:{" "}
                            <span
                              className={`font-semibold ${
                                isNetPos
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {isNetPos ? `+${stock.netIncomeGrowth}%` : `${stock.netIncomeGrowth}%`}
                            </span>
                          </div>
                        </td>

                        {/* Kolom 5: ROE & PER */}
                        <td className="py-3.5 px-4 whitespace-nowrap tabular-nums">
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold mr-1">
                            ROE
                          </span>
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {stock.roe}%
                          </span>
                          <span className="text-zinc-400 dark:text-zinc-500 text-[11px] block mt-0.5">
                            Valuasi PER: {stock.per}x
                          </span>
                        </td>

                        {/* Kolom 6: Status Fundamental Spesifik Berbasis Indikator */}
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          <div className="inline-flex items-start gap-2">
                            <StatusIcon className={`h-4 w-4 shrink-0 mt-0.5 ${status.iconColor}`} aria-hidden="true" />
                            <div>
                              <span className={`font-semibold block ${status.textColor}`}>
                                {status.label}
                              </span>
                              <span className="text-[11px] text-zinc-400 dark:text-zinc-500 block">
                                {status.reason}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer: Counter Bar & Navigasi Halaman Ringkas */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-3 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-medium">
              Menampilkan <strong className="text-zinc-900 dark:text-zinc-100">{filteredStocks.length}</strong> dari {stocks.length} emiten pilihan BEI
            </span>

            <div className="inline-flex items-center gap-2">
              <span>Halaman aktif</span>
              <span className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                1
              </span>
              <div className="flex items-center gap-1 ml-1">
                <button
                  disabled
                  className="rounded-lg border border-zinc-200 bg-white p-1 text-zinc-400 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900"
                  aria-label="Halaman sebelumnya"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  disabled
                  className="rounded-lg border border-zinc-200 bg-white p-1 text-zinc-400 disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900"
                  aria-label="Halaman berikutnya"
                >
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3B. TAMPILAN KARTU GRID (Saat Pengguna Mengklik Ikon Grid di Sebelah Judul) */
        <div className="grid grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-3 gap-4">
          {filteredStocks.map((stock) => {
            const status = getFundamentalStatus(stock);
            const StatusIcon = status.icon;
            return (
              <button
                key={stock.ticker}
                onClick={() => onSelectStock(stock)}
                className="rounded-xl border border-zinc-200 bg-white p-4 text-left hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar ticker={stock.ticker} sector={stock.sector} size="md" />
                    <div className="min-w-0">
                      <span className="font-bold text-sm text-zinc-950 dark:text-zinc-50 block">
                        {stock.ticker}
                      </span>
                      <span className="text-xs text-zinc-500 leading-snug block">
                        {stock.name}
                      </span>
                    </div>
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
                      title={isWatchlisted(stock.ticker) ? "Hapus dari Watchlist" : "Simpan ke Watchlist"}
                      className={`p-1 rounded-md transition-all cursor-pointer ${
                        isWatchlisted(stock.ticker)
                          ? "text-amber-500 hover:text-amber-600 bg-amber-500/10"
                          : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isWatchlisted(stock.ticker) ? "fill-current" : ""}`} />
                    </span>
                    <Badge variant="zinc">
                      {stock.sector === "Barang Konsumsi Primer" ? "Konsumsi" : stock.sector}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-zinc-100 dark:border-zinc-800 text-center">
                  <div className="p-1 rounded bg-zinc-50 dark:bg-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">Pendapatan</span>
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        stock.revenueGrowth >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}` : stock.revenueGrowth}%
                    </span>
                  </div>

                  <div className="p-1 rounded bg-zinc-50 dark:bg-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">Laba Bersih</span>
                    <span
                      className={`text-xs font-bold tabular-nums ${
                        stock.netIncomeGrowth >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}` : stock.netIncomeGrowth}%
                    </span>
                  </div>

                  <div className="p-1 rounded bg-zinc-50 dark:bg-zinc-800">
                    <span className="text-[10px] text-zinc-400 block">ROE</span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                      {stock.roe}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="text-zinc-500 font-medium">Kap: {stock.marketCapLabel}</span>
                  <div className="inline-flex items-center gap-1.5">
                    <StatusIcon className={`h-3.5 w-3.5 ${status.iconColor}`} aria-hidden="true" />
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {status.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
