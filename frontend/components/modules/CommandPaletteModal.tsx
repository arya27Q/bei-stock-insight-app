"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
} from "lucide-react";
import { StockFundamental } from "@/types/stock";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: StockFundamental[];
  onSelectStock: (stock: StockFundamental) => void;
  watchlist?: string[];
}

const SECTOR_PILLS = [
  "Semua",
  "Keuangan",
  "Konsumsi",
  "Infrastruktur",
  "Energi",
  "Kesehatan",
  "Watchlist",
] as const;

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  stocks,
  onSelectStock,
  watchlist = [],
}) => {
  const [query, setQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("Semua");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fokus input otomatis saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setQuery("");
        setSelectedSector("Semua");
        setSelectedIndex(0);
      });
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Filter emiten berdasarkan query teks dan filter sektor
  const filteredStocks = useMemo(() => {
    const q = query.trim().toLowerCase();

    return stocks.filter((stock) => {
      // 1. Filter sektor
      if (selectedSector === "Watchlist") {
        if (!watchlist.includes(stock.ticker)) return false;
      } else if (selectedSector !== "Semua") {
        const sectorNormalized =
          stock.sector === "Barang Konsumsi Primer" ? "Konsumsi" : stock.sector;
        if (!sectorNormalized.toLowerCase().includes(selectedSector.toLowerCase())) {
          return false;
        }
      }

      // 2. Filter query pencarian
      if (!q) return true;

      const tickerMatch = stock.ticker.toLowerCase().includes(q);
      const nameMatch = stock.name.toLowerCase().includes(q);
      const sectorMatch = stock.sector.toLowerCase().includes(q);
      const subSectorMatch = stock.subSector.toLowerCase().includes(q);

      return tickerMatch || nameMatch || sectorMatch || subSectorMatch;
    });
  }, [stocks, query, selectedSector, watchlist]);

  // Indeks aktif aman (clamped) tanpa perlu cascading effect
  const activeIndex = Math.min(selectedIndex, Math.max(0, filteredStocks.length - 1));

  // Navigasi keyboard (ArrowDown, ArrowUp, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredStocks.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : Math.max(0, filteredStocks.length - 1)
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredStocks[activeIndex]) {
          onSelectStock(filteredStocks[activeIndex]);
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredStocks, activeIndex, onSelectStock, onClose]);

  // Scroll otomatis ke item yang sedang aktif
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian Cepat Saham BEI"
      className="no-print fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#16171f] text-zinc-900 dark:text-zinc-100 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 sm:px-5 py-3.5 dark:border-zinc-800">
          <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kode saham, nama emiten, atau sektor (misal: BBCA, Bank, Energi)..."
            className="w-full bg-transparent text-sm sm:text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded-lg p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-500 dark:border-zinc-800 dark:bg-[#1e2029] dark:text-zinc-400">
            Esc
          </kbd>
        </div>

        {/* Filter Pills Kategori / Sektor */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 sm:px-5 py-2.5 border-b border-zinc-100 dark:border-zinc-800/60 no-scrollbar">
          {SECTOR_PILLS.map((pill) => {
            const isActive = selectedSector === pill;
            return (
              <button
                key={pill}
                type="button"
                onClick={() => setSelectedSector(pill)}
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-950 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {pill === "Watchlist" ? `★ ${pill} (${watchlist.length})` : pill}
              </button>
            );
          })}
        </div>

        {/* Hasil Pencarian List Emiten */}
        <div
          ref={listRef}
          className="max-h-[380px] overflow-y-auto p-2 space-y-1 divide-y divide-zinc-100/60 dark:divide-zinc-800/40"
        >
          {filteredStocks.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                Tidak ada emiten yang cocok dengan kata kunci &quot;{query}&quot;
              </p>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 block">
                Coba gunakan kode saham (misal: BBCA, ASII) atau pilih kategori Sektor di atas.
              </span>
            </div>
          ) : (
            filteredStocks.map((stock, idx) => {
              const isSelected = idx === activeIndex;
              const isFav = watchlist.includes(stock.ticker);
              const priceShare = stock.pricePerShare || 1000;
              const priceLot = stock.pricePerLot || priceShare * 100;

              return (
                <div
                  key={stock.ticker}
                  onClick={() => {
                    onSelectStock(stock);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group w-full flex items-center justify-between gap-3 rounded-2xl p-3 transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-emerald-500/10 dark:bg-emerald-500/15"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {/* Kiri: Avatar & Identitas */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar ticker={stock.ticker} sector={stock.sector} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-bold text-zinc-950 dark:text-zinc-50">
                          {stock.ticker}
                        </span>
                        <Badge variant="zinc" size="xs">
                          {stock.sector === "Barang Konsumsi Primer" ? "Konsumsi" : stock.sector}
                        </Badge>
                        {isFav && (
                          <span className="text-[10px] text-amber-500 font-bold" title="Tersimpan di Watchlist">
                            ★
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate block font-medium">
                        {stock.name}
                      </span>
                    </div>
                  </div>

                  {/* Kanan: Rasio & Harga */}
                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <div className="hidden sm:block">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block tabular-nums">
                        ROE {stock.roe}% • PER {stock.per}x
                      </span>
                      <span className="text-[10px] text-zinc-400 block tabular-nums">
                        Cap {stock.marketCapLabel}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block tabular-nums">
                        Rp {priceShare.toLocaleString("id-ID")}
                      </span>
                      <span className="text-[10px] text-zinc-400 block tabular-nums">
                        Rp {priceLot.toLocaleString("id-ID")}/lot
                      </span>
                    </div>

                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        isSelected
                          ? "translate-x-0.5 text-emerald-600 dark:text-emerald-400"
                          : "text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 sm:px-5 py-2.5 text-[11px] text-zinc-500 dark:border-zinc-800 dark:bg-[#111218] dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[9px] dark:border-zinc-700 dark:bg-zinc-800">
                ↑↓
              </kbd>{" "}
              navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[9px] dark:border-zinc-700 dark:bg-zinc-800">
                ↵
              </kbd>{" "}
              buka analisis
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[9px] dark:border-zinc-700 dark:bg-zinc-800">
                esc
              </kbd>{" "}
              tutup
            </span>
          </div>

          <span className="font-medium">
            {filteredStocks.length} dari {stocks.length} emiten
          </span>
        </div>
      </div>
    </div>
  );
};
