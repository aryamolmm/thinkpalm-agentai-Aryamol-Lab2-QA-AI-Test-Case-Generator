# Feature Description: User Login

**Target URL**: `https://the-internet.herokuapp.com/login`

## Overview
The login page allows users to authenticate themselves to access a secure area.

## Scenarios

### 1. Successful Login
- **Preconditions**: User is on the login page.
- **Steps**:
  1. Enter valid username: `tomsmith`
  2. Enter valid password: `SuperSecretPassword!`
  3. Click the "Login" button.
- **Expected Results**:
  - The user should be redirected to `https://the-internet.herokuapp.com/secure`.
  - A success message "You logged into a secure area!" should be visible.
  - A "Logout" button should be present.

### 2. Failed Login
- **Preconditions**: User is on the login page.
- **Steps**:
  1. Enter invalid username: `invalidUser`
  2. Enter invalid password: `invalidPassword`
  3. Click the "Login" button.
- **Expected Results**:
  - The user remains on the login page.
  - An error message "Your username is invalid!" should be visible.
