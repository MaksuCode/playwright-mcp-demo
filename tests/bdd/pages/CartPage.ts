import { Page } from 'playwright';

export class CartPage {
  readonly cartTotal = this.page.locator('[data-testid="cart-total"]');
  readonly emptyCartMessage = this.page.locator('[data-testid="empty-cart-message"]');
  readonly checkoutButton = this.page.locator('[data-testid="checkout-button"]');
  readonly cartItems = this.page.locator('[data-testid^="cart-item-"]');
  readonly orderSuccessMessage = this.page.locator('[data-testid="order-success-message"]');

  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async getTotal(): Promise<string> {
    return (await this.cartTotal.textContent()) ?? '';
  }

  async isCartEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }

  async isCheckoutDisabled(): Promise<boolean> {
    return this.checkoutButton.isDisabled();
  }

  async isItemVisible(productName: string): Promise<boolean> {
    return this.cartItems.filter({ hasText: productName }).isVisible();
  }

  async updateQuantity(productName: string, quantity: number): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('[data-testid="item-quantity"]').fill(String(quantity));
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/cart/items/') && r.request().method() === 'PUT'),
      item.locator('[data-testid^="update-quantity-"]').click(),
    ]);
  }

  async removeItem(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/cart/items/') && r.request().method() === 'DELETE'),
      item.locator('[data-testid^="remove-item-"]').click(),
    ]);
  }

  async clickCheckout(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/orders')),
      this.checkoutButton.click(),
    ]);
  }

  async isOrderSuccessVisible(): Promise<boolean> {
    return this.orderSuccessMessage.isVisible();
  }
}
