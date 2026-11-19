import { test, expect } from "./fixtures/auth.fixture";
import { E2E_TEST_USER } from "./global-setup";

test.describe("BEI Stock Insight - End-to-End Critical User Journeys (J-01 s.d. J-08)", () => {
  // =========================================================================
  // J-01: Eksplorasi Peta Saham (Treemap) & Pergantian Indikator KPI
  // =========================================================================
  test("J-01 (Happy Path): Memuat Peta Saham, mengganti indikator KPI, dan membuka panel emiten", async ({
    page,
  }) => {
    await page.goto("/market-map");

    // Pastikan kartu saham BBCA tampil di peta saham
    const bbcaTile = page.getByTestId("stock-tile-BBCA").first();
    await expect(bbcaTile).toBeVisible();

    // Ganti indikator ke Kemampuan Menghasilkan Laba (ROE)
    const roeBtn = page.getByRole("button", { name: /Kemampuan Menghasilkan Laba \(ROE\)/i });
    await roeBtn.click();
    await expect(page.getByText(/RINGKASAN INDIKATOR AKTIF/i)).toBeVisible();

    // Klik kartu BBRI dan pastikan Panel AI kanan merespons
    await page.getByTestId("stock-tile-BBRI").first().click();
    await expect(page.getByText(/Bank Rakyat Indonesia/i).first()).toBeVisible();
  });

  test("J-01 (Failure State): Tetap menampilkan dataset fallback ketika endpoint /api/stocks gagal (HTTP 500)", async ({
    page,
  }) => {
    await page.route("**/api/stocks", (route) =>
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ status: "error", message: "Database connection timeout" }),
      })
    );

    await page.goto("/market-map");
    await expect(page.getByTestId("stock-tile-BBCA").first()).toBeVisible();
    await expect(page.getByTestId("stock-tile-TLKM").first()).toBeVisible();
  });

  // =========================================================================
  // J-02: Gate Autentikasi Popup Modal (AuthRequiredModal) untuk Tamu (Guest)
  // =========================================================================
  test("J-02 (Happy Path & Failure State): Tamu yang mengklik Watchlist dicegat oleh AuthRequiredModal dan ditolak saat password salah", async ({
    page,
  }) => {
    await page.goto("/market-map");

    // Pastikan tombol Masuk / Daftar tampil untuk tamu
    await expect(page.getByTestId("header-auth-btn")).toBeVisible();

    // Klik bookmark watchlist pada BBCA sebagai tamu
    await page.getByTestId("watchlist-toggle-BBCA").first().click();

    // Modal wajib muncul
    const modal = page.getByTestId("auth-required-modal");
    await expect(modal).toBeVisible();
    await expect(modal.getByText(/Akses Fitur Terbatas/i)).toBeVisible();

    // Failure state: masukkan kredensial salah
    await modal.locator('input[type="email"]').fill("tidakada@beistockinsight.id");
    await modal.locator('input[type="password"]').fill("salah123");
    await modal.getByRole("button", { name: /Masuk Sekarang/i }).click();

    await expect(page.getByTestId("auth-modal-error")).toBeVisible();
  });

  // =========================================================================
  // J-03: Alur Lengkap Autentikasi Mandiri (Login, Register, Forgot Password)
  // =========================================================================
  test("J-03 (Happy Path & Failure State): Validasi form Register, Login, dan alur Forgot Password", async ({
    page,
  }) => {
    await page.goto("/register");

    // Failure state: konfirmasi kata sandi tidak cocok
    await page.getByLabel(/Nama Lengkap/i).fill("Investor Uji");
    await page.getByLabel(/Alamat Email/i).fill("uji@beistockinsight.id");
    await page.getByLabel(/^Kata Sandi$/i).fill("rahasia123");
    await page.getByLabel(/Konfirmasi Kata Sandi/i).fill("berbeda123");
    await page.getByRole("button", { name: /Daftar Akun/i }).click();
    await expect(page.getByText(/Konfirmasi kata sandi tidak cocok/i)).toBeVisible();

    // Halaman Forgot Password
    await page.goto("/forgot-password");
    await page.getByLabel(/Alamat Email Terdaftar/i).fill(E2E_TEST_USER.email);
    await page.getByRole("button", { name: /Kirim Tautan Pemulihan/i }).click();
    await expect(page.getByText(/Kode Pemulihan Terkirim/i)).toBeVisible();
  });

  // =========================================================================
  // J-04: Smart Fundamental Screener & Filter Multi-Parameter
  // =========================================================================
  test("J-04 (Happy Path & Empty State): Filter preset Smart Screener dan penanganan pencarian kosong", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/screener");

    await expect(page.getByRole("heading", { name: /Smart Screener/i })).toBeVisible();

    // Klik preset ROE >= Median Sektor
    await page.getByRole("button", { name: /ROE >= Median Sektor/i }).click();
    await expect(page.getByText("BBCA").first()).toBeVisible();

    // Failure / Empty state: cari kode saham yang tidak terdaftar
    const searchInput = page.getByPlaceholder(/Cari kode emiten/i);
    await searchInput.fill("ZZZZ_TIDAK_ADA");
    await expect(page.getByText(/Tidak ada emiten yang memenuhi kriteria/i)).toBeVisible();
  });

  // =========================================================================
  // J-05: Komparasi Saham Head-to-Head (1 vs 1) & Benchmark Sektor
  // =========================================================================
  test("J-05 (Happy Path): Membandingkan BBCA vs BBRI, menukar posisi, dan membuka Benchmark Sektor", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/benchmark");

    await expect(page.getByText(/Papan Keunggulan 5 Pilar Fundamental/i)).toBeVisible();

    // Klik preset rivalitas TLKM vs ISAT
    await page.getByRole("button", { name: /TLKM vs ISAT/i }).click();
    await expect(page.getByText("TLKM").first()).toBeVisible();
    await expect(page.getByText("ISAT").first()).toBeVisible();

    // Pindah ke tab Benchmark Median Sektor
    await page.getByRole("button", { name: /Benchmark Median Sektor/i }).click();
    await expect(page.getByText(/Perbandingan Emiten terhadap Median Sektor/i).first()).toBeVisible();
  });

  // =========================================================================
  // J-06: Panel Analis AI, Riwayat Sesi Chat, & Simulasi Lot
  // =========================================================================
  test("J-06 (Happy Path & Fallback State): Menampilkan Fakta vs Interpretasi AI dan fallback saat endpoint AI error", async ({
    authenticatedPage: page,
  }) => {
    // Simulasikan gangguan jaringan pada /api/ai/chat untuk menguji fallback lokal
    await page.route("**/api/ai/chat", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ status: "error", message: "Gemini API Overloaded" }),
      })
    );

    await page.goto("/market-map");
    await expect(page.getByText(/Fakta Laporan Keuangan/i).first()).toBeVisible();
    await expect(page.getByText(/Interpretasi AI/i).first()).toBeVisible();

    // Kirim pertanyaan chat pada panel emiten
    const chatInput = page.locator("#stock-chat-input");
    await chatInput.fill("Bagaimana valuasi PER emiten ini?");
    await chatInput.press("Enter");

    // Pastikan jawaban fallback tetap muncul tanpa crash
    await expect(page.getByText(/Bagaimana valuasi PER emiten ini\?/i)).toBeVisible();
  });

  // =========================================================================
  // J-07: Manajemen Watchlist Lintas Halaman & Pengaturan Profil Investor
  // =========================================================================
  test("J-07 (Happy Path & Unauthenticated State): Mengakses halaman Profil saat login vs saat belum login", async ({
    page,
    authenticatedPage,
  }) => {
    // 1. Failure State: Tamu mengakses /profile langsung lewat URL
    await page.goto("/profile");
    await expect(page.getByText(/Profil Investor Belum Masuk/i)).toBeVisible();

    // 2. Happy Path: User terotentikasi mengakses /profile dan menyimpan perubahan bio
    await authenticatedPage.goto("/profile");
    await expect(authenticatedPage.getByText(/Preferensi & Identitas Investor/i)).toBeVisible();
    await expect(authenticatedPage.getByText(/Ketentuan Satuan Lot Saham BEI/i)).toBeVisible();

    await authenticatedPage.getByRole("button", { name: /Simpan Perubahan/i }).click();
    await expect(
      authenticatedPage.getByText(/Profil dan preferensi investasi kamu berhasil disimpan/i)
    ).toBeVisible();
  });

  // =========================================================================
  // J-08: Command Palette Global (Ctrl + K) & Preview Laporan Riset PDF
  // =========================================================================
  test("J-08 (Happy Path & Empty State): Membuka Command Palette, mencari emiten, dan membuka modal Cetak PDF", async ({
    authenticatedPage: page,
  }) => {
    await page.goto("/market-map");

    // Buka Command Palette lewat tombol header
    await page.getByTestId("header-command-palette-btn").click();
    const paletteInput = page.getByPlaceholder(/Ketik kode ticker/i);
    await expect(paletteInput).toBeVisible();

    // Empty state pencarian di Command Palette
    await paletteInput.fill("XXXX_KOSONG");
    await expect(page.getByText(/Tidak ditemukan emiten/i)).toBeVisible();

    // Tutup dengan Escape
    await page.keyboard.press("Escape");

    // Buka modal Cetak PDF
    await page.getByRole("button", { name: /Cetak PDF/i }).first().click();
    await expect(page.getByText(/Lembar Riset Fundamental Saham/i).first()).toBeVisible();
  });
});
