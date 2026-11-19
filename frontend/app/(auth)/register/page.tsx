"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<"Pemula" | "Menengah" | "Mahir">("Pemula");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Nama lengkap wajib diisi.");
      return;
    }
    if (!email.trim()) {
      setErrorMsg("Alamat email wajib diisi.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Kata sandi minimal 6 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("Harap setujui ketentuan penggunaan platform.");
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name,
        email,
        password,
        experienceLevel,
        preferredSectors: ["Keuangan", "Barang Konsumsi Primer"],
      });
      setIsLoading(false);
      router.push("/");
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Gagal mendaftarkan akun. Silakan coba kembali.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0e13] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Header Back Link */}
      <div className="mx-auto w-full max-w-lg flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Kembali ke Dashboard</span>
        </Link>
        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Registrasi Terverifikasi
        </span>
      </div>

      {/* Main Register Card */}
      <div className="mx-auto w-full max-w-lg my-6">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9 shadow-xl dark:border-zinc-800/80 dark:bg-[#16171f] space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <BarChart3 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Daftar Akun Investor BEI
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Mulai riset fundamental saham dengan simulator modal terjangkau dan bantuan analisis AI.
            </p>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form Registrasi */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  id="register-name"
                  type="text"
                  required
                  placeholder="Contoh: Arya Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                />
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Alamat Email
              </label>
              <div className="relative">
                <input
                  id="register-email"
                  type="email"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label
                  htmlFor="register-password"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
                  />
                  <Lock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-confirm-password"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Ulangi Kata Sandi
                </label>
                <div className="relative">
                  <input
                    id="register-confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Ulangi kata sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500"
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
            </div>

            {/* Tingkat Pengalaman */}
            <div>
              <span className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Tingkat Pengalaman di Bursa Efek Indonesia:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(["Pemula", "Menengah", "Mahir"] as const).map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => setExperienceLevel(level)}
                    className={`rounded-xl py-2 px-3 text-xs font-semibold border transition-all cursor-pointer ${
                      experienceLevel === level
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                        : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-400"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Checkbox Ketentuan */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-800 shrink-0"
                />
                <span>
                  Saya memahami bahwa BEI Stock Insight adalah platform riset dan edukasi mandiri, bukan layanan penasihat investasi atau ajakan jual/beli saham.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 transition-colors shadow-sm disabled:opacity-60 cursor-pointer mt-2"
            >
              <span>{isLoading ? "Mendaftarkan Akun..." : "Daftar Akun Investor"}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          {/* Footer Login Link */}
          <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Sudah memiliki akun terdaftar? </span>
            <Link
              href="/login"
              className="font-bold text-zinc-950 dark:text-emerald-400 hover:underline"
            >
              Masuk di sini
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="text-center text-[11px] text-zinc-400">
        © 2026 BEI Stock Insight. Seluruh data keuangan disajikan untuk analisis edukasi mandiri.
      </footer>
    </div>
  );
}
