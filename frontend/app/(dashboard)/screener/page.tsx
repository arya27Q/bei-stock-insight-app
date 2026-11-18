"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { MarketOverviewRow } from "@/components/modules/MarketOverviewRow";
import { StockScreener } from "@/components/modules/StockScreener";

export default function ScreenerPage() {
  const { stocks, selectedMetric, selectStock } = useDashboard();

  return (
    <div className="space-y-3 sm:space-y-6">
      <MarketOverviewRow stocks={stocks} selectedMetric={selectedMetric} />
      <StockScreener stocks={stocks} onSelectStock={selectStock} />
    </div>
  );
}
