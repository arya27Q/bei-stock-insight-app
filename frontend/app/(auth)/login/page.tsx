"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("arya@beistockinsight.id");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Alamat email wajib diisi.");
      return;
    }
    if (!password.trim()) {
      setErrorMsg("Kata sandi wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      setIsLoading(false);
      router.push("/");
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Gagal masuk. Periksa kembali email dan kata sandi Anda.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0e13] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Header Back Link */}
      <div className="mx-auto w-full max-w-md flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Kembali ke Dashboard</span>
        </Link>
        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Data Aman
        </span>
      </div>

      {/* Main Login Card */}
      <div className="mx-auto w-full max-w-md my-auto">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xl dark:border-zinc-800/80 dark:bg-[#16171f] space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <BarChart3 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Masuk ke BEI Stock Insight
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Akses analisis fundamental saham, screener cerdas, dan interpretasi AI mandiri.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Alamat Email
              </label>
              <div className="relative">
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                />
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Kata Sandi
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Masukkan kata sandi..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-11 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                />
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
            >
              <span>{isLoading ? "Memproses Masuk..." : "Masuk ke Dashboard"}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          {/* Akun Demo Praktis */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-3.5 dark:border-zinc-800/80 dark:bg-[#0d0e13] text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
              <span>Akses Cepat Mode Demo:</span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Formulir di atas sudah terisi akun investor default. Tekan tombol <strong>Masuk ke Dashboard</strong> untuk langsung mengeksplorasi seluruh fitur.
            </p>
          </div>

          {/* Footer Register Link */}
          <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Belum memiliki akun? </span>
            <Link
              href="/register"
              className="font-bold text-zinc-950 dark:text-emerald-400 hover:underline"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="text-center text-[11px] text-zinc-400">
        © 2026 BEI Stock Insight. Platform riset fundamental saham untuk investor mandiri.
      </footer>
    </div>
  );
}
