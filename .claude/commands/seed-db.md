# /seed-db

Reset the live database to the canonical seed state.

## What It Does

Copies `db.seed.json` → `db.json`, restoring:
- 1 user: `test@test.com` / `password123`
- 5 products (3 electronics, 2 apparel)
- Empty carts and orders arrays

## Instructions

Run the seed script and confirm success:

```bash
npm run seed
```

Then confirm by reading `db.json` and reporting the timestamp of the operation.

## When to Use

- Before running Playwright test suites
- After manual testing that modified cart/order/user state
- When starting a fresh demo session
