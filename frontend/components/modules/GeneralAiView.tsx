"use client";

import React from "react";
import { Send, User, Bot, RefreshCw, Sparkles, ArrowRight } from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { useGeneralAiChat } from "../../hooks/useGeneralAiChat";
import { Avatar } from "../ui/Avatar";

const GENERAL_PROMPTS = [
  "Emiten apa dengan kemampuan menghasilkan laba (ROE) tertinggi?",
  "Bagaimana perbandingan valuasi PER antar sektor di BEI?",
  "Bagaimana prospek pertumbuhan laba sektor perbankan?",
  "Saham apa saja yang dipantau pada dataset Q3 2024 ini?",
];

export interface GeneralAiViewProps {
  stocks: StockFundamental[];
  onSelectStock: (stock: StockFundamental) => void;
}

export const GeneralAiView: React.FC<GeneralAiViewProps> = ({
  stocks,
  onSelectStock,
}) => {
  const {
    generalMessages,
    generalInput,
    setGeneralInput,
    isGeneralSending,
    generalMessagesEndRef,
    handleSendGeneral,
  } = useGeneralAiChat();

  return (
    <div className="mt-4 space-y-4">
      {/* Intro Box */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50 block mb-1">
          Pusat Analisis Pasar & Saham
        </span>
        <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Pilih salah satu emiten pada peta saham untuk membuka rincian rasio keuangan, atau tanyakan perbandingan fundamental langsung pada asisten AI di bawah.
        </p>
      </div>

      {/* Quick Prompt Chips (Rapi, Berjarak Proporsional, & Interaktif) */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Pertanyaan Populer Analisis Pasar
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {GENERAL_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendGeneral(prompt)}
              disabled={isGeneralSending}
              className="group w-full flex items-center justify-between gap-3 rounded-xl border border-zinc-200/90 bg-white p-3 text-left text-xs font-medium leading-relaxed text-zinc-700 hover:border-emerald-500/40 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-500/40 dark:hover:bg-[#1c202d] dark:hover:text-zinc-100 transition-all cursor-pointer shadow-2xs"
            >
              <span className="flex-1">{prompt}</span>
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 group-hover:bg-emerald-600 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white transition-colors text-[11px]"
                aria-hidden="true"
              >
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stock Shortcuts (Tanpa Truncate) */}
      <div>
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
          Pilih Cepat Emiten Unggulan:
        </span>
        <div className="grid grid-cols-2 gap-2.5">
          {stocks.slice(0, 4).map((s) => (
            <button
              key={s.ticker}
              onClick={() => onSelectStock(s)}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <Avatar ticker={s.ticker} sector={s.sector} size="sm" />
                  <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">{s.ticker}</span>
                </div>
                <div className="text-[11px] text-zinc-500 leading-snug mt-1.5">{s.name}</div>
              </div>
              <div className="text-[10px] text-[rgba(52,184,150,0.95)] font-semibold mt-2">
                ROE: {s.roe}% • PER: {s.per}x
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* General Chat Messages Thread */}
      <div className="space-y-3 max-h-56 overflow-y-auto pr-1 pt-2">
        {generalMessages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2 ${
              m.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs ${
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
              className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
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

        {isGeneralSending && (
          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              <Bot className="h-3 w-3" aria-hidden="true" />
            </div>
            <div className="rounded-xl bg-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2">
              <RefreshCw className="h-3 w-3 animate-spin text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
              <span>Sedang menganalisis data emiten...</span>
            </div>
          </div>
        )}
        <div ref={generalMessagesEndRef} />
      </div>

      {/* General Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendGeneral();
        }}
        className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800"
      >
        <label htmlFor="general-ai-input" className="sr-only">Ketik pertanyaan pasar saham</label>
        <input
          id="general-ai-input"
          type="text"
          placeholder="Tanyakan analisis saham atau sektor di sini..."
          value={generalInput}
          onChange={(e) => setGeneralInput(e.target.value)}
          disabled={isGeneralSending}
          className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-400 dark:focus:bg-zinc-800"
        />
        <button
          type="submit"
          disabled={!generalInput.trim() || isGeneralSending}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 disabled:opacity-40 cursor-pointer"
          aria-label="Kirim pertanyaan"
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
};
