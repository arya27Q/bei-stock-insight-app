"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { MarketOverviewRow } from "@/components/modules/MarketOverviewRow";
import { StockMap } from "@/components/modules/StockMap";

export default function MarketMapPage() {
  const {
    stocks,
    selectedMetric,
    setSelectedMetric,
    selectedStock,
    selectStock,
  } = useDashboard();

  return (
    <div className="space-y-6">
      <MarketOverviewRow stocks={stocks} selectedMetric={selectedMetric} />
      <StockMap
        stocks={stocks}
        selectedMetric={selectedMetric}
        onSelectMetric={setSelectedMetric}
        selectedTicker={selectedStock?.ticker}
        onSelectStock={selectStock}
      />
    </div>
  );
}
