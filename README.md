# Playwright & Allure Automation Suite - Login Functionality

This repository contains a professional-grade, production-quality automated test suite for the login functionality of `the-internet.herokuapp.com`. The project leverages **Playwright** for robust browser automation and **Allure** for advanced, interactive test reporting.

## 📁 Project Structure

- `tests/`: Contains the Playwright test scripts.
  - `login_allure.spec.js`: **[Latest]** Advanced suite with Allure annotations, helper functions, and 10+ scenarios.
  - `login.spec.js`: Standard Playwright test suite.
- `allure-results/`: Raw data generated after test execution.
- `allure-report/`: Compiled interactive HTML report produced by Allure.
- `playwright.config.js`: Centralized configuration for browser settings and reporters.
- `package.json`: Project dependencies and reporting scripts.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## 🚀 Setup

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Standard Execution
To run all tests in headless mode:
```bash
npm test
```

### Allure Reporting Suite
To run the comprehensive suite with Allure results:
```bash
npx playwright test tests/login_allure.spec.js
```

## 📊 Generating Reports

### Allure Report (Recommended)
1. **Generate**: Convert raw results to an interactive HTML report:
   ```bash
   npm run allure:generate
   ```
2. **Open**: Launch the report in your default browser:
   ```bash
   npm run allure:open
   ```

### Playwright HTML Report
To view the default Playwright report:
```bash
npx playwright show-report
```

## 🎯 Test Coverage

The `login_allure.spec.js` suite provides 10 scenario-based tests:
- **Positive Path**: Successful login and logout flow.
- **Negative Testing**: Invalid credentials (username, password, or both).
- **Validation**: Empty fields and boundary conditions.
- **Case Sensitivity**: Explicit checks for lowercase, uppercase, and mixed-case usernames.
- **Reporting Detail**: Includes Allure severity levels (Critical, Normal, Minor) and story-based categorization.

## 📝 Configuration

The project is configured via `playwright.config.js` to:
- Capture screenshots **only on failure**.
- Run tests across **Desktop Chrome** (parallel execution enabled).
- Output Allure results to the `allure-results` directory.
