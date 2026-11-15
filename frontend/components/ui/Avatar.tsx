import React from "react";
import { cn } from "../../lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  ticker?: string;
  sector?: string;
  size?: "sm" | "md" | "lg";
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
  sm: "h-7 w-7 text-[10px]",
  md: "h-8 w-8 text-[11px]",
  lg: "h-10 w-10 text-xs",
};

export const Avatar: React.FC<AvatarProps> = ({
  ticker,
  sector,
  size = "md",
  className,
  children,
  ...props
}) => {
  const initials = ticker ? ticker.slice(0, 2).toUpperCase() : "";

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
      {children || initials}
    </div>
  );
};
