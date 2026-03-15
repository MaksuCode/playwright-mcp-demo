import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the login page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I enter email {string} and password {string}', async function (this: CustomWorld, email: string, password: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.fillEmail(email);
  await loginPage.fillPassword(password);
});

When('I click the login button', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.clickLogin();
});

Then('I should be redirected to the product listing page', async function (this: CustomWorld) {
  await this.page.waitForURL('**/index.html');
});

Then('I should see {string} in the header', async function (this: CustomWorld, email: string) {
  await expect(this.page.locator('[data-testid="user-email"]')).toHaveText(email);
});

Then('I should see an error message {string}', async function (this: CustomWorld, message: string) {
  await expect(this.page.locator('[data-testid="error-message"]')).toHaveText(message);
});
