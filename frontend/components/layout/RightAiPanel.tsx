"use client";

import React, { useEffect } from "react";
import { X, MessageSquare, ArrowLeft } from "lucide-react";
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
        className="fixed inset-y-0 right-0 z-40 flex w-full sm:w-[360px] 2xl:w-[400px] flex-col justify-between border-l border-zinc-200 bg-white p-4 sm:p-5 shadow-xl dark:border-zinc-800/80 dark:bg-[#16171f] overflow-y-auto"
        aria-label="Panel Analis AI dan Detail Emiten"
      >
        <div>
          {/* Top Panel Navigation Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              {stock ? (
                <button
                  onClick={onClearStock}
                  className="flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Mode Asisten Umum</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs">
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                      Asisten Analis AI BEI
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-medium">Kecerdasan Riset Fundamental</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded bg-[rgba(20,130,102,0.15)] px-2 py-0.5 text-[10px] font-bold text-[rgba(38,166,134,0.95)] border border-[rgba(52,184,150,0.3)]">
                Online
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
