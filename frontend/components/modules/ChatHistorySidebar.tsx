"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  History,
  MessageSquarePlus,
  Trash2,
  X,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { StockFundamental } from "@/types/stock";
import {
  ChatSessionSummary,
  fetchAiChatSessions,
  clearAiChatHistory,
} from "@/services/stock-service";
import { AUTH_CHANGE_EVENT } from "@/services/auth-service";
import { Avatar } from "@/components/ui/Avatar";

export interface ChatHistorySidebarProps {
  activeTicker: string; // "MARKET" atau kode emiten seperti "BBCA"
  stocks: StockFundamental[];
  onSelectSession: (ticker: string) => void;
  onSessionDeleted?: (ticker: string) => void;
  onClose?: () => void;
  mode?: "drawer" | "sidebar";
}

function formatSessionTime(iso: string): string {
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "Baru saja";
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "Riwayat";
  }
}

export const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  activeTicker,
  stocks,
  onSelectSession,
  onSessionDeleted,
  onClose,
  mode = "sidebar",
}) => {
  const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTicker, setDeletingTicker] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      const data = await fetchAiChatSessions();
      setSessions(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
    const onUpdated = () => {
      loadSessions();
    };
    window.addEventListener("bei-ai-history-updated", onUpdated);
    window.addEventListener(AUTH_CHANGE_EVENT, onUpdated);
    return () => {
      window.removeEventListener("bei-ai-history-updated", onUpdated);
      window.removeEventListener(AUTH_CHANGE_EVENT, onUpdated);
    };
  }, [loadSessions]);

  const handleDelete = async (e: React.MouseEvent, ticker: string) => {
    e.stopPropagation();
    setDeletingTicker(ticker);
    try {
      await clearAiChatHistory(ticker);
      setSessions((prev) => prev.filter((s) => s.ticker !== ticker));
      if (onSessionDeleted) {
        onSessionDeleted(ticker);
      }
    } finally {
      setDeletingTicker(null);
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-zinc-50 dark:bg-[#111219] ${
        mode === "drawer"
          ? "w-[290px] sm:w-[320px] border-r border-zinc-200 dark:border-zinc-800 shadow-2xl"
          : "w-full rounded-2xl border border-zinc-200 dark:border-zinc-800/90 overflow-hidden"
      }`}
    >
      {/* Header Sidebar Riwayat */}
      <div className="flex items-center justify-between gap-2 px-4 py-3.5 border-b border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#16171f]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            <History className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-zinc-950 dark:text-zinc-50 truncate">
              Riwayat Chat AI
            </h3>
            <span className="text-[10px] text-zinc-400 block">
              {sessions.length} sesi tersimpan
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={loadSessions}
            title="Muat ulang riwayat chat"
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Muat ulang riwayat chat"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          </button>

          {mode === "drawer" && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Tutup Sidebar Riwayat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Tombol Akses Cepat Chat Pasar Umum */}
      <div className="p-3 border-b border-zinc-200/70 dark:border-zinc-800/70">
        <button
          type="button"
          onClick={() => {
            onSelectSession("MARKET");
            if (onClose) onClose();
          }}
          className={`w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
            activeTicker === "MARKET"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 dark:bg-[#1a1c26] dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-800"
          }`}
        >
          <MessageSquarePlus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Asisten Pasar Umum (BEI)</span>
        </button>
      </div>

      {/* Daftar Sesi Percakapan */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
        {loading && sessions.length === 0 ? (
          <div className="space-y-2 p-2">
            <div className="h-14 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
            <div className="h-14 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
            <div className="h-14 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/60 animate-pulse" />
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-10 px-4 text-center space-y-2">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-400">
              <History className="h-5 w-5" aria-hidden="true" />
            </div>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
              Belum ada riwayat chat
            </p>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Mulai tanyakan analisis saham atau pasar BEI, percakapan kamu otomatis tersimpan di sini.
            </p>
          </div>
        ) : (
          sessions.map((session) => {
            const isActive = activeTicker.toUpperCase() === session.ticker.toUpperCase();
            const isMarket = session.ticker === "MARKET";
            const matchedStock = !isMarket
              ? stocks.find((s) => s.ticker === session.ticker)
              : null;

            return (
              <div
                key={session.ticker}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectSession(session.ticker);
                  if (onClose) onClose();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectSession(session.ticker);
                    if (onClose) onClose();
                  }
                }}
                className={`group relative w-full flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all cursor-pointer border ${
                  isActive
                    ? "border-emerald-500/40 bg-emerald-500/10 dark:bg-emerald-500/15"
                    : "border-transparent hover:border-zinc-200 hover:bg-white dark:hover:border-zinc-800 dark:hover:bg-[#181a24]"
                }`}
              >
                {/* Avatar / Icon */}
                {isMarket ? (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-2xs mt-0.5">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                  </div>
                ) : (
                  <div className="mt-0.5 shrink-0">
                    <Avatar
                      ticker={session.ticker}
                      sector={matchedStock?.sector || "Keuangan"}
                      size="sm"
                    />
                  </div>
                )}

                {/* Judul & Cuplikan Pesan */}
                <div className="min-w-0 flex-1 pr-5">
                  <div className="flex items-center justify-between gap-1.5">
                    <span
                      className={`text-xs font-bold truncate ${
                        isActive
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {isMarket ? "Pasar Umum BEI" : session.ticker}
                    </span>
                    <span className="text-[10px] text-zinc-400 shrink-0 tabular-nums">
                      {formatSessionTime(session.lastActiveAt)}
                    </span>
                  </div>

                  {!isMarket && matchedStock && (
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate block">
                      {matchedStock.name}
                    </span>
                  )}

                  <p className="mt-1 text-[11px] text-zinc-600 dark:text-zinc-300 line-clamp-1 leading-snug">
                    {session.lastMessage}
                  </p>

                  <span className="mt-1 inline-block text-[10px] font-medium text-zinc-400">
                    {session.messageCount} pesan
                  </span>
                </div>

                {/* Tombol Hapus Sesi */}
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, session.ticker)}
                  disabled={deletingTicker === session.ticker}
                  title={`Hapus riwayat ${isMarket ? "Pasar Umum" : session.ticker}`}
                  aria-label={`Hapus riwayat ${isMarket ? "Pasar Umum" : session.ticker}`}
                  className="absolute right-2 bottom-2 rounded-lg p-1 text-zinc-400 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 transition-all cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 border-t border-zinc-200/70 dark:border-zinc-800/70 text-[10px] text-zinc-400 bg-white/60 dark:bg-[#16171f]/60">
        Tersinkronisasi otomatis ke MySQL (`ai_chat_logs`).
      </div>
    </div>
  );
};
