"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Calculator,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { StockFundamental, LotSimulationResult } from "../../types/stock";
import { simulateLotPurchase } from "../../services/stock-service";

interface LotCalculatorProps {
  stock: StockFundamental;
  defaultOpen?: boolean;
}

const BUDGET_PRESETS = [
  { label: "1 Jt", value: 1000000 },
  { label: "5 Jt", value: 5000000 },
  { label: "10 Jt", value: 10000000 },
  { label: "25 Jt", value: 25000000 },
];

const FEE_PRESETS = [
  { label: "0.15% (Standar Beli)", value: 0.15 },
  { label: "0.20%", value: 0.2 },
  { label: "0.25%", value: 0.25 },
  { label: "0% (Bebas Fee)", value: 0.0 },
];

export const LotCalculator: React.FC<LotCalculatorProps> = ({
  stock,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [budget, setBudget] = useState<number>(5000000);
  const [feePercent, setFeePercent] = useState<number>(0.15);
  const [savedSimulation, setSavedSimulation] = useState<LotSimulationResult | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pricePerShare = stock.pricePerShare || 1000;
  const pricePerLot = stock.pricePerLot || pricePerShare * 100;

  // Kalkulasi instan dengan useMemo (responsif, tanpa cascading render)
  const calculation = useMemo<LotSimulationResult>(() => {
    const targetBudget = budget > 0 ? budget : 0;
    const feeRate = feePercent / 100;
    const costPerLotWithFee = pricePerLot * (1 + feeRate);
    const calculatedLots = costPerLotWithFee > 0 ? Math.floor(targetBudget / costPerLotWithFee) : 0;
    const totalStockCost = calculatedLots * pricePerLot;
    const brokerFeeAmount = Math.round(totalStockCost * feeRate);
    const totalSpent = totalStockCost + brokerFeeAmount;
    const remainingCash = Math.round(targetBudget - totalSpent);

    let aiCommentary = "";
    if (targetBudget <= 0) {
      aiCommentary = "Masukkan target modal pembelian untuk menghitung simulasi lot.";
    } else if (calculatedLots === 0) {
      aiCommentary = `Modal Anda (Rp ${targetBudget.toLocaleString("id-ID")}) belum mencukupi untuk membeli 1 lot ${stock.ticker} (Rp ${pricePerLot.toLocaleString("id-ID")}/lot + fee). Diperlukan tambahan dana minimal Rp ${Math.round(costPerLotWithFee - targetBudget).toLocaleString("id-ID")}.`;
    } else if (remainingCash > pricePerLot * 0.4) {
      aiCommentary = `Dengan modal Rp ${targetBudget.toLocaleString("id-ID")}, Anda mendapatkan ${calculatedLots} Lot (${calculatedLots * 100} lembar). Terdapat sisa kas Rp ${remainingCash.toLocaleString("id-ID")} (${Math.round((remainingCash / targetBudget) * 100)}% dari modal). Pertimbangkan mengalokasikan sisa kas ke saham defensif lain untuk diversifikasi portofolio.`;
    } else {
      aiCommentary = `Alokasi modal sangat optimal: ${calculatedLots} Lot (${calculatedLots * 100} lembar) saham ${stock.ticker} dengan sisa kas minimal Rp ${remainingCash.toLocaleString("id-ID")}. Pertimbangkan strategi Dollar Cost Averaging (DCA) bertahap untuk menjaga risiko harga.`;
    }

    return {
      stockTicker: stock.ticker,
      pricePerShare,
      pricePerLot,
      targetBudget,
      brokerFeePercent: feePercent,
      calculatedLots,
      totalStockCost,
      brokerFeeAmount,
      totalSpent,
      remainingCash,
      aiCommentary,
    };
  }, [budget, feePercent, pricePerLot, pricePerShare, stock.ticker]);

  // Simpan hasil simulasi ke database MySQL backend
  const handleSaveToDatabase = useCallback(async () => {
    if (!budget || budget <= 0) {
      setError("Target modal pembelian harus lebih besar dari Rp 0.");
      return;
    }
    setError(null);
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const result = await simulateLotPurchase(stock.ticker, budget, feePercent);
      setSavedSimulation(result);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setError("Gagal menyimpan simulasi, namun kalkulasi tetap aktif.");
    } finally {
      setIsSaving(false);
    }
  }, [budget, feePercent, stock.ticker]);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, "");
    const num = Number(rawVal);
    setBudget(num);
    setSavedSimulation(null);
  };

  const activeSimulation = savedSimulation || calculation;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden transition-all shadow-2xs">
      {/* Header Accordion: Bisa dibuka/tutup kapan saja */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 text-left hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <Calculator className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                Kalkulator Lot Saham ({stock.ticker})
              </span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                1 Lot = 100 Lbr
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
              Simulasi alokasi modal dan sisa kas beli saham
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 hidden sm:inline-block">
            {isOpen ? "Tutup" : "Buka Kalkulator"}
          </span>
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {isOpen ? (
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            )}
          </div>
        </div>
      </button>

      {/* Konten Kalkulator (Ditampilkan jika isOpen = true) */}
      {isOpen && (
        <div className="p-4 pt-1 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
          {/* Ringkasan Harga Lembar vs Lot */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2">
            <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
              <span className="text-[10px] text-zinc-400 block">Harga per Lembar</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums mt-0.5 block">
                Rp {pricePerShare.toLocaleString("id-ID")}
              </span>
            </div>
            <div className="rounded-xl bg-zinc-50 p-2.5 dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
              <span className="text-[10px] text-zinc-400 block">Harga 1 Lot (x100)</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums mt-0.5 block">
                Rp {pricePerLot.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          {/* Form Input Modal & Fee Broker */}
          <div className="space-y-3 pt-1">
            <div>
              <label htmlFor="lot-budget-input" className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Target Modal Pembelian (Rupiah)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                  Rp
                </span>
                <input
                  id="lot-budget-input"
                  type="text"
                  value={budget > 0 ? budget.toLocaleString("id-ID") : ""}
                  onChange={handleBudgetChange}
                  placeholder="5.000.000"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs font-bold text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:bg-zinc-800 tabular-nums"
                />
              </div>

              {/* Preset Buttons Modal Cepat */}
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[10px] text-zinc-400 mr-1">Preset:</span>
                {BUDGET_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => {
                      setBudget(p.value);
                      setSavedSimulation(null);
                    }}
                    className={`rounded-lg px-2 py-1 text-[10px] font-semibold transition-all cursor-pointer ${
                      budget === p.value
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    Rp {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pilihan Fee Broker */}
            <div>
              <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Estimasi Biaya Transaksi / Broker Fee
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {FEE_PRESETS.map((fp) => (
                  <button
                    key={fp.value}
                    type="button"
                    onClick={() => {
                      setFeePercent(fp.value);
                      setSavedSimulation(null);
                    }}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium text-left transition-all cursor-pointer ${
                      feePercent === fp.value
                        ? "border-emerald-600 bg-emerald-500/10 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-300 font-semibold"
                        : "border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#16171f] dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {fp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-300 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Hasil Perhitungan Simulasi Lot */}
          <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Hasil Simulasi Transaksi
              </span>
              <button
                type="button"
                onClick={handleSaveToDatabase}
                disabled={isSaving || budget <= 0}
                className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors disabled:opacity-40 cursor-pointer"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <BookmarkCheck className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Tersimpan</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="h-3 w-3 opacity-60" />
                    <span>Simpan Simulasi</span>
                  </>
                )}
              </button>
            </div>

            {/* Kartu Utama: Jumlah Lot yang Didapat */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold block">
                    Maksimal Pembelian
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-200 tabular-nums">
                      {activeSimulation.calculatedLots}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      Lot
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 ml-1">
                      ({activeSimulation.calculatedLots * 100} lembar)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block">Sisa Kas Tersisa</span>
                  <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">
                    Rp {activeSimulation.remainingCash.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>

            {/* Rincian Finansial Transaksi */}
            <div className="space-y-1.5 rounded-xl bg-zinc-50 p-3 text-xs dark:bg-[#16171f] border border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                <span>Nilai Saham ({activeSimulation.calculatedLots} Lot)</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                  Rp {activeSimulation.totalStockCost.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                <span>Estimasi Fee Broker ({activeSimulation.brokerFeePercent}%)</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                  Rp {activeSimulation.brokerFeeAmount.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="pt-1.5 mt-1 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between font-bold text-zinc-950 dark:text-zinc-50">
                <span>Total Dana Terpakai</span>
                <span className="tabular-nums">
                  Rp {activeSimulation.totalSpent.toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* AI Commentary & Manajemen Risiko */}
            {activeSimulation.aiCommentary && (
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 text-xs leading-relaxed dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-zinc-800 dark:text-zinc-200">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Analisis Alokasi Modal & Risiko:</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                  {activeSimulation.aiCommentary}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
