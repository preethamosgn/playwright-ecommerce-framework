class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.button = page.getByRole("button", { name: "Login" });
  }

  async open() {
    await this.page.goto(process.env.BASE_URL);
  }
  async login(userName, password) {
    await this.open()
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.button.click();
  }
}
export default LoginPage;
