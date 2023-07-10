import { expect, Page } from '@playwright/test';
import DeliveryDriver from '../types/interfaces/delivery-driver';
import BasePage from './base-page';

export default class SignupPage extends BasePage {
  private readonly url = '/deliver';

  private readonly nameFiled = this.page.getByPlaceholder('Nome completo');
  private readonly cpfField = this.page.getByPlaceholder('CPF somente números');
  private readonly emailField = this.page.getByPlaceholder('E-mail');
  private readonly whatsappField = this.page.getByPlaceholder('Whatsapp');
  private readonly postalCodeField = this.page.getByPlaceholder('CEP');
  private readonly addressNumberField = this.page.getByPlaceholder('Número', { exact: true });
  private readonly addressDetailsField = this.page.getByPlaceholder('Complemento');
  private readonly addressStreetField = this.page.getByPlaceholder('Rua');
  private readonly addressDistrictField = this.page.getByPlaceholder('Bairro');
  private readonly addressCityStateField = this.page.getByPlaceholder('Cidade/UF');
  private readonly postalCodeSearchButton = this.page.getByRole('button', { name: 'Buscar CEP' });
  private readonly submitButton = this.page.getByRole('button', { name: 'Cadastre-se para fazer entregas' });
  private readonly cnhImageUpload = this.page.locator('input[accept^="image"]');
  private readonly confirmationModal = this.page.locator('.swal2-container .swal2-html-container');

  private readonly deliveryMethodOption = (method: string) => this.page.getByAltText(method);
  private readonly errorMessage = (message: string) => this.page.locator('.alert-error', { hasText: message });

  constructor(protected readonly page: Page) {
    super(page);
  }

  override async go() {
    await super.go(this.url);
  }

  async fillForm(deliveryDriver: DeliveryDriver) {
    await this.nameFiled.fill(deliveryDriver.name);
    await this.cpfField.fill(deliveryDriver.cpf);
    await this.emailField.fill(deliveryDriver.email);
    await this.whatsappField.fill(deliveryDriver.whatsapp);

    await this.postalCodeField.fill(deliveryDriver.address.postalCode);
    await this.postalCodeSearchButton.click();

    await this.addressNumberField.fill(deliveryDriver.address.number);
    await this.addressDetailsField.fill(deliveryDriver.address.details);

    await expect(this.addressStreetField).toHaveValue(deliveryDriver.address.street);
    await expect(this.addressDistrictField).toHaveValue(deliveryDriver.address.district);
    await expect(this.addressCityStateField).toHaveValue(deliveryDriver.address.city_state);

    await this.deliveryMethodOption(deliveryDriver.deliveryMethod).click();
    await this.cnhImageUpload.setInputFiles(`fixtures/images/${deliveryDriver.cnh}`);
  }

  async submit() {
    await this.submitButton.click();
  }

  async assertModalContent(expectedMessage: string) {
    await expect(this.confirmationModal).toHaveText(expectedMessage);
  }

  async assertAlertMessage(expectedMessage: string) {
    await expect.soft(this.errorMessage(expectedMessage)).toBeVisible();
  }
}
