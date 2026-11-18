"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  User,
  Mail,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  Save,
  CheckCircle2,
  Sparkles,
  Bookmark,
  Bell,
  Sliders,
  Trash2,
  Plus,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useDashboard } from "@/context/DashboardContext";
import { DropdownSelect } from "@/components/ui/DropdownSelect";
import { Avatar } from "@/components/ui/Avatar";

const EXPERIENCE_OPTIONS = [
  { value: "Pemula", label: "Pemula (Baru memulai riset)", dotColor: "bg-emerald-500" },
  { value: "Menengah", label: "Menengah (Paham rasio kunci)", dotColor: "bg-amber-500" },
  { value: "Mahir", label: "Mahir (Analisis mendalam)", dotColor: "bg-blue-500" },
];

const SECTOR_OPTIONS = [
  { value: "Semua Sektor", label: "Semua Sektor Industri" },
  { value: "Keuangan", label: "Keuangan & Perbankan", dotColor: "bg-blue-500" },
  { value: "Barang Konsumsi Primer", label: "Barang Konsumsi Primer", dotColor: "bg-emerald-500" },
  { value: "Infrastruktur", label: "Infrastruktur & Telekomunikasi", dotColor: "bg-purple-500" },
  { value: "Energi", label: "Energi & Sumber Daya", dotColor: "bg-amber-500" },
  { value: "Kesehatan", label: "Kesehatan & Farmasi", dotColor: "bg-rose-500" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoaded, updateProfile, logout } = useAuth();
  const { watchlistStocks, toggleWatchlist, selectStock } = useDashboard();

  const [name, setName] = useState(user?.name || "Andreas Peter Parker");
  const [email, setEmail] = useState(user?.email || "Parker@beistockinsight.id");
  const [experienceLevel, setExperienceLevel] = useState<"Pemula" | "Menengah" | "Mahir">(
    user?.experienceLevel || "Pemula"
  );
  const [preferredSector, setPreferredSector] = useState(
    user?.preferredSectors?.[0] || "Keuangan"
  );
  const [bio, setBio] = useState(
    user?.bio || "Fokus mengoleksi saham perbankan dan konsumsi yang mencetak pertumbuhan laba konsisten."
  );
  const [notifications, setNotifications] = useState(user?.notificationsEnabled ?? true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      experienceLevel,
      preferredSectors: [preferredSector],
      bio,
      notificationsEnabled: notifications,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0d0e13] flex items-center justify-center text-xs text-zinc-400">
        Memuat profil pengguna...
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Navbar */}
      <header className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Kembali ke Dashboard</span>
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
              <BarChart3 className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
              BEI Stock Insight
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Akun Aktif
          </span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Keluar</span>
          </button>
        </div>
      </header>

      {/* Success Alert */}
      {isSaved && (
        <div className="flex items-center justify-between rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-4 text-xs text-emerald-700 dark:text-emerald-400">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Profil dan preferensi investasi kamu berhasil disimpan!</span>
          </div>
          <button
            type="button"
            onClick={() => setIsSaved(false)}
            className="text-xs font-bold hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Profile Identity Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-7 shadow-xs dark:border-zinc-800/80 dark:bg-[#16171f]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-base sm:text-xl font-bold text-white shadow-md">
              {name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase() || "IN"}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 truncate">
                  {name}
                </h1>
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  {experienceLevel}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{email}</p>
              <p className="text-[10.5px] sm:text-[11px] text-zinc-400 mt-1">
                Bergabung sejak {user?.joinedDate || "November 2024"} • Basis Riset Q3 2024
              </p>
            </div>
          </div>

          {/* Quick Stat: Sektor Prioritas */}
          <div className="rounded-xl sm:rounded-2xl border border-zinc-200/80 bg-zinc-50 p-3 sm:p-4 dark:border-zinc-800/80 dark:bg-[#0d0e13] text-left sm:text-right sm:min-w-[210px]">
            <span className="text-[10.5px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 block">
              Sektor Prioritas Pantauan
            </span>
            <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50 block mt-0.5">
              {preferredSector}
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
              Basis Riset Q3 2024 Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Form Pengaturan & Simulasi Keterjangkauan Lot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Kolom Kiri: Form Ubah Profil (2 Kolom) */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800/80 dark:bg-[#16171f]">
            <div className="flex items-center gap-2 pb-3.5 border-b border-zinc-100 dark:border-zinc-800 mb-5">
              <Sliders className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <h2 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                Preferensi & Identitas Investor
              </h2>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <input
                      id="profile-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:focus:border-emerald-500"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                  >
                    Alamat Email
                  </label>
                  <div className="relative">
                    <input
                      id="profile-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:focus:border-emerald-500"
                    />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                  >
                    Tingkat Pengalaman Pasar
                  </label>
                  <DropdownSelect
                    ariaLabel="Tingkat Pengalaman Pasar"
                    align="left"
                    className="w-full"
                    buttonClassName="py-2.5 px-3.5 w-full bg-zinc-50 dark:bg-[#0d0e13] border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 justify-between h-[42px]"
                    menuClassName="w-full min-w-full max-w-full"
                    value={experienceLevel}
                    onChange={(val) =>
                      setExperienceLevel(val as "Pemula" | "Menengah" | "Mahir")
                    }
                    options={EXPERIENCE_OPTIONS}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                  >
                    Sektor Prioritas Pantauan
                  </label>
                  <DropdownSelect
                    ariaLabel="Sektor Prioritas Pantauan"
                    align="left"
                    className="w-full"
                    buttonClassName="py-2.5 px-3.5 w-full bg-zinc-50 dark:bg-[#0d0e13] border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-zinc-100 justify-between h-[42px]"
                    menuClassName="w-full min-w-full max-w-full"
                    value={preferredSector}
                    onChange={(val) => setPreferredSector(val)}
                    options={SECTOR_OPTIONS}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-bio"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Fokus & Catatan Strategi Investasi
                </label>
                <textarea
                  id="profile-bio"
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tuliskan catatan strategi atau tujuan investasimu..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-900 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
                <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
                  />
                  <span className="flex items-center gap-1.5">
                    <Bell className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                    Notifikasi pembaruan rilis laporan keuangan kuartalan
                  </span>
                </label>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 transition-colors shadow-xs cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Watchlist Saham Pilihan Dinamis */}
          <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4 sm:p-6 shadow-xs dark:border-zinc-800/80 dark:bg-[#16171f]">
            <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-zinc-100 dark:border-zinc-800 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-emerald-500 fill-emerald-500" aria-hidden="true" />
                <h2 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                  Daftar Saham Pantauan (Watchlist)
                </h2>
                <span suppressHydrationWarning className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {watchlistStocks.length} Saham
                </span>
              </div>
              <Link
                href="/market-map"
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Buka Peta Pasar</span>
                <span>→</span>
              </Link>
            </div>

            {watchlistStocks.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center space-y-3">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    Belum Ada Saham di Watchlist
                  </h3>
                  <p className="text-[11px] text-zinc-400 max-w-sm mx-auto mt-1 leading-relaxed">
                    Tandai saham favoritmu dengan mengeklik ikon bintang/bookmark di Peta Saham atau Smart Screener untuk memantau valuasi dan pergerakannya.
                  </p>
                </div>
                <Link
                  href="/market-map"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Jelajahi Saham BEI</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {watchlistStocks.map((stock) => (
                  <div
                    key={stock.ticker}
                    onClick={() => {
                      selectStock(stock);
                      router.push("/market-map");
                    }}
                    className="group relative rounded-2xl border border-zinc-200 bg-zinc-50/70 p-3.5 hover:border-emerald-500/50 hover:bg-white dark:border-zinc-800 dark:bg-[#0d0e13] dark:hover:border-emerald-500/40 dark:hover:bg-zinc-900 transition-all cursor-pointer block shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar ticker={stock.ticker} sector={stock.sector} size="sm" />
                        <div className="min-w-0">
                          <span className="font-bold text-sm text-zinc-950 dark:text-zinc-50 block leading-tight">
                            {stock.ticker}
                          </span>
                          <span className="text-[10px] font-semibold text-zinc-500 block truncate mt-0.5">
                            {stock.sector}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(stock.ticker);
                        }}
                        title={`Hapus ${stock.ticker} dari watchlist`}
                        className="p-1 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="text-xs text-zinc-600 dark:text-zinc-300 block mt-2 line-clamp-1 font-medium">
                      {stock.name}
                    </span>

                    <div className="mt-2.5 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                        ROE {stock.roe}% • PER {stock.per}x
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-mono tabular-nums">
                        Rp {(stock.pricePerLot || (stock.pricePerShare || 1000) * 100).toLocaleString("id-ID")}/lot
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Panduan Satuan Lot Saham BEI (1 Lot = 100 Lembar) */}
        <div className="space-y-4 sm:space-y-6">
          <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/5 to-white dark:from-emerald-950/20 dark:to-[#16171f] p-4 sm:p-6 shadow-xs border-zinc-200 dark:border-zinc-800 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <Sparkles className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                Ketentuan Satuan Lot Saham BEI
              </h3>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Di Bursa Efek Indonesia, perdagangan saham resmi dilakukan dalam kelipatan <strong>1 lot (100 lembar)</strong>. Berikut rincian nilai modal minimum 1 lot untuk saham pantauan kamu:
            </p>

            <div className="space-y-3">
              {(watchlistStocks.length > 0 ? watchlistStocks : []).map((stock) => (
                <div
                  key={stock.ticker}
                  className="rounded-2xl border border-zinc-200 bg-white p-3.5 dark:border-zinc-800 dark:bg-[#0d0e13] space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <Avatar ticker={stock.ticker} sector={stock.sector} size="sm" />
                      <span className="text-zinc-950 dark:text-zinc-100">{stock.ticker}</span>
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-400 font-normal">
                      Rp {(stock.pricePerShare || 1000).toLocaleString("id-ID")}/lbr
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1.5 border-t border-zinc-100 dark:border-zinc-800/80">
                    <span>Modal 1 Lot (100 lbr):</span>
                    <span className="font-mono tabular-nums">
                      Rp {(stock.pricePerLot || (stock.pricePerShare || 1000) * 100).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              ))}

              {watchlistStocks.length === 0 && (
                <div className="p-4 text-center text-xs text-zinc-400">
                  Tambahkan saham ke watchlist untuk melihat hitungan modal per lot.
                </div>
              )}
            </div>

            <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/80 p-3 text-[11px] text-zinc-500 space-y-1">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300 block">
                Prinsip Riset Fundamental:
              </span>
              <p className="leading-relaxed">
                Pilihlah saham yang mencetak ROE tinggi dan PER wajar, bukan semata karena nominal harga per lot yang murah.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
