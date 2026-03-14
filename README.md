# playwright-mcp-demo

A minimal e-commerce demo app built as a locally-runnable target for end-to-end test automation with Playwright MCP and Claude Code.

## Setup

```bash
npm install
npm run seed   # reset database to clean state
npm run dev    # start server at http://localhost:3000
```

## Running Tests

```bash
npm test            # run Playwright tests headlessly
npm run test:ui     # open Playwright UI mode
npx cucumber-js     # run BDD tests with Cucumber
```

## Project Structure

```
src/                  # Express backend (TypeScript)
public/               # Frontend (vanilla HTML/CSS/JS)
tests/
  ├── bdd/
  │   ├── features/         # Cucumber feature files
  │   ├── pages/            # Page object classes
  │   ├── step-definitions/ # Cucumber step implementations
  │   └── support/          # World setup and hooks
db.seed.json          # Seed data (run `npm run seed` to reset)
```

## Pre-seeded Credentials

| Email | Password |
|---|---|
| test@test.com | password123 |

## Pages

| Page | URL |
|---|---|
| Products | `/index.html` |
| Login | `/login.html` |
| Register | `/register.html` |
| Cart | `/cart.html` |
