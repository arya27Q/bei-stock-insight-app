import { useState, useEffect, useRef, useCallback } from "react";
import { ChatMessage } from "../types/stock";
import {
  askAiStockChat,
  getStoredChatHistory,
  saveStoredChatHistory,
  clearAiChatHistory,
} from "../services/stock-service";

export interface UseGeneralAiChatReturn {
  generalMessages: ChatMessage[];
  generalInput: string;
  setGeneralInput: (val: string) => void;
  isGeneralSending: boolean;
  generalMessagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSendGeneral: (promptText?: string) => Promise<void>;
  handleClearHistory: () => Promise<void>;
}

const GENERAL_WELCOME_MESSAGE: ChatMessage = {
  id: "gen-welcome",
  sender: "assistant",
  text: "Halo, saya Asisten Analis AI BEI. Anda dapat mengklik emiten mana saja di peta saham untuk melihat bedah laporan keuangan lengkap, atau tanyakan perbandingan fundamental langsung di sini.",
  time: "Terkini",
};

export function useGeneralAiChat(): UseGeneralAiChatReturn {
  const [generalMessages, setGeneralMessages] = useState<ChatMessage[]>([
    GENERAL_WELCOME_MESSAGE,
  ]);
  const [generalInput, setGeneralInput] = useState("");
  const [isGeneralSending, setIsGeneralSending] = useState(false);
  const generalMessagesEndRef = useRef<HTMLDivElement>(null);

  // Muat riwayat chat pasar umum dari localStorage pada client mount (aman SSR/hydration)
  useEffect(() => {
    const saved = getStoredChatHistory("MARKET");
    if (saved.length > 0) {
      queueMicrotask(() => {
        setGeneralMessages([GENERAL_WELCOME_MESSAGE, ...saved]);
      });
    }
  }, []);

  useEffect(() => {
    generalMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [generalMessages, isGeneralSending]);

  const handleSendGeneral = useCallback(
    async (promptText?: string) => {
      const text = (promptText || generalInput).trim();
      if (!text || isGeneralSending) return;

      const nowTime = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const userMsg: ChatMessage = {
        id: `gen-user-${Date.now()}`,
        sender: "user",
        text,
        time: nowTime,
      };

      setGeneralMessages((prev) => {
        const next = [...prev, userMsg];
        saveStoredChatHistory("MARKET", next);
        return next;
      });
      setGeneralInput("");
      setIsGeneralSending(true);

      try {
        const answer = await askAiStockChat("MARKET", text);
        const assistantMsg: ChatMessage = {
          id: `gen-asst-${Date.now()}`,
          sender: "assistant",
          text: answer,
          time: new Date().toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setGeneralMessages((prev) => {
          const next = [...prev, assistantMsg];
          saveStoredChatHistory("MARKET", next);
          return next;
        });
      } catch {
        const errMsg: ChatMessage = {
          id: `gen-err-${Date.now()}`,
          sender: "assistant",
          text: "Terjadi kendala saat menganalisis pasar. Silakan coba kembali sesaat lagi.",
          time: "Baru saja",
        };
        setGeneralMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsGeneralSending(false);
      }
    },
    [generalInput, isGeneralSending]
  );

  const handleClearHistory = useCallback(async () => {
    await clearAiChatHistory("MARKET");
    setGeneralMessages([GENERAL_WELCOME_MESSAGE]);
  }, []);

  return {
    generalMessages,
    generalInput,
    setGeneralInput,
    isGeneralSending,
    generalMessagesEndRef,
    handleSendGeneral,
    handleClearHistory,
  };
}
