# Playwright E-commerce Automation Framework

This project is a Playwright automation framework developed using JavaScript for an e-commerce web application. The framework follows industry-standard automation practices such as Page Object Model, custom fixtures, environment configuration, storage state authentication, reusable utilities, reporting, and CI/CD integration.

## Application Under Test

**Application:** SauceDemo
**URL:** https://www.saucedemo.com/

## Tech Stack

- JavaScript
- Playwright Test
- Node.js
- Page Object Model
- Git and GitHub
- Jenkins
- GitHub Actions
- HTML Reporter
- Allure Reporter
- dotenv

## Framework Features

- Page Object Model design pattern
- Custom Playwright fixtures for page objects
- Environment-based execution using `envConfig.js`
- Secure credential handling using `.env` and GitHub Secrets
- Cross-browser execution with Chromium, Firefox, and WebKit
- Smoke and regression test tagging
- Headless and headed execution support
- Global setup with storage state authentication
- Global teardown for cleanup
- Reusable utility functions for dynamic test data
- Screenshot, video, and trace capture on failure
- Playwright HTML report generation
- Allure report integration
- Jenkins CI/CD pipeline integration
- GitHub Actions workflow integration

## Project Structure

playwright-ecommerce-framework
├── .github
│ └── workflows
│ └── playwright.yml
│
├── auth
│ └── storageState.json
│
├── config
│ └── envConfig.js
│
├── fixtures
│ └── pageFixtures.js
│
├── pages
│ ├── LoginPage.js
│ ├── ProductsPage.js
│ ├── CartPage.js
│ └── CheckOutPage.js
│
├── tests
│ ├── auth.setup.js
│ ├── e2e.spec.js
│ └── global-teardown.js
│
├── utils
│ └── dataUtils.js
│
├── .env.example
├── .gitignore
├── Jenkinsfile
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md

## Folder Explanation

| Folder/File         | Purpose                                                             |
| ------------------- | ------------------------------------------------------------------- |
| `pages`             | Contains Page Object classes and page-specific actions              |
| `tests`             | Contains test specifications, auth setup, and global teardown       |
| `fixtures`          | Contains custom Playwright fixtures for page object initialization  |
| `config`            | Contains environment configuration                                  |
| `utils`             | Contains reusable utility/helper functions                          |
| `auth`              | Stores generated storage state during execution                     |
| `.github/workflows` | Contains GitHub Actions workflow                                    |
| `Jenkinsfile`       | Contains Jenkins pipeline configuration                             |
| `.env.example`      | Sample environment variable file                                    |
| `.gitignore`        | Prevents secrets, reports, and generated files from being committed |

## Environment Variables

Create a `.env` file in the project root.

env
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
ENV=qa

`.env` is ignored in Git and should not be pushed to GitHub.

A sample `.env.example` file is provided:

env
SAUCE_USERNAME=your_username_here
SAUCE_PASSWORD=your_password_here
ENV=qa

## Installation

Install project dependencies:

bash
npm ci

Install Playwright browsers:

bash
npx playwright install

## Running Tests Locally

Run all tests:

bash
npx playwright test

Run tests in headed mode:

bash
npx playwright test --headed

Run smoke tests:

bash
npx playwright test --grep "@smoke"

Run regression tests:

bash
npx playwright test --grep "@regression"

Run tests on Chromium only:

bash
npx playwright test --project=chromium

Run smoke tests on Chromium:

bash
npx playwright test --grep "@smoke" --project=chromium

## Environment-Based Execution

Run with default environment:

bash
npx playwright test

Run with Stage environment in PowerShell:

powershell
$env:ENV="stage"; npx playwright test

Run with Prod environment in PowerShell:

powershell
$env:ENV="prod"; npx playwright test

Reset environment variable in PowerShell:

powershell
Remove-Item Env:ENV

## Global Setup and Storage State

The framework uses Playwright storage state to avoid repeated login.

Flow:

text
auth.setup.js logs in once
↓
storageState.json is generated
↓
Browser tests reuse the saved login session
↓
global-teardown.js deletes storageState.json after execution

This improves execution speed and reduces repeated login steps.

## Reports

Playwright HTML report is generated after test execution.

Open the report:

bash
npx playwright show-report

The framework also supports Allure reporting.

## Debugging Support

The framework captures the following on failures:

- Screenshots
- Videos
- Traces
- HTML reports
- Console logs
- Jenkins/GitHub Actions logs

Trace files help debug failed test steps visually.

## Jenkins CI/CD Integration

The project is integrated with Jenkins using a `Jenkinsfile`.

Jenkins pipeline supports runtime parameters:

| Parameter    | Values                                 |
| ------------ | -------------------------------------- |
| `ENV`        | `qa`, `stage`, `prod`                  |
| `TEST_SUITE` | `smoke`, `regression`, `all`           |
| `BROWSER`    | `chromium`, `firefox`, `webkit`, `all` |
| `HEADLESS`   | `true`, `false`                        |

Jenkins pipeline performs:

Checkout code from GitHub
Install dependencies
Install Playwright browsers
Run selected test suite
Publish Playwright HTML report
Archive test artifacts

## GitHub Actions CI

GitHub Actions workflow runs tests automatically on:

push
pull_request

GitHub Actions performs:

Checkout repository
Setup Node.js
Install dependencies
Install Playwright browsers
Run Playwright tests
Upload Playwright HTML report artifact

Credentials are managed using GitHub Repository Secrets:

SAUCE_USERNAME
SAUCE_PASSWORD

## Test Scenarios Covered

- Verify user can add products to cart
- Verify user can view items in cart
- Verify user can complete checkout successfully

Tests are executed across:

Chromium
Firefox
WebKit

## Project Explanation

I developed a Playwright JavaScript automation framework for an e-commerce application using Page Object Model. I implemented custom fixtures for page object initialization, environment configuration, `.env` support, GitHub Secrets, storage state authentication, global setup and teardown, reusable utilities, smoke and regression tagging, cross-browser execution, Playwright HTML and Allure reporting, and CI/CD integration with Jenkins and GitHub Actions.

This framework supports local execution, Jenkins parameterized execution, GitHub Actions execution, failure debugging using traces, screenshots, videos, and report artifacts.
