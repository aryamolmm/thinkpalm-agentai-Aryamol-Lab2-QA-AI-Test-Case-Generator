# Comprehensive Test Cases: User Login

**Target URL**: `https://the-internet.herokuapp.com/login`

## Overview
This document outlines a broad set of test scenarios for the login functionality, categorized by test type. These cases range from basic success flows to complex edge cases and security-focused boundary conditions.

## 1. Positive Test Cases
| ID | Description | Username | Password | Expected Result |
|---|---|---|---|---|
| TC-P1 | Successful login with valid credentials | `tomsmith` | `SuperSecretPassword!` | Redirect to `/secure`, show success message "You logged into a secure area!". |
| TC-P2 | Login with leading/trailing spaces (if trimmed) | ` tomsmith ` | `SuperSecretPassword!` | Success if the application auto-trims whitespace; otherwise, shows "Your username is invalid!". |

## 2. Negative Test Cases
| ID | Description | Username | Password | Expected Result |
|---|---|---|---|---|
| TC-N1 | Invalid username / Valid password | `wronguser` | `SuperSecretPassword!` | Stay on `/login`, show error message "Your username is invalid!". |
| TC-N2 | Valid username / Invalid password | `tomsmith` | `wrongpassword` | Stay on `/login`, show error message "Your password is invalid!". |
| TC-N3 | Both fields empty | (empty) | (empty) | Stay on `/login`, show error message "Your username is invalid!". |
| TC-N4 | Empty username only | (empty) | `SuperSecretPassword!` | Stay on `/login`, show error message "Your username is invalid!". |
| TC-N5 | Empty password only | `tomsmith` | (empty) | Stay on `/login`, show error message "Your password is invalid!". |

## 3. Edge Cases
| ID | Description | Username | Password | Expected Result |
|---|---|---|---|---|
| TC-E1 | SQL Injection attempt in username | `' OR '1'='1` | `password` | Input handled safely as literal string; shows error message "Your username is invalid!". |
| TC-E2 | XSS payload in fields | `tomsmith` | `<script>alert(1)</script>` | Payload rendered as plain text; shows "Your password is invalid!". |
| TC-E3 | Case sensitivity check - Username | `TomSmith` | `SuperSecretPassword!` | Should fail with "Your username is invalid!" due to case mismatch. |
| TC-E4 | Case sensitivity check - Password | `tomsmith` | `supersecretpassword!` | Should fail with "Your password is invalid!" due to case mismatch. |

## 4. Boundary Conditions
| ID | Description | Username | Password | Expected Result |
|---|---|---|---|---|
| TC-B1 | Maximum length input (255+ characters) | `a` * 255 | `SuperSecretPassword!` | UI remains functional; system shows error message "Your username is invalid!". |
| TC-B2 | Minimum length check (1 character) | `t` | `S` | System shows error messages "Your username/password is invalid!". |
| TC-B3 | Special characters usage | `tom.smith!@#` | `Super!Secret#123` | System handles characters safely; shows "Your username is invalid!". |
