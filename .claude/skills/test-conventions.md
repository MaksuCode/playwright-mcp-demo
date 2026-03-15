# Test Conventions

## Selectors

- **Always** use `data-testid` selectors: `page.getByTestId('element-id')`
- **Never** use CSS classes (`.btn-primary`) or text content (`page.getByText(...)`) as primary selectors
- For dynamic IDs like `product-card-p1`, use `page.getByTestId('product-card-p1')`

## Auth Setup

Set up auth in `beforeEach` by calling the login API directly (faster than UI login):

```typescript
let token: string;
test.beforeEach(async ({ request }) => {
  const res = await request.post('/api/auth/login', {
    data: { email: 'test@test.com', password: 'password123' }
  });
  const body = await res.json();
  token = body.token;
});
```

To inject the token into a page before navigation:

```typescript
await page.goto('/login.html');
await page.evaluate((t) => {
  localStorage.setItem('token', t);
  localStorage.setItem('userEmail', 'test@test.com');
}, token);
await page.goto('/index.html');
```

## Database Reset

Reset the database between test suites (not between individual tests unless necessary):

```typescript
import { execSync } from 'child_process';
test.beforeAll(() => execSync('npm run seed', { cwd: process.cwd() }));
```

## Page URLs

| Page | URL |
|------|-----|
| Product listing | `http://localhost:3000/index.html` |
| Login | `http://localhost:3000/login.html` |
| Register | `http://localhost:3000/register.html` |
| Cart | `http://localhost:3000/cart.html` |

## Playwright Config

Use `baseURL: 'http://localhost:3000'` in `playwright.config.ts` so you can use relative paths like `/index.html`.

## Output Location

Generated test files go in `tests/<flow-name>.spec.ts`.

## Waiting for Elements

Prefer `await expect(locator).toBeVisible()` over arbitrary `page.waitForTimeout()`.
