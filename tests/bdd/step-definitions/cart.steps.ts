import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CartPage } from '../pages/CartPage';

When('I update the quantity of {string} to {int}', async function (this: CustomWorld, productName: string, quantity: number) {
  const cartPage = new CartPage(this.page);
  await cartPage.updateQuantity(productName, quantity);
});

When('I remove {string} from the cart', async function (this: CustomWorld, productName: string) {
  const cartPage = new CartPage(this.page);
  await cartPage.removeItem(productName);
});

When('I click checkout', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.clickCheckout();
});

Then('I should see {string} in the cart', async function (this: CustomWorld, productName: string) {
  const cartPage = new CartPage(this.page);
  expect(await cartPage.isItemVisible(productName)).toBe(true);
});

Then('I should not see {string} in the cart', async function (this: CustomWorld, productName: string) {
  const cartPage = new CartPage(this.page);
  expect(await cartPage.isItemVisible(productName)).toBe(false);
});

Then('the cart total should be {string}', async function (this: CustomWorld, total: string) {
  const cartPage = new CartPage(this.page);
  expect(await cartPage.getTotal()).toBe(total);
});

Then('the cart should be empty', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  expect(await cartPage.isCartEmpty()).toBe(true);
});

Then('the checkout button should be disabled', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  expect(await cartPage.isCheckoutDisabled()).toBe(true);
});

Then('I should see the order success message', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  expect(await cartPage.isOrderSuccessVisible()).toBe(true);
});
