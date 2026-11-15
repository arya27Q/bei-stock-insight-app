import { useState, useEffect, useRef, useCallback } from "react";
import { ChatMessage } from "../types/stock";
import { askAiStockChat } from "../services/stock-service";

export interface UseGeneralAiChatReturn {
  generalMessages: ChatMessage[];
  generalInput: string;
  setGeneralInput: (val: string) => void;
  isGeneralSending: boolean;
  generalMessagesEndRef: React.RefObject<HTMLDivElement | null>;
  handleSendGeneral: (promptText?: string) => Promise<void>;
}

export function useGeneralAiChat(): UseGeneralAiChatReturn {
  const [generalMessages, setGeneralMessages] = useState<ChatMessage[]>([
    {
      id: "gen-welcome",
      sender: "assistant",
      text: "Halo, saya Asisten Analis AI BEI. Anda dapat mengklik emiten mana saja di peta saham untuk melihat bedah laporan keuangan lengkap, atau tanyakan perbandingan fundamental langsung di sini.",
      time: "Terkini",
    },
  ]);
  const [generalInput, setGeneralInput] = useState("");
  const [isGeneralSending, setIsGeneralSending] = useState(false);
  const generalMessagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generalMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [generalMessages, isGeneralSending]);

  const handleSendGeneral = useCallback(
    async (promptText?: string) => {
      const text = (promptText || generalInput).trim();
      if (!text || isGeneralSending) return;

      const userMsg: ChatMessage = {
        id: `gen-user-${generalMessages.length + 1}`,
        sender: "user",
        text,
        time: "Baru saja",
      };

      setGeneralMessages((prev) => [...prev, userMsg]);
      setGeneralInput("");
      setIsGeneralSending(true);

      try {
        const answer = await askAiStockChat("MARKET", text);
        const assistantMsg: ChatMessage = {
          id: `gen-asst-${generalMessages.length + 2}`,
          sender: "assistant",
          text: answer,
          time: "Baru saja",
        };
        setGeneralMessages((prev) => [...prev, assistantMsg]);
      } catch {
        const errMsg: ChatMessage = {
          id: `gen-err-${generalMessages.length + 2}`,
          sender: "assistant",
          text: "Terjadi kendala saat menganalisis pasar. Silakan coba kembali sesaat lagi.",
          time: "Baru saja",
        };
        setGeneralMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsGeneralSending(false);
      }
    },
    [generalInput, isGeneralSending, generalMessages.length]
  );

  return {
    generalMessages,
    generalInput,
    setGeneralInput,
    isGeneralSending,
    generalMessagesEndRef,
    handleSendGeneral,
  };
}
