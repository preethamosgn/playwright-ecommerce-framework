import { test, expect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import CheckOutPage from "../pages/CheckOutPage";
import checkOut from "../test-data/checkOutData.json";
import loginData from "../test-data/loginData.json";

test.describe("E2E Flow", () => {
  let loginPage, productsPage, cartPage, checkOutPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkOutPage = new CheckOutPage(page);

    await loginPage.login(
      process.env.SAUCE_USERNAME,
      process.env.SAUCE_PASSWORD,
    );
    await expect(page).toHaveURL(/inventory/);
  });

  test("@smoke Verify user can add product to cart", async ({ page }) => {
    await productsPage.addProductsToCart();
    await expect(productsPage.getCartCount()).toHaveText("6");
  });

  test("@regression Verify user can view items in cart", async ({ page }) => {
    await productsPage.addProductsToCart();

    await cartPage.openCart();

    //Varify the Items are present in the cart
    // await expect(cartPage.cartItem.first()).toBeVisible();----------------Not strong enough for interview.
    expect(await cartPage.getCartItemsCount()).toBeGreaterThan(0);
    //getCartItemsCount() is async → returns Promise, I passed a Promise instead of resolved value .'. toBeGreaterThan(0) is not working. To fix this, I need to await the Promise to get the resolved value before passing it to the assertion.

    //Remove item from cart
    await cartPage.removeItem(0);
  });

  test("@smoke Verify user can complete checkout successfully", async ({
    page,
  }) => {
    await productsPage.addProductsToCart();

    await cartPage.openCart();

    await checkOutPage.startCheckOut();

    await expect(checkOutPage.title).toHaveText("Checkout: Your Information");

    await checkOutPage.fillCheckOutForm(
      checkOut.firstName,
      checkOut.lastName,
      checkOut.postalCode,
    );

    await checkOutPage.continueCheckOut();
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkOutPage.finishOrder();

    //Verify successful order completion
    await expect(checkOutPage.successMessage).toHaveText(
      "Thank you for your order!",
    );
  });
});
