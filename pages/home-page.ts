import { Page } from '@playwright/test';
import BasePage from './base-page';
import SignupPage from './signup-page';

export default class HomePage extends BasePage {
  private readonly url = '/';

  private readonly signupLink = this.page.getByRole('link', { name: 'Cadastre-se para fazer entregas' });

  constructor(protected readonly page: Page) {
    super(page);
  }

  override async go() {
    await super.go(this.url);
  }

  async clickSignupLink() {
    await this.signupLink.click();
    return new SignupPage(this.page);
  }
}
