import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 1,
  workers: isCI ? 1 : 4,
  reporter: isCI
    ? [["list"], ["html", { open: "never", outputFolder: "playwright-report" }]]
    : [["list"], ["html", { open: "on-failure", outputFolder: "playwright-report" }]],
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
  projects: [
    {
      name: "chromium-desktop",
      use: {
        ...devices["Desktop Chrome"],
        ...(isCI ? {} : { channel: "chrome" }),
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Pixel 7"],
        ...(isCI ? {} : { channel: "chrome" }),
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: [
    {
      command: "npm --prefix ../backend run start",
      url: "http://127.0.0.1:5000/api/health",
      reuseExistingServer: !isCI,
      timeout: 60_000,
    },
    {
      command: "npm run start",
      url: BASE_URL,
      reuseExistingServer: !isCI,
      timeout: 120_000,
    },
  ],
});
