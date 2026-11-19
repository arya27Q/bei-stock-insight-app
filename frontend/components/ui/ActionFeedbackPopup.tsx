"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, BookmarkCheck, BookmarkMinus, Loader2, X } from "lucide-react";

export const FEEDBACK_POPUP_EVENT = "bei_stock_insight_feedback_popup";

export interface FeedbackPopupPayload {
  status: "loading" | "success" | "watchlist-add" | "watchlist-remove";
  title: string;
  message: string;
  ticker?: string;
  durationMs?: number;
}

export function showFeedbackPopup(payload: FeedbackPopupPayload): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FEEDBACK_POPUP_EVENT, { detail: payload }));
}

export function hideFeedbackPopup(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FEEDBACK_POPUP_EVENT, { detail: null }));
}

export function ActionFeedbackPopup() {
  const [popup, setPopup] = useState<FeedbackPopupPayload | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<FeedbackPopupPayload | null>;
      const detail = customEvent.detail;

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      setPopup(detail);

      if (detail && detail.status !== "loading") {
        const duration = detail.durationMs ?? 3000;
        timer = setTimeout(() => {
          setPopup(null);
        }, duration);
      }
    };

    window.addEventListener(FEEDBACK_POPUP_EVENT, handleEvent);
    return () => {
      window.removeEventListener(FEEDBACK_POPUP_EVENT, handleEvent);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!popup) return null;

  const isLoading = popup.status === "loading";
  const isWatchlistRemove = popup.status === "watchlist-remove";

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="feedback-popup"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 pointer-events-none"
    >
      <div
        className={`pointer-events-auto flex items-start gap-3.5 rounded-2xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-200 ${
          isLoading
            ? "border-zinc-700/80 bg-[#16171f]/95 text-zinc-100"
            : isWatchlistRemove
              ? "border-amber-500/40 bg-[#16171f]/95 text-zinc-100 shadow-amber-950/20"
              : "border-emerald-500/40 bg-[#16171f]/95 text-zinc-100 shadow-emerald-950/30"
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
            isLoading
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : isWatchlistRemove
                ? "border-amber-500/30 bg-amber-500/15 text-amber-400"
                : "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : popup.status === "watchlist-add" ? (
            <BookmarkCheck className="h-5 w-5" aria-hidden="true" />
          ) : isWatchlistRemove ? (
            <BookmarkMinus className="h-5 w-5" aria-hidden="true" />
          ) : (
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex items-center gap-2">
            <p className="text-xs sm:text-sm font-bold text-white leading-snug">
              {popup.title}
            </p>
            {popup.ticker && (
              <span className="rounded-md bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                {popup.ticker}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[11px] sm:text-xs text-zinc-300 leading-relaxed">
            {popup.message}
          </p>
        </div>

        {!isLoading && (
          <button
            type="button"
            onClick={() => setPopup(null)}
            aria-label="Tutup notifikasi"
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
