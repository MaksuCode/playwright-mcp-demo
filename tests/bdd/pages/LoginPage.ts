import { Page } from 'playwright';

export class LoginPage {
  readonly emailInput = this.page.locator('[data-testid="email-input"]');
  readonly passwordInput = this.page.locator('[data-testid="password-input"]');
  readonly loginButton = this.page.locator('[data-testid="login-button"]');
  readonly errorMessage = this.page.locator('[data-testid="error-message"]');

  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login.html');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible' });
    return (await this.errorMessage.textContent()) ?? '';
  }
}
