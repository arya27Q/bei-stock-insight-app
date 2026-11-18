"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ArrowLeftRight,
  ArrowUpDown,
  CheckCircle2,
  Award,
  Sparkles,
  BarChart3,
  ChevronDown,
  Search,
  Check,
} from "lucide-react";
import { StockFundamental } from "../../types/stock";
import { Avatar } from "../ui/Avatar";

interface StockComparisonViewProps {
  stocks: StockFundamental[];
  onSelectStock?: (stock: StockFundamental) => void;
  initialStockA?: string;
  initialStockB?: string;
}

interface RivalryPreset {
  label: string;
  tickerA: string;
  tickerB: string;
  tag: string;
}

const RIVALRY_PRESETS: RivalryPreset[] = [
  { label: "BBCA vs BBRI", tickerA: "BBCA", tickerB: "BBRI", tag: "Bank Swasta vs BUMN" },
  { label: "BMRI vs BBNI", tickerA: "BMRI", tickerB: "BBNI", tag: "Duo Bank BUMN" },
  { label: "TLKM vs ISAT", tickerA: "TLKM", tickerB: "ISAT", tag: "Duopoli Telko" },
  { label: "ASII vs UNTR", tickerA: "ASII", tickerB: "UNTR", tag: "Otomotif vs Alat Berat" },
  { label: "ADRO vs PTBA", tickerA: "ADRO", tickerB: "PTBA", tag: "Batu Bara Swasta vs BUMN" },
  { label: "ICBP vs INDF", tickerA: "ICBP", tickerB: "INDF", tag: "Grup Indofood" },
  { label: "KLBF vs SIDO", tickerA: "KLBF", tickerB: "SIDO", tag: "Farmasi vs Jamu Herbal" },
  { label: "GOTO vs BUKA", tickerA: "GOTO", tickerB: "BUKA", tag: "Ekosistem Digital" },
  { label: "PGAS vs PGEO", tickerA: "PGAS", tickerB: "PGEO", tag: "Gas Bumi vs Geothermal" },
  { label: "AMMN vs ANTM", tickerA: "AMMN", tickerB: "ANTM", tag: "Tembaga vs Emas Nikel" },
];

interface StockSelectorCardProps {
  label: string;
  period: string;
  dataSource: string;
  variant: "emerald" | "blue";
  selectedStock: StockFundamental;
  disabledTicker: string;
  stocks: StockFundamental[];
  onSelect: (stock: StockFundamental) => void;
}

