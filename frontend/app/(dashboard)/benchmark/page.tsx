"use client";

import React, { useState } from "react";
import { ArrowLeftRight, BarChart3 } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";
import { MarketOverviewRow } from "@/components/modules/MarketOverviewRow";
import { SectorBenchmark } from "@/components/modules/SectorBenchmark";
import { StockComparisonView } from "@/components/modules/StockComparisonView";

export default function BenchmarkPage() {
  const { stocks, selectedMetric, selectStock, benchmarkSector } = useDashboard();
  const [activeTab, setActiveTab] = useState<"head-to-head" | "sector">("head-to-head");

  return (
    <div className="@container space-y-4 sm:space-y-6">
      <MarketOverviewRow stocks={stocks} selectedMetric={selectedMetric} />

      {/* Tab Switcher: Komparasi 1 vs 1 vs Benchmark Median Sektor */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("head-to-head")}
            className={`flex items-center gap-1.5 rounded-lg sm:rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "head-to-head"
                ? "bg-zinc-950 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            <ArrowLeftRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>Komparasi Saham (1 vs 1)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sector")}
            className={`flex items-center gap-1.5 rounded-lg sm:rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "sector"
                ? "bg-zinc-950 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            <span>Benchmark Median Sektor</span>
          </button>
        </div>

        <span className="text-[11px] text-zinc-400 hidden @md:block">
          {activeTab === "head-to-head"
            ? "Bandingkan 2 saham langsung berdampingan"
            : "Bandingkan emiten terhadap median sektor"}
        </span>
      </div>

      {/* Konten Tab Aktif */}
      {activeTab === "head-to-head" ? (
        <StockComparisonView
          stocks={stocks}
          onSelectStock={selectStock}
          initialStockA="BBCA"
          initialStockB="BBRI"
        />
      ) : (
        <SectorBenchmark
          stocks={stocks}
          onSelectStock={selectStock}
          initialSector={benchmarkSector}
        />
      )}
    </div>
  );
}
