import { E2E_TEST_USER } from "./global-setup";

const BACKEND_API = process.env.BACKEND_URL || "http://127.0.0.1:5000";

/**
 * Global Teardown: Bersihkan riwayat chat E2E setelah seluruh test suite selesai
 */
export default async function globalTeardown() {
  try {
    await fetch(`${BACKEND_API}/api/ai/history?ticker=BBCA`, {
      method: "DELETE",
    });
    console.log(`[Playwright globalTeardown] Cleanup data test untuk ${E2E_TEST_USER.email} selesai.`);
  } catch {
    // Abaikan jika server sudah dihentikan oleh Playwright runner
  }
}