const StockSelectorCard: React.FC<StockSelectorCardProps> = ({
  label,
  period,
  dataSource,
  variant,
  selectedStock,
  disabledTicker,
  stocks,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredStocks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return stocks;
    return stocks.filter(
      (s) =>
        s.ticker.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q)
    );
  }, [stocks, searchQuery]);

  const borderColor =
    variant === "emerald"
      ? "border-emerald-500/40 dark:border-emerald-500/30"
      : "border-blue-500/40 dark:border-blue-500/30";

  const labelColor =
    variant === "emerald"
      ? "text-emerald-700 dark:text-emerald-400"
      : "text-blue-700 dark:text-blue-400";

  return (
    <div
      ref={dropdownRef}
      className={`relative rounded-xl sm:rounded-2xl border ${borderColor} bg-white p-3 sm:p-4 shadow-2xs dark:bg-zinc-900 transition-all`}
    >
      {/* Top Header Card */}
      <div className="flex items-center justify-between mb-1.5 sm:mb-2">
        <span className={`text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider ${labelColor}`}>
          {label}
        </span>
        <span className="text-[9.5px] sm:text-[10px] text-zinc-400 font-mono">
          {period} • {dataSource}
        </span>
      </div>

      {/* Trigger Button Pembuka Dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-left group flex items-center sm:items-start gap-2.5 rounded-xl p-1.5 -m-1.5 sm:p-2 sm:-m-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
      >
        <Avatar ticker={selectedStock.ticker} sector={selectedStock.sector} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold font-sans text-zinc-950 dark:text-zinc-50 tracking-tight">
              {selectedStock.ticker}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 sm:bg-transparent sm:dark:bg-transparent sm:p-0 text-[10px] sm:text-[11px] font-semibold text-zinc-500 dark:text-zinc-300 sm:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors shrink-0">
              <span>Ganti</span>
              <span className="hidden sm:inline">Saham</span>
              <ChevronDown
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </span>
          </div>

          {/* Nama Lengkap Emiten */}
          <div className="text-[11.5px] sm:text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-snug mt-0.5 break-words">
            {selectedStock.name}
          </div>

          <div className="mt-1 flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] text-zinc-500 flex-wrap">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              {selectedStock.sector}
            </span>
            <span>•</span>
            <span className="font-mono">
              Rp {selectedStock.pricePerShare ? selectedStock.pricePerShare.toLocaleString("id-ID") : "-"} / lbr
            </span>
            <span>•</span>
            <span className="font-mono text-zinc-400">
              {selectedStock.marketCapLabel}
            </span>
          </div>
        </div>
      </button>

      {/* Dropdown Popover Custom (Seluruh Nama Emiten Ditampilkan Lengkap 100%) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-700/80 dark:bg-[#181a24] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Kolom Pencarian Cepat di Dalam Dropdown */}
          <div className="p-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari kode atau nama emiten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-zinc-200 bg-white pl-8 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
          </div>

          {/* List Emiten dengan Nama Lengkap Utuh */}
          <div className="max-h-72 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/80 p-1">
            {filteredStocks.map((stock) => {
              const isCurrent = stock.ticker === selectedStock.ticker;
              const isDisabled = stock.ticker === disabledTicker;

              return (
                <button
                  key={stock.ticker}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    onSelect(stock);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                    isCurrent
                      ? "bg-emerald-500/10 text-emerald-950 dark:bg-emerald-500/15 dark:text-emerald-100"
                      : isDisabled
                      ? "opacity-40 cursor-not-allowed bg-zinc-50/50 dark:bg-zinc-900/40"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  <Avatar ticker={stock.ticker} sector={stock.sector} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs font-sans text-zinc-950 dark:text-zinc-50">
                          {stock.ticker}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-medium">
                          ({stock.sector})
                        </span>
                      </div>
                      {isCurrent && (
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isDisabled && (
                        <span className="text-[10px] text-zinc-400 font-medium">
                          Dipilih
                        </span>
                      )}
                    </div>

                    {/* Nama Perusahaan Utuh Tanpa Dipotong */}
                    <p className="text-[11px] text-zinc-700 dark:text-zinc-300 leading-snug mt-0.5 break-words font-medium">
                      {stock.name}
                    </p>

                    <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                      Rp {stock.pricePerShare ? stock.pricePerShare.toLocaleString("id-ID") : "-"} / lbr • {stock.marketCapLabel}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredStocks.length === 0 && (
              <div className="p-4 text-center text-xs text-zinc-400">
                Tidak ada emiten yang cocok dengan pencarian.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const StockComparisonView: React.FC<StockComparisonViewProps> = ({
  stocks,
  onSelectStock,
  initialStockA = "BBCA",
  initialStockB = "BBRI",
}) => {
  const [tickerA, setTickerA] = useState<string>(
    stocks.some((s) => s.ticker === initialStockA) ? initialStockA : stocks[0]?.ticker || "BBCA"
  );
  const [tickerB, setTickerB] = useState<string>(
    stocks.some((s) => s.ticker === initialStockB && s.ticker !== initialStockA)
      ? initialStockB
      : stocks[1]?.ticker || "BBRI"
  );

  const stockA = useMemo(
    () => stocks.find((s) => s.ticker === tickerA) || stocks[0],
    [stocks, tickerA]
  );
  const stockB = useMemo(
    () => stocks.find((s) => s.ticker === tickerB) || stocks[1] || stocks[0],
    [stocks, tickerB]
  );

  const handleSwap = () => {
    setTickerA(tickerB);
    setTickerB(tickerA);
  };

  const handleApplyPreset = (preset: RivalryPreset) => {
    setTickerA(preset.tickerA);
    setTickerB(preset.tickerB);
  };

  // Evaluasi 5 Pilar Analisis Fundamental
  const evaluation = useMemo(() => {
    if (!stockA || !stockB) return null;

    // 1. Valuasi: PER dan PBV lebih rendah lebih murah (asumsi positif)
    let valScoreA = 0;
    let valScoreB = 0;
    if (stockA.per > 0 && stockB.per > 0) {
      if (stockA.per < stockB.per) valScoreA += 1;
      else if (stockB.per < stockA.per) valScoreB += 1;
    }
    const pbvA = stockA.pbv || 1;
    const pbvB = stockB.pbv || 1;
    if (pbvA < pbvB) valScoreA += 1;
    else if (pbvB < pbvA) valScoreB += 1;

    const valuationWinner =
      valScoreA > valScoreB ? "A" : valScoreB > valScoreA ? "B" : "TIE";

    // 2. Profitabilitas: ROE dan Net Profit Margin lebih tinggi
    let profScoreA = 0;
    let profScoreB = 0;
    if (stockA.roe > stockB.roe) profScoreA += 1;
    else if (stockB.roe > stockA.roe) profScoreB += 1;

    const npmA = stockA.netProfitMargin || 0;
    const npmB = stockB.netProfitMargin || 0;
    if (npmA > npmB) profScoreA += 1;
    else if (npmB > npmA) profScoreB += 1;

    const profitabilityWinner =
      profScoreA > profScoreB ? "A" : profScoreB > profScoreA ? "B" : "TIE";

    // 3. Pertumbuhan: Revenue Growth & Net Income Growth YoY lebih tinggi
    let growScoreA = 0;
    let growScoreB = 0;
    if (stockA.revenueGrowth > stockB.revenueGrowth) growScoreA += 1;
    else if (stockB.revenueGrowth > stockA.revenueGrowth) growScoreB += 1;

    if (stockA.netIncomeGrowth > stockB.netIncomeGrowth) growScoreA += 1;
    else if (stockB.netIncomeGrowth > stockA.netIncomeGrowth) growScoreB += 1;

    const growthWinner =
      growScoreA > growScoreB ? "A" : growScoreB > growScoreA ? "B" : "TIE";

    // 4. Kesehatan Neraca: DER lebih rendah
    const derA = stockA.der ?? 1;
    const derB = stockB.der ?? 1;
    const healthWinner =
      derA < derB ? "A" : derB < derA ? "B" : "TIE";

    // 5. Dividen: Dividend Yield & Payout Ratio lebih tinggi
    const yieldA = stockA.dividendYield || 0;
    const yieldB = stockB.dividendYield || 0;
    const payoutA = stockA.dividendPayoutRatio || 0;
    const payoutB = stockB.dividendPayoutRatio || 0;
    let divScoreA = 0;
    let divScoreB = 0;
    if (yieldA > yieldB) divScoreA += 1;
    else if (yieldB > yieldA) divScoreB += 1;
    if (payoutA > payoutB) divScoreA += 1;
    else if (payoutB > payoutA) divScoreB += 1;

    const dividendWinner =
      divScoreA > divScoreB ? "A" : divScoreB > divScoreA ? "B" : "TIE";

    // Hitung total kemenangan pilar
    let totalWinsA = 0;
    let totalWinsB = 0;
    [valuationWinner, profitabilityWinner, growthWinner, healthWinner, dividendWinner].forEach((w) => {
      if (w === "A") totalWinsA += 1;
      if (w === "B") totalWinsB += 1;
    });

    return {
      valuationWinner,
      profitabilityWinner,
      growthWinner,
      healthWinner,
      dividendWinner,
      totalWinsA,
      totalWinsB,
    };
  }, [stockA, stockB]);

  // Kalimat analisis komparasi otomatis
  const analysisSummary = useMemo(() => {
    if (!stockA || !stockB || !evaluation) return "";

    const points: string[] = [];

    // Profitabilitas
    if (evaluation.profitabilityWinner === "A") {
      points.push(
        `${stockA.ticker} unggul signifikan pada profitabilitas dengan ROE ${stockA.roe}% dan Net Profit Margin ${stockA.netProfitMargin || "-"}% (vs ${stockB.ticker} ROE ${stockB.roe}%).`
      );
    } else if (evaluation.profitabilityWinner === "B") {
      points.push(
        `${stockB.ticker} mencatat kemampuan cetak laba lebih efisien dengan ROE ${stockB.roe}% (vs ${stockA.ticker} ROE ${stockA.roe}%).`
      );
    }

    // Valuasi
    if (evaluation.valuationWinner === "A") {
      points.push(
        `Dari segi valuasi pasar, ${stockA.ticker} diperdagangkan dengan rasio PER ${stockA.per}x yang relatif lebih terjangkau dibandingkan ${stockB.ticker} (${stockB.per}x).`
      );
    } else if (evaluation.valuationWinner === "B") {
      points.push(
        `Valuasi ${stockB.ticker} relatif lebih terjangkau dengan PER ${stockB.per}x dibandingkan ${stockA.ticker} (${stockA.per}x).`
      );
    }

    // Dividen
    if ((stockA.dividendYield || 0) > 0 || (stockB.dividendYield || 0) > 0) {
      if (evaluation.dividendWinner === "A") {
        points.push(
          `${stockA.ticker} menawarkan imbal hasil dividen (yield ${stockA.dividendYield}%) yang lebih tinggi bagi investor berorientasi dividen tunai.`
        );
      } else if (evaluation.dividendWinner === "B") {
        points.push(
          `${stockB.ticker} lebih royal untuk investor dividen dengan estimasi yield ${stockB.dividendYield}% dan payout ratio ${stockB.dividendPayoutRatio}%.`
        );
      }
    }

    // Neraca
    if (evaluation.healthWinner === "A") {
      points.push(
        `Struktur utang ${stockA.ticker} lebih konservatif dengan DER ${stockA.der ?? "-"}x dibanding ${stockB.ticker} (${stockB.der ?? "-"}x).`
      );
    } else if (evaluation.healthWinner === "B") {
      points.push(
        `Rasio utang ${stockB.ticker} lebih rendah dengan DER ${stockB.der ?? "-"}x.`
      );
    }

    return points.join(" ");
  }, [stockA, stockB, evaluation]);

  if (!stockA || !stockB) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
        Data emiten tidak lengkap untuk perbandingan.
      </div>
    );
  }

  return (
    <div className="@container space-y-3 sm:space-y-4">
      {/* 1. Header Pemilihan Preset Populer (Kompak & Bersih) */}
      <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Pilihan Cepat Komparasi Populer:
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {RIVALRY_PRESETS.map((p) => {
            const isCurrent =
              (tickerA === p.tickerA && tickerB === p.tickerB) ||
              (tickerA === p.tickerB && tickerB === p.tickerA);
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={`group flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-emerald-600 text-white shadow-xs dark:bg-emerald-500"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                <span>{p.label}</span>
                <span
                  className={`text-[9px] rounded px-1 py-0.2 ${
                    isCurrent
                      ? "bg-black/20 text-white"
                      : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  {p.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Dua Selector Saham (Emiten A & B) dengan Teks Lengkap 100% */}
      <div className="grid grid-cols-1 @xl:grid-cols-11 gap-2.5 items-center">
        {/* Kartu Pemilih Saham A */}
        <div className="@xl:col-span-5">
          <StockSelectorCard
            label="Emiten Pertama (A)"
            period={stockA.period}
            dataSource={stockA.dataSource || "BEI / IDX"}
            variant="emerald"
            selectedStock={stockA}
            disabledTicker={stockB.ticker}
            stocks={stocks}
            onSelect={(s) => setTickerA(s.ticker)}
          />
        </div>

        {/* Tombol Swap di Tengah: Panah Atas-Bawah di Mobile, Panah Kanan-Kiri di Desktop */}
        <div className="@xl:col-span-1 flex items-center justify-center gap-2.5 @xl:gap-0 py-0 @xl:py-0.5">
          <div className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800/80 @xl:hidden" aria-hidden="true" />
          <button
            type="button"
            onClick={handleSwap}
            title="Tukar posisi saham A dan B"
            className="flex items-center justify-center gap-1.5 h-8 px-3 @xl:h-9 @xl:w-9 @xl:px-0 rounded-full @xl:rounded-xl border border-zinc-200 bg-white shadow-2xs hover:bg-zinc-100 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all cursor-pointer group shrink-0"
          >
            <ArrowUpDown className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-300 group-hover:scale-110 transition-transform @xl:hidden" aria-hidden="true" />
            <span className="text-[10.5px] font-semibold text-zinc-600 dark:text-zinc-300 @xl:hidden">
              Tukar Posisi
            </span>
            <ArrowLeftRight className="hidden @xl:block h-4 w-4 text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform" aria-hidden="true" />
          </button>
          <div className="h-px flex-1 bg-zinc-200/80 dark:bg-zinc-800/80 @xl:hidden" aria-hidden="true" />
        </div>

        {/* Kartu Pemilih Saham B */}
        <div className="@xl:col-span-5">
          <StockSelectorCard
            label="Emiten Kedua (B)"
            period={stockB.period}
            dataSource={stockB.dataSource || "BEI / IDX"}
            variant="blue"
            selectedStock={stockB}
            disabledTicker={stockA.ticker}
            stocks={stocks}
            onSelect={(s) => setTickerB(s.ticker)}
          />
        </div>
      </div>

      {/* 3. Papan Skor Keunggulan 5 Pilar Fundamental (Responsif Container Query) */}
      {evaluation && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 sm:p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-amber-500" aria-hidden="true" />
              <h3 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                Papan Keunggulan 5 Pilar Fundamental
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-700 dark:text-emerald-400">
                {stockA.ticker}: Unggul di {evaluation.totalWinsA} Pilar
              </span>
              <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-blue-700 dark:text-blue-400">
                {stockB.ticker}: Unggul di {evaluation.totalWinsB} Pilar
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 @md:grid-cols-3 @2xl:grid-cols-5 gap-2">
            {/* Pilar 1: Valuasi */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">Pilar 1: Valuasi</div>
                <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">PER & PBV</div>
              </div>
              <div className="text-[11px] font-bold">
                {evaluation.valuationWinner === "A" && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockA.ticker} Lebih Murah
                  </span>
                )}
                {evaluation.valuationWinner === "B" && (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockB.ticker} Lebih Murah
                  </span>
                )}
                {evaluation.valuationWinner === "TIE" && (
                  <span className="text-zinc-400 font-normal">Kekuatan Berimbang</span>
                )}
              </div>
            </div>

            {/* Pilar 2: Profitabilitas */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">Pilar 2: Profitabilitas</div>
                <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">ROE & Margin</div>
              </div>
              <div className="text-[11px] font-bold">
                {evaluation.profitabilityWinner === "A" && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockA.ticker} Lebih Efisien
                  </span>
                )}
                {evaluation.profitabilityWinner === "B" && (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockB.ticker} Lebih Efisien
                  </span>
                )}
                {evaluation.profitabilityWinner === "TIE" && (
                  <span className="text-zinc-400 font-normal">Kekuatan Berimbang</span>
                )}
              </div>
            </div>

            {/* Pilar 3: Pertumbuhan */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">Pilar 3: Pertumbuhan</div>
                <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Omzet & Laba YoY</div>
              </div>
              <div className="text-[11px] font-bold">
                {evaluation.growthWinner === "A" && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockA.ticker} Tumbuh Cepat
                  </span>
                )}
                {evaluation.growthWinner === "B" && (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockB.ticker} Tumbuh Cepat
                  </span>
                )}
                {evaluation.growthWinner === "TIE" && (
                  <span className="text-zinc-400 font-normal">Kekuatan Berimbang</span>
                )}
              </div>
            </div>

            {/* Pilar 4: Kesehatan Neraca */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60 flex flex-col justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">Pilar 4: Neraca</div>
                <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Rasio Utang (DER)</div>
              </div>
              <div className="text-[11px] font-bold">
                {evaluation.healthWinner === "A" && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockA.ticker} Lebih Aman
                  </span>
                )}
                {evaluation.healthWinner === "B" && (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockB.ticker} Lebih Aman
                  </span>
                )}
                {evaluation.healthWinner === "TIE" && (
                  <span className="text-zinc-400 font-normal">Kekuatan Berimbang</span>
                )}
              </div>
            </div>

            {/* Pilar 5: Dividen */}
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-2.5 dark:border-zinc-800 dark:bg-zinc-800/60 flex flex-col justify-between col-span-2 @md:col-span-1">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 mb-0.5">Pilar 5: Dividen</div>
                <div className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-200 mb-1.5">Yield & Payout</div>
              </div>
              <div className="text-[11px] font-bold">
                {evaluation.dividendWinner === "A" && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockA.ticker} Lebih Royal
                  </span>
                )}
                {evaluation.dividendWinner === "B" && (
                  <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 shrink-0" /> {stockB.ticker} Lebih Royal
                  </span>
                )}
                {evaluation.dividendWinner === "TIE" && (
                  <span className="text-zinc-400 font-normal">Kekuatan Berimbang</span>
                )}
              </div>
            </div>
          </div>

          {/* Kalimat Kesimpulan Analitis Cerdas */}
          {analysisSummary && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-[11px] sm:text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
              <div className="font-bold text-emerald-800 dark:text-emerald-400 mb-0.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Ringkasan Analitis Komparasi {stockA.ticker} vs {stockB.ticker}:
              </div>
              <p>{analysisSummary}</p>
            </div>
          )}
        </div>
      )}

      {/* 4. Visual Bar Komparatif Horizontal untuk Metrik Kunci */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 sm:p-4 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 space-y-3">
        <h3 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50 flex items-center gap-1.5">
          <BarChart3 className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          Perbandingan Visual Langsung
        </h3>

        <div className="space-y-3 text-xs">
          {/* Metrik: ROE */}
          <div>
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{stockA.ticker}: {stockA.roe}%</span>
              <span className="text-zinc-500 truncate px-2 text-[10px]">Kemampuan Menghasilkan Laba (ROE)</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{stockB.ticker}: {stockB.roe}%</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-0.5 overflow-hidden">
              <div className="flex justify-end">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, (Math.abs(stockA.roe) / 40) * 100))}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-start">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, (Math.abs(stockB.roe) / 40) * 100))}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Metrik: Pertumbuhan Pendapatan */}
          <div>
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                {stockA.ticker}: {stockA.revenueGrowth > 0 ? `+${stockA.revenueGrowth}` : stockA.revenueGrowth}%
              </span>
              <span className="text-zinc-500 truncate px-2 text-[10px]">Pertumbuhan Pendapatan YoY</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{stockB.ticker}: {stockB.revenueGrowth > 0 ? `+${stockB.revenueGrowth}` : stockB.revenueGrowth}%</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-0.5 overflow-hidden">
              <div className="flex justify-end">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, (Math.abs(stockA.revenueGrowth) / 50) * 100))}%` }}
                  className={`h-full rounded-full ${stockA.revenueGrowth >= 0 ? "bg-emerald-500" : "bg-rose-500"}`}
                />
              </div>
              <div className="flex justify-start">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, (Math.abs(stockB.revenueGrowth) / 50) * 100))}%` }}
                  className={`h-full rounded-full ${stockB.revenueGrowth >= 0 ? "bg-blue-500" : "bg-rose-500"}`}
                />
              </div>
            </div>
          </div>

          {/* Metrik: Valuasi PER */}
          <div>
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{stockA.ticker}: {stockA.per}x</span>
              <span className="text-zinc-500 truncate px-2 text-[10px]">Valuasi terhadap Laba (PER)</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{stockB.ticker}: {stockB.per}x</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-0.5 overflow-hidden">
              <div className="flex justify-end">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, (Math.abs(stockA.per) / 30) * 100))}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-start">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, (Math.abs(stockB.per) / 30) * 100))}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Metrik: Dividend Yield */}
          <div>
            <div className="flex justify-between items-center mb-1 text-[11px]">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{stockA.ticker}: {stockA.dividendYield || 0}%</span>
              <span className="text-zinc-500 truncate px-2 text-[10px]">Estimasi Dividend Yield</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">{stockB.ticker}: {stockB.dividendYield || 0}%</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full p-0.5 overflow-hidden">
              <div className="flex justify-end">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, ((stockA.dividendYield || 0) / 15) * 100))}%` }}
                  className="h-full bg-emerald-500 rounded-full"
                />
              </div>
              <div className="flex justify-start">
                <div
                  style={{ width: `${Math.min(100, Math.max(8, ((stockB.dividendYield || 0) / 15) * 100))}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Tabel Matriks Komparasi Lengkap (Side-by-Side Table Rapi) */}
      <div className="rounded-2xl border border-zinc-200 bg-white shadow-2xs dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
              Tabel Matriks Komparasi Lengkap
            </h3>
            <p className="text-[11px] text-zinc-500">
              Data resmi laporan keuangan BEI periode {stockA.period}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] sm:text-xs border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-800/50">
                <th className="py-2.5 px-3 font-bold text-zinc-700 dark:text-zinc-300 w-5/12">
                  Parameter & Metrik Fundamental
                </th>
                <th className="py-2.5 px-3 font-bold text-emerald-800 dark:text-emerald-300 w-7/24 bg-emerald-500/5 min-w-[130px]">
                  <div className="flex items-center gap-1.5">
                    <Avatar ticker={stockA.ticker} sector={stockA.sector} size="sm" />
                    <span>{stockA.ticker}</span>
                  </div>
                </th>
                <th className="py-2.5 px-3 font-bold text-blue-800 dark:text-blue-300 w-7/24 bg-blue-500/5 min-w-[130px]">
                  <div className="flex items-center gap-1.5">
                    <Avatar ticker={stockB.ticker} sector={stockB.sector} size="sm" />
                    <span>{stockB.ticker}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-sans">
              {/* Bagian 1: Harga & Ukuran Perusahaan */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Ukuran Pasar & Harga Transaksi
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Nama Perusahaan
                </td>
                <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100 bg-emerald-500/5 break-words">
                  {stockA.name}
                </td>
                <td className="py-2 px-3 font-semibold text-zinc-900 dark:text-zinc-100 bg-blue-500/5 break-words">
                  {stockB.name}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Sektor & Sub-Sektor
                </td>
                <td className="py-2 px-3 text-zinc-700 dark:text-zinc-300 bg-emerald-500/5">
                  {stockA.sector} ({stockA.subSector})
                </td>
                <td className="py-2 px-3 text-zinc-700 dark:text-zinc-300 bg-blue-500/5">
                  {stockB.sector} ({stockB.subSector})
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Harga Saham (Per Lembar / Lot)
                </td>
                <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100 font-mono bg-emerald-500/5">
                  Rp {stockA.pricePerShare?.toLocaleString("id-ID") || "-"} / Rp {stockA.pricePerLot?.toLocaleString("id-ID") || "-"}
                </td>
                <td className="py-2 px-3 text-zinc-900 dark:text-zinc-100 font-mono bg-blue-500/5">
                  Rp {stockB.pricePerShare?.toLocaleString("id-ID") || "-"} / Rp {stockB.pricePerLot?.toLocaleString("id-ID") || "-"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Kapitalisasi Pasar (Market Cap)
                </td>
                <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100 font-mono bg-emerald-500/5">
                  {stockA.marketCapLabel}
                </td>
                <td className="py-2 px-3 font-bold text-zinc-900 dark:text-zinc-100 font-mono bg-blue-500/5">
                  {stockB.marketCapLabel}
                </td>
              </tr>

              {/* Bagian 2: Valuasi Saham */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Valuasi Pasar
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Price to Earnings Ratio (PER)
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  <span className={stockA.per > 0 && stockA.per < stockB.per ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockA.per}x {stockA.per > 0 && stockA.per < stockB.per ? "(Lebih Murah)" : ""}
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  <span className={stockB.per > 0 && stockB.per < stockA.per ? "text-blue-700 dark:text-blue-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockB.per}x {stockB.per > 0 && stockB.per < stockA.per ? "(Lebih Murah)" : ""}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Price to Book Value (PBV)
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  <span className={(stockA.pbv || 1) < (stockB.pbv || 1) ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockA.pbv || "-"}x
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  <span className={(stockB.pbv || 1) < (stockA.pbv || 1) ? "text-blue-700 dark:text-blue-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockB.pbv || "-"}x
                  </span>
                </td>
              </tr>

              {/* Bagian 3: Profitabilitas & Efisiensi */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Profitabilitas & Hasil Usaha
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Return on Equity (ROE)
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  <span className={stockA.roe > stockB.roe ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockA.roe}% {stockA.roe > stockB.roe ? "(Unggul)" : ""}
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  <span className={stockB.roe > stockA.roe ? "text-blue-700 dark:text-blue-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockB.roe}% {stockB.roe > stockA.roe ? "(Unggul)" : ""}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Net Profit Margin (NPM)
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  {stockA.netProfitMargin ? `${stockA.netProfitMargin}%` : "-"}
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  {stockB.netProfitMargin ? `${stockB.netProfitMargin}%` : "-"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Nominal Laba Bersih Q3 2024
                </td>
                <td className="py-2 px-3 font-mono bg-emerald-500/5">
                  {stockA.netIncomeLabel || "-"}
                </td>
                <td className="py-2 px-3 font-mono bg-blue-500/5">
                  {stockB.netIncomeLabel || "-"}
                </td>
              </tr>

              {/* Bagian 4: Pertumbuhan YoY */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Laju Pertumbuhan (YoY)
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Pertumbuhan Pendapatan YoY
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  <span className={stockA.revenueGrowth >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600"}>
                    {stockA.revenueGrowth > 0 ? `+${stockA.revenueGrowth}` : stockA.revenueGrowth}%
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  <span className={stockB.revenueGrowth >= 0 ? "text-blue-700 dark:text-blue-400" : "text-rose-600"}>
                    {stockB.revenueGrowth > 0 ? `+${stockB.revenueGrowth}` : stockB.revenueGrowth}%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Pertumbuhan Laba Bersih YoY
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  <span className={stockA.netIncomeGrowth >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600"}>
                    {stockA.netIncomeGrowth > 0 ? `+${stockA.netIncomeGrowth}` : stockA.netIncomeGrowth}%
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  <span className={stockB.netIncomeGrowth >= 0 ? "text-blue-700 dark:text-blue-400" : "text-rose-600"}>
                    {stockB.netIncomeGrowth > 0 ? `+${stockB.netIncomeGrowth}` : stockB.netIncomeGrowth}%
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Nominal Pendapatan Q3 2024
                </td>
                <td className="py-2 px-3 font-mono bg-emerald-500/5">
                  {stockA.revenueLabel || "-"}
                </td>
                <td className="py-2 px-3 font-mono bg-blue-500/5">
                  {stockB.revenueLabel || "-"}
                </td>
              </tr>

              {/* Bagian 5: Neraca & Rasio Utang */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Kekuatan Neraca & Solvabilitas
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Debt to Equity Ratio (DER)
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  <span className={(stockA.der ?? 1) < (stockB.der ?? 1) ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockA.der ?? "-"}x {(stockA.der ?? 1) < (stockB.der ?? 1) ? "(Konservatif)" : ""}
                  </span>
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  <span className={(stockB.der ?? 1) < (stockA.der ?? 1) ? "text-blue-700 dark:text-blue-400" : "text-zinc-800 dark:text-zinc-200"}>
                    {stockB.der ?? "-"}x {(stockB.der ?? 1) < (stockA.der ?? 1) ? "(Konservatif)" : ""}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Total Ekuitas / Total Aset
                </td>
                <td className="py-2 px-3 font-mono bg-emerald-500/5">
                  {stockA.totalEquityLabel || "-"} / {stockA.totalAssetsLabel || "-"}
                </td>
                <td className="py-2 px-3 font-mono bg-blue-500/5">
                  {stockB.totalEquityLabel || "-"} / {stockB.totalAssetsLabel || "-"}
                </td>
              </tr>

              {/* Bagian 6: Dividen */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Distribusi Dividen Tunai
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Dividend Yield & Payout Ratio
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-emerald-500/5">
                  {stockA.dividendYield ? `${stockA.dividendYield}%` : "0%"} (Payout: {stockA.dividendPayoutRatio ? `${stockA.dividendPayoutRatio}%` : "-"})
                </td>
                <td className="py-2 px-3 font-mono font-bold bg-blue-500/5">
                  {stockB.dividendYield ? `${stockB.dividendYield}%` : "0%"} (Payout: {stockB.dividendPayoutRatio ? `${stockB.dividendPayoutRatio}%` : "-"})
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Karakter Kebijakan Dividen
                </td>
                <td className="py-2 px-3 text-zinc-600 dark:text-zinc-400 bg-emerald-500/5">
                  {stockA.dividendDateNote || "-"}
                </td>
                <td className="py-2 px-3 text-zinc-600 dark:text-zinc-400 bg-blue-500/5">
                  {stockB.dividendDateNote || "-"}
                </td>
              </tr>

              {/* Bagian 7: Kualitatif, Pengendali, Moat, dan Risiko */}
              <tr className="bg-zinc-100/60 dark:bg-zinc-800/80 font-bold text-zinc-800 dark:text-zinc-200">
                <td colSpan={3} className="py-1.5 px-3 uppercase text-[9px] tracking-wider">
                  Profil Tata Kelola & Analisis Kualitatif
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Pemegang Saham Pengendali
                </td>
                <td className="py-2 px-3 bg-emerald-500/5">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {stockA.controllingShareholder || "-"}
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    Porsi: {stockA.controllingPercentage || "-"}% (Publik: {stockA.publicPercentage || "-"}%)
                  </div>
                </td>
                <td className="py-2 px-3 bg-blue-500/5">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {stockB.controllingShareholder || "-"}
                  </div>
                  <div className="text-[10px] text-zinc-500">
                    Porsi: {stockB.controllingPercentage || "-"}% (Publik: {stockB.publicPercentage || "-"}%)
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Keunggulan Kompetitif (Moat)
                </td>
                <td className="py-2 px-3 leading-relaxed text-zinc-700 dark:text-zinc-300 bg-emerald-500/5">
                  {stockA.keyMoat || "-"}
                </td>
                <td className="py-2 px-3 leading-relaxed text-zinc-700 dark:text-zinc-300 bg-blue-500/5">
                  {stockB.keyMoat || "-"}
                </td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium text-zinc-600 dark:text-zinc-300">
                  Risiko Bisnis Utama
                </td>
                <td className="py-2 px-3 leading-relaxed text-zinc-600 dark:text-zinc-400 bg-emerald-500/5">
                  {stockA.keyRisk || "-"}
                </td>
                <td className="py-2 px-3 leading-relaxed text-zinc-600 dark:text-zinc-400 bg-blue-500/5">
                  {stockB.keyRisk || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Tombol Aksi Buka Rincian Emiten */}
        <div className="p-3 bg-zinc-50/80 dark:bg-zinc-800/40 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-[11px] text-zinc-500">
            Ingin membedah laporan lengkap salah satu saham?
          </div>
          <div className="flex items-center gap-2">
            {onSelectStock && (
              <>
                <button
                  type="button"
                  onClick={() => onSelectStock(stockA)}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
                >
                  Buka Rincian {stockA.ticker}
                </button>
                <button
                  type="button"
                  onClick={() => onSelectStock(stockB)}
                  className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:bg-blue-500/20 transition-colors cursor-pointer"
                >
                  Buka Rincian {stockB.ticker}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
