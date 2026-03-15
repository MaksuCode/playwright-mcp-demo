# Requirements: [Feature Name]

> Copy this template into `requirements/<feature-name>.md` and fill in each section.
> Run `/requirements-to-tests requirements/<feature-name>.md` to generate BDD tests.

---

## Feature

**Name:** [Short feature name, e.g. "Checkout"]
**Description:** [One sentence: what this feature enables the user to do]

---

## User Stories

> Use the format: As a [role], I want [capability], so that [benefit].

- As a **[role]**, I want **[capability]**, so that **[benefit]**.
- As a **[role]**, I want **[capability]**, so that **[benefit]**.

---

## Acceptance Criteria

> Each numbered item becomes a BDD `Scenario` (happy path).
> Be specific: describe the starting state, action, and expected outcome.

1. **[Criterion title]** — Given [context], when [action], then [expected outcome].
2. **[Criterion title]** — Given [context], when [action], then [expected outcome].
3. **[Criterion title]** — Given [context], when [action], then [expected outcome].

---

## Edge Cases

> Each item becomes a BDD `Scenario` with a negative or error outcome.

1. **[Edge case title]** — Given [context], when [action], then [error/failure outcome].
2. **[Edge case title]** — Given [context], when [action], then [error/failure outcome].

---

## Test Data

> List the seed data, users, or products required to run these scenarios.

- **Users:** [e.g. `test@test.com` / `password123` (pre-seeded)]
- **Products:** [e.g. products `p1`–`p5` from `db.seed.json`]
- **Other state:** [e.g. "user must have at least one item in the cart"]

---

## Notes

> Any additional context for the test generator: new `data-testid` attributes needed,
> API endpoints to call, page URLs involved, etc.

- Page URL: [e.g. `/cart.html`]
- New `data-testid` attributes required: [list any that don't exist yet]
- Relevant API endpoints: [list endpoints from `api-contracts.md`]
