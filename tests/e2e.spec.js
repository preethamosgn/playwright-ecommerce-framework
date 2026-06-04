import { test, expect } from "../fixtures/pageFixtures";
import { generateCheckoutData } from "../utils/dataUtils";

test.describe("E2E Flow", () => {
  let loginPage, productsPage, cartPage, checkOutPage;

  test.beforeEach(async ({ page }) => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/inventory/);
  });

  test("@smoke Verify user can add product to cart", async ({
    productsPage,
  }) => {
    await productsPage.addProductsToCart();
    await expect(productsPage.getCartCount()).toHaveText("6");
  });

  test("@regression Verify user can view items in cart", async ({
    productsPage,
    cartPage,
  }) => {
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
    productsPage,
    cartPage,
    checkOutPage,
  }) => {
    const checkOut = generateCheckoutData();

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
