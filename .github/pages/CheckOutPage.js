class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkOutButton = page.getByRole("button", { name: "Checkout" });
    this.appLogo = page.locator(".app_logo");
    this.title = page.locator(".title");
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.postalCode = page.locator("#postal-code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.successMessage = page.locator(".complete-header");
  }

  async startCheckOut() {
    await this.checkOutButton.click();
  }

  async fillCheckOutForm(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continueCheckOut() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

export default CheckoutPage;
