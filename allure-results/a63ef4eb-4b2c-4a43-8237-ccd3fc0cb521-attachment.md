# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.js >> E2E Flow >> @smoke Verify user can add product to cart
- Location: tests\e2e.spec.js:25:7

# Error details

```
Error: page.goto: net::ERR_NETWORK_CHANGED at https://www.saucedemo.com/
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | class LoginPage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |     this.username = page.locator("#user-name");
  5  |     this.password = page.locator("#password");
  6  |     this.button = page.getByRole("button", { name: "Login" });
  7  |   }
  8  |   async login(url, userName, password) {
> 9  |     await this.page.goto(url);
     |                     ^ Error: page.goto: net::ERR_NETWORK_CHANGED at https://www.saucedemo.com/
  10 |     await this.username.fill(userName);
  11 |     await this.password.fill(password);
  12 |     await this.button.click();
  13 |   }
  14 | }
  15 | export default LoginPage;
  16 | 
```