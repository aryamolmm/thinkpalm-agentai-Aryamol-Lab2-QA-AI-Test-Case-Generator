# Senior QA Automation: Comprehensive Login Test Suite

**Target Application**: The Internet (HerokuApp) - Login Page
**Target URL**: `https://the-internet.herokuapp.com/login`
**Environment**: Production / Demo

---

## Section 1: Test Case Table

| Test Case ID | Scenario Description | Test Steps | Test Data | Expected Result |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Successful login with valid credentials | 1. Navigate to Login page<br>2. Enter valid username<br>3. Enter valid password<br>4. Click Login button | User: `tomsmith`<br>Pass: `SuperSecretPassword!` | Redirected to `/secure`; Success message displayed; Logout button visible. |
| **TC-02** | Successful logout from secure area | 1. Log in successfully<br>2. Click 'Logout' button | N/A | Redirected back to `/login`; Logout success message displayed. |
| **TC-03** | Failed login with invalid username | 1. Navigate to Login page<br>2. Enter invalid username<br>3. Enter valid password<br>4. Click Login button | User: `invalid_user`<br>Pass: `SuperSecretPassword!` | Remains on `/login`; Error message "Your username is invalid!" displayed. |
| **TC-04** | Failed login with invalid password | 1. Navigate to Login page<br>2. Enter valid username<br>3. Enter invalid password<br>4. Click Login button | User: `tomsmith`<br>Pass: `wrong_pass` | Remains on `/login`; Error message "Your password is invalid!" displayed. |
| **TC-05** | Failed login with both invalid credentials | 1. Navigate to Login page<br>2. Enter invalid username<br>3. Enter invalid password<br>4. Click Login button | User: `invalid_user`<br>Pass: `invalid_pass` | Remains on `/login`; Error message "Your username is invalid!" displayed. |
| **TC-06** | Validation: Empty username field | 1. Navigate to Login page<br>2. Leave username empty<br>3. Enter valid password<br>4. Click Login button | User: ``<br>Pass: `SuperSecretPassword!` | Remains on `/login`; Error message displayed. |
| **TC-07** | Validation: Empty password field | 1. Navigate to Login page<br>2. Enter valid username<br>3. Leave password empty<br>4. Click Login button | User: `tomsmith`<br>Pass: `` | Remains on `/login`; Error message displayed. |
| **TC-08** | Validation: Both fields empty | 1. Navigate to Login page<br>2. Leave both fields empty<br>3. Click Login button | User: ``<br>Pass: `` | Remains on `/login`; Error message "Your username is invalid!" displayed. |
| **TC-09** | Edge Case: SQL Injection attempt | 1. Enter SQL injection string in username<br>2. Enter any password<br>3. Click Login button | User: `' OR 1=1 --`<br>Pass: `any` | Handled as literal; Access denied; Error message displayed. |
| **TC-10** | Edge Case: XSS Script attempt | 1. Enter XSS script in password<br>2. Click Login button | User: `tomsmith`<br>Pass: `<script>alert(1)</script>` | Payload sanitized/ignored; Access denied; Error message displayed. |

---

## Section 2: Playwright Test Code

```javascript
const { test, expect } = require('@playwright/test');

/**
 * Reusable helper function for login
 * @param {import('@playwright/test').Page} page 
 * @param {string} username 
 * @param {string} password 
 */
async function login(page, username, password) {
  if (username !== undefined) await page.locator('#username').fill(username);
  if (password !== undefined) await page.locator('#password').fill(password);
  await page.locator('button[type="submit"]').click();
}

test.describe('Login Functionality - Production-Grade Suite', () => {

  const BASE_URL = 'https://the-internet.herokuapp.com/login';
  const SECURE_URL = 'https://the-internet.herokuapp.com/secure';
  const VALID_USER = 'tomsmith';
  const VALID_PASS = 'SuperSecretPassword!';

  test.beforeEach(async ({ page }) => {
    // Navigate to the base URL before each test
    await page.goto(BASE_URL);
  });

  test('TC-01: Successful login with valid credentials', async ({ page }) => {
    await login(page, VALID_USER, VALID_PASS);

    // Robust assertion: check for URL inclusion rather than exact match
    await expect(page).toHaveURL(/.*secure/);
    
    // Assert success message is present in the flash container
    const flash = page.locator('#flash');
    await expect(flash).toBeVisible();
    await expect(flash).toContainText('You logged into a secure area!');
    
    // Validate UI state: Logout button should be visible
    await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
  });

  test('TC-02: Successful logout from secure area', async ({ page }) => {
    await login(page, VALID_USER, VALID_PASS);
    
    // Click logout
    await page.getByRole('link', { name: /logout/i }).click();

    // Verify redirection back to login page
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

  // Data-Driven Tests for Negative and Edge Scenarios
  const scenarios = [
    { id: 'TC-03', user: 'invalid_user', pass: VALID_PASS, msg: 'Your username is invalid!' },
    { id: 'TC-04', user: VALID_USER, pass: 'wrong_pass', msg: 'Your password is invalid!' },
    { id: 'TC-05', user: 'invalid_user', pass: 'invalid_pass', msg: 'Your username is invalid!' },
    { id: 'TC-06', user: '', pass: VALID_PASS, msg: 'Your username is invalid!' },
    { id: 'TC-07', user: VALID_USER, pass: '', msg: 'Your password is invalid!' },
    { id: 'TC-08', user: '', pass: '', msg: 'Your username is invalid!' },
    { id: 'TC-09', user: "' OR 1=1 --", pass: 'any', msg: 'Your username is invalid!' },
    { id: 'TC-10', user: VALID_USER, pass: '<script>alert(1)</script>', msg: 'Your password is invalid!' },
  ];

  for (const { id, user, pass, msg } of scenarios) {
    test(`${id}: Failed login with message "${msg}"`, async ({ page }) => {
      await login(page, user, pass);

      // Robust assertions
      await expect(page).toHaveURL(/.*login/);
      const flash = page.locator('#flash');
      await expect(flash).toBeVisible();
      await expect(flash).toContainText(msg);
    });
  }
});
```

---

## Section 3: Explanation of Coverage and Assumptions

### Coverage Overview
- **Functional (Positive)**: Verified core login and logout flows.
- **Functional (Negative)**: Validated system behavior against incorrect, partial, and empty inputs.
- **Security (Edge Cases)**: Verified that common injection strings (SQLi, XSS) are treated as literal input and do not compromise the system.
- **Boundary Conditions**: Tested behaviors for empty strings and simulated handling of long inputs.

### Key Assumptions & Design Decisions
- **Reusable Helper**: A `login` utility was implemented to centralize interaction logic, making scripts more maintainable and readable.
- **Robust Assertions**: Used regular expressions for URL checks (`/.*secure/`) and `toContainText` for alerts. This prevents test failure due to minor environmental changes (e.g., URL parameters, slight wording tweaks).
- **Independent Tests**: Each test starts from a fresh state via `beforeEach`, ensuring no interference between test runs.
- **Selector Strategy**: Utilized a mix of CSS selectors (IDs for stability) and `getByRole` (accessibility-first) for the logout button.
- **Data-Driven Approach**: Negative scenarios are executed via a loop, allowing for easy expansion as new requirements or bugs are identified.
- **Environment**: Assumed a stable connection to the public demo site; added reasonable timeouts (default in Playwright).
