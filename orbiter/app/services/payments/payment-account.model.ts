import type { Payment } from './payment.model';

export type PaymentAccountType = 'platform' | 'bank' | 'card';

export interface PaymentAccount {
  id: string;
  createdAt: Date;

  name: string;
  type: PaymentAccountType;
  notes: string | null;

  payment: Payment | null;
}
