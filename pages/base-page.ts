import { Page, expect } from '@playwright/test';

export default abstract class BasePage {
  private readonly heading = (text: string) => this.page.getByRole('heading', { name: text });

  constructor(protected readonly page: Page) {}

  async go(url: string) {
    await this.page.goto(url);
  }

  async assertPageUrl(pageUrl: RegExp) {
    await expect(this.page).toHaveURL(pageUrl);
  }

  async assertPageHeading(expectedHeading: string) {
    await expect(this.heading(expectedHeading)).toBeVisible();
  }
}
