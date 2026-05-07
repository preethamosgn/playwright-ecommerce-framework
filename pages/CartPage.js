class CartPage {
  constructor(page) {
    this.page = page;
    // this.inventoryItemDescription = page.locator("//div[@class='inventory_item_description']");
    // this.addToCartButton = page.locator("//button[@class='btn btn_primary btn_small btn_inventory ']");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.applogo = page.locator(".app_logo");
    this.title = page.locator(".title");
    this.cartItem = page.locator(".cart_item");
    this.cart_count = page.locator(".shopping_cart_badge");
    this.removeButton = page.getByRole("button", { name: "Remove" });
  }

  async openCart() {
    await this.shoppingCartLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async getCartItemsCount() {
    return await this.cartItem.count();
  }

  async removeItem(index) {
    await this.cartItem
      .nth(index)
      .getByRole("button", { name: "Remove" })
      .click();
  }
}
export default CartPage;
