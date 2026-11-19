import { test as base, Page } from "@playwright/test";
import { E2E_TEST_USER } from "../global-setup";

export interface AuthFixtures {
  authenticatedPage: Page;
}

/**
 * Auth Fixture: Menginjeksikan sesi user terotentikasi & JWT ke localStorage
 * sebelum halaman dimuat agar test tidak perlu mengulang proses form login
 */
export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const token = process.env.E2E_AUTH_TOKEN || "e2e-verified-jwt-token";
    const userPayload = process.env.E2E_AUTH_USER
      ? JSON.parse(process.env.E2E_AUTH_USER)
      : {
          id: "e2e-user-id",
          name: E2E_TEST_USER.name,
          email: E2E_TEST_USER.email,
          experienceLevel: E2E_TEST_USER.experienceLevel,
          preferredSectors: ["Keuangan", "Barang Konsumsi Primer"],
          joinedDate: "November 2024",
          bio: "Akun otomatis pengujian E2E Playwright.",
          notificationsEnabled: true,
        };

    await page.addInitScript(
      ({ user, jwt }) => {
        window.localStorage.setItem("bei_stock_insight_user", JSON.stringify(user));
        window.localStorage.setItem("bei_stock_insight_token", jwt);
      },
      { user: userPayload, jwt: token }
    );

    await use(page);
  },
});

export { expect } from "@playwright/test";
