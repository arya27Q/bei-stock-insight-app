"use client";

import React from "react";
import { useDashboard } from "@/context/DashboardContext";
import { MarketOverviewRow } from "@/components/modules/MarketOverviewRow";
import { GeneralAiView } from "@/components/modules/GeneralAiView";
import { Sparkles } from "lucide-react";

export default function AiInsightPage() {
  const { stocks, selectedMetric, selectStock } = useDashboard();

  return (
    <div className="space-y-6">
      <MarketOverviewRow stocks={stocks} selectedMetric={selectedMetric} />
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-7 shadow-xs dark:border-zinc-800/80 dark:bg-[#16171f] space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
              Pusat Analisis & Riset AI Fundamental BEI
            </h1>
            <p className="text-xs text-zinc-400">
              Konsultasikan komparasi emiten, rasio ROE/PER, dan ringkasan kinerja finansial berbasis data terverifikasi.
            </p>
          </div>
        </div>
        <GeneralAiView stocks={stocks} onSelectStock={selectStock} />
      </div>
    </div>
  );
}
