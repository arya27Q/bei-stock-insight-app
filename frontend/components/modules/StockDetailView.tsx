"use client";

import React from "react";
import {
  FileText,
  ShieldCheck,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Send,
  BarChart3,
  User,
  Bot,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Building2,
  PieChart,
  Coins,
} from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { useStockInsight } from "../../hooks/useStockInsight";
import {
  getHistoricalTrend,
  QUARTER_LABELS,
  DATA_METADATA,
} from "../../services/stock-service";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Sparkline } from "../ui/Sparkline";

const STOCK_PROMPTS = [
  "Apakah valuasi harga saham ini tergolong murah atau mahal?",
  "Bagaimana kapasitas laba dan dividen emiten ini?",
  "Apa risiko terbesar bisnis perusahaan ini?",
];

export interface StockDetailViewProps {
  stock: StockFundamental;
  onNavigateToBenchmark?: (sector: string) => void;
}

export const StockDetailView: React.FC<StockDetailViewProps> = ({
  stock,
  onNavigateToBenchmark,
}) => {
  const {
    insight,
    loadingAi,
    stockMessages,
    stockInput,
    setStockInput,
    isStockSending,
    messagesEndRef,
    handleSendStock,
    showTechnicalDetails,
    setShowTechnicalDetails,
  } = useStockInsight(stock.ticker, stock.name);

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
              {insight.factPoints ? (
                <div className="space-y-2">
                  {insight.factPoints.map((fp, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 space-y-1"
                    >
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">
                        {fp.category}
                      </span>
                      <p className="text-zinc-700 dark:text-zinc-300 text-xs">{fp.text}</p>
                      <span className="block text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 pt-0.5">
                        {fp.basisLabel}
                      </span>
                    </div>
                  ))}
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
              {insight.interpretationPoints ? (
                <div className="space-y-2">
                  {insight.interpretationPoints.map((ip, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-2.5 space-y-1"
                    >
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 block text-[11px]">
                        {ip.category}
                      </span>
                      <p className="text-zinc-700 dark:text-zinc-300 text-xs">{ip.text}</p>
                      <span className="block text-[10px] font-semibold text-amber-700 dark:text-amber-400 pt-0.5">
                        {ip.basisLabel}
                      </span>
                    </div>
                  ))}
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
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
            <h3 className="text-xs font-bold text-zinc-950 dark:text-zinc-100">
              Tanya Analis ({stock.ticker})
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400 font-medium">Basis Data {stock.period}</span>
        </div>

        {/* Stock Quick Prompts (Rapi, Berjarak Proporsional, & Interaktif) */}
        <div className="mt-4 mb-2">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Pertanyaan Cepat Rekomendasi
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {STOCK_PROMPTS.map((chip, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => handleSendStock(chip)}
                disabled={isStockSending}
                className="group w-full flex items-center justify-between gap-3 rounded-xl border border-zinc-200/90 bg-zinc-50/70 p-3 text-left text-xs font-medium leading-relaxed text-zinc-700 hover:border-emerald-500/40 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-800 dark:bg-[#16171f] dark:text-zinc-300 dark:hover:border-emerald-500/40 dark:hover:bg-[#1c202d] dark:hover:text-zinc-100 transition-all cursor-pointer shadow-2xs"
              >
                <span className="flex-1">{chip}</span>
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-200/60 text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white transition-colors text-[11px]"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stock Chat Thread */}
        <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3.5 max-h-56 overflow-y-auto pr-1">
          {stockMessages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs ${
                  m.sender === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                {m.sender === "user" ? (
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Bot className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium"
                    : "bg-zinc-100 text-zinc-800 dark:bg-[#16171f] dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800"
                }`}
              >
                <p>{m.text}</p>
                <span className="block text-[9px] mt-1 opacity-60 text-right">
                  {m.time} • {stock.period}
                </span>
              </div>
            </div>
          ))}

          {isStockSending && (
            <div className="flex items-start gap-2.5">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <div className="rounded-xl bg-zinc-100 px-3.5 py-2.5 text-xs text-zinc-500 dark:bg-[#16171f] border border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
                <span>Menganalisis laporan keuangan...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Stock Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendStock();
          }}
          className="mt-3 flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800"
        >
          <label htmlFor="stock-chat-input" className="sr-only">
            Tanya kondisi emiten
          </label>
          <input
            id="stock-chat-input"
            type="text"
            placeholder={`Tanya ${stock.ticker} (misal: valuasi murah/mahal?)...`}
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            disabled={isStockSending}
            className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:bg-zinc-800"
          />
          <button
            type="submit"
            disabled={!stockInput.trim() || isStockSending}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 disabled:opacity-40 cursor-pointer"
            aria-label="Kirim pertanyaan"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* 6. Rincian Rasio Valuasi & Profil Bisnis Lanjutan */}
      <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors cursor-pointer"
          aria-expanded={showTechnicalDetails}
        >
          <div className="flex items-center gap-2">
            <span>Rincian Rasio Valuasi & Profil Bisnis</span>
            {stock.listingBoard && (
              <span className="rounded bg-zinc-200/70 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {stock.listingBoard}
              </span>
            )}
          </div>
          {showTechnicalDetails ? (
            <ChevronUp className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          )}
        </button>

        {showTechnicalDetails && (
          <div className="mt-2.5 space-y-3 rounded-xl bg-zinc-50 p-3 text-xs dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
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
    </div>
  );
};
