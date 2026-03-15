# Requirements: Checkout

## Feature

**Name:** Checkout / Place Order
**Description:** Authenticated users can place an order from their cart, receive a confirmation, and have their cart cleared on success.

---

## User Stories

- As a **logged-in shopper**, I want **to place an order from my cart**, so that **I can purchase the items I've selected**.
- As a **logged-in shopper**, I want **to see an order confirmation after checkout**, so that **I know my order was received**.
- As a **logged-in shopper**, I want **my cart to be cleared after a successful order**, so that **I start fresh for my next purchase**.

---

## Acceptance Criteria

1. **Successful checkout with items in cart** — Given I am logged in and have at least one item in my cart, when I navigate to the cart page and click the checkout button, then I should see an order success message.

2. **Cart is cleared after successful order** — Given I am logged in and have items in my cart, when I complete checkout, then the cart should be empty and show the empty cart message.

3. **Order total is displayed before checkout** — Given I am logged in and have items in my cart, when I navigate to the cart page, then I should see the correct total price for all items in the cart.

---

## Edge Cases

1. **Cannot checkout with an empty cart** — Given I am logged in but my cart is empty, when I navigate to the cart page, then the checkout button should be disabled and I should see an empty cart message.

2. **Unauthenticated user is redirected from cart** — Given I am not logged in, when I navigate to the cart page, then I should be redirected to the login page.

---

## Test Data

- **Users:** `test@test.com` / `password123` (pre-seeded via `npm run seed`)
- **Products:** `p1` (Wireless Headphones, $79.99), `p2` (Running Shoes, $59.99) from `db.seed.json`
- **Other state:**
  - For happy-path scenarios: add product `p1` to cart via `POST /api/cart/items` before navigating to the cart page
  - For empty-cart scenario: ensure the cart is empty (seed resets state)

---

## Notes

- Page URL: `/cart.html`
- Relevant API endpoints:
  - `POST /api/auth/login` — authenticate before cart operations
  - `POST /api/cart/items` — add item to cart in test setup
  - `POST /api/orders` — called when checkout button is clicked
  - `GET /api/cart` — verify cart state post-checkout
- Existing `data-testid` attributes (already in `CartPage.ts`):
  - `checkout-button` — the place order button
  - `empty-cart-message` — shown when cart has no items
  - `cart-total` — displays the total price
  - `order-success-message` — shown after successful order
  - `cart-item-{productId}` — individual cart item rows
- No new `data-testid` attributes required for these scenarios
