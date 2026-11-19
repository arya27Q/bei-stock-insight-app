"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { Avatar } from "../ui/Avatar";

export interface RivalryPreset {
  label: string;
  tickerA: string;
  tickerB: string;
  tag: string;
}

export const RIVALRY_PRESETS: RivalryPreset[] = [
  { label: "BBCA vs BBRI", tickerA: "BBCA", tickerB: "BBRI", tag: "Bank Swasta vs BUMN" },
  { label: "BMRI vs BBNI", tickerA: "BMRI", tickerB: "BBNI", tag: "Duo Bank BUMN" },
  { label: "TLKM vs ISAT", tickerA: "TLKM", tickerB: "ISAT", tag: "Duopoli Telko" },
  { label: "ASII vs UNTR", tickerA: "ASII", tickerB: "UNTR", tag: "Otomotif vs Alat Berat" },
  { label: "ADRO vs PTBA", tickerA: "ADRO", tickerB: "PTBA", tag: "Batu Bara Swasta vs BUMN" },
  { label: "ICBP vs INDF", tickerA: "ICBP", tickerB: "INDF", tag: "Grup Indofood" },
  { label: "KLBF vs SIDO", tickerA: "KLBF", tickerB: "SIDO", tag: "Farmasi vs Jamu Herbal" },
  { label: "GOTO vs BUKA", tickerA: "GOTO", tickerB: "BUKA", tag: "Ekosistem Digital" },
  { label: "PGAS vs PGEO", tickerA: "PGAS", tickerB: "PGEO", tag: "Gas Bumi vs Geothermal" },
  { label: "AMMN vs ANTM", tickerA: "AMMN", tickerB: "ANTM", tag: "Tembaga vs Emas Nikel" },
];

export interface StockSelectorCardProps {
  label: string;
  period: string;
  dataSource: string;
  variant: "emerald" | "blue";
  selectedStock: StockFundamental;
  disabledTicker: string;
  stocks: StockFundamental[];
  onSelect: (stock: StockFundamental) => void;
}

export const StockSelectorCard: React.FC<StockSelectorCardProps> = ({
  label,
  period,
  dataSource,
  variant,
  selectedStock,
  disabledTicker,
  stocks,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredStocks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return stocks;
    return stocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
    );
  }, [stocks, searchQuery]);

  const borderColor =
    variant === "emerald"
      ? "border-emerald-500/40 dark:border-emerald-500/30"
      : "border-blue-500/40 dark:border-blue-500/30";

  const labelColor =
    variant === "emerald"
      ? "text-emerald-700 dark:text-emerald-400"
      : "text-blue-700 dark:text-blue-400";

  return (
    <div
      ref={dropdownRef}
      className={`relative rounded-xl sm:rounded-2xl border ${borderColor} bg-white p-3 sm:p-4 shadow-2xs dark:bg-zinc-900 transition-all`}
    >
      {/* Top Header Card */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <span className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider ${labelColor}`}>
          {label}
        </span>
        <span className="text-[9.5px] sm:text-[10px] text-zinc-400 font-mono">
          {period} • {dataSource}
        </span>
      </div>

      {/* Trigger Button Pembuka Dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left group flex items-center sm:items-start gap-2.5 rounded-xl p-1.5 -m-1.5 sm:p-2 sm:-m-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
      >
        <Avatar ticker={selectedStock.ticker} sector={selectedStock.sector} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold font-sans text-zinc-950 dark:text-zinc-50 tracking-tight">
              {selectedStock.ticker}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 sm:bg-transparent sm:dark:bg-transparent sm:p-0 text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-300 sm:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors shrink-0">
              <span>Ganti</span>
              <span className="hidden sm:inline">Saham</span>
              <ChevronDown
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Nama Lengkap Emiten */}
          <div className="text-[11.5px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug mt-0.5 break-words">
            {selectedStock.name}
          </div>

          <div className="mt-1 flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] text-zinc-500 flex-wrap">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {selectedStock.sector}
            </span>
            <span>•</span>
            <span className="font-mono">
              Rp {selectedStock.pricePerShare ? selectedStock.pricePerShare.toLocaleString("id-ID") : "-"} / lbr
            </span>
            <span>•</span>
            <span className="font-mono text-zinc-400">
              {selectedStock.marketCapLabel}
            </span>
          </div>
        </div>
      </button>

      {/* Dropdown Popover Custom (Seluruh Nama Emiten Ditampilkan Lengkap 100%) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700/80 dark:bg-[#181a24] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Kolom Pencarian Cepat di Dalam Dropdown */}
          <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari kode atau nama emiten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* List Emiten dengan Nama Lengkap Utuh */}
          <div className="max-h-72 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80 p-1">
            {filteredStocks.map((stock) => {
              const isCurrent = stock.ticker === selectedStock.ticker;
              const isDisabled = stock.ticker === disabledTicker;

              return (
                <button
                  key={stock.ticker}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onSelect(stock);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-emerald-500/10 text-emerald-950 dark:bg-emerald-500/15 dark:text-emerald-100"
                      : isDisabled
                      ? "opacity-40 cursor-not-allowed bg-zinc-50/50 dark:bg-zinc-900/40"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  <Avatar ticker={stock.ticker} sector={stock.sector} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs font-sans text-zinc-950 dark:text-zinc-50">
                          {stock.ticker}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          ({stock.sector})
                        </span>
                      </div>
                      {isCurrent && (
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isDisabled && (
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Dipilih
                        </span>
                      )}
                    </div>

                    {/* Nama Perusahaan Utuh Tanpa Dipotong */}
                    <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug mt-0.5 break-words font-medium">
                      {stock.name}
                    </p>

                    <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                      Rp {stock.pricePerShare ? stock.pricePerShare.toLocaleString("id-ID") : "-"} / lbr • {stock.marketCapLabel}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredStocks.length === 0 && (
              <div className="p-4 text-center text-xs text-zinc-400">
                Tidak ada emiten yang cocok dengan pencarian.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
