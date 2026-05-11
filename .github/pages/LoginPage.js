class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.button = page.getByRole("button", { name: "Login" });
  }
  async login(url, userName, password) {
    await this.page.goto(url);
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.button.click();
  }
}
export default LoginPage;
