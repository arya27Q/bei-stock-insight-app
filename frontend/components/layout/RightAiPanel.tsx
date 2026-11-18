"use client";

import React, { useEffect, useState } from "react";
import { X, MessageSquare, History } from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { GeneralAiView } from "../modules/GeneralAiView";
import { StockDetailView } from "../modules/StockDetailView";
import { ChatHistorySidebar } from "../modules/ChatHistorySidebar";

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
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [sessionResetKey, setSessionResetKey] = useState(0);

  // Escape key handler (R-26 & R-32)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isHistoryOpen) {
          setIsHistoryOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isHistoryOpen, onClose]);

  if (!isOpen) return null;

  const activeTicker = stock ? stock.ticker : "MARKET";

  const handleSelectSession = (ticker: string) => {
    if (ticker === "MARKET") {
      onClearStock();
      return;
    }
    const found = stocks.find((s) => s.ticker.toUpperCase() === ticker.toUpperCase());
    if (found) {
      onSelectStock(found);
    }
  };

  const handleSessionDeleted = (deletedTicker: string) => {
    if (deletedTicker.toUpperCase() === activeTicker.toUpperCase()) {
      setSessionResetKey((prev) => prev + 1);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs lg:hidden"
        onClick={onClose}
      />

      <aside
        className="fixed inset-y-0 right-0 z-40 flex w-full sm:w-[480px] lg:w-[490px] xl:w-[540px] 2xl:w-[580px] flex-col justify-between border-l border-zinc-200 bg-white p-3 sm:p-5 shadow-xl dark:border-zinc-800/80 dark:bg-[#16171f] overflow-y-auto"
        aria-label="Panel Analis AI dan Detail Emiten"
      >
        {/* Sidebar Drawer Riwayat Chat AI (Slide-over di dalam Panel AI) */}
        {isHistoryOpen && (
          <div className="fixed inset-y-0 right-0 z-50 flex w-full sm:w-[480px] lg:w-[490px] xl:w-[540px] 2xl:w-[580px]">
            <div className="relative z-10 h-full">
              <ChatHistorySidebar
                activeTicker={activeTicker}
                stocks={stocks}
                onSelectSession={handleSelectSession}
                onSessionDeleted={handleSessionDeleted}
                onClose={() => setIsHistoryOpen(false)}
                mode="drawer"
              />
            </div>
            <div
              className="flex-1 bg-black/35 backdrop-blur-2xs cursor-pointer"
              onClick={() => setIsHistoryOpen(false)}
              aria-hidden="true"
            />
          </div>
        )}

        <div>
          {/* Top Panel Navigation Bar */}
          <div className="pb-3 sm:pb-3.5 border-b border-zinc-200 dark:border-zinc-800 space-y-2 sm:space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50 leading-snug truncate">
                    {stock ? `Profil & AI Insight (${stock.ticker})` : "Asisten Pasar BEI"}
                  </h2>
                  <span className="text-[10px] text-zinc-500 font-medium block leading-snug">
                    Sumber: BEI / IDX • Laporan Q3 2024
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsHistoryOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-500/20 dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25 transition-colors cursor-pointer"
                  title="Buka Sidebar Riwayat Chat AI"
                  aria-label="Buka Sidebar Riwayat Chat AI"
                >
                  <History className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Riwayat</span>
                </button>

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
              key={`general-${sessionResetKey}`}
              stocks={stocks}
              onSelectStock={onSelectStock}
              onOpenHistory={() => setIsHistoryOpen(true)}
            />
          )}

          {/* VIEW B: Specific Stock Selected (Detailed Company Profile & AI) */}
          {stock && (
            <StockDetailView
              key={`${stock.ticker}-${sessionResetKey}`}
              stock={stock}
              onNavigateToBenchmark={onNavigateToBenchmark}
              onOpenHistory={() => setIsHistoryOpen(true)}
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
