"use client";

import React from "react";
import { Layers } from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { StatTile } from "../ui/StatTile";

interface MarketOverviewRowProps {
  stocks: StockFundamental[];
}

export const MarketOverviewRow: React.FC<MarketOverviewRowProps> = ({ stocks }) => {
  const avgRevGrowth =
    stocks.length > 0
      ? (stocks.reduce((acc, s) => acc + s.revenueGrowth, 0) / stocks.length).toFixed(1)
      : "5.2";

  const avgRoe =
    stocks.length > 0
      ? (stocks.reduce((acc, s) => acc + s.roe, 0) / stocks.length).toFixed(1)
      : "20.9";

  return (
    <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-4 mb-5">
      {/* Grid 1: Overview Pertumbuhan & Efisiensi Pasar BEI */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#16171f] flex items-center justify-between gap-4">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-zinc-100 dark:text-zinc-800"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(38, 166, 134, 0.9)"
              strokeWidth="8"
              strokeDasharray="140 251.2"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(217, 140, 45, 0.88)"
              strokeWidth="8"
              strokeDasharray="55 251.2"
              strokeDashoffset="-150"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-bold text-zinc-950 dark:text-white tabular-nums leading-none">
              +{avgRevGrowth}%
            </span>
            <span className="text-[10px] text-zinc-400 mt-1">Rata-rata YoY</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-2 min-w-0">
          <StatTile
            label="Perbankan"
            value="22.1% ROE"
            subValue="+12.8% YoY"
            subValueVariant="emerald"
          />
          <StatTile
            label="Konsumsi"
            value="18.2% ROE"
            subValue="+8.4% YoY"
            subValueVariant="amber"
          />
          <StatTile
            label="Rata-rata ROE"
            value={`${avgRoe}%`}
            subValue="Kuartal III"
            subValueVariant="emerald"
          />
        </div>
      </div>

      {/* Grid 2: Cakupan Sektor & Kapitalisasi Emiten BEI */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800/80 dark:bg-[#16171f] flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-2xl bg-[rgba(20,130,102,0.88)] border border-[rgba(52,184,150,0.3)] p-3 text-white text-center">
          <Layers className="h-5 w-5 mb-1 text-white" aria-hidden="true" />
          <span className="block text-sm font-bold tabular-nums leading-tight">3.567 T</span>
          <span className="block text-[10px] text-white/90 mt-0.5">Market Cap</span>
        </div>

        <div className="flex-1 grid grid-cols-1 @sm:grid-cols-3 gap-2.5 min-w-0">
          <div className="rounded-xl bg-zinc-50 dark:bg-[#0d0e13] p-2.5 border border-zinc-100 dark:border-zinc-800/70">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[rgba(38,166,134,0.95)] shrink-0" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                Keuangan
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">4 Bank Utama</p>
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-[#0d0e13] p-2.5 border border-zinc-100 dark:border-zinc-800/70">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                Konsumsi
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">2 Emiten Primer</p>
          </div>

          <div className="rounded-xl bg-zinc-50 dark:bg-[#0d0e13] p-2.5 border border-zinc-100 dark:border-zinc-800/70">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500 shrink-0" />
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                Sektor Riil
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1 truncate">3 Infra & Energi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
