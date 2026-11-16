"use client";

import React from "react";
import Link from "next/link";
import { DashboardProvider, useDashboard } from "@/context/DashboardContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { RightAiPanel } from "@/components/layout/RightAiPanel";
import {
  Search,
  Menu,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  User,
} from "lucide-react";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const {
    stocks,
    selectedStock,
    selectStock,
    clearSelectedStock,
    navigateToBenchmark,
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isRightAiOpen,
    setIsRightAiOpen,
    toggleRightAi,
    openGeneralAi,
    searchQuery,
    searchResults,
    isSearching,
    handleSearchChange,
    handleSelectFromSearch,
    pageTitle,
  } = useDashboard();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-zinc-900 dark:bg-[#16171f] dark:text-zinc-100 flex">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        isAiPanelOpen={isRightAiOpen}
        setIsAiPanelOpen={setIsRightAiOpen}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={() => toggleSidebar()}
        onOpenGeneralAi={openGeneralAi}
      />

      {/* 2. Main Shell Frame */}
      <div
        className={`flex-1 min-w-0 flex flex-col justify-between transition-all duration-200 ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-60"
        } ${isRightAiOpen ? "lg:pr-[410px] xl:pr-[440px] 2xl:pr-[470px]" : ""}`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-3 bg-white px-4 sm:px-6 dark:bg-[#16171f]">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {/* Tombol Buka Menu Mobile */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:hidden shrink-0 cursor-pointer"
              aria-label="Buka Menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Tombol Buka/Tutup Sidebar Desktop */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-[#1e2029] dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title={isSidebarCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
              aria-label={isSidebarCollapsed ? "Buka Sidebar" : "Tutup Sidebar"}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="h-4 w-4" aria-hidden="true" />
              ) : (
                <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <label htmlFor="top-search-input" className="sr-only">
                Cari kode atau nama emiten
              </label>
              <input
                id="top-search-input"
                type="text"
                placeholder="Cari emiten (BBCA, BBRI, TLKM)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full rounded-xl border border-transparent bg-zinc-100/80 pl-4 pr-10 py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-700 focus:bg-white focus:outline-none dark:bg-[#1e2029] dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:bg-[#1e2029]"
              />
              <Search
                className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                aria-hidden="true"
              />

              {/* Autocomplete Dropdown */}
              {isSearching && (
                <div className="absolute left-0 right-0 sm:min-w-[380px] top-11 z-40 max-h-64 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-[#16171f] text-left">
                  {searchResults.length === 0 ? (
                    <div className="p-3 text-center text-xs text-zinc-400">
                      Emiten tidak ditemukan.
                    </div>
                  ) : (
                    searchResults.map((s) => (
                      <button
                        key={s.ticker}
                        onClick={() => handleSelectFromSearch(s)}
                        className="w-full grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-left cursor-pointer"
                      >
                        <span className="text-xs font-bold text-zinc-950 dark:text-zinc-100">
                          {s.ticker}
                        </span>
                        <span className="text-xs text-zinc-400 leading-snug">
                          {s.name}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-500 tabular-nums whitespace-nowrap">
                          {s.marketCapLabel}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Kanan: Judul Fitur Aktif & Tombol Buka/Tutup Panel AI */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden xl:inline text-xs font-semibold text-zinc-400">
              {pageTitle}
            </span>

            <Link
              href="/profile"
              title="Profil Investor & Pengaturan"
              className="flex h-10 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-[#1e2029] dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                <User className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <span className="hidden md:inline">Profil</span>
            </Link>

            <button
              onClick={toggleRightAi}
              className={`flex h-10 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                isRightAiOpen
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-[#1e2029] dark:text-zinc-200 dark:hover:bg-zinc-800"
              }`}
              aria-expanded={isRightAiOpen}
              aria-label="Buka atau tutup panel Penjelasan AI dan Profil Emiten"
            >
              <MessageSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">
                {isRightAiOpen ? "Tutup Panel AI" : "Buka Panel AI"}
              </span>
              {isRightAiOpen ? (
                <PanelRightClose className="h-3.5 w-3.5 opacity-80 shrink-0" aria-hidden="true" />
              ) : (
                <PanelRightOpen className="h-3.5 w-3.5 opacity-80 shrink-0" aria-hidden="true" />
              )}
            </button>
          </div>
        </header>

        {/* Kanvas Utama Dalam */}
        <main className="@container flex-1 rounded-tl-[28px] bg-slate-50 dark:bg-[#0d0e13] px-4 py-6 sm:px-6 lg:px-7">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-50 dark:bg-[#0d0e13] border-t border-zinc-200/70 dark:border-zinc-800/60 py-4 px-4 sm:px-6 lg:px-7 text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 BEI Stock Insight: Riset Fundamental Saham Bursa Efek Indonesia.</p>
          <p className="text-zinc-400">
            Sumber: BEI / IDX • Periode Laporan: Q3 2024 (Diperbarui 15 Nov 2024 • Status: Terverifikasi). Disajikan untuk analisis edukasi mandiri.
          </p>
        </footer>
      </div>

      {/* 3. Right Panel: 03. Company Fundamental Profile & 05. AI Fundamental Explanation */}
      <RightAiPanel
        stock={selectedStock}
        isOpen={isRightAiOpen}
        onClose={() => setIsRightAiOpen(false)}
        onClearStock={clearSelectedStock}
        onSelectStock={selectStock}
        onNavigateToBenchmark={navigateToBenchmark}
        stocks={stocks}
      />
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
