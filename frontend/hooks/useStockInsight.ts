import { useState, useEffect, useRef, useCallback } from "react";
import { AIInsightData, ChatMessage } from "../types/stock";
import {
  fetchAiInsight,
  askAiStockChat,
  fetchAiChatHistory,
  clearAiChatHistory,
  getStoredChatHistory,
  saveStoredChatHistory,
} from "../services/stock-service";

export interface UseStockInsightReturn {
  insight: AIInsightData | null;
  loadingAi: boolean;
  isLoadingHistory: boolean;
  stockMessages: ChatMessage[];
  stockInput: string;
  setStockInput: (val: string) => void;
  isStockSending: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSendStock: (promptText?: string) => Promise<void>;
  handleClearHistory: () => Promise<void>;
  showTechnicalDetails: boolean;
  setShowTechnicalDetails: (show: boolean | ((prev: boolean) => boolean)) => void;
}

function buildWelcomeMessage(ticker: string, stockName?: string): ChatMessage {
  return {
    id: `stock-welcome-${ticker}`,
    sender: "assistant",
    text: `Halo, saya Analis Fundamental untuk ${stockName || ticker} (${ticker}) berbasis laporan keuangan Q3 2024 (Sumber: BEI / IDX). Setiap jawaban memisahkan antara fakta laporan keuangan dan interpretasi AI edukatif.`,
    time: "Terkini",
  };
}

export function useStockInsight(ticker: string, stockName?: string): UseStockInsightReturn {
  const [insight, setInsight] = useState<AIInsightData | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [stockMessages, setStockMessages] = useState<ChatMessage[]>(() => [
    buildWelcomeMessage(ticker, stockName),
  ]);
  const [stockInput, setStockInput] = useState("");
  const [isStockSending, setIsStockSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingAi = Boolean(ticker && insight?.ticker !== ticker);

  // 1. Muat ringkasan AI Insight emiten
  useEffect(() => {
    let isCancelled = false;
    fetchAiInsight(ticker)
      .then((data) => {
        if (!isCancelled) setInsight(data);
      })
      .catch(() => {
        if (!isCancelled) setInsight(null);
      });

    return () => {
      isCancelled = true;
    };
  }, [ticker]);

  // 2. Muat histori chat persisten emiten dari MySQL backend (+ cache lokal)
  useEffect(() => {
    let isCancelled = false;
    const welcomeMsg = buildWelcomeMessage(ticker, stockName);
    const cached = getStoredChatHistory(ticker);

    queueMicrotask(() => {
      if (!isCancelled) {
        setStockMessages(cached.length > 0 ? [welcomeMsg, ...cached] : [welcomeMsg]);
        setIsLoadingHistory(true);
      }
    });

    fetchAiChatHistory(ticker)
      .then((history) => {
        if (!isCancelled) {
          setStockMessages(history.length > 0 ? [welcomeMsg, ...history] : [welcomeMsg]);
        }
      })
      .catch(() => {
        // Tetap tampilkan cache lokal bila jaringan gagal
      })
      .finally(() => {
        if (!isCancelled) setIsLoadingHistory(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [ticker, stockName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stockMessages, isStockSending]);

  const handleSendStock = useCallback(
    async (promptText?: string) => {
      const text = (promptText || stockInput).trim();
      if (!text || isStockSending) return;

      const nowTime = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const userMsg: ChatMessage = {
        id: `stock-user-${Date.now()}`,
        sender: "user",
        text,
        time: nowTime,
      };

      setStockMessages((prev) => {
        const next = [...prev, userMsg];
        saveStoredChatHistory(ticker, next);
        return next;
      });
      setStockInput("");
      setIsStockSending(true);

      try {
        const answer = await askAiStockChat(ticker, text);
        const assistantMsg: ChatMessage = {
          id: `stock-asst-${Date.now()}`,
          sender: "assistant",
          text: answer,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setStockMessages((prev) => {
          const next = [...prev, assistantMsg];
          saveStoredChatHistory(ticker, next);
          return next;
        });
      } catch {
        const errMsg: ChatMessage = {
          id: `stock-err-${Date.now()}`,
          sender: "assistant",
          text: "Terjadi kendala saat menganalisis emiten. Silakan coba kembali sesaat lagi.",
          time: "Baru saja",
        };
        setStockMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsStockSending(false);
      }
    },
    [ticker, stockInput, isStockSending]
  );

  const handleClearHistory = useCallback(async () => {
    await clearAiChatHistory(ticker);
    setStockMessages([buildWelcomeMessage(ticker, stockName)]);
  }, [ticker, stockName]);

  return {
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
  };
}
