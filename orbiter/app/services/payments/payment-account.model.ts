import type { Payment } from './payments.model';

export interface PaymentAccount {
  id: string;
  createdAt: Date;

  name: string;
  type: string;
  notes: string | null;

  payment: Payment | null;
}
