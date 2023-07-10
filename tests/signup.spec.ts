import { test } from '@playwright/test';
import signupFactory from '../factories/signup-factory';
import SignupPage from '../pages/signup-page';

test.describe('Signup Page', () => {
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
  });

  test('User should become a delivery driver', async () => {
    // Arrange
    const deliveryDriver = signupFactory.createDeliveryDriver();
    const confirmationMessage =
      'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.';

    // Act
    await signupPage.go();
    await signupPage.fillForm(deliveryDriver);
    await signupPage.submit();

    // Assert
    await signupPage.assertModalContent(confirmationMessage);
  });

  test('Invalid CPF should display an error', async () => {
    // Arrange
    const deliveryDriver = signupFactory.createDeliveryDriver();
    deliveryDriver.cpf = '000000141aa';

    const errorMessage = 'Oops! CPF inválido';

    // Act
    await signupPage.go();
    await signupPage.fillForm(deliveryDriver);
    await signupPage.submit();

    // Assert
    await signupPage.assertAlertMessage(errorMessage);
  });

  test('Invalid email should display an error', async () => {
    // Arrange
    const deliveryDriver = signupFactory.createDeliveryDriver();
    deliveryDriver.email = 'user.com.br';

    const errorMessage = 'Oops! Email com formato inválido.';

    // Act
    await signupPage.go();
    await signupPage.fillForm(deliveryDriver);
    await signupPage.submit();

    // Assert
    await signupPage.assertAlertMessage(errorMessage);
  });

  test(`Form fields should be required`, async () => {
    // Arrange
    const errorMessages = [
      'É necessário informar o nome',
      'É necessário informar o CPF',
      'É necessário informar o email',
      'É necessário informar o CEP',
      'É necessário informar o número do endereço',
      'Selecione o método de entrega',
      'Adicione uma foto da sua CNH',
    ];

    // Act
    await signupPage.go();
    await signupPage.submit();

    // Assert
    for (const errorMessage of errorMessages) {
      await signupPage.assertAlertMessage(errorMessage);
    }
  });
});
