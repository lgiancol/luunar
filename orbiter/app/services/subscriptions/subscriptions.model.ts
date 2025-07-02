import type { PaymentAccount } from '../payments/payment-account.model';
import type { Vendor } from '../vendors/vendors.model';

export interface Subscription {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  amount: number;
  vendorId: string;
  paymentAccountId: string;
  frequency: string;
  interval: number;
  startDate: Date;
  endDate: Date | null;
  isActive: boolean;
  lastProcessed: Date | null;
  description: string | null;
  category: string | null;

  vendor: Vendor | null;
  paymentAccount: PaymentAccount | null;
}

export type CreateSubscriptionModel = {
  name: string;
  amount: number;
  vendorId: string;
  paymentAccountId: string;
  frequency: string;
  interval: number;
  startDate: Date;
  endDate: Date | null;
  lastProcessed: Date | null;
  description: string | null;
  category: string | null;

  backfill?: boolean;
};
