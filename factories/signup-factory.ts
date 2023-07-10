import { faker } from '@faker-js/faker';
import { generate } from 'gerador-validador-cpf';
import DeliveryDriver from '../types/interfaces/delivery-driver';

export default {
  createDeliveryDriver(): DeliveryDriver {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      name: `${firstName}, ${lastName}`,
      cpf: generate(),
      email: faker.internet.email({ firstName, lastName }),
      whatsapp: '11999999999',
      address: {
        postalCode: '04534011',
        street: 'Rua Joaquim Floriano',
        number: '1000',
        details: 'Ap 142',
        district: 'Itaim Bibi',
        city_state: 'São Paulo/SP',
      },
      deliveryMethod: 'Moto',
      cnh: 'cnh-digital.jpg',
    };
  },
};
