import type { VendorModel } from '../vendors/vendors.model';
import type { PaymentAccount } from '../payments/payment-account.model';

export interface SubscriptionModel {
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
  vendor: VendorModel;
  paymentAccount: PaymentAccount;
}

export interface CreateSubscriptionModel {
  name: string;
  amount: number;
  vendorId: string;
  paymentAccountId: string;
  frequency: string;
  interval: number;
  startDate: Date;
  endDate: Date | null;
  description: string | null;
  category: string | null;
}

export interface UpdateSubscriptionModel {
  name?: string;
  amount?: number;
  vendorId?: string;
  paymentAccountId?: string;
  frequency?: string;
  interval?: number;
  startDate?: Date;
  endDate?: Date | null;
  isActive?: boolean;
  description?: string | null;
  category?: string | null;
} 