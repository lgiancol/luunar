import { Payment } from './payments.model';

export interface PaymentAccount {
  id: string;
  createdAt: Date;

  name: string;
  type: string;
  notes: string | null;

  payments: Payment[] | null;
}

export type CreatePaymentAccountModel = Omit<PaymentAccount, 'id' | 'createdAt' | 'payments'>;
