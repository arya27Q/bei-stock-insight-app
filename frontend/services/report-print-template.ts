import { StockFundamental, AIInsightData, AIInsightPoint } from "@/types/stock";

export function escapeHtml(value: string | number | undefined | null): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function extractPointText(point: AIInsightPoint | string): string {
  return typeof point === "object" && point !== null ? point.text : point;
}

export interface ReportPrintParams {
  stock: StockFundamental;
  insight?: AIInsightData | null;
  todayDate: string;
  executiveSummary: string;
  factList: string[];
  riskList: string[];
}

export function buildResearchReportPrintHtml({
  stock,
  todayDate,
  executiveSummary,
  factList,
  riskList,
}: ReportPrintParams): string {
  const priceShare = stock.pricePerShare || 1000;
  const priceLot = stock.pricePerLot || priceShare * 100;
  const revColor = stock.revenueGrowth >= 0 ? "#047857" : "#be123c";
  const netColor = stock.netIncomeGrowth >= 0 ? "#047857" : "#be123c";

  return `<!DOCTYPE html>
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
}
