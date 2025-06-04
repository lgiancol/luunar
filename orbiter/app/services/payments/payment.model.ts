import type { Client } from '../clients/clients.model';
import type { PaymentAccount } from './payment-account.model';

export enum PaymentType {
  'incoming' = 'incoming',
  'outgoing' = 'outgoing',
}

export const paymentTypes = [...new Set<PaymentType>([PaymentType.incoming, PaymentType.outgoing])];

export interface Payment {
  id: string;
  createdAt: Date;

  type: PaymentType;
  receivedAt: Date;
  amount: number;
  clientId: string | null;
  invoiceId: string | null;
  paymentAccountId: string;

  client: Client | null;
  paymentAccount: PaymentAccount[] | null;
}
