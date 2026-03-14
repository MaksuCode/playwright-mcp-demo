import { Page } from 'playwright';

export class LoginPage {
  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/login.html');
  }

  async fillEmail(email: string): Promise<void> {
    await this.page.locator('[data-testid="email-input"]').fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.page.locator('[data-testid="password-input"]').fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.locator('[data-testid="login-button"]').click();
  }

  async getErrorMessage(): Promise<string> {
    const errorLocator = this.page.locator('[data-testid="error-message"]');
    await errorLocator.waitFor({ state: 'visible' });
    return (await errorLocator.textContent()) ?? '';
  }
}
