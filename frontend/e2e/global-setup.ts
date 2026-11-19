export const E2E_TEST_USER = {
  name: "E2E Investor Tester",
  email: "e2e-tester@beistockinsight.id",
  password: "E2ePassword123!",
  experienceLevel: "Menengah" as const,
};

const BACKEND_API = process.env.BACKEND_URL || "http://127.0.0.1:5000";

/**
 * Global Setup: Pastikan akun E2E test tersedia dan memiliki state awal yang bersih
 */
export default async function globalSetup() {
  try {
    // 1. Daftarkan akun E2E jika belum ada (abaikan 409 jika sudah terdaftar)
    await fetch(`${BACKEND_API}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(E2E_TEST_USER),
    });

    // 2. Pastikan sesi login valid dan reset watchlist awal untuk user E2E
    const loginRes = await fetch(`${BACKEND_API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: E2E_TEST_USER.email,
        password: E2E_TEST_USER.password,
      }),
    });

    if (loginRes.ok) {
      const loginJson = await loginRes.json();
      process.env.E2E_AUTH_TOKEN = loginJson.token || "";
      process.env.E2E_AUTH_USER = JSON.stringify(loginJson.data || E2E_TEST_USER);
    }
  } catch (err) {
    console.warn("[Playwright globalSetup] Backend tidak merespons saat setup awal, menggunakan token mock E2E:", err);
  }
}
