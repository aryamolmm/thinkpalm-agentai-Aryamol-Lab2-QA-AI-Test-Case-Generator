const { test, expect } = require('@playwright/test');
const { allure } = require('allure-playwright');

/**
 * Reusable login helper function
 * @param {import('@playwright/test').Page} page 
 * @param {string} username 
 * @param {string} password 
 */
async function login(page, username, password) {
  await allure.step(`Logging in with username: ${username}`, async () => {
    if (username !== undefined) await page.fill('#username', username);
    if (password !== undefined) await page.fill('#password', password);
    await page.click('button[type="submit"]');
  });
}

test.describe('Login Functionality - Complete Suite', () => {

  test.beforeEach(async ({ page }) => {
    await allure.step('Navigate to Login Page', async () => {
      await page.goto('/login');
    });
  });

  test('TC-01: Successful login with valid credentials', async ({ page }) => {
    allure.owner('QA Team');
    allure.severity('critical');
    allure.story('User Authentication');
    allure.description('Verify that a user can log in with valid credentials and see the secure area.');

    await login(page, 'tomsmith', 'SuperSecretPassword!');

    // Robust assertion
    await expect(page).toHaveURL(/.*secure/);
    const flash = page.locator('#flash');
    await expect(flash).toBeVisible();
    await expect(flash).toContainText('You logged into a secure area!');
    
    // Validate UI element
    await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
  });

  test('TC-02: Successful logout from secure area', async ({ page }) => {
    allure.severity('normal');
    allure.story('User Session Management');

    await login(page, 'tomsmith', 'SuperSecretPassword!');
    
    await allure.step('Perform Logout', async () => {
      await page.getByRole('link', { name: /logout/i }).click();
    });

    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
  });

  // Data-driven for negative and validation scenarios
  const negativeScenarios = [
    { id: 'TC-03', title: 'Invalid username', user: 'invalid_user', pass: 'SuperSecretPassword!', msg: 'Your username is invalid!', severity: 'normal' },
    { id: 'TC-04', title: 'Invalid password', user: 'tomsmith', pass: 'wrong_pass', msg: 'Your password is invalid!', severity: 'normal' },
    { id: 'TC-08', title: 'Empty username', user: '', pass: 'SuperSecretPassword!', msg: 'Your username is invalid!', severity: 'minor' },
    { id: 'TC-09', title: 'Empty password', user: 'tomsmith', pass: '', msg: 'Your password is invalid!', severity: 'minor' },
    { id: 'TC-10', title: 'Both fields empty', user: '', pass: '', msg: 'Your username is invalid!', severity: 'minor' },
  ];

  for (const scenario of negativeScenarios) {
    test(`${scenario.id}: ${scenario.title}`, async ({ page }) => {
      allure.severity(scenario.severity);
      allure.story('Input Validation');

      await login(page, scenario.user, scenario.pass);

      const flash = page.locator('#flash');
      await expect(flash).toBeVisible();
      await expect(flash).toContainText(scenario.msg);
    });
  }

  // Case Sensitivity Scenarios
  test('TC-05: Case sensitivity: Lowercase username', async ({ page }) => {
    allure.severity('normal');
    allure.story('Case Sensitivity');
    await login(page, 'tomsmith', 'SuperSecretPassword!');
    await expect(page).toHaveURL(/.*secure/);
  });

  test('TC-06: Case sensitivity: Uppercase username', async ({ page }) => {
    allure.severity('minor');
    allure.story('Case Sensitivity');
    await login(page, 'TOMSMITH', 'SuperSecretPassword!');
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('TC-07: Case sensitivity: Mixed-case username', async ({ page }) => {
    allure.severity('minor');
    allure.story('Case Sensitivity');
    await login(page, 'TomSmith', 'SuperSecretPassword!');
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

});
