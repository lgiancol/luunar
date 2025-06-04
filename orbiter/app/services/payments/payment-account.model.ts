import type { Payment } from './payment.model';

export interface PaymentAccount {
  id: string;
  createdAt: Date;

  name: string;
  type: string;
  notes: string | null;

  payment: Payment | null;
}
