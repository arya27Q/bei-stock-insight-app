import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="id" suppressHydrationWarning className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
