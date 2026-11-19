import type { Metadata } from "next";
import "./globals.css";
import { ActionFeedbackPopup } from "@/components/ui/ActionFeedbackPopup";

export const metadata: Metadata = {
  title: "BEI Stock Insight: Riset Fundamental Saham Bursa Efek Indonesia",
  description: "Platform riset dan visualisasi kondisi fundamental emiten Bursa Efek Indonesia berbasis data laporan keuangan publik.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="h-full antialiased overflow-hidden overscroll-none">
      <body suppressHydrationWarning className="h-full overflow-hidden overscroll-none flex flex-col font-sans">
        <ActionFeedbackPopup />
        {children}
      </body>
    </html>
  );
}
