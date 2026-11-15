import { useState, useEffect, useRef, useCallback } from "react";
import { AIInsightData, ChatMessage } from "../types/stock";
import { fetchAiInsight, askAiStockChat } from "../services/stock-service";

export interface UseStockInsightReturn {
  insight: AIInsightData | null;
  loadingAi: boolean;
  stockMessages: ChatMessage[];
  stockInput: string;
  setStockInput: (val: string) => void;
  isStockSending: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSendStock: (promptText?: string) => Promise<void>;
  showTechnicalDetails: boolean;
  setShowTechnicalDetails: (show: boolean | ((prev: boolean) => boolean)) => void;
}

export function useStockInsight(ticker: string, stockName?: string): UseStockInsightReturn {
  const [insight, setInsight] = useState<AIInsightData | null>(null);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [stockMessages, setStockMessages] = useState<ChatMessage[]>(() => [
    {
      id: `stock-welcome-${ticker}`,
      sender: "assistant",
      text: `Halo, saya Analis Fundamental untuk ${stockName || ticker} (${ticker}). Silakan tanyakan hal seputar valuasi harga, kapasitas dividen, maupun risiko bisnis perusahaan.`,
      time: "Terkini",
    },
  ]);
  const [stockInput, setStockInput] = useState("");
  const [isStockSending, setIsStockSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const loadingAi = Boolean(ticker && insight?.ticker !== ticker);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stockMessages, isStockSending]);

  const handleSendStock = useCallback(
    async (promptText?: string) => {
      const text = (promptText || stockInput).trim();
      if (!text || isStockSending) return;

      const userMsg: ChatMessage = {
        id: `stock-user-${stockMessages.length + 1}`,
        sender: "user",
        text,
        time: "Baru saja",
      };

      setStockMessages((prev) => [...prev, userMsg]);
      setStockInput("");
      setIsStockSending(true);

      try {
        const answer = await askAiStockChat(ticker, text);
        const assistantMsg: ChatMessage = {
          id: `stock-asst-${stockMessages.length + 2}`,
          sender: "assistant",
          text: answer,
          time: "Baru saja",
        };
        setStockMessages((prev) => [...prev, assistantMsg]);
      } catch {
        const errMsg: ChatMessage = {
          id: `stock-err-${stockMessages.length + 2}`,
          sender: "assistant",
          text: "Terjadi kendala saat menganalisis emiten. Silakan coba kembali sesaat lagi.",
          time: "Baru saja",
        };
        setStockMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsStockSending(false);
      }
    },
    [ticker, stockInput, isStockSending, stockMessages.length]
  );

  return {
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
  };
}
