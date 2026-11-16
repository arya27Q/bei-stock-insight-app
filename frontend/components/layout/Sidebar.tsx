"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  SlidersHorizontal,
  TrendingUp,
  BarChart3,
  Activity,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from "lucide-react";

interface SidebarProps {
  activeTab?: "map" | "screener" | "benchmark" | "profile";
  setActiveTab?: (tab: "map" | "screener" | "benchmark" | "profile") => void;
  isAiPanelOpen?: boolean;
  setIsAiPanelOpen?: (open: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onOpenGeneralAi?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab: propActiveTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      id: "map" as const,
      label: "Peta Saham",
      title: "01. Fundamental Stock Map (Treemap)",
      icon: Layers,
      href: "/market-map",
    },
    {
      id: "screener" as const,
      label: "Smart Screener",
      title: "02. Smart Fundamental Screener",
      icon: SlidersHorizontal,
      href: "/screener",
    },
    {
      id: "benchmark" as const,
      label: "Benchmark Sektor",
      title: "04. Sector Benchmark (Komparasi Sektor)",
      icon: TrendingUp,
      href: "/benchmark",
    },
    {
      id: "profile" as const,
      label: "Profil Investor",
      title: "Profil Investor & Pengaturan",
      icon: User,
      href: "/profile",
    },
  ];

  const isNavActive = (id: "map" | "screener" | "benchmark" | "profile") => {
    if (propActiveTab) return propActiveTab === id;
    if (id === "map") return pathname === "/market-map" || pathname === "/";
    if (id === "screener") return pathname.startsWith("/screener");
    if (id === "benchmark") return pathname.startsWith("/benchmark");
    if (id === "profile") return pathname.startsWith("/profile");
    return false;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-2xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container: Mendukung Buka/Tutup (w-60 <-> w-20) & Lekukan S-Curve Cutout Murni */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex flex-col justify-between bg-white dark:bg-[#16171f] transition-all duration-200 select-none ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${isCollapsed ? "w-20" : "w-60"}`}
        aria-label="Navigasi Utama Platform"
      >
        <div>
          {/* Brand Header (Logo Flat Solid Tanpa 3D + Tombol Buka/Tutup Sidebar) */}
          <div className="flex h-20 items-center justify-between px-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
                <BarChart3 className="h-5 w-5" aria-hidden="true" />
              </div>
              {!isCollapsed && (
                <div>
                  <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-zinc-100 block leading-tight whitespace-nowrap">
                    BEI Stock Insight
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium whitespace-nowrap">
                    Analisis Fundamental
                  </span>
                </div>
              )}
            </div>

            {/* Tombol Tutup di Mobile */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
              aria-label="Tutup Menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Menu Navigasi dengan Lekukan S-Curve Cutout (Persis Gambar Referensi 1) */}
          <nav className="mt-4 space-y-3 pl-3" aria-label="Menu Fitur Utama">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isNavActive(item.id);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    if (setActiveTab) setActiveTab(item.id);
                    setIsMobileOpen(false);
                  }}
                  title={item.title}
                  className={`group relative w-full flex items-center gap-3.5 rounded-l-full py-3.5 pl-4 pr-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${isActive
                      ? "bg-slate-50 text-emerald-600 dark:bg-[#0d0e13] dark:text-emerald-400"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                >
                  {/* Lengkungan Cekung Atas & Bawah (S-Curve Cutout Notch) Saat Aktif */}
                  {isActive && (
                    <>
                      <span
                        className="pointer-events-none absolute -top-4 right-0 h-4 w-4 rounded-br-2xl bg-transparent shadow-[8px_8px_0_0_#f8fafc] dark:shadow-[8px_8px_0_0_#0d0e13]"
                        aria-hidden="true"
                      />
                      <span
                        className="pointer-events-none absolute -bottom-4 right-0 h-4 w-4 rounded-tr-2xl bg-transparent shadow-[8px_-8px_0_0_#f8fafc] dark:shadow-[8px_-8px_0_0_#0d0e13]"
                        aria-hidden="true"
                      />
                    </>
                  )}

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
                      }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </div>
                  {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bagian Bawah: Info IHSG & Tombol Buka/Tutup Sidebar */}
        <div className="p-3 space-y-2.5">
          {!isCollapsed && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 text-xs dark:border-zinc-800/80 dark:bg-[#0d0e13]">
              <div className="flex items-center justify-between font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                  IHSG Acuan:
                </span>
                <span className="font-bold text-zinc-950 dark:text-zinc-100 tabular-nums">
                  7.180,40
                </span>
              </div>
              <p className="text-[10px] text-zinc-500">Laporan Keuangan Q3 2024</p>
            </div>
          )}

          {/* Tombol Buka / Tutup Sidebar Desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1e2029] p-2.5 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label={isCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
            title={isCollapsed ? "Buka Menu Sidebar" : "Kecilkan Menu Sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4 text-zinc-400 shrink-0" aria-hidden="true" />
                <span>Tutup Sidebar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
