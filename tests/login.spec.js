import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import loginData from "../test-data/loginData.json";
test("valid login test", async ({ page }) => {
  let loginPage = new LoginPage(page);

  await page.goto(loginData.url);
  //------------------For Valid User------------------//
  //   //UserName TextField
  //   await loginPage.username.fill(loginData.validuser.userName);
  //   //Password TextField
  //   await loginPage.password.fill(loginData.validuser.password);
  //   //Login Button
  //   await loginPage.button.click();

  //----------------------For Invalid User------------------//
  //UserName TextField
  await loginPage.username.fill(loginData.invaliduser.userName);
  
  //Password TextField
  await loginPage.password.fill(loginData.invaliduser.password);
  //Login Button
  await loginPage.button.click();

  //For Valid user doing assertion
  //await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  // await expect(page.locator(".title")).toHaveText("Products");

  //For invalid user doing asssertion
  await expect(page.locator("[data-test='error']")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});
