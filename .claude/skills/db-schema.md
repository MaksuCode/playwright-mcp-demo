# Database Schema

The database is a plain JSON file at `db.json` in the project root.
`db.seed.json` is the canonical template — never modified at runtime.
To reset: `npm run seed` (copies `db.seed.json` → `db.json`).

---

## Top-Level Structure

```typescript
interface DB {
  users: User[];
  products: Product[];
  carts: Cart[];
  orders: Order[];
}
```

---

## User

```typescript
interface User {
  id: string;           // "u1", "u<timestamp>"
  email: string;
  passwordHash: string; // bcrypt hash (rounds=10)
  createdAt: string;    // ISO 8601
}
```

**Seed data:** `test@test.com` / `password123` (id: `u1`)

---

## Product

```typescript
interface Product {
  id: string;           // "p1" – "p5"
  name: string;
  category: string;     // "electronics" | "apparel"
  price: number;        // USD, e.g. 79.99
  stock: number;
  description: string;
}
```

**Seed products (5 total):**

| id | name | category | price |
|----|------|----------|-------|
| p1 | Wireless Headphones | electronics | 79.99 |
| p2 | Mechanical Keyboard | electronics | 129.99 |
| p3 | USB-C Hub | electronics | 39.99 |
| p4 | Running T-Shirt | apparel | 24.99 |
| p5 | Yoga Pants | apparel | 49.99 |

---

## Cart

```typescript
interface Cart {
  userId: string;
  items: CartItem[];
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
```

One cart per user, created lazily on first `POST /api/cart/items`.
Seed state: `carts: []`

---

## Order

```typescript
interface Order {
  id: string;           // "o<timestamp>"
  userId: string;
  items: CartItem[];
  total: number;        // sum of price * quantity, rounded to 2 decimals
  createdAt: string;    // ISO 8601
}
```

Seed state: `orders: []`

---

## File Locations

| File | Purpose |
|------|---------|
| `db.json` | Live database (runtime state, gitignored) |
| `db.seed.json` | Canonical seed (committed to git) |
| `scripts/seed.js` | Reset script: `node scripts/seed.js` |
