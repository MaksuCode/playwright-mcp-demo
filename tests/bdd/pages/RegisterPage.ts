import { Page } from 'playwright';

export class RegisterPage {
  readonly emailInput = this.page.locator('[data-testid="email-input"]');
  readonly passwordInput = this.page.locator('[data-testid="password-input"]');
  readonly confirmPasswordInput = this.page.locator('[data-testid="confirm-password-input"]');
  readonly registerButton = this.page.locator('[data-testid="register-button"]');

  constructor(private page: Page) {}

  async navigate(): Promise<void> {
    await this.page.goto('/register.html');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password);
  }

  async clickRegister(): Promise<void> {
    await this.registerButton.click();
  }
}
