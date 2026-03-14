import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { RegisterPage } from '../pages/RegisterPage';

Given('I am on the register page', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.navigate();
});

When('I fill in the registration form with email {string} password {string} and confirm password {string}', async function (this: CustomWorld, email: string, password: string, confirm: string) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillEmail(email);
  await registerPage.fillPassword(password);
  await registerPage.fillConfirmPassword(confirm);
});

When('I click the register button', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.clickRegister();
});
