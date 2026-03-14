# API Contracts

Base URL: `http://localhost:3000`
All `/api/*` routes return `Content-Type: application/json`.
Auth-protected routes require header: `Authorization: Bearer <jwt>`
Error shape: `{ "error": "string" }`

---

## Auth

### POST /api/auth/register
Register a new user.

**Request body:**
```json
{ "email": "user@example.com", "password": "secret" }
```

**Response 201:**
```json
{ "token": "<jwt>", "user": { "id": "u123", "email": "user@example.com" } }
```

**Errors:** 400 (missing fields), 409 (email already registered)

---

### POST /api/auth/login
Login with existing credentials.

**Request body:**
```json
{ "email": "test@test.com", "password": "password123" }
```

**Response 200:**
```json
{ "token": "<jwt>", "user": { "id": "u1", "email": "test@test.com" } }
```

**Errors:** 400 (missing fields), 401 (invalid credentials)

---

### POST /api/auth/logout
Stateless logout (client clears token).

**Response 200:**
```json
{ "message": "ok" }
```

---

## Products

### GET /api/products
List all products.

**Query params:** `?category=electronics` or `?category=apparel` (optional)

**Response 200:**
```json
{
  "products": [
    { "id": "p1", "name": "Wireless Headphones", "category": "electronics", "price": 79.99, "stock": 50, "description": "..." }
  ]
}
```

**Product type:** `{ id, name, category, price, stock, description }`

---

## Cart (all require auth)

### GET /api/cart
Get current user's cart.

**Response 200:**
```json
{ "items": [{ "productId": "p1", "name": "Wireless Headphones", "price": 79.99, "quantity": 2 }] }
```

---

### POST /api/cart/items
Add item to cart (increments quantity if already present).

**Request body:**
```json
{ "productId": "p1", "quantity": 1 }
```

**Response 200:**
```json
{ "items": [...] }
```

**Errors:** 400 (missing/invalid fields), 401 (unauthenticated), 404 (product not found)

---

### PUT /api/cart/items/:productId
Update quantity of a cart item.

**Request body:**
```json
{ "quantity": 3 }
```

**Response 200:**
```json
{ "items": [...] }
```

**Errors:** 400 (invalid quantity), 401, 404 (cart or item not found)

---

### DELETE /api/cart/items/:productId
Remove item from cart.

**Response 200:**
```json
{ "items": [...] }
```

**Errors:** 401, 404

---

## Orders (requires auth)

### POST /api/orders
Place an order using the current cart. Cart is cleared on success.

**Response 201:**
```json
{
  "orderId": "o1710000000000",
  "items": [{ "productId": "p1", "name": "Wireless Headphones", "price": 79.99, "quantity": 2 }],
  "total": 159.98,
  "createdAt": "2026-03-14T12:00:00.000Z"
}
```

**Errors:** 400 (empty cart), 401

---

## CartItem Type

```typescript
interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
```
