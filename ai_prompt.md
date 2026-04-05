# AI Prompt for Test Generation

**Context**: You are an expert QA Automation Engineer. I need you to generate a Playwright test script in JavaScript for a login feature.

**Feature Requirements**:
- Target URL: `https://the-internet.herokuapp.com/login`
- Valid Credentials: `tomsmith` / `SuperSecretPassword!`
- Invalid Credentials: `invalidUser` / `invalidPassword`

**Required Tests**:
1. **Success Scenario**:
   - Navigate to the login page.
   - Enter username `tomsmith`.
   - Enter password `SuperSecretPassword!`.
   - Click the "Login" button.
   - Assert that the landing page contains the success flash message: "You logged into a secure area!".
   - Assert that the URL is `https://the-internet.herokuapp.com/secure`.

2. **Failure Scenario**:
   - Navigate to the login page.
   - Enter username `invalidUser`.
   - Enter password `invalidPassword`.
   - Click the "Login" button.
   - Assert that the page contains the error flash message: "Your username is invalid!".
   - Assert that the user is NOT redirected to the secure area.

**Format**:
- Use the `@playwright/test` library.
- Use `async/await` syntax.
- Provide the full script in a single code block.
- Include comments explaining the steps.
