import Address from './address';

export default interface DeliveryDriver {
  name: string;
  cpf: string;
  email: string;
  whatsapp: string;
  address: Address;
  deliveryMethod: string;
  cnh: string;
}
