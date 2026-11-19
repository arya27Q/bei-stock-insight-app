"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  ShieldCheck,
  Zap,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
  onSuccess?: () => void;
}

export function AuthRequiredModal({
  isOpen,
  onClose,
  reason = "Fitur Riset Fundamental & Analisis AI",
  onSuccess,
}: AuthRequiredModalProps) {
  const { login, register, quickDemoLogin } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("arya@beistockinsight.id");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<"Pemula" | "Menengah" | "Mahir">("Pemula");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email dan kata sandi wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      setSuccessMsg("Berhasil masuk! Membuka akses fitur...");
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 500);
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : "Gagal masuk. Periksa kembali email dan kata sandi.";
      setErrorMsg(msg);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim()) {
      setErrorMsg("Nama lengkap wajib diisi.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Alamat email tidak valid.");
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name,
        email,
        password,
        experienceLevel,
      });
      setSuccessMsg("Pendaftaran berhasil! Akun Anda aktif.");
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 500);
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : "Gagal mendaftar. Silakan coba kembali.";
      setErrorMsg(msg);
    }
  };

  const handleQuickDemo = async () => {
    setErrorMsg("");
    setIsLoading(true);
    try {
      await quickDemoLogin();
      setSuccessMsg("Masuk dengan akun demo berhasil!");
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 400);
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : "Gagal masuk akun demo.";
      setErrorMsg(msg);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-md rounded-2xl sm:rounded-3xl border border-zinc-800 bg-[#16171f] p-5 sm:p-7 shadow-2xl text-zinc-100 my-auto">
        {/* Tombol Tutup X */}
        <button
          onClick={onClose}
          aria-label="Tutup jendela login"
          className="absolute right-4 top-4 rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Header Modal */}
        <div className="text-center mb-5">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 shadow-xs">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 id="auth-modal-title" className="text-lg sm:text-xl font-bold tracking-tight text-white">
            Akses Fitur Terbatas
          </h2>
          <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            <span>{reason}</span>
          </div>
          <p className="mt-2 text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
            Silakan masuk atau buat akun investor gratis untuk membuka analisis fundamental penuh, watchlist, dan asisten AI.
          </p>
        </div>

        {/* Tab Switcher: Masuk vs Daftar */}
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-[#0d0e13] p-1 border border-zinc-800 mb-4">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setErrorMsg("");
            }}
            className={`rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "login"
                ? "bg-zinc-800 text-white shadow-xs"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("register");
              setErrorMsg("");
            }}
            className={`rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "register"
                ? "bg-zinc-800 text-white shadow-xs"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Alert Feedback */}
        {errorMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form Masuk */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-xl border border-zinc-800 bg-[#0d0e13] pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-zinc-300">
                  Kata Sandi
                </label>
                <Link
                  href="/forgot-password"
                  onClick={onClose}
                  className="text-[10px] text-emerald-400 hover:underline"
                >
                  Lupa Sandi?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-800 bg-[#0d0e13] pl-9 pr-9 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-emerald-900/20"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Masuk Sekarang</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </button>

            {/* Tombol Demo Cepat 1-Klik */}
            <div className="pt-2 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={handleQuickDemo}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                <span>Coba Cepat Akun Demo (1-Klik)</span>
              </button>
              <p className="mt-1.5 text-center text-[10px] text-zinc-500">
                Otomatis masuk sebagai <span className="text-zinc-300">Arya Pratama</span> (arya@beistockinsight.id)
              </p>
            </div>
          </form>
        )}

        {/* Form Daftar Baru */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Arya Pratama"
                  className="w-full rounded-xl border border-zinc-800 bg-[#0d0e13] pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@beistockinsight.id"
                  className="w-full rounded-xl border border-zinc-800 bg-[#0d0e13] pl-9 pr-3 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full rounded-xl border border-zinc-800 bg-[#0d0e13] pl-9 pr-9 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-300 mb-1">
                Tingkat Pengalaman Pasar
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as any)}
                className="w-full rounded-xl border border-zinc-800 bg-[#0d0e13] px-3 py-2 text-xs text-zinc-100 focus:border-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="Pemula">Pemula (Baru memulai riset saham)</option>
                <option value="Menengah">Menengah (Paham rasio kunci)</option>
                <option value="Mahir">Mahir (Analisis mendalam)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-emerald-900/20"
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Daftar Akun Investor</span>
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer info */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-zinc-500">
            Platform edukasi & riset keputusan investasi Bursa Efek Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
