"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface DropdownOption {
  value: string;
  label: string;
  dotColor?: string;
}

export interface DropdownSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  ariaLabel?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  align?: "left" | "right";
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
  value,
  onChange,
  options,
  ariaLabel = "Pilih opsi",
  className,
  buttonClassName,
  menuClassName,
  align = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      const currentIndex = options.findIndex((opt) => opt.value === value);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        onChange(options[nextIndex].value);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        onChange(options[prevIndex].value);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (containerEl) {
        containerEl.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [isOpen, options, value, onChange]);

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={cn(
          "flex w-full items-center justify-between gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:hover:bg-[#1c1e28] transition-colors cursor-pointer whitespace-nowrap",
          buttonClassName
        )}
      >
        <span className="flex items-center gap-2">
          {selectedOption?.dotColor && (
            <span
              className={cn(
                "h-2 w-2 rounded-full shrink-0",
                selectedOption.dotColor
              )}
              aria-hidden="true"
            />
          )}
          <span>{selectedOption?.label}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform duration-150",
            isOpen && "rotate-180 text-zinc-700 dark:text-zinc-200"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={ariaLabel}
          className={cn(
            "absolute top-full z-50 mt-1.5 min-w-[240px] w-max max-w-[320px] overflow-hidden rounded-xl border border-zinc-200 bg-white/95 p-1.5 shadow-2xl backdrop-blur-md dark:border-zinc-700/80 dark:bg-[#161822]/95",
            align === "right" ? "right-0" : "left-0",
            menuClassName
          )}
        >
          <div className="space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer whitespace-nowrap",
                    isSelected
                      ? "bg-zinc-100 font-semibold text-zinc-950 dark:bg-[#222531] dark:text-white"
                      : "font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-[#1c1e28] dark:hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {opt.dotColor && (
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          opt.dotColor
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && (
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-[rgba(52,184,150,0.95)]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
