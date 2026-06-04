// @ts-check
import { defineConfig, devices } from "@playwright/test";

import envConfig from "./config/envConfig";

import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  globalTeardown: "./tests/global-teardown.js",

  // Maximum time one test can run
  timeout: 30000,

  // Maximum time Playwright waits for assertions
  expect: {
    timeout: 5000,
  },

  // Run tests in parallel inside files when possible
  fullyParallel: true,

  // Fail CI if test.only is accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failed tests only in CI
  retries: process.env.CI ? 1 : 0,

  // Use fewer workers in CI for stability, more locally for speed
  workers: process.env.CI ? 1 : 2,

  // Reports
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["allure-playwright"],
  ],

  // Common settings applied to all tests
  use: {
    baseURL: envConfig.baseURL,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },

  // Cross-browser execution
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.js/,
    },

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "auth/storageState.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        storageState: "auth/storageState.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: "auth/storageState.json",
      },
      dependencies: ["setup"],
    },
  ],
});
