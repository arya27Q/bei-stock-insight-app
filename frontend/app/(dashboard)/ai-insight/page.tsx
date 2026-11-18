"use client";

import React, { useState } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { MarketOverviewRow } from "@/components/modules/MarketOverviewRow";
import { GeneralAiView } from "@/components/modules/GeneralAiView";
import { StockDetailView } from "@/components/modules/StockDetailView";
import { ChatHistorySidebar } from "@/components/modules/ChatHistorySidebar";
import { Sparkles, History, X } from "lucide-react";

export default function AiInsightPage() {
  const { stocks, selectedMetric, selectStock, navigateToBenchmark } = useDashboard();
  const [activeTicker, setActiveTicker] = useState<string>("MARKET");
  const [showMobileHistory, setShowMobileHistory] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const activeStock =
    activeTicker !== "MARKET"
      ? stocks.find((s) => s.ticker.toUpperCase() === activeTicker.toUpperCase()) || null
      : null;

  const handleSelectSession = (ticker: string) => {
    setActiveTicker(ticker.toUpperCase());
    setShowMobileHistory(false);
  };

  const handleSessionDeleted = (deletedTicker: string) => {
    if (deletedTicker.toUpperCase() === activeTicker.toUpperCase()) {
      setResetKey((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <MarketOverviewRow stocks={stocks} selectedMetric={selectedMetric} />

      <div className="rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800/80 dark:bg-[#16171f] space-y-5">
        {/* Header Halaman AI Insight */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
                Pusat Analisis & Riset AI Fundamental BEI
              </h1>
              <p className="text-xs text-zinc-400">
                {activeStock
                  ? `Menampilkan sesi riset & percakapan untuk ${activeStock.ticker} (${activeStock.name})`
                  : "Konsultasikan komparasi emiten, rasio ROE/PER, dan ringkasan kinerja finansial berbasis data terverifikasi."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowMobileHistory((prev) => !prev)}
            className="inline-flex lg:hidden items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#1e2029] dark:text-zinc-200 cursor-pointer"
          >
            {showMobileHistory ? (
              <>
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Tutup Riwayat</span>
              </>
            ) : (
              <>
                <History className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Riwayat Chat</span>
              </>
            )}
          </button>
        </div>

        {/* Layout 2 Kolom: Sidebar Riwayat Chat (Kiri) + Ruang Chat Utama (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[310px_1fr] gap-5 items-start">
          {/* Sidebar Riwayat Chat */}
          <div className={`${showMobileHistory ? "block" : "hidden"} lg:block lg:sticky lg:top-0 h-[560px] lg:h-[680px]`}>
            <ChatHistorySidebar
              activeTicker={activeTicker}
              stocks={stocks}
              onSelectSession={handleSelectSession}
              onSessionDeleted={handleSessionDeleted}
              mode="sidebar"
            />
          </div>

          {/* Konten Chat Utama */}
          <div className="min-w-0">
            {activeStock ? (
              <StockDetailView
                key={`${activeStock.ticker}-${resetKey}`}
                stock={activeStock}
                onNavigateToBenchmark={navigateToBenchmark}
              />
            ) : (
              <GeneralAiView
                key={`market-${resetKey}`}
                stocks={stocks}
                onSelectStock={(s) => {
                  setActiveTicker(s.ticker);
                  selectStock(s);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
