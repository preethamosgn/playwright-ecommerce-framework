class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator(".title");
    this.shopping_cart_link = page.locator(".shopping_cart_link");
    this.sort_container = page.locator(".product_sort_container");
    this.inventory_item = page.locator(".inventory_item");
    this.add_to_cart_button = page.getByRole("button", { name: "Add to cart" });
    this.cart_count = page.locator(".shopping_cart_badge");
  }

  async addProductsToCart() {
    const count = await this.inventory_item.count();
    //to check one product is added to cart
    //await this.inventory_item.nth(1).click();

    //to check nth product is added to cart using for loop
    for (let i = 0; i < count; i++) {
      const item = this.inventory_item.nth(i);
      await item.getByRole("button", { name: "Add to cart" }).click();
    }
  }

  getCartCount() {
    return this.cart_count;
  }
}

export default ProductsPage;
