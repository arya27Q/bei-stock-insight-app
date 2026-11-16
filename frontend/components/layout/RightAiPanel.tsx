"use client";

import React, { useEffect } from "react";
import { X, MessageSquare } from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { GeneralAiView } from "../modules/GeneralAiView";
import { StockDetailView } from "../modules/StockDetailView";

export interface RightAiPanelProps {
  stock: StockFundamental | null;
  isOpen: boolean;
  onClose: () => void;
  onClearStock: () => void;
  onSelectStock: (stock: StockFundamental) => void;
  onNavigateToBenchmark?: (sector: string) => void;
  stocks: StockFundamental[];
}

export const RightAiPanel: React.FC<RightAiPanelProps> = ({
  stock,
  isOpen,
  onClose,
  onClearStock,
  onSelectStock,
  onNavigateToBenchmark,
  stocks,
}) => {
  // Escape key handler (R-26 & R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs lg:hidden"
        onClick={onClose}
      />

      <aside
        className="fixed inset-y-0 right-0 z-40 flex w-full sm:w-[410px] xl:w-[440px] 2xl:w-[470px] flex-col justify-between border-l border-zinc-200 bg-white p-4 sm:p-5 shadow-xl dark:border-zinc-800/80 dark:bg-[#16171f] overflow-y-auto"
        aria-label="Panel Analis AI dan Detail Emiten"
      >
        <div>
          {/* Top Panel Navigation Bar: Prioritaskan Penjelasan Emiten (Utama), Asisten Umum sebagai Mode Tambahan */}
          <div className="pb-3.5 border-b border-zinc-200 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50 leading-snug">
                    {stock ? `Profil & AI Insight (${stock.ticker})` : "Asisten Pasar BEI"}
                  </h2>
                  <span className="text-[10px] text-zinc-500 font-medium block leading-snug">
                    Sumber: BEI / IDX • Laporan Q3 2024
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="rounded bg-[rgba(20,130,102,0.15)] px-2 py-0.5 text-[10px] font-bold text-[rgba(38,166,134,0.95)] border border-[rgba(52,184,150,0.3)] whitespace-nowrap">
                  Terverifikasi
                </span>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  aria-label="Tutup Panel AI"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Tab Pemilih Mode: Penjelasan Emiten (Fokus Utama MVP) vs Asisten Umum (Mode Tambahan) */}
            <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-zinc-100 p-1 dark:bg-[#0d0e13] border border-zinc-200/70 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  if (!stock && stocks.length > 0) {
                    onSelectStock(stocks[0]);
                  }
                }}
                className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold transition-colors cursor-pointer text-center leading-snug ${
                  stock
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#1e2029] dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                Penjelasan Emiten {stock ? `(${stock.ticker})` : "(Utama)"}
              </button>
              <button
                type="button"
                onClick={onClearStock}
                className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold transition-colors cursor-pointer text-center leading-snug ${
                  !stock
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#1e2029] dark:text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                Asisten Umum (Tambahan)
              </button>
            </div>
          </div>

          {/* VIEW A: No Stock Selected (General Market AI Assistant) */}
          {!stock && (
            <GeneralAiView
              stocks={stocks}
              onSelectStock={onSelectStock}
            />
          )}

          {/* VIEW B: Specific Stock Selected (Detailed Company Profile & AI) */}
          {stock && (
            <StockDetailView
              key={stock.ticker}
              stock={stock}
              onNavigateToBenchmark={onNavigateToBenchmark}
            />
          )}
        </div>

        {/* Panel Footer */}
        <footer className="mt-6 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[11px] text-zinc-400">
          Data Laporan Keuangan BEI ({stock ? stock.period : "Q3 2024"}). Disajikan untuk kebutuhan edukasi mandiri.
        </footer>
      </aside>
    </>
  );
};
