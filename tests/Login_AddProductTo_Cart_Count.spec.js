import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import loginData from "../test-data/loginData.json";
import CartPage from "../pages/CartPage";

test("Login + Add product to cart + count ", async ({ page }) => {
  console.log(loginData);

  let loginpage = new LoginPage(page);
  await loginpage.login(loginData.url, loginData.userName, loginData.password);

  let cartpage = new CartPage(page);
  await cartpage.cartItemCount();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  await expect(page.locator(".title")).toHaveText("Products");

  let productsPage = new ProductsPage(page);

  await productsPage.add_to_cart_button.first().click();

  await expect(productsPage.cart_count).toBeVisible();
  await expect(productsPage.cart_count).toHaveText("1");
});
