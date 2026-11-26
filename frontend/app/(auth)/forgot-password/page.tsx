"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { forgotPasswordApi, resetPasswordApi } from "@/services/auth-service";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isResetDone, setIsResetDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Masukkan alamat email yang valid.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await forgotPasswordApi(email);
      setIsLoading(false);
      if (res.demoResetCode) {
        setResetCode(res.demoResetCode);
      }
      setIsSubmitted(true);
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Gagal memproses permintaan reset.";
      setErrorMsg(message);
    }
  };

  const handleResetConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!resetCode.trim()) {
      setErrorMsg("Kode pemulihan wajib diisi.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg("Kata sandi baru minimal 6 karakter.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPasswordApi(email, resetCode.trim(), newPassword);
      setIsLoading(false);
      setIsResetDone(true);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: unknown) {
      setIsLoading(false);
      const message = err instanceof Error ? err.message : "Gagal mengatur ulang kata sandi.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0e13] text-zinc-900 dark:text-zinc-100 flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Header Back Link */}
      <div className="mx-auto w-full max-w-md flex items-center justify-between">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>
        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          Pemulihan Aman
        </span>
      </div>

      {/* Main Card */}
      <div className="mx-auto w-full max-w-md my-auto">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 sm:p-8 shadow-xl dark:border-zinc-800/80 dark:bg-[#16171f] space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-[#1e2029] dark:text-emerald-400 shadow-md">
              <KeyRound className="h-6 w-6" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              Atur Ulang Kata Sandi
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Masukkan alamat email akun investor kamu untuk membuat kode verifikasi pemulihan kata sandi.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-3 text-xs text-rose-600 dark:text-rose-400 font-medium">
              {errorMsg}
            </div>
          )}

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                >
                  Alamat Email Terdaftar
                </label>
                <div className="relative">
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500 dark:focus:bg-[#0d0e13]"
                  />
                  <Mail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
              >
                <span>{isLoading ? "Membuat Kode..." : "Buat Kode Verifikasi"}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div className="space-y-4 py-2">
              <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center space-y-2">
                <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500" aria-hidden="true" />
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {isResetDone ? "Kata Sandi Berhasil Diperbarui" : "Kode Verifikasi Siap Digunakan"}
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {isResetDone ? (
                    "Mengalihkan Anda ke halaman masuk..."
                  ) : (
                    <strong className="block text-zinc-900 dark:text-white">{email}</strong>
                  )}
                </p>
              </div>

              {!isResetDone && (
                <form onSubmit={handleResetConfirm} className="space-y-3.5">
                  <div>
                    <label
                      htmlFor="reset-code"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                    >
                      Kode Verifikasi (6 Digit)
                    </label>
                    <input
                      id="reset-code"
                      type="text"
                      required
                      placeholder="Masukkan 6 digit kode"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs sm:text-sm font-mono tracking-widest text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500 dark:focus:bg-[#0d0e13]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
                    >
                      Kata Sandi Baru
                    </label>
                    <div className="relative">
                      <input
                        id="new-password"
                        type="password"
                        required
                        placeholder="Minimal 6 karakter"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-[#0d0e13] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-500 dark:focus:bg-[#0d0e13]"
                      />
                      <Lock
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-emerald-600 dark:text-white dark:hover:bg-emerald-500 transition-colors shadow-sm disabled:opacity-60 cursor-pointer"
                  >
                    <span>{isLoading ? "Memperbarui Sandi..." : "Simpan Kata Sandi Baru"}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}

              <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-400">
                Ingin mengganti email atau membuat kode baru?{" "}
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Buat kode ulang
                </button>
                .
              </p>

              <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Kembali ke Halaman Masuk</span>
              </Link>
            </div>
          )}

          {/* Footer Back Link */}
          <div className="text-center pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Ingat kata sandi akunmu? </span>
            <Link
              href="/login"
              className="font-bold text-zinc-950 dark:text-emerald-400 hover:underline"
            >
              Masuk sekarang
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
