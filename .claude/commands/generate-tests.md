# /generate-tests

Generate a Playwright spec file for a given user flow.

## Usage

```
/generate-tests <flow-name>
```

Examples:
- `/generate-tests auth` — login, register, logout flows
- `/generate-tests products` — product listing, category filter
- `/generate-tests cart` — add to cart, update quantity, remove, checkout

## Instructions

1. Read `.claude/skills/test-conventions.md` for selector and auth setup rules.
2. Read `.claude/skills/api-contracts.md` for endpoint shapes.
3. Read `.claude/skills/db-schema.md` for seed data (products, default user).
4. Generate a Playwright spec at `tests/<flow-name>.spec.ts`.

## Spec Structure

```typescript
import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

test.beforeAll(() => execSync('npm run seed'));

test.describe('<Flow Name>', () => {
  // tests here
});
```

## Rules

- Use `page.getByTestId(...)` for all selectors.
- Use API login in `beforeEach` for authenticated tests (don't navigate through login UI unless testing login itself).
- Each test must be independent and not rely on side effects from other tests.
- Output file path: `tests/<flow-name>.spec.ts`
