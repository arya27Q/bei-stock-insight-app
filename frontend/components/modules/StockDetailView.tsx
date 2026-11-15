"use client";

import React from "react";
import {
  FileText,
  TrendingUp,
  TrendingDown,
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
} from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { useStockInsight } from "../../hooks/useStockInsight";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";

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

  return (
    <div className="mt-4 space-y-5">
      {/* Stock Identity Header */}
      <div>
        <div className="flex items-center gap-2">
          <Avatar ticker={stock.ticker} sector={stock.sector} size="md" />
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-sans text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              {stock.ticker}
            </span>
            <Badge variant="zinc">{stock.sector}</Badge>
            <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {stock.period}
            </span>
          </div>
        </div>
        <div className="mt-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
          {stock.name}
        </div>
        <p className="text-xs text-zinc-500 mt-0.5">
          Sub-sektor: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{stock.subSector}</strong> • Kapitalisasi: <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{stock.marketCapLabel}</strong>
        </p>
      </div>

      {/* Jump to Sector Benchmark */}
      {onNavigateToBenchmark && (
        <button
          onClick={() => onNavigateToBenchmark(stock.sector)}
          className="w-full flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-zinc-600 dark:text-zinc-400" aria-hidden="true" />
            <span>Bandingkan {stock.ticker} dengan emiten lain di sektor {stock.sector}</span>
          </div>
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Buka Benchmark →</span>
        </button>
      )}

      {/* TIER 1: Instant Health Summary */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2">
          Kinerja Bisnis Utama
        </span>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] block font-medium text-zinc-500">Pendapatan</span>
            <div className="mt-1 flex items-baseline gap-1">
              {stock.revenueGrowth >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
              )}
              <span className="text-sm font-bold tabular-nums">
                {stock.revenueGrowth > 0 ? `+${stock.revenueGrowth}` : stock.revenueGrowth}%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] block font-medium text-zinc-500">Laba Bersih</span>
            <div className="mt-1 flex items-baseline gap-1">
              {stock.netIncomeGrowth >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
              )}
              <span className="text-sm font-bold tabular-nums">
                {stock.netIncomeGrowth > 0 ? `+${stock.netIncomeGrowth}` : stock.netIncomeGrowth}%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-[11px] block font-medium text-zinc-500">ROE Ekuitas</span>
            <div className="mt-1">
              <span className="text-sm font-bold tabular-nums text-zinc-950 dark:text-zinc-50">{stock.roe}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* TIER 2A: Narrative Fundamental Interpretation */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Rangkuman Analisis Otomatis
            </h3>
          </div>
          <span className="text-[11px] text-zinc-400 font-medium">{stock.period}</span>
        </div>

        {loadingAi ? (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent dark:border-zinc-100" />
            <span className="text-xs text-zinc-500 mt-2">Menyusun analisis laporan keuangan...</span>
          </div>
        ) : insight ? (
          <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p className="font-medium text-zinc-950 dark:text-zinc-100">{insight.summary}</p>
            <div className="pt-1">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 text-xs mb-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                Kekuatan Utama:
              </span>
              <ul className="pl-4 list-disc space-y-1">
                {insight.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="pt-1">
              <span className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 text-xs mb-1">
                <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                Faktor yang Perlu Diperhatikan:
              </span>
              <ul className="pl-4 list-disc space-y-1">
                {insight.considerations.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-xs text-zinc-500">Gagal memuat interpretasi data.</p>
        )}
      </div>

      {/* TIER 2B: Specific Stock Mini-Chat */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
            <h3 className="text-xs font-bold text-zinc-950 dark:text-zinc-100">
              Tanya Analis ({stock.ticker})
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400 font-medium">Chat Interaktif</span>
        </div>

        {/* Stock Quick Chips */}
        <div className="mt-2.5 flex flex-wrap gap-1">
          {STOCK_PROMPTS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendStock(chip)}
              disabled={isStockSending}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-left text-[11px] font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Stock Chat Thread */}
        <div className="mt-3 space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {stockMessages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2 ${
                m.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs ${
                  m.sender === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                    : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                }`}
              >
                {m.sender === "user" ? (
                  <User className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Bot className="h-3 w-3" aria-hidden="true" />
                )}
              </div>
              <div
                className={`max-w-[85%] rounded-xl px-3 py-1.5 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium"
                    : "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800"
                }`}
              >
                <p>{m.text}</p>
                <span className="block text-[9px] mt-0.5 opacity-60 text-right">{m.time}</span>
              </div>
            </div>
          ))}

          {isStockSending && (
            <div className="flex items-start gap-2">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                <Bot className="h-3 w-3" aria-hidden="true" />
              </div>
              <div className="rounded-xl bg-zinc-100 px-3 py-1.5 text-xs text-zinc-500 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2">
                <RefreshCw className="h-3 w-3 animate-spin text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
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
          className="mt-2.5 flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800"
        >
          <label htmlFor="stock-chat-input" className="sr-only">Tanya kondisi emiten</label>
          <input
            id="stock-chat-input"
            type="text"
            placeholder={`Tanya ${stock.ticker} (misal: valuasi murah/mahal?)...`}
            value={stockInput}
            onChange={(e) => setStockInput(e.target.value)}
            disabled={isStockSending}
            className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:bg-zinc-800"
          />
          <button
            type="submit"
            disabled={!stockInput.trim() || isStockSending}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 disabled:opacity-40 cursor-pointer"
            aria-label="Kirim pertanyaan"
          >
            <Send className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* TIER 3: Technical Financial Details */}
      <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 transition-colors cursor-pointer"
          aria-expanded={showTechnicalDetails}
        >
          <span>Rincian Rasio Valuasi & Profil Lanjutan</span>
          {showTechnicalDetails ? (
            <ChevronUp className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          )}
        </button>

        {showTechnicalDetails && (
          <div className="mt-2 space-y-2 rounded-xl bg-zinc-50 p-3 text-xs dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Kewajaran Harga (PER)</span>
                <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">{stock.per}x</span>
              </div>
              <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Valuasi Nilai Buku (PBV)</span>
                <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">{stock.pbv || "1.2"}x</span>
              </div>
              <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Rasio Utang Ekuitas (DER)</span>
                <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">{stock.der || "0.8"}x</span>
              </div>
              <div className="rounded bg-white p-2 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block">Status Audit BEI</span>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Terdaftar</span>
              </div>
            </div>

            {stock.description && (
              <div className="pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block mb-0.5">
                  Profil Perusahaan:
                </span>
                <p className="text-zinc-600 dark:text-zinc-300 text-[11px] leading-relaxed">
                  {stock.description}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
