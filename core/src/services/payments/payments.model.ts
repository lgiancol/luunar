import { ClientModel } from '../clients/clients.model';
import { PaymentAccount } from './payment-account.model';

export enum PaymentType {
  'incoming' = 'incoming',
  'outgoing' = 'outgoing',
}

export interface Payment {
  id: string;
  createdAt: Date;

  type: PaymentType;
  receivedAt: Date;
  amount: number;
  clientId: string | null;
  invoiceId: string | null;
  paymentAccountId: string;

  paymentAccount: PaymentAccount;
  client: ClientModel | null;
}

export type CreatePaymentModel = Omit<Payment, 'id' | 'createdAt' | 'paymentAccount' | 'client'>;
