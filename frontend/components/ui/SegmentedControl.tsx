import React from "react";
import { cn } from "../../lib/utils";

export interface SegmentedControlOption<T extends string = string> {
  id: T;
  label: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  ariaLabel?: string;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = value === opt.id;
        const Icon = opt.icon;

        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={opt.ariaLabel}
            onClick={() => onChange(opt.id)}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-xs sm:text-sm",
              isActive
                ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-700 dark:text-zinc-50"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
            {opt.label && <span>{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
