import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { StockLogo, hasStockLogo } from "./StockLogo";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker?: string;
  sector?: string;
  logoUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function getSectorBgColor(sector?: string): string {
  if (!sector) return "bg-zinc-700 text-white";
  const s = sector.toLowerCase();
  if (s.includes("keuangan") || s.includes("bank")) {
    return "bg-[rgba(20,130,102,0.88)] text-white";
  }
  if (s.includes("konsumsi") || s.includes("consumer")) {
    return "bg-[rgba(180,110,35,0.88)] text-white";
  }
  if (s.includes("infra") || s.includes("telekomunikasi")) {
    return "bg-[rgba(28,118,168,0.88)] text-white";
  }
  if (s.includes("industri")) {
    return "bg-[rgba(78,86,170,0.88)] text-white";
  }
  if (s.includes("energi") || s.includes("tambang")) {
    return "bg-[rgba(150,52,68,0.88)] text-white";
  }
  return "bg-zinc-700 text-white";
}

const sizeStyles = {
  sm: "h-7 w-7 min-w-[28px] text-[10px]",
  md: "h-8 w-8 min-w-[32px] text-[11px]",
  lg: "h-10 w-10 min-w-[40px] text-xs",
  xl: "h-12 w-12 min-w-[48px] text-sm",
};

export const Avatar: React.FC<AvatarProps> = ({
  ticker,
  sector,
  logoUrl,
  size = "md",
  className,
  children,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const initials = ticker ? ticker.slice(0, 2).toUpperCase() : "";

  // 1. Jika pengguna memberikan children custom (misal icon khusus)
  if (children) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight select-none shadow-xs overflow-hidden",
          sizeStyles[size],
          getSectorBgColor(sector),
          className
        )}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  }

  // 2. Jika ada logoUrl gambar eksternal dan belum error
  if (logoUrl && !imageError) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full select-none shadow-xs overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800",
          sizeStyles[size],
          className
        )}
        aria-hidden="true"
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={`Logo ${ticker || "emiten"}`}
          className="w-full h-full object-contain p-0.5"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // 3. Gunakan Vector Brand Logo Asli Resmi (BCA, BRI, Mandiri, BNI, BSI, dll)
  if (ticker && hasStockLogo(ticker)) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full select-none shadow-xs overflow-hidden ring-1 ring-black/5 dark:ring-white/10",
          sizeStyles[size],
          className
        )}
        aria-hidden="true"
        {...props}
      >
        <StockLogo ticker={ticker} className="w-full h-full" />
      </div>
    );
  }

  // 4. Fallback inisial 2 huruf jika emiten di luar daftar
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-bold tracking-tight select-none shadow-xs",
        sizeStyles[size],
        getSectorBgColor(sector),
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {initials}
    </div>
  );
};
