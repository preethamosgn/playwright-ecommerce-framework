import { test as setup, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

const authFile = "auth/storageState.json";

setup("Login and save storage state", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: authFile });
});
