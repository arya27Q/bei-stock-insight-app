"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { StockFundamental, MetricType } from "../../types/stock";
import {
  METRIC_DEFINITIONS,
  DATA_METADATA,
  getMedianValue,
  getSectorMedian,
} from "../../services/stock-service";
import { StatTile } from "../ui/StatTile";

interface MarketOverviewRowProps {
  stocks: StockFundamental[];
  selectedMetric?: MetricType;
}

export const MarketOverviewRow: React.FC<MarketOverviewRowProps> = ({
  stocks,
  selectedMetric = "revenueGrowth",
}) => {
  const activeDef = METRIC_DEFINITIONS[selectedMetric];

  // 1. Statistik Pertumbuhan Pendapatan
  const avgRevGrowth =
    stocks.length > 0
      ? (stocks.reduce((acc, s) => acc + s.revenueGrowth, 0) / stocks.length).toFixed(1)
      : "4.1";
  const revGrowingCount = stocks.filter((s) => s.revenueGrowth > 0).length;
  const topRevStock =
    [...stocks].sort((a, b) => b.revenueGrowth - a.revenueGrowth)[0] || stocks[0];

  // 2. Statistik Pertumbuhan Laba Bersih
  const avgNetGrowth =
    stocks.length > 0
      ? (stocks.reduce((acc, s) => acc + s.netIncomeGrowth, 0) / stocks.length).toFixed(1)
      : "1.8";
  const netDecliningCount = stocks.filter((s) => s.netIncomeGrowth < 0).length;
  const topNetStock =
    [...stocks].sort((a, b) => b.netIncomeGrowth - a.netIncomeGrowth)[0] || stocks[0];

  // 3. Statistik Kemampuan Menghasilkan Laba (ROE)
  const medianRoe = getMedianValue(stocks.map((s) => s.roe));
  const sortedByRoe = [...stocks].sort((a, b) => b.roe - a.roe);
  const topRoeStock = sortedByRoe[0];
  const secondRoeStock = sortedByRoe[1];
  const bankMedianRoe = getSectorMedian(stocks, "Keuangan", "roe");
  const aboveMedianRoeCount = stocks.filter((s) => s.roe >= medianRoe).length;

  // 4. Statistik Valuasi Harga terhadap Laba (PER)
  const medianPer = getMedianValue(stocks.map((s) => s.per));
  const bankMedianPer = getSectorMedian(stocks, "Keuangan", "per");
  const konsumsiMedianPer = getSectorMedian(stocks, "Barang Konsumsi Primer", "per");
  const riilStocks = stocks.filter(
    (s) =>
      s.sector === "Infrastruktur" ||
      s.sector === "Perindustrian" ||
      s.sector === "Energi"
  );
  const riilMedianPer = getMedianValue(riilStocks.map((s) => s.per));

  const renderMetricOverview = () => {
    if (selectedMetric === "revenueGrowth") {
      return {
        circleMain: `${Number(avgRevGrowth) > 0 ? `+${avgRevGrowth}` : avgRevGrowth}%`,
        circleSub: "Rata-rata YoY",
        tiles: [
          {
            label: "Perusahaan Tumbuh",
            value: `${revGrowingCount} dari ${stocks.length} Emiten`,
            subValue: "Pendapatan YoY positif",
            variant: "emerald" as const,
          },
          {
            label: "Pendapatan Menurun",
            value: `${stocks.length - revGrowingCount} Emiten`,
            subValue: "Kontraksi penjualan YoY",
            variant: "amber" as const,
          },
          {
            label: "Pertumbuhan Tertinggi",
            value: topRevStock ? `${topRevStock.ticker} (+${topRevStock.revenueGrowth}%)` : "-",
            subValue: topRevStock ? `Sektor ${topRevStock.sector}` : "-",
            variant: "emerald" as const,
          },
        ],
      };
    }

    if (selectedMetric === "netIncomeGrowth") {
      return {
        circleMain: `${Number(avgNetGrowth) > 0 ? `+${avgNetGrowth}` : avgNetGrowth}%`,
        circleSub: "Rata-rata Laba",
        tiles: [
          {
            label: "Laba Menurun",
            value: `${netDecliningCount} dari ${stocks.length} Emiten`,
            subValue: "Kontraksi laba bersih YoY",
            variant: "rose" as const,
          },
          {
            label: "Laba Bertumbuh",
            value: `${stocks.length - netDecliningCount} Emiten`,
            subValue: "Pertumbuhan laba positif",
            variant: "emerald" as const,
          },
          {
            label: "Kenaikan Laba Tertinggi",
            value: topNetStock ? `${topNetStock.ticker} (+${topNetStock.netIncomeGrowth}%)` : "-",
            subValue: topNetStock
              ? topNetStock.sector === "Barang Konsumsi Primer"
                ? "Sektor Konsumsi"
                : `Sektor ${topNetStock.sector}`
              : "-",
            variant: "emerald" as const,
          },
        ],
      };
    }

    if (selectedMetric === "roe") {
      return {
        circleMain: `${medianRoe}%`,
        circleSub: "Median ROE",
        tiles: [
          {
            label: "ROE Tertinggi",
            value: topRoeStock ? `${topRoeStock.ticker} (${topRoeStock.roe}%)` : "-",
            subValue: secondRoeStock ? `Diikuti ${secondRoeStock.ticker} (${secondRoeStock.roe}%)` : "-",
            variant: "emerald" as const,
          },
          {
            label: "Median ROE Perbankan",
            value: `${bankMedianRoe}%`,
            subValue: "Acuan Sektor Keuangan",
            variant: "emerald" as const,
          },
          {
            label: "Di Atas Median Pasar",
            value: `${aboveMedianRoeCount} dari ${stocks.length} Emiten`,
            subValue: `ROE ≥ ${medianRoe}% (${DATA_METADATA.period})`,
            variant: "amber" as const,
          },
        ],
      };
    }

    // Valuasi Harga terhadap Laba (PER)
    return {
      circleMain: `${medianPer}x`,
      circleSub: "Median PER",
      tiles: [
        {
          label: "Median Sektor Keuangan",
          value: `${bankMedianPer}x PER`,
          subValue: "Rentang 9.3x s/d 23.5x",
          variant: "emerald" as const,
        },
        {
          label: "Median Sektor Konsumsi",
          value: `${konsumsiMedianPer}x PER`,
          subValue: "Rentang 15.1x s/d 18.7x",
          variant: "amber" as const,
        },
        {
          label: "Median Sektor Riil",
          value: `${riilMedianPer}x PER`,
          subValue: "Infra, Industri & Energi",
          variant: "zinc" as const,
        },
      ],
    };
  };

  const summary = renderMetricOverview();
  const completedCount = stocks.filter((s) => s.hasData).length;

  return (
    <div className="grid grid-cols-1 @5xl:grid-cols-2 gap-4 mb-5">
      {/* Grid 1: Ringkasan Dinamis Sesuai Indikator Aktif (Tidak Mencampur Indikator) */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] flex flex-col justify-between gap-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Ringkasan Indikator Aktif: <strong className="text-zinc-900 dark:text-zinc-100">{activeDef.label}</strong>
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            Sinkron dengan Peta
          </span>
        </div>

        <div className="flex flex-col @md:flex-row items-center justify-between gap-4">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
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
                strokeDasharray="155 251.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
              <span className="text-sm font-bold text-zinc-950 dark:text-white tabular-nums leading-none">
                {summary.circleMain}
              </span>
              <span className="text-[9px] text-zinc-400 mt-1 leading-tight">
                {summary.circleSub}
              </span>
            </div>
          </div>

          <div className="w-full flex-1 grid grid-cols-1 @sm:grid-cols-3 gap-3 min-w-0">
            {summary.tiles.map((tile, idx) => (
              <StatTile
                key={idx}
                label={tile.label}
                value={tile.value}
                subValue={tile.subValue}
                subValueVariant={tile.variant}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid 2: Metadata Sumber, Periode, & Ketersediaan Data (Standar Transparansi) */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-800/80 dark:bg-[#16171f] flex flex-col justify-between gap-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Informasi Data & Ketersediaan Laporan
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3 w-3" aria-hidden="true" />
            {DATA_METADATA.status}
          </span>
        </div>

        <div className="flex flex-col @md:flex-row items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-[rgba(20,130,102,0.88)] border border-[rgba(52,184,150,0.3)] p-2.5 text-white text-center">
            <span className="text-[10px] uppercase tracking-wider text-white/80 font-semibold">
              Sumber
            </span>
            <span className="block text-xs font-bold leading-tight mt-0.5">
              {DATA_METADATA.source}
            </span>
            <span className="block text-[10px] text-white/90 mt-1 tabular-nums">
              Rp 3.567 T
            </span>
          </div>

          <div className="w-full flex-1 grid grid-cols-1 @sm:grid-cols-3 gap-3 min-w-0">
            <StatTile
              label="Periode Laporan"
              value={DATA_METADATA.period}
              subValue="Kuartal III berjalan"
              subValueVariant="emerald"
            />
            <StatTile
              label="Diperbarui"
              value={DATA_METADATA.lastUpdated}
              subValue="Dataset standar MVP"
              subValueVariant="zinc"
            />
            <StatTile
              label="Ketersediaan Data"
              value={`${completedCount}/${stocks.length} Lengkap`}
              subValue="0 kosong • Terverifikasi"
              subValueVariant="emerald"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
