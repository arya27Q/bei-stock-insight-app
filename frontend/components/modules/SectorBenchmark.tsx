"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { SegmentedControl } from "../ui/SegmentedControl";
import { Avatar } from "../ui/Avatar";

interface SectorBenchmarkProps {
  stocks: StockFundamental[];
  onSelectStock: (stock: StockFundamental) => void;
  initialSector?: string;
}

export const SectorBenchmark: React.FC<SectorBenchmarkProps> = ({
  stocks,
  onSelectStock,
  initialSector,
}) => {
  const sectors = Array.from(new Set(stocks.map((s) => s.sector)));
  const [selectedSector, setSelectedSector] = useState<string>(
    initialSector && sectors.includes(initialSector) ? initialSector : sectors[0] || "Keuangan"
  );
  const [activeMetric, setActiveMetric] = useState<"revenueGrowth" | "roe" | "per">("roe");

  const sectorStocks = stocks.filter((s) => s.sector === selectedSector);

  const sectorAverage = sectorStocks.length > 0
    ? (sectorStocks.reduce((acc, curr) => acc + curr[activeMetric], 0) / sectorStocks.length).toFixed(1)
    : "0";

  const getMetricLabel = () => {
    if (activeMetric === "revenueGrowth") return "Pertumbuhan Pendapatan (%)";
    if (activeMetric === "roe") return "Efisiensi Cetak Laba (ROE %)";
    return "Tingkat Valuasi Harga (PER x)";
  };

  return (
    <div className="space-y-6">
      {/* Sector & Metric Selector Header */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-4 @2xl:flex-row @2xl:items-center @2xl:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2">
              Pilih Sektor untuk Dibandingkan:
            </span>
            <div className="flex flex-wrap gap-2">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                    selectedSector === sec
                      ? "bg-zinc-950 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950"
                      : "bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Selector Segmented Control */}
          <div className="self-start sm:self-auto">
            <SegmentedControl
              options={[
                { id: "roe", label: "ROE (%)" },
                { id: "revenueGrowth", label: "Pendapatan (%)" },
                { id: "per", label: "Valuasi PER" },
              ]}
              value={activeMetric}
              onChange={(val) => setActiveMetric(val as "revenueGrowth" | "roe" | "per")}
            />
          </div>
        </div>
      </div>

      {/* Sector Summary Box */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Perbandingan Fundamental Sektor {selectedSector}
            </h3>
            <span className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5 block">
              Indikator acuan: <strong className="text-zinc-800 dark:text-zinc-200">{getMetricLabel()}</strong>
            </span>
          </div>
          <div className="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-2 text-right dark:bg-zinc-800/80 dark:border-zinc-700">
            <span className="text-xs text-zinc-500 block font-medium">Rata-rata Sektor</span>
            <span className="text-base font-mono font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
              {sectorAverage} {activeMetric === "per" ? "x" : "%"}
            </span>
          </div>
        </div>

        {/* Visual Comparison Bars */}
        <div className="mt-5 space-y-3">
          {sectorStocks.map((stock) => {
            const val = stock[activeMetric];
            const maxVal = Math.max(...sectorStocks.map((s) => s[activeMetric]), 30);
            const percentageWidth = Math.max(8, Math.min(100, (Math.abs(val) / maxVal) * 100));
            const isPositive = val >= 0;

            return (
              <div
                key={stock.ticker}
                onClick={() => onSelectStock(stock)}
                className="group p-3.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-zinc-100 hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar ticker={stock.ticker} sector={stock.sector} size="sm" />
                    <div>
                      <span className="font-sans text-base font-bold text-zinc-950 dark:text-zinc-100">
                        {stock.ticker}
                      </span>
                      <span className="text-xs sm:text-sm text-zinc-500 font-medium line-clamp-1">
                        {stock.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                      {isPositive && (activeMetric !== "per") ? `+${val}` : val}
                      {activeMetric === "per" ? "x" : "%"}
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </div>

                {/* Accessible Bar with Clean RGBA Colors */}
                <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                  <div
                    style={{ width: `${percentageWidth}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      isPositive
                        ? "bg-[rgba(20,130,102,0.88)]"
                        : "bg-[rgba(150,52,68,0.88)]"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
