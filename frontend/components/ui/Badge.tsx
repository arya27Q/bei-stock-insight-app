import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "amber" | "rose" | "sky" | "indigo" | "zinc" | "neutral" | "outline";
  size?: "xs" | "sm";
  dot?: boolean;
}

const variantStyles: Record<string, string> = {
  emerald: "bg-[rgba(20,130,102,0.15)] text-[rgba(38,166,134,0.95)] border-[rgba(52,184,150,0.3)] dark:bg-[rgba(20,130,102,0.2)] dark:text-[rgba(52,184,150,0.95)]",
  amber: "bg-[rgba(217,140,45,0.15)] text-[rgba(224,154,64,0.95)] border-[rgba(224,154,64,0.3)] dark:bg-[rgba(217,140,45,0.2)] dark:text-[rgba(240,165,70,0.95)]",
  rose: "bg-[rgba(150,52,68,0.15)] text-[rgba(220,90,110,0.95)] border-[rgba(210,85,105,0.3)] dark:bg-[rgba(150,52,68,0.2)] dark:text-[rgba(235,105,125,0.95)]",
  sky: "bg-[rgba(28,118,168,0.15)] text-[rgba(56,155,210,0.95)] border-[rgba(56,155,210,0.3)] dark:bg-[rgba(28,118,168,0.2)] dark:text-[rgba(70,175,230,0.95)]",
  indigo: "bg-[rgba(78,86,170,0.15)] text-[rgba(120,130,220,0.95)] border-[rgba(120,130,220,0.3)] dark:bg-[rgba(78,86,170,0.2)] dark:text-[rgba(140,150,240,0.95)]",
  zinc: "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
  neutral: "bg-zinc-100 text-zinc-600 border-transparent dark:bg-zinc-800/80 dark:text-zinc-400",
  outline: "bg-transparent text-zinc-700 border-zinc-200 dark:text-zinc-300 dark:border-zinc-700",
};

const dotColors: Record<string, string> = {
  emerald: "bg-[rgba(38,166,134,0.95)]",
  amber: "bg-[rgba(224,154,64,0.95)]",
  rose: "bg-[rgba(220,90,110,0.95)]",
  sky: "bg-[rgba(56,155,210,0.95)]",
  indigo: "bg-[rgba(120,130,220,0.95)]",
  zinc: "bg-zinc-400",
  neutral: "bg-zinc-400",
  outline: "bg-zinc-400",
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "zinc",
  size = "xs",
  dot = false,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-md border tracking-tight transition-colors whitespace-nowrap",
        size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        variantStyles[variant] || variantStyles.zinc,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant] || dotColors.zinc)}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
