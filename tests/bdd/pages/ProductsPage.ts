import { Page } from 'playwright';

export class ProductsPage {
  readonly productCards = this.page.locator('[data-testid^="product-card-"]');
  readonly productCategories = this.page.locator('[data-testid^="product-card-"] [data-testid="product-category"]');
  readonly cartCount = this.page.locator('[data-testid="cart-count"]');

  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/products') && !r.url().includes('category=')),
      this.page.goto('/index.html'),
    ]);
  }

  async filterBy(category: string): Promise<void> {
    const isAll = category.toLowerCase() === 'all';
    const matchesFilter = isAll
      ? (r: any) => r.url().includes('/api/products') && !r.url().includes('category=')
      : (r: any) => r.url().includes(`/api/products?category=${encodeURIComponent(category.toLowerCase())}`);

    await Promise.all([
      this.page.waitForResponse(matchesFilter),
      this.page.locator(`[data-testid="filter-${category.toLowerCase()}"]`).click(),
    ]);
  }

  async addToCart(productName: string): Promise<void> {
    const card = this.productCards.filter({ hasText: productName });
    await Promise.all([
      this.page.waitForResponse(r => r.url().includes('/api/cart/items') && r.request().method() === 'POST'),
      card.locator('[data-testid^="add-to-cart-"]').click(),
    ]);
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartCount.textContent();
    return parseInt(text ?? '0', 10);
  }

  async getVisibleProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getVisibleProductCategories(): Promise<string[]> {
    return this.productCategories.allTextContents();
  }
}
