"use client";

import React from "react";
import {
  MessageSquare,
  RefreshCw,
  History,
  Trash2,
  Sparkles,
  ArrowRight,
  User,
  Bot,
  Send,
} from "lucide-react";
import { StockFundamental, ChatMessage } from "../../types/stock";
import { FormattedChatText } from "../ui/FormattedChatText";

const STOCK_PROMPTS = [
  "Apakah valuasi harga saham ini tergolong murah atau mahal?",
  "Bagaimana kapasitas laba dan dividen emiten ini?",
  "Apa risiko terbesar bisnis perusahaan ini?",
];

export interface StockMiniChatCardProps {
  stock: StockFundamental;
  isLoadingHistory: boolean;
  onOpenHistory?: () => void;
  stockMessages: ChatMessage[];
  isStockSending: boolean;
  handleClearHistory: () => void;
  handleSendStock: (customPrompt?: string) => void;
  stockInput: string;
  setStockInput: (val: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  requireAuth: (action: () => void, reason?: string) => boolean;
}

export const StockMiniChatCard: React.FC<StockMiniChatCardProps> = ({
  stock,
  isLoadingHistory,
  onOpenHistory,
  stockMessages,
  isStockSending,
  handleClearHistory,
  handleSendStock,
  stockInput,
  setStockInput,
  messagesEndRef,
  requireAuth,
}) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 min-w-0">
          <MessageSquare className="h-4 w-4 text-zinc-700 dark:text-zinc-300 shrink-0" aria-hidden="true" />
          <h3 className="text-xs font-bold text-zinc-950 dark:text-zinc-100 truncate">
            Tanya Analis ({stock.ticker})
          </h3>
          {isLoadingHistory ? (
            <span className="inline-flex items-center gap-1 rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              <RefreshCw className="h-2.5 w-2.5 animate-spin" aria-hidden="true" />
              Memuat...
            </span>
          ) : onOpenHistory ? (
            <button
              type="button"
              onClick={onOpenHistory}
              title="Buka Sidebar Riwayat Semua Chat AI"
              className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
            >
              <History className="h-2.5 w-2.5" aria-hidden="true" />
              <span>{stockMessages.length > 1 ? `Riwayat (${stockMessages.length - 1})` : "Riwayat"}</span>
            </button>
          ) : stockMessages.length > 1 ? (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
              <History className="h-2.5 w-2.5" aria-hidden="true" />
              {stockMessages.length - 1} pesan
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {stockMessages.length > 1 && (
            <button
              type="button"
              onClick={handleClearHistory}
              disabled={isStockSending}
              title={`Bersihkan riwayat chat ${stock.ticker}`}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-semibold text-zinc-500 hover:bg-rose-50 hover:text-rose-600 dark:text-zinc-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Trash2 className="h-3 w-3" aria-hidden="true" />
              <span>Hapus</span>
            </button>
          )}
          <span className="text-[10px] text-zinc-400 font-medium hidden sm:inline">
            Basis Data {stock.period}
          </span>
        </div>
      </div>

      {/* Stock Quick Prompts */}
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
              onClick={() => requireAuth(() => handleSendStock(chip), "Konsultasi Asisten AI")}
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
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4 min-h-[380px] max-h-[560px] overflow-y-auto pr-1.5">
        {stockMessages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${
              m.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs ${
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
              className={`max-w-[94%] rounded-2xl px-4 py-3.5 text-[13px] leading-relaxed ${
                m.sender === "user"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-medium"
                  : "bg-zinc-100 text-zinc-800 dark:bg-[#16171f] dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800"
              }`}
            >
              {m.sender === "assistant" ? (
                <FormattedChatText text={m.text} />
              ) : (
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
              )}
              <span className="block text-[10px] mt-2 opacity-60 text-right">
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
          requireAuth(() => handleSendStock(), "Konsultasi Asisten AI");
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
  );
};
