"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Printer,
  Copy,
  Check,
  Building2,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  Coins,
  FileText,
  BarChart3,
  Calendar,
} from "lucide-react";
import { StockFundamental, AIInsightData, AIInsightPoint } from "@/types/stock";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

interface ResearchReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: StockFundamental;
  insight?: AIInsightData | null;
}

function escapeHtml(value: string | number | undefined | null): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractPointText(point: AIInsightPoint | string): string {
  return typeof point === "object" && point !== null ? point.text : point;
}

export const ResearchReportModal: React.FC<ResearchReportModalProps> = ({
  isOpen,
  onClose,
  stock,
  insight,
}) => {
  const [copied, setCopied] = useState(false);

  // Keyboard shortcut Esc untuk menutup modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const priceShare = stock.pricePerShare || 1000;
  const priceLot = stock.pricePerLot || priceShare * 100;
  const todayDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const executiveSummary =
    insight?.summary ||
    `${stock.name} (${stock.ticker}) mencatatkan kinerja operasional pada periode ${stock.period} di sektor ${stock.sector}. Perusahaan memiliki kapitalisasi pasar sebesar ${stock.marketCapLabel} dengan efisiensi modal ROE ${stock.roe}%.`;

  const factList: string[] =
    insight?.factPoints && insight.factPoints.length > 0
      ? insight.factPoints.map(extractPointText)
      : [
          `Efisiensi modal tercermin dari capaian ROE ${stock.roe}%.`,
          `Omset kuartalan bergerak ${stock.revenueGrowth > 0 ? "+" : ""}${stock.revenueGrowth}% dibandingkan periode tahun sebelumnya.`,
          `Posisi neraca dan pangsa pasar industri di sektor ${stock.sector}.`,
        ];

  const riskList: string[] =
    insight?.interpretationPoints && insight.interpretationPoints.length > 0
      ? insight.interpretationPoints.map(extractPointText)
      : [
          `Valuasi PER ${stock.per}x perlu dibandingkan terhadap median sektor ${stock.sector}.`,
          `Pantau sensitivitas laba terhadap tren makroekonomi dan suku bunga bursa.`,
          stock.keyRisk || "Evaluasi stabilitas margin laba operasional secara berkala.",
        ];

  // Cetak dokumen A4 bersih via hidden iframe agar 100% terisolasi dari dashboard & dark mode
  const handlePrint = () => {
    const revColor = stock.revenueGrowth >= 0 ? "#047857" : "#be123c";
    const netColor = stock.netIncomeGrowth >= 0 ? "#047857" : "#be123c";

    const reportHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>BEI Stock Insight - Riset Fundamental ${escapeHtml(stock.ticker)} (${escapeHtml(stock.period)})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 11.5px;
      line-height: 1.5;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2.5px solid #059669;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: #059669;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 14px;
    }
    .brand-title {
      font-size: 16px;
      font-weight: 900;
      letter-spacing: -0.3px;
      color: #09090b;
      margin: 0;
    }
    .brand-sub {
      font-size: 10.5px;
      font-weight: 600;
      color: #047857;
      margin: 1px 0 0 0;
    }
    .brand-meta {
      font-size: 9.5px;
      color: #64748b;
      margin: 2px 0 0 0;
    }
    .header-right {
      text-align: right;
    }
    .verified-badge {
      display: inline-block;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      border-radius: 5px;
      padding: 2px 8px;
      font-size: 10px;
      font-weight: 700;
    }
    .issue-date {
      font-size: 9.5px;
      color: #64748b;
      margin-top: 5px;
    }
    .identity-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 16px;
    }
    .identity-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    }
    .ticker-row {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }
    .ticker {
      font-size: 22px;
      font-weight: 900;
      color: #09090b;
      line-height: 1;
    }
    .pill {
      display: inline-block;
      background: #e2e8f0;
      color: #334155;
      border-radius: 4px;
      padding: 2px 7px;
      font-size: 9.5px;
      font-weight: 600;
    }
    .company-name {
      font-size: 13px;
      font-weight: 700;
      color: #1e293b;
      margin: 4px 0 0 0;
    }
    .price-box {
      text-align: right;
    }
    .price-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
    }
    .price-main {
      font-size: 18px;
      font-weight: 900;
      color: #09090b;
      margin-top: 2px;
    }
    .price-main span {
      font-size: 10px;
      font-weight: 400;
      color: #64748b;
    }
    .price-lot {
      font-size: 10.5px;
      font-weight: 700;
      color: #047857;
      margin-top: 2px;
    }
    .sub-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
    }
    .sub-item-label {
      font-size: 9px;
      text-transform: uppercase;
      color: #64748b;
      display: block;
    }
    .sub-item-val {
      font-size: 11px;
      font-weight: 700;
      color: #0f172a;
      display: block;
      margin-top: 2px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #0f172a;
      margin: 0 0 8px 0;
      padding-left: 8px;
      border-left: 3px solid #059669;
    }
    .metrics-grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }
    .metric-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 9px 10px;
      background: #ffffff;
    }
    .metric-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      display: block;
    }
    .metric-val {
      font-size: 16px;
      font-weight: 900;
      color: #09090b;
      display: block;
      margin: 2px 0;
    }
    .metric-sub {
      font-size: 9px;
      color: #64748b;
      display: block;
    }
    .secondary-card {
      background: #f1f5f9;
      border-radius: 6px;
      padding: 7px 10px;
    }
    .secondary-val {
      font-size: 12px;
      font-weight: 800;
      color: #0f172a;
      display: block;
      margin-top: 2px;
    }
    .section-block {
      margin-bottom: 15px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    .exec-box {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .exec-title {
      font-size: 9.5px;
      font-weight: 800;
      text-transform: uppercase;
      color: #065f46;
      margin-bottom: 4px;
      display: block;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .col-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      background: #ffffff;
    }
    .col-title-pos {
      font-size: 10.5px;
      font-weight: 800;
      color: #047857;
      margin: 0 0 6px 0;
    }
    .col-title-risk {
      font-size: 10.5px;
      font-weight: 800;
      color: #b45309;
      margin: 0 0 6px 0;
    }
    ul {
      margin: 0;
      padding-left: 14px;
    }
    li {
      margin-bottom: 4px;
      font-size: 10.5px;
      color: #334155;
    }
    .lot-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 14px;
      font-size: 10.5px;
      color: #334155;
    }
    .lot-title {
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 4px;
      display: block;
    }
    .disclaimer {
      border-top: 1px solid #cbd5e1;
      padding-top: 10px;
      font-size: 9.5px;
      color: #64748b;
      line-height: 1.45;
    }
    .disclaimer strong {
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-icon">BEI</div>
      <div>
        <h1 class="brand-title">BEI STOCK INSIGHT</h1>
        <p class="brand-sub">Platform Analisis Fundamental Saham Bursa Efek Indonesia</p>
        <p class="brand-meta">Lembar Riset Fundamental Saham (Equity Research Sheet) • Sumber: BEI / IDX Resmi</p>
      </div>
    </div>
    <div class="header-right">
      <span class="verified-badge">Terverifikasi ${escapeHtml(stock.period)}</span>
      <div class="issue-date">Tanggal Terbit: ${escapeHtml(todayDate)}</div>
    </div>
  </div>

  <div class="identity-box section-block">
    <div class="identity-top">
      <div>
        <div class="ticker-row">
          <span class="ticker">${escapeHtml(stock.ticker)}</span>
          <span class="pill">${escapeHtml(stock.sector)}</span>
          <span class="pill">${escapeHtml(stock.subSector)}</span>
        </div>
        <div class="company-name">${escapeHtml(stock.name)}</div>
      </div>
      <div class="price-box">
        <div class="price-label">Harga Pasar Terakhir</div>
        <div class="price-main">Rp ${priceShare.toLocaleString("id-ID")} <span>/ lembar</span></div>
        <div class="price-lot">Rp ${priceLot.toLocaleString("id-ID")} / lot (100 lbr)</div>
      </div>
    </div>

    <div class="sub-grid">
      <div>
        <span class="sub-item-label">Kapitalisasi Pasar</span>
        <span class="sub-item-val">${escapeHtml(stock.marketCapLabel)}</span>
      </div>
      <div>
        <span class="sub-item-label">Papan Pencatatan</span>
        <span class="sub-item-val">${escapeHtml(stock.listingBoard || "Papan Utama")}</span>
      </div>
      <div>
        <span class="sub-item-label">Tahun IPO</span>
        <span class="sub-item-val">${escapeHtml(stock.ipoYear || "-")}</span>
      </div>
      <div>
        <span class="sub-item-label">Pengendali Saham</span>
        <span class="sub-item-val">${escapeHtml(stock.controllingShareholder || "Grup Utama")}</span>
      </div>
    </div>
  </div>

  <div class="section-block">
    <h2 class="section-title">Matriks Kinerja Finansial Utama (Periode ${escapeHtml(stock.period)})</h2>
    <div class="metrics-grid-4">
      <div class="metric-card">
        <span class="metric-label">Efisiensi Modal (ROE)</span>
        <span class="metric-val">${escapeHtml(stock.roe)}%</span>
        <span class="metric-sub" style="color:#047857;font-weight:600;">${stock.roe >= 15 ? "Sangat Kuat (>15%)" : "Cukup Terjaga"}</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Valuasi Laba (PER)</span>
        <span class="metric-val">${escapeHtml(stock.per)}x</span>
        <span class="metric-sub">Rasio harga thd laba bersih</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Pertumbuhan Laba YoY</span>
        <span class="metric-val" style="color:${netColor};">${stock.netIncomeGrowth > 0 ? "+" : ""}${escapeHtml(stock.netIncomeGrowth)}%</span>
        <span class="metric-sub">Dibandingkan tahun lalu</span>
      </div>
      <div class="metric-card">
        <span class="metric-label">Pertumbuhan Omset YoY</span>
        <span class="metric-val" style="color:${revColor};">${stock.revenueGrowth > 0 ? "+" : ""}${escapeHtml(stock.revenueGrowth)}%</span>
        <span class="metric-sub">Kinerja penjualan riil</span>
      </div>
    </div>

    <div class="metrics-grid-4">
      <div class="secondary-card">
        <span class="metric-label">Valuasi Buku (PBV)</span>
        <span class="secondary-val">${escapeHtml(stock.pbv ?? "-")}x</span>
      </div>
      <div class="secondary-card">
        <span class="metric-label">Rasio Utang (DER)</span>
        <span class="secondary-val">${escapeHtml(stock.der ?? "-")}x</span>
      </div>
      <div class="secondary-card">
        <span class="metric-label">Net Profit Margin (NPM)</span>
        <span class="secondary-val">${stock.netProfitMargin ? escapeHtml(stock.netProfitMargin) + "%" : "-"}</span>
      </div>
      <div class="secondary-card">
        <span class="metric-label">Dividen Yield</span>
        <span class="secondary-val">${stock.dividendYield ? escapeHtml(stock.dividendYield) + "%" : "-"}</span>
      </div>
    </div>
  </div>

  <div class="section-block">
    <h2 class="section-title">Tinjauan Analisis Fundamental AI (Gemini Engine)</h2>
    <div class="exec-box">
      <span class="exec-title">Ringkasan Eksekutif</span>
      <div>${escapeHtml(executiveSummary)}</div>
    </div>

    <div class="two-col">
      <div class="col-card">
        <div class="col-title-pos">Kekuatan &amp; Fakta Kinerja (BEI / IDX)</div>
        <ul>
          ${factList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
      <div class="col-card">
        <div class="col-title-risk">Perlu Diperhatikan (Interpretasi AI &amp; Risiko)</div>
        <ul>
          ${riskList.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>

  <div class="lot-box section-block">
    <span class="lot-title">Ketentuan Satuan Lot Saham BEI (1 Lot = 100 Lembar)</span>
    Di Bursa Efek Indonesia, pembelian saham dilakukan dalam satuan minimum <strong>1 lot</strong> (setara 100 lembar).
    Untuk saham <strong>${escapeHtml(stock.ticker)}</strong> dengan harga pasar Rp ${priceShare.toLocaleString("id-ID")}/lembar,
    estimasi modal minimum yang dibutuhkan adalah <strong>Rp ${priceLot.toLocaleString("id-ID")}</strong>
    (belum termasuk estimasi biaya transaksi broker sekitar 0,15%).
  </div>

  <div class="disclaimer section-block">
    <strong>Pernyataan Kepatuhan &amp; Edukasi (Disclaimer):</strong><br />
    Dokumen ini dihasilkan secara otomatis oleh sistem <strong>BEI Stock Insight</strong> berbasis laporan keuangan resmi kuartal ${escapeHtml(stock.period)}
    yang dipublikasikan oleh Bursa Efek Indonesia (BEI / IDX) serta data harga pasar terverifikasi. Seluruh konten disajikan murni untuk kebutuhan edukasi analisis fundamental mandiri dan riset akademik, bukan merupakan rekomendasi, ajakan, maupun nasihat transaksi beli atau jual instrumen investasi apa pun. Keputusan investasi dan manajemen risiko modal sepenuhnya berada di bawah tanggung jawab masing-masing investor.
  </div>
</body>
</html>`;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.setAttribute("aria-hidden", "true");
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      return;
    }

    doc.open();
    doc.write(reportHtml);
    doc.close();

    const triggerPrint = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe);
          }
        }, 1500);
      }
    };

    // Beri jeda singkat agar browser selesai menata layout dokumen di dalam iframe
    setTimeout(triggerPrint, 250);
  };

  const handleCopySummary = async () => {
    const summaryText = `[RINGKASAN RISET FUNDAMENTAL BEI STOCK INSIGHT]
Emiten: ${stock.ticker} (${stock.name})
Sektor: ${stock.sector} | Sub-sektor: ${stock.subSector}
Periode Data: ${stock.period} • Sumber Resmi: BEI / IDX
Kapitalisasi Pasar: ${stock.marketCapLabel}
Harga per Lembar: Rp ${priceShare.toLocaleString("id-ID")} (Rp ${priceLot.toLocaleString("id-ID")} / lot)

Kinerja Rasio Finansial ${stock.period}:
- Pertumbuhan Omset (YoY): ${stock.revenueGrowth > 0 ? "+" : ""}${stock.revenueGrowth}%
- Pertumbuhan Laba Bersih (YoY): ${stock.netIncomeGrowth > 0 ? "+" : ""}${stock.netIncomeGrowth}%
- Kemampuan Cetak Laba (ROE): ${stock.roe}%
- Rasio Valuasi Harga / Laba (PER): ${stock.per}x
- Rasio Valuasi Buku (PBV): ${stock.pbv || "-"}x
- Rasio Beban Utang (DER): ${stock.der || "-"}x
- Net Profit Margin (NPM): ${stock.netProfitMargin ? stock.netProfitMargin + "%" : "-"}
- Estimasi Dividen Yield: ${stock.dividendYield ? stock.dividendYield + "%" : "-"}

Ringkasan Analisis AI:
${executiveSummary}

Catatan Kepatuhan:
Disajikan untuk edukasi analisis fundamental mandiri. Bukan rekomendasi ajakan beli/jual saham.`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback silent fail
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      {/* Container Dialog */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white text-zinc-900 shadow-2xl dark:bg-[#16171f] dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-5 py-3.5 backdrop-blur-md dark:border-zinc-800 dark:bg-[#16171f]/95">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <FileText className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h2 id="report-modal-title" className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                Lembar Riset Fundamental Saham (PDF Report)
              </h2>
              <span className="text-[11px] text-zinc-400">
                Siap cetak atau simpan sebagai dokumen PDF resmi A4
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-[#1e2029] dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Salin Teks Ringkasan Riset"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                  <span className="text-emerald-600 dark:text-emerald-400">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Salin Teks</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition-colors cursor-pointer"
              title="Cetak Dokumen atau Simpan PDF"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              aria-label="Tutup Lembar Laporan"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Preview Konten Dokumen Riset di Layar */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Dokumen Riset Resmi */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-emerald-600 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
                <BarChart3 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black tracking-tight text-zinc-950 dark:text-zinc-50 uppercase">
                  BEI Stock Insight
                </span>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Platform Analisis Fundamental Saham Bursa Efek Indonesia
                </p>
                <span className="text-[10px] text-zinc-400 block">
                  Dokumen Riset Edukatif • Sumber: BEI / IDX Resmi
                </span>
              </div>
            </div>

            <div className="text-right text-xs space-y-1">
              <div className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                <span>Terverifikasi {stock.period}</span>
              </div>
              <div className="text-[11px] text-zinc-500 flex items-center justify-end gap-1.5 pt-0.5">
                <Calendar className="h-3 w-3 text-zinc-400" aria-hidden="true" />
                <span>Tanggal Terbit: {todayDate}</span>
              </div>
            </div>
          </div>

          {/* Identitas Emiten Saham */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <Avatar ticker={stock.ticker} sector={stock.sector} size="lg" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                      {stock.ticker}
                    </span>
                    <Badge variant="zinc" size="sm">
                      {stock.sector}
                    </Badge>
                    <Badge variant="neutral" size="sm">
                      {stock.subSector}
                    </Badge>
                  </div>
                  <h1 className="text-sm sm:text-base font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    {stock.name}
                  </h1>
                </div>
              </div>

              {/* Harga Saham & Market Cap */}
              <div className="text-left sm:text-right space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-zinc-400">
                  Harga Pasar Terakhir
                </span>
                <div className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-zinc-50 tabular-nums">
                  Rp {priceShare.toLocaleString("id-ID")}
                  <span className="text-xs font-normal text-zinc-400 ml-1">/ lembar</span>
                </div>
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Rp {priceLot.toLocaleString("id-ID")} / lot (100 lbr)
                </div>
              </div>
            </div>

            {/* Grid Sub-Identitas */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Kapitalisasi Pasar</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{stock.marketCapLabel}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Papan Pencatatan</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{stock.listingBoard || "Papan Utama"}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Tahun IPO</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{stock.ipoYear || "-"}</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Pengendali Saham</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 truncate block">
                  {stock.controllingShareholder || "Grup Utama"}
                </span>
              </div>
            </div>
          </div>

          {/* Matriks Kinerja Finansial */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Matriks Kinerja Finansial Utama (Periode {stock.period})
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-2xs">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase block">
                  Efisiensi Modal (ROE)
                </span>
                <span className="text-lg font-black text-zinc-950 dark:text-zinc-50 tabular-nums">
                  {stock.roe}%
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-medium">
                  {stock.roe >= 15 ? "Sangat Kuat (>15%)" : "Cukup Terjaga"}
                </span>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-2xs">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase block">
                  Valuasi Laba (PER)
                </span>
                <span className="text-lg font-black text-zinc-950 dark:text-zinc-50 tabular-nums">
                  {stock.per}x
                </span>
                <span className="text-[10px] text-zinc-500 block font-medium">
                  Rasio harga thd laba bersih
                </span>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-2xs">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase block">
                  Pertumbuhan Laba YoY
                </span>
                <span
                  className={`text-lg font-black tabular-nums ${
                    stock.netIncomeGrowth >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {stock.netIncomeGrowth > 0 ? "+" : ""}{stock.netIncomeGrowth}%
                </span>
                <span className="text-[10px] text-zinc-500 block font-medium">
                  Dibandingkan tahun lalu
                </span>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-2xs">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase block">
                  Pertumbuhan Omset YoY
                </span>
                <span
                  className={`text-lg font-black tabular-nums ${
                    stock.revenueGrowth >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {stock.revenueGrowth > 0 ? "+" : ""}{stock.revenueGrowth}%
                </span>
                <span className="text-[10px] text-zinc-500 block font-medium">
                  Kinerja penjualan riil
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div className="rounded-lg bg-zinc-100/70 p-2.5 dark:bg-zinc-800/50">
                <span className="text-[10px] text-zinc-500 block uppercase">Valuasi Buku (PBV)</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{stock.pbv || "-"}x</span>
              </div>
              <div className="rounded-lg bg-zinc-100/70 p-2.5 dark:bg-zinc-800/50">
                <span className="text-[10px] text-zinc-500 block uppercase">Rasio Utang (DER)</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{stock.der || "-"}x</span>
              </div>
              <div className="rounded-lg bg-zinc-100/70 p-2.5 dark:bg-zinc-800/50">
                <span className="text-[10px] text-zinc-500 block uppercase">Net Profit Margin (NPM)</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {stock.netProfitMargin ? stock.netProfitMargin + "%" : "-"}
                </span>
              </div>
              <div className="rounded-lg bg-zinc-100/70 p-2.5 dark:bg-zinc-800/50">
                <span className="text-[10px] text-zinc-500 block uppercase">Dividen Yield</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  {stock.dividendYield ? stock.dividendYield + "%" : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Analisis Fundamental AI (Google Gemini Engine) */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                Tinjauan Analisis Fundamental AI (Gemini Engine)
              </h3>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
              <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1 text-[11px] uppercase tracking-wider">
                Ringkasan Eksekutif
              </span>
              <p>{executiveSummary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60 space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>Kekuatan & Fakta Kinerja (BEI / IDX):</span>
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  {factList.map((text, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-emerald-600 font-bold shrink-0">•</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60 space-y-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Perlu Diperhatikan (Interpretasi AI & Risiko):</span>
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                  {riskList.map((text, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 leading-snug">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Panduan Alokasi Modal & Satuan Lot Saham */}
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/40 space-y-2 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
              <Coins className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <span>Ketentuan Satuan Lot Saham BEI (1 Lot = 100 Lembar)</span>
            </span>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Di Bursa Efek Indonesia, pembelian saham dilakukan dalam satuan minimum <strong>1 lot</strong> (setara 100 lembar). Untuk saham <strong>{stock.ticker}</strong> dengan harga pasar Rp {priceShare.toLocaleString("id-ID")}/lembar, estimasi modal minimum yang dibutuhkan adalah <strong>Rp {priceLot.toLocaleString("id-ID")}</strong> (belum termasuk estimasi biaya transaksi broker sebesar ~0.15%).
            </p>
          </div>

          {/* Catatan Kepatuhan & Disclaimer Resmi */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 space-y-1">
            <p className="font-semibold text-zinc-700 dark:text-zinc-300">
              Pernyataan Kepatuhan & Edukasi (Disclaimer):
            </p>
            <p className="leading-relaxed">
              Dokumen ini dihasilkan secara otomatis oleh sistem <strong>BEI Stock Insight</strong> berbasis laporan keuangan resmi kuartal {stock.period} yang dipublikasikan oleh Bursa Efek Indonesia (BEI / IDX) serta data pasar terverifikasi. Seluruh konten disajikan murni untuk kebutuhan edukasi analisis fundamental mandiri dan riset akademik, bukan merupakan rekomendasi, ajakan, maupun nasihat transaksi beli atau jual instrumen investasi apa pun. Keputusan investasi dan manajemen risiko modal sepenuhnya berada di bawah tanggung jawab masing-masing investor.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
