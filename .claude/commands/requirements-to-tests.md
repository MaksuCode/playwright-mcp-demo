# /requirements-to-tests

Read a requirements document and generate a BDD `.feature` file and Cucumber step definitions.

## Usage

```
/requirements-to-tests requirements/<feature-name>.md
```

Example:
- `/requirements-to-tests requirements/checkout.md`

---

## Instructions

Follow these steps in order. Do not skip any step.

### Step 1 — Read the requirements file

Read the file at the path provided in the argument (e.g. `requirements/checkout.md`).
Extract:
- The **feature name** and description
- All **Acceptance Criteria** (each becomes a happy-path `Scenario`)
- All **Edge Cases** (each becomes a failure/negative `Scenario`)
- The **Test Data** section (seed users, product IDs, required state)
- Any **Notes** about `data-testid` attributes or API endpoints

Derive `<feature-name>` (lowercase, hyphenated) from the filename, e.g. `checkout.md` → `checkout`.

### Step 2 — Read the project conventions

Read these files to understand the rules for writing tests in this project:
- `.claude/skills/test-conventions.md` — selector rules, auth setup, DB reset, page URLs
- `.claude/skills/api-contracts.md` — available API endpoints and their request/response shapes

### Step 3 — Read existing BDD files for style and reuse

Read these files to match style and avoid duplicating steps:
- `tests/bdd/features/login.feature` — reference for Gherkin formatting
- `tests/bdd/step-definitions/common.steps.ts` — shared steps that can be reused
- Any other existing `.feature` and `.steps.ts` files relevant to the feature

### Step 4 — Generate the feature file

Write `tests/bdd/features/<feature-name>.feature`.

Rules:
- Start with `Feature: <name>` and a one-line description
- Use a `Background:` block for steps shared across all scenarios (e.g. being logged in, seeding the DB)
- Write one `Scenario:` per Acceptance Criterion (happy paths first)
- Write one `Scenario:` per Edge Case (after happy paths)
- Use descriptive scenario titles that reflect the criterion
- Use only `Given`, `When`, `Then`, `And` keywords
- All steps must be implementable with `data-testid` selectors or API calls — never reference CSS classes or visible text as selectors
- Match the indentation and blank-line style of `login.feature`

### Step 5 — Generate the step definitions file

Write `tests/bdd/step-definitions/<feature-name>.steps.ts`.

Rules:
- Import `Given`, `When`, `Then` from `@cucumber/cucumber`
- Import `CustomWorld` from `../support/world`
- Import relevant page objects from `../pages/`
- Only implement steps that are **not already defined** in `common.steps.ts` or other existing step files
- For each new step:
  - Use `page.getByTestId(...)` for all element interactions — never CSS selectors or text
  - Use API calls via `this.page.request` (or set up auth via `localStorage`) for test setup steps
  - Prefer `await expect(locator).toBeVisible()` over `waitForTimeout`
- Add a `BeforeAll` hook to run `npm run seed` for DB reset
- Add a `Before` hook to inject the JWT token into `localStorage` for scenarios that require auth

### Step 6 — Report new data-testid requirements

If any scenario requires interacting with a page element that does not yet have a `data-testid` attribute, list those attributes clearly at the end of your response in a section titled:

```
## Required data-testid Attributes
```

Include the element description and the suggested `data-testid` value for each.

---

## Output Summary

After generating both files, print a brief summary:
1. Path to the generated `.feature` file
2. Path to the generated `.steps.ts` file
3. Count of scenarios generated (happy path vs edge case)
4. List of steps reused from existing files vs newly implemented
5. Any `data-testid` attributes that need to be added to the frontend
