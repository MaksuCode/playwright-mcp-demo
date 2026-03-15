import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { ProductsPage } from '../pages/ProductsPage';

When('I filter products by {string}', async function (this: CustomWorld, category: string) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.filterBy(category);
});

Then('I should see at least 1 product', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  expect(await productsPage.getVisibleProductCount()).toBeGreaterThan(0);
});

Given('I note the current product count as {string}', async function (this: CustomWorld, key: string) {
  const productsPage = new ProductsPage(this.page);
  this.counters = this.counters ?? {};
  this.counters[key] = await productsPage.getVisibleProductCount();
});

Then('I should see the same number of products as {string}', async function (this: CustomWorld, key: string) {
  const productsPage = new ProductsPage(this.page);
  expect(await productsPage.getVisibleProductCount()).toBe(this.counters[key]);
});

Then('all visible products should be in the {string} category', async function (this: CustomWorld, category: string) {
  const productsPage = new ProductsPage(this.page);
  const categories = await productsPage.getVisibleProductCategories();
  expect(categories.length).toBeGreaterThan(0);
  categories.forEach(cat => expect(cat).toBe(category.toLowerCase()));
});

Then('the cart count should be {int}', async function (this: CustomWorld, count: number) {
  const productsPage = new ProductsPage(this.page);
  expect(await productsPage.getCartCount()).toBe(count);
});
