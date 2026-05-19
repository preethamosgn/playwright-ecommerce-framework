# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.js >> E2E Flow >> @smoke Verify user can add product to cart
- Location: tests\e2e.spec.js:25:7

# Error details

```
Error: page.goto: NS_ERROR_UNKNOWN_HOST
Call log:
  - navigating to "https://www.saucedemo.com/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "Hmm. We’re having trouble finding that site." [level=1] [ref=e5]
    - paragraph [ref=e6]: We can’t connect to the server at www.saucedemo.com.
    - paragraph
    - generic [ref=e7]:
      - strong [ref=e9]: "If you entered the right address, you can:"
      - list [ref=e10]:
        - listitem [ref=e11]: Try again later
        - listitem [ref=e12]: Check your network connection
        - listitem [ref=e13]: Check that Nightly has permission to access the web (you might be connected but behind a firewall)
  - button "Try Again" [active] [ref=e15]
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
     |                     ^ Error: page.goto: NS_ERROR_UNKNOWN_HOST
  10 |     await this.username.fill(userName);
  11 |     await this.password.fill(password);
  12 |     await this.button.click();
  13 |   }
  14 | }
  15 | export default LoginPage;
  16 | 
```