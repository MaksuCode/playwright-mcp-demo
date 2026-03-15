# ShopDemo — Playwright MCP Demo Target

A minimal but realistic e-commerce app built as a stable, locally-runnable target for Playwright MCP + Claude Code test automation.

## How to Run

```bash
npm install
npm run seed      # copies db.seed.json → db.json (reset state anytime)
npm run dev       # starts Express on http://localhost:3000
```

Open `http://localhost:3000` → redirects to `/index.html`.

## Tech Stack

- **Backend:** Node.js + Express + TypeScript (ts-node-dev for dev)
- **Auth:** JWT (jsonwebtoken) + bcryptjs
- **Database:** Plain `db.json` file (fs + JSON.parse/stringify)
- **Frontend:** Vanilla HTML/CSS/JS, served as static files by Express
- **Tests:** Playwright (`@playwright/test`)

## Key Conventions

1. **Every interactive element has a `data-testid` attribute** — always use `page.getByTestId(...)` in tests, never CSS classes or text content.
2. **API always at `/api/*`** — single port 3000, no CORS config needed.
3. **Auth:** JWT stored in `localStorage` as `token`; user email stored as `userEmail`.
4. **Seed before each test suite** with `npm run seed` to guarantee clean state.
5. **Pre-seeded user:** `test@test.com` / `password123`

## Page URLs

| Page | URL |
|------|-----|
| Product listing | `/index.html` |
| Login | `/login.html` |
| Register | `/register.html` |
| Cart | `/cart.html` |

## npm Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start server with hot-reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run seed` | Reset `db.json` from `db.seed.json` |
| `npm test` | Run Playwright tests headlessly |
| `npm run test:ui` | Open Playwright UI mode |

## Deeper Reference

- Test writing rules: `.claude/skills/test-conventions.md`
- Full API reference: `.claude/skills/api-contracts.md`
- Database schema: `.claude/skills/db-schema.md`
