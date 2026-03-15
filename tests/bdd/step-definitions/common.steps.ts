import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

Given('I am logged in as {string} with password {string}', async function (this: CustomWorld, email: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);
  await loginPage.clickLogin();
  await this.page.waitForURL('**/index.html');
});

Given('I am on the products page', async function (this: CustomWorld) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.navigate();
});

Given('I am on the cart page', async function (this: CustomWorld) {
  const cartPage = new CartPage(this.page);
  await cartPage.navigate();
});

Given('I add {string} to the cart', async function (this: CustomWorld, productName: string) {
  const productsPage = new ProductsPage(this.page);
  await productsPage.addToCart(productName);
});
