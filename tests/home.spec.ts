import { test } from '@playwright/test';
import HomePage from '../pages/home-page';

test.describe('Home page', () => {
  let homePage: HomePage;

  test.beforeEach(({ page }) => {
    homePage = new HomePage(page);
  });

  test('App should be online', async () => {
    // Arrange
    const heading = 'Seja um parceiro entregador pela Buger Eats';

    // Act
    await homePage.go();

    // Assert
    await homePage.assertPageHeading(heading);
  });

  test('Signup link should lead to Signup page', async () => {
    // Arrange
    const pageUrl = /.*deliver/;
    const heading = 'Cadastre-se para fazer entregas';

    // Act
    await homePage.go();
    const signupPage = await homePage.clickSignupLink();

    // Assert
    await signupPage.assertPageUrl(pageUrl);
    await signupPage.assertPageHeading(heading);
  });
});
