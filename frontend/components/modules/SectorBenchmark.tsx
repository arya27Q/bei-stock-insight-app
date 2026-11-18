"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { StockFundamental, MetricType } from "../../types/stock";
import { getMedianValue } from "../../services/stock-service";
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
  const [activeMetric, setActiveMetric] = useState<MetricType>("roe");

  const sectorStocks = stocks.filter((s) => s.sector === selectedSector);

  const sectorMedian =
    sectorStocks.length > 0
      ? getMedianValue(sectorStocks.map((s) => s[activeMetric]))
      : 0;

  const sectorAverage =
    sectorStocks.length > 0
      ? Number(
          (
            sectorStocks.reduce((acc, curr) => acc + curr[activeMetric], 0) /
            sectorStocks.length
          ).toFixed(1)
        )
      : 0;

  const getMetricLabel = () => {
    if (activeMetric === "revenueGrowth") return "Pertumbuhan Pendapatan (YoY %)";
    if (activeMetric === "netIncomeGrowth") return "Pertumbuhan Laba Bersih (YoY %)";
    if (activeMetric === "roe") return "Kemampuan Menghasilkan Laba (ROE %)";
    return "Valuasi Harga terhadap Laba (PER x)";
  };

  // Kalimat pembanding eksplisit terhadap median sektor untuk setiap emiten
  const getComparisonExplanation = (stock: StockFundamental) => {
    const val = stock[activeMetric];
    const diff = Number((val - sectorMedian).toFixed(1));
    const absDiff = Math.abs(diff).toFixed(1);

    if (sectorStocks.length <= 1) {
      return `${stock.ticker} adalah emiten utama perwakilan sektor ${selectedSector} pada dataset ini (nilai indikator: ${val}${activeMetric === "per" ? "x" : "%"}).`;
    }

    if (activeMetric === "roe") {
      if (diff === 0) {
        return `ROE ${stock.ticker} (${val}%) berada tepat pada median sektor ${selectedSector} (${sectorMedian}%).`;
      }
      return `ROE ${stock.ticker} berada ${absDiff} poin persentase ${
        diff > 0 ? "di atas" : "di bawah"
      } median sektor ${selectedSector} (${sectorMedian}%).`;
    }

    if (activeMetric === "revenueGrowth" || activeMetric === "netIncomeGrowth") {
      const metricName =
        activeMetric === "revenueGrowth" ? "Pertumbuhan pendapatan" : "Pertumbuhan laba bersih";
      if (diff === 0) {
        return `${metricName} ${stock.ticker} berada tepat pada median sektor ${selectedSector} (${sectorMedian}%).`;
      }
      return `${metricName} ${stock.ticker} berada ${absDiff} poin persentase ${
        diff > 0 ? "di atas" : "di bawah"
      } median sektor ${selectedSector} (${sectorMedian > 0 ? `+${sectorMedian}` : sectorMedian}%).`;
    }

    // Valuasi Harga terhadap Laba (PER)
    if (diff === 0) {
      return `PER ${stock.ticker} (${val}x) setara dengan median sektor ${selectedSector} (${sectorMedian}x).`;
    }
    return `PER ${stock.ticker} (${val}x) berada ${absDiff}x ${
      diff > 0 ? "di atas" : "di bawah"
    } median sektor ${selectedSector} (${sectorMedian}x). Bandingkan bersama pertumbuhan labanya (${
      stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}` : stock.netIncomeGrowth
    }%).`;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Sector & Metric Selector Header */}
      <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-3 sm:p-5 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-3 sm:gap-4 @2xl:flex-row @2xl:items-center @2xl:justify-between">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1.5 sm:mb-2">
              Pilih Sektor untuk Dibandingkan:
            </span>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setSelectedSector(sec)}
                  className={`rounded-lg sm:rounded-xl px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-sm font-semibold transition-colors cursor-pointer ${
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
          <div className="w-full overflow-x-auto sm:w-auto sm:overflow-visible self-start sm:self-auto">
            <SegmentedControl
              options={[
                { id: "roe", label: "ROE (%)" },
                { id: "revenueGrowth", label: "Pendapatan (%)" },
                { id: "netIncomeGrowth", label: "Laba Bersih (%)" },
                { id: "per", label: "Valuasi PER (x)" },
              ]}
              value={activeMetric}
              onChange={(val) => setActiveMetric(val as MetricType)}
            />
          </div>
        </div>
      </div>

      {/* Sector Summary Box */}
      <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-3.5 sm:p-6 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h3 className="text-sm sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Perbandingan Fundamental Sektor {selectedSector}
            </h3>
            <span className="text-[11px] sm:text-sm text-zinc-500 font-medium mt-0.5 block">
              Indikator acuan: <strong className="text-zinc-800 dark:text-zinc-200">{getMetricLabel()}</strong> • Laporan Q3 2024
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none rounded-xl bg-emerald-500/10 border border-emerald-500/25 px-3 sm:px-4 py-1.5 sm:py-2 text-left sm:text-right">
              <span className="text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 block font-semibold">
                Median Sektor
              </span>
              <span className="text-sm sm:text-base font-mono font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                {sectorMedian}
                {activeMetric === "per" ? "x" : "%"}
              </span>
            </div>

            <div className="flex-1 sm:flex-none rounded-xl bg-zinc-50 border border-zinc-200 px-3 sm:px-3.5 py-1.5 sm:py-2 text-left sm:text-right dark:bg-zinc-800/80 dark:border-zinc-700">
              <span className="text-[10px] sm:text-[11px] text-zinc-500 block font-medium">Rata-rata Sektor</span>
              <span className="text-sm font-mono font-semibold text-zinc-700 dark:text-zinc-300 tabular-nums">
                {sectorAverage}
                {activeMetric === "per" ? "x" : "%"}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Comparison Bars + Kalimat Penjelasan Eksplisit */}
        <div className="mt-5 space-y-3.5">
          {sectorStocks.map((stock) => {
            const val = stock[activeMetric];
            const maxVal = Math.max(...sectorStocks.map((s) => Math.abs(s[activeMetric])), 30);
            const percentageWidth = Math.max(8, Math.min(100, (Math.abs(val) / maxVal) * 100));
            const medianWidth = Math.max(8, Math.min(100, (Math.abs(sectorMedian) / maxVal) * 100));
            const isPositive = val >= 0;
            const isAboveMedian = val >= sectorMedian;

            return (
              <button
                type="button"
                key={stock.ticker}
                onClick={() => onSelectStock(stock)}
                className="w-full text-left group p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-zinc-100 hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar ticker={stock.ticker} sector={stock.sector} size="sm" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-base font-bold text-zinc-950 dark:text-zinc-100">
                          {stock.ticker}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                            activeMetric === "per"
                              ? val <= sectorMedian
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                              : isAboveMedian
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          }`}
                        >
                          {activeMetric === "per"
                            ? val <= sectorMedian
                              ? "≤ Median Sektor"
                              : "> Median Sektor"
                            : isAboveMedian
                            ? "≥ Median Sektor"
                            : "< Median Sektor"}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-zinc-500 font-medium leading-snug block">
                        {stock.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-sans text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                      {isPositive && activeMetric !== "per" ? `+${val}` : val}
                      {activeMetric === "per" ? "x" : "%"}
                    </span>
                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </div>

                {/* Accessible Bar with Median Marker */}
                <div className="relative h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                  <div
                    style={{ width: `${percentageWidth}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      isPositive
                        ? "bg-[rgba(20,130,102,0.88)]"
                        : "bg-[rgba(150,52,68,0.88)]"
                    }`}
                  />
                  {sectorStocks.length > 1 && (
                    <div
                      style={{ left: `${medianWidth}%` }}
                      title={`Garis Median Sektor: ${sectorMedian}${activeMetric === "per" ? "x" : "%"}`}
                      className="absolute top-0 bottom-0 w-0.5 bg-zinc-950 dark:bg-white opacity-70"
                    />
                  )}
                </div>

                {/* Kalimat Penjelasan Pembanding terhadap Median Sektor */}
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {getComparisonExplanation(stock)}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
