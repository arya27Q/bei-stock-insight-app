"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { MarketOverviewRow } from "@/components/modules/MarketOverviewRow";
import { SectorBenchmark } from "@/components/modules/SectorBenchmark";

export default function BenchmarkPage() {
  const { stocks, selectedMetric, selectStock, benchmarkSector } = useDashboard();

  return (
    <div className="space-y-6">
      <MarketOverviewRow stocks={stocks} selectedMetric={selectedMetric} />
      <SectorBenchmark
        stocks={stocks}
        onSelectStock={selectStock}
        initialSector={benchmarkSector}
      />
    </div>
  );
}
