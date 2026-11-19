"use client";

import React from "react";
import {
  FileText,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  ArrowRight,
  Sparkles,
  Building2,
  PieChart,
  Coins,
  Bookmark,
  Printer,
} from "lucide-react";
import { StockFundamental, AIInsightPoint } from "../../types/stock";
import { useStockInsight } from "../../hooks/useStockInsight";
import { useDashboard } from "@/context/DashboardContext";
import {
  getHistoricalTrend,
  QUARTER_LABELS,
  DATA_METADATA,
} from "../../services/stock-service";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Sparkline } from "../ui/Sparkline";
import { LotCalculator } from "./LotCalculator";
import { ResearchReportModal } from "./ResearchReportModal";
import { StockMiniChatCard } from "./StockMiniChatCard";

export interface StockDetailViewProps {
  stock: StockFundamental;
  onNavigateToBenchmark?: (sector: string) => void;
  onOpenHistory?: () => void;
}

export const StockDetailView: React.FC<StockDetailViewProps> = ({
  stock,
  onNavigateToBenchmark,
  onOpenHistory,
}) => {
  const {
    insight,
    loadingAi,
    isLoadingHistory,
    stockMessages,
    stockInput,
    setStockInput,
    isStockSending,
    messagesEndRef,
    handleSendStock,
    handleClearHistory,
    showTechnicalDetails,
    setShowTechnicalDetails,
  } = useStockInsight(stock.ticker, stock.name);

  const { isWatchlisted, toggleWatchlist, requireAuth } = useDashboard();
  const watchlisted = isWatchlisted(stock.ticker);

  const [isReportModalOpen, setIsReportModalOpen] = React.useState(false);
  const [profileTab, setProfileTab] = React.useState<"business" | "shareholders" | "valuation">("business");

  const revTrend = getHistoricalTrend(stock, "revenueGrowth");
  const netTrend = getHistoricalTrend(stock, "netIncomeGrowth");
  const roeTrend = getHistoricalTrend(stock, "roe");
  const perTrend = getHistoricalTrend(stock, "per");

  return (
    <div className="mt-4 space-y-5">
      {/* 1. Stock Identity Header & Metadata Sumber Data */}
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3.5 dark:border-zinc-800/90 dark:bg-zinc-900/70 space-y-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar ticker={stock.ticker} sector={stock.sector} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-sans text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-none">
                {stock.ticker}
              </span>
              <Badge variant="zinc" size="xs">
                {stock.sector === "Barang Konsumsi Primer" ? "Konsumsi" : stock.sector}
              </Badge>
              <Badge variant="neutral" size="xs">
                {stock.period}
              </Badge>

              <button
                type="button"
                onClick={() => requireAuth(() => toggleWatchlist(stock.ticker), "Simpan Daftar Pantauan (Watchlist)")}
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold transition-all cursor-pointer ${
                  watchlisted
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                    : "bg-zinc-200/60 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
                title={watchlisted ? "Hapus dari Watchlist" : "Simpan ke Watchlist"}
              >
                <Bookmark className={`h-3 w-3 ${watchlisted ? "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" : ""}`} />
                <span>{watchlisted ? "Di Watchlist" : "Pantau"}</span>
              </button>

              <button
                type="button"
                onClick={() => requireAuth(() => setIsReportModalOpen(true), "Ekspor Laporan Riset PDF")}
                className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25 border border-emerald-500/25 transition-all cursor-pointer"
                title="Cetak Ringkasan Riset / Unduh PDF"
              >
                <Printer className="h-3 w-3" />
                <span>Cetak PDF</span>
              </button>
            </div>
            <p className="mt-1 text-xs font-semibold text-zinc-700 dark:text-zinc-200 leading-snug">
              {stock.name}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-zinc-200/80 dark:border-zinc-800/80 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
              Sub-sektor
            </span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 leading-snug block mt-0.5">
              {stock.subSector}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
              Kapitalisasi Pasar
            </span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums block mt-0.5">
              {stock.marketCapLabel}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
              Harga per Lembar
            </span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums block mt-0.5">
              Rp {(stock.pricePerShare || 1000).toLocaleString("id-ID")}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">
              Harga 1 Lot (100 lbr)
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums block mt-0.5">
              Rp {(stock.pricePerLot || (stock.pricePerShare || 1000) * 100).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Metadata Transparansi Sumber & Periode Data */}
        <div className="pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-wrap items-center justify-between gap-1 text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>
            Sumber: <strong className="text-zinc-700 dark:text-zinc-200">{stock.dataSource || DATA_METADATA.source}</strong>
          </span>
          <span>•</span>
          <span>
            Periode: <strong className="text-zinc-700 dark:text-zinc-200">{stock.period}</strong>
          </span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {stock.dataStatus || "Terverifikasi"}
          </span>
        </div>
      </div>

      {/* 2. Jump to Sector Benchmark (Kalimat Asli Dipertahankan & Struktur Grid Rapi) */}
      {onNavigateToBenchmark && (
        <button
          type="button"
          onClick={() => onNavigateToBenchmark(stock.sector)}
          className="group w-full grid grid-cols-[1fr_auto] items-center gap-3.5 rounded-2xl border border-zinc-200/90 bg-gradient-to-r from-zinc-50/80 to-white p-3.5 text-left hover:border-zinc-300 hover:from-zinc-100/70 dark:border-zinc-800 dark:from-[#16171f] dark:to-[#1a1c26] dark:hover:border-zinc-700 transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
              Bandingkan {stock.ticker} dengan emiten lain di sektor {stock.sector}
            </span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:group-hover:bg-white transition-colors">
            <span>Buka Benchmark</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </div>
        </button>
      )}

      {/* 3. Company Fundamental Profile: Rincian Laporan Keuangan & Tren */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-zinc-900 space-y-3.5">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Ringkasan Laporan Keuangan ({stock.period})
          </span>
          <span className="text-[10px] font-medium text-zinc-400">
            Diperbarui {stock.lastUpdated || DATA_METADATA.lastUpdated}
          </span>
        </div>

        {/* Nominal Rupiah Laporan Keuangan */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block">Pendapatan ({stock.period})</span>
            <div className="mt-0.5 flex items-baseline justify-between gap-1">
              <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                {stock.revenueLabel || "-"}
              </span>
              <span
                className={`text-[11px] font-semibold tabular-nums ${
                  stock.revenueGrowth >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}` : stock.revenueGrowth}%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block">Laba Bersih ({stock.period})</span>
            <div className="mt-0.5 flex items-baseline justify-between gap-1">
              <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                {stock.netIncomeLabel || "-"}
              </span>
              <span
                className={`text-[11px] font-semibold tabular-nums ${
                  stock.netIncomeGrowth >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}` : stock.netIncomeGrowth}%
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block">Total Aset</span>
            <span className="mt-0.5 font-bold text-zinc-950 dark:text-zinc-100 tabular-nums block">
              {stock.totalAssetsLabel || "-"}
            </span>
          </div>

          <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
            <span className="text-[10px] text-zinc-400 block">Total Ekuitas</span>
            <span className="mt-0.5 font-bold text-zinc-950 dark:text-zinc-100 tabular-nums block">
              {stock.totalEquityLabel || "-"}
            </span>
          </div>
        </div>

        {/* 3 Kartu Tren Rasio Utama dengan Sparkline (Tanpa Truncate) */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-2.5 dark:border-zinc-800 dark:bg-[#16171f] flex flex-col justify-between">
            <span className="text-[10px] block font-medium text-zinc-500 leading-snug">Pendapatan</span>
            <div className="mt-1.5 flex items-center justify-between gap-1">
              <Sparkline
                data={revTrend}
                width={28}
                height={14}
                isPositive={stock.revenueGrowth >= 0}
              />
              <span className="text-xs font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                {stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}` : stock.revenueGrowth}%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-2.5 dark:border-zinc-800 dark:bg-[#16171f] flex flex-col justify-between">
            <span className="text-[10px] block font-medium text-zinc-500 leading-snug">Laba Bersih</span>
            <div className="mt-1.5 flex items-center justify-between gap-1">
              <Sparkline
                data={netTrend}
                width={28}
                height={14}
                isPositive={stock.netIncomeGrowth >= 0}
              />
              <span className="text-xs font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                {stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}` : stock.netIncomeGrowth}%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-2.5 dark:border-zinc-800 dark:bg-[#16171f] flex flex-col justify-between">
            <span className="text-[10px] block font-medium text-zinc-500 leading-snug">ROE Laba</span>
            <div className="mt-1.5 flex items-center justify-between gap-1">
              <Sparkline
                data={roeTrend}
                width={28}
                height={14}
                isPositive={stock.roe >= 15}
              />
              <span className="text-xs font-bold tabular-nums text-zinc-950 dark:text-zinc-50">
                {stock.roe}%
              </span>
            </div>
          </div>
        </div>

        {/* Tabel Histori Kinerja 4 Kuartal Terakhir */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
            Histori Indikator 4 Kuartal Terakhir
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400">
                  <th className="py-1 font-semibold">Indikator</th>
                  {QUARTER_LABELS.map((q) => (
                    <th key={q} className="py-1 px-1.5 text-right font-semibold tabular-nums">
                      {q.replace("20", "'")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 tabular-nums">
                <tr>
                  <td className="py-1.5 font-medium text-zinc-700 dark:text-zinc-300">Pendapatan YoY</td>
                  {revTrend.map((v, i) => (
                    <td key={i} className="py-1.5 px-1.5 text-right text-zinc-800 dark:text-zinc-200">
                      {v > 0 ? `+${v}%` : `${v}%`}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-1.5 font-medium text-zinc-700 dark:text-zinc-300">Laba Bersih YoY</td>
                  {netTrend.map((v, i) => (
                    <td key={i} className="py-1.5 px-1.5 text-right text-zinc-800 dark:text-zinc-200">
                      {v > 0 ? `+${v}%` : `${v}%`}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-1.5 font-medium text-zinc-700 dark:text-zinc-300">ROE (%)</td>
                  {roeTrend.map((v, i) => (
                    <td key={i} className="py-1.5 px-1.5 text-right font-semibold text-emerald-600 dark:text-emerald-400">
                      {v}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-1.5 font-medium text-zinc-700 dark:text-zinc-300">PER (x)</td>
                  {perTrend.map((v, i) => (
                    <td key={i} className="py-1.5 px-1.5 text-right text-zinc-600 dark:text-zinc-400">
                      {v}x
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. AI Insight: Transparan dengan Pemisahan Fakta vs Interpretasi AI */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              AI Insight: {stock.ticker}
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            {stock.period} • BEI/IDX
          </span>
        </div>

        {loadingAi ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-100" />
            <span className="text-xs text-zinc-500 mt-2">Menyusun analisis laporan keuangan...</span>
          </div>
        ) : insight ? (
          <div className="mt-3 space-y-3.5 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p className="font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-[#16171f] p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800">
              {insight.summary}
            </p>

            {/* Aspek Positif / Fakta Laporan Keuangan */}
            <div className="space-y-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                Aspek Positif & Realisasi Kinerja (Fakta Data):
              </span>
              {insight.factPoints && insight.factPoints.length > 0 ? (
                <div className="space-y-2">
                  {insight.factPoints.map((fp: AIInsightPoint | string, idx) => {
                    const isObj = typeof fp === "object" && fp !== null;
                    const cat = isObj ? fp.category : `Fakta Kinerja #${idx + 1}`;
                    const text = isObj ? fp.text : fp;
                    const basis = isObj ? fp.basisLabel : `Sumber: ${insight.source || "BEI / IDX"}`;

                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 space-y-1"
                      >
                        {cat && (
                          <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">
                            {cat}
                          </span>
                        )}
                        <p className="text-zinc-700 dark:text-zinc-300 text-xs">{text}</p>
                        {basis && (
                          <span className="block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 pt-0.5">
                            {basis}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <ul className="pl-4 list-disc space-y-1">
                  {insight.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Perlu Diperhatikan / Interpretasi AI */}
            <div className="space-y-2">
              <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 text-xs">
                <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                Perlu Diperhatikan (Interpretasi AI):
              </span>
              {insight.interpretationPoints && insight.interpretationPoints.length > 0 ? (
                <div className="space-y-2">
                  {insight.interpretationPoints.map((ip: AIInsightPoint | string, idx) => {
                    const isObj = typeof ip === "object" && ip !== null;
                    const cat = isObj ? ip.category : `Analisis Rasio #${idx + 1}`;
                    const text = isObj ? ip.text : ip;
                    const basis = isObj ? ip.basisLabel : "Interpretasi AI • Edukasi Mandiri";

                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 space-y-1"
                      >
                        {cat && (
                          <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">
                            {cat}
                          </span>
                        )}
                        <p className="text-zinc-700 dark:text-zinc-300 text-xs">{text}</p>
                        {basis && (
                          <span className="block text-[10px] font-semibold text-amber-700 dark:text-amber-400 pt-0.5">
                            {basis}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <ul className="pl-4 list-disc space-y-1">
                  {insight.considerations.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p className="mt-2 text-xs text-zinc-500">Gagal memuat interpretasi data.</p>
        )}
      </div>

      {/* 5. Specific Stock Mini-Chat */}
      <StockMiniChatCard
        stock={stock}
        isLoadingHistory={isLoadingHistory}
        onOpenHistory={onOpenHistory}
        stockMessages={stockMessages}
        isStockSending={isStockSending}
        handleClearHistory={handleClearHistory}
        handleSendStock={handleSendStock}
        stockInput={stockInput}
        setStockInput={setStockInput}
        messagesEndRef={messagesEndRef}
        requireAuth={requireAuth}
      />

      {/* 5. Profil Bisnis & Rasio Valuasi Perusahaan (Bisa Buka / Tutup) */}
      <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full flex items-center justify-between p-3.5 text-left hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
          aria-expanded={showTechnicalDetails}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <Building2 className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                  Profil Bisnis & Rasio Valuasi
                </span>
                {stock.listingBoard && (
                  <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {stock.listingBoard}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                Segmen pendapatan, kepemilikan saham, dividen, dan valuasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 hidden sm:inline-block">
              {showTechnicalDetails ? "Tutup" : "Buka Profil"}
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              {showTechnicalDetails ? (
                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </div>
          </div>
        </button>

        {showTechnicalDetails && (
          <div className="p-3.5 pt-0 space-y-3 text-xs border-t border-zinc-100 dark:border-zinc-800/80">
            {/* Sub-tab Switcher: Bisnis & Moat, Saham & Dividen, Rasio Finansial */}
            <div className="flex items-center gap-1.5 rounded-lg bg-zinc-200/60 p-1 dark:bg-zinc-800">
              <button
                type="button"
                onClick={() => setProfileTab("business")}
                className={`flex-1 rounded-md py-1.5 text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  profileTab === "business"
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Building2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>Bisnis & Moat</span>
              </button>
              <button
                type="button"
                onClick={() => setProfileTab("shareholders")}
                className={`flex-1 rounded-md py-1.5 text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  profileTab === "shareholders"
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <PieChart className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>Saham & Dividen</span>
              </button>
              <button
                type="button"
                onClick={() => setProfileTab("valuation")}
                className={`flex-1 rounded-md py-1.5 text-[11px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  profileTab === "valuation"
                    ? "bg-white text-zinc-950 shadow-2xs dark:bg-zinc-700 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Coins className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span>Rasio Finansial</span>
              </button>
            </div>

            {/* TAB 1: BISNIS & MOAT */}
            {profileTab === "business" && (
              <div className="space-y-3 pt-1">
                {stock.description && (
                  <p className="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed">
                    {stock.description}
                  </p>
                )}

                {/* Segmen Pendapatan Usaha */}
                {stock.businessSegments && stock.businessSegments.length > 0 && (
                  <div className="space-y-2 rounded-lg border border-zinc-200/80 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60">
                    <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      Kontribusi Segmen Usaha:
                    </span>
                    <div className="space-y-2 pt-0.5">
                      {stock.businessSegments.map((seg, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-[11px] text-zinc-700 dark:text-zinc-300">
                            <span className="truncate pr-2 font-medium">{seg.name}</span>
                            <span className="font-bold text-zinc-950 dark:text-zinc-50 tabular-nums shrink-0">
                              {seg.percentage}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-700 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
                              style={{ width: `${seg.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keunggulan Moat */}
                {stock.keyMoat && (
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-[11px] text-emerald-950 dark:text-emerald-200 space-y-1">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Keunggulan Kompetitif (Moat):
                    </span>
                    <p className="leading-relaxed">{stock.keyMoat}</p>
                  </div>
                )}

                {/* Risiko Utama */}
                {stock.keyRisk && (
                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2.5 text-[11px] text-amber-950 dark:text-amber-200 space-y-1">
                    <span className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      Risiko Bisnis Utama:
                    </span>
                    <p className="leading-relaxed">{stock.keyRisk}</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SAHAM & DIVIDEN */}
            {profileTab === "shareholders" && (
              <div className="space-y-3 pt-1">
                {/* Struktur Pemegang Saham */}
                <div className="space-y-2 rounded-lg border border-zinc-200/80 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    <span>Komposisi Pemegang Saham</span>
                    <span>BEI Q3 2024</span>
                  </div>

                  {/* Stacked Percentage Bar */}
                  <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden flex">
                    <div
                      className="bg-emerald-600 transition-all duration-300"
                      style={{ width: `${stock.controllingPercentage || 50}%` }}
                      title={`Pengendali: ${stock.controllingPercentage || 50}%`}
                    />
                    <div
                      className="bg-blue-600 transition-all duration-300"
                      style={{ width: `${stock.publicPercentage || 50}%` }}
                      title={`Publik: ${stock.publicPercentage || 50}%`}
                    />
                  </div>

                  {/* Legend & Details */}
                  <div className="space-y-1.5 pt-1 text-[11px]">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                        <span className="text-zinc-600 dark:text-zinc-300 truncate">
                          {stock.controllingShareholder || "Pemegang Saham Pengendali"}
                        </span>
                      </div>
                      <span className="font-bold text-zinc-950 dark:text-zinc-50 tabular-nums shrink-0">
                        {stock.controllingPercentage || 50}%
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                        <span className="text-zinc-600 dark:text-zinc-300 truncate">
                          {stock.publicShareholder || "Masyarakat / Publik"}
                        </span>
                      </div>
                      <span className="font-bold text-zinc-950 dark:text-zinc-50 tabular-nums shrink-0">
                        {stock.publicPercentage || 50}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Listing Board & IPO Info */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-white p-2 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Tahun IPO
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                      {stock.ipoYear ? `Tahun ${stock.ipoYear}` : "Tercatat di BEI"}
                    </span>
                  </div>
                  <div className="rounded-lg bg-white p-2 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Papan Pencatatan
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                      {stock.listingBoard || "Papan Utama"}
                    </span>
                  </div>
                </div>

                {/* Profil Dividen */}
                <div className="space-y-2 rounded-lg border border-zinc-200/80 bg-white p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    <span>Kebijakan Dividen</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Aktif</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div className="rounded bg-zinc-50 p-2 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                        Dividend Yield
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        {stock.dividendYield ? `${stock.dividendYield}%` : "-"}
                      </span>
                    </div>
                    <div className="rounded bg-zinc-50 p-2 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800">
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                        Payout Ratio (DPR)
                      </span>
                      <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                        {stock.dividendPayoutRatio ? `${stock.dividendPayoutRatio}%` : "-"}
                      </span>
                    </div>
                  </div>

                  {stock.dividendDateNote && (
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 pt-0.5 leading-relaxed">
                      Jadwal: {stock.dividendDateNote}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: RASIO FINANSIAL & VALUASI */}
            {profileTab === "valuation" && (
              <div className="space-y-2.5 pt-1">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Valuasi terhadap Laba (PER)
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                      {stock.per}x
                    </span>
                  </div>
                  <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Valuasi Nilai Buku (PBV)
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                      {stock.pbv || "1.2"}x
                    </span>
                  </div>
                  <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Utang terhadap Ekuitas (DER)
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                      {stock.der || "0.8"}x
                    </span>
                  </div>
                  <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Margin Laba Bersih (NPM)
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                      {stock.netProfitMargin ? `${stock.netProfitMargin}%` : "-"}
                    </span>
                  </div>
                  {stock.sectorSpecificMetric && (
                    <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">
                        {stock.sectorSpecificMetric.label}
                      </span>
                      <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">
                        {stock.sectorSpecificMetric.value}
                      </span>
                    </div>
                  )}
                  <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">
                      Ketersediaan Data
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      {stock.hasData ? "Lengkap (BEI)" : "Sebagian"}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-100/80 p-2 text-[10px] text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400 leading-relaxed border border-zinc-200/60 dark:border-zinc-700/60">
                  Data Laporan Keuangan BEI ({stock.period}). Disajikan untuk referensi analisis fundamental mandiri.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6. Kalkulator Simulasi Pembelian Lot Saham (Bisa Buka / Tutup) */}
      <LotCalculator stock={stock} defaultOpen={false} />

      {/* 7. Modal Dokumen Riset Fundamental Saham (Siap Cetak PDF) */}
      <ResearchReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        stock={stock}
        insight={insight}
      />
    </div>
  );
};
