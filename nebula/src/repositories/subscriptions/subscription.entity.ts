export interface SubscriptionEntity {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  amount: number;
  vendor_id: string;
  payment_account_id: string;
  frequency: string;
  interval: number;
  start_date: Date;
  end_date: Date | null;
  is_active: boolean;
  last_processed: Date | null;
  description: string | null;
  category: string | null;
}

export interface CreateSubscriptionEntity {
  name: string;
  amount: number;
  vendor_id: string;
  payment_account_id: string;
  frequency: string;
  interval: number;
  start_date: Date;
  end_date: Date | null;
  description: string | null;
  category: string | null;
}

export interface UpdateSubscriptionEntity {
  name?: string;
  amount?: number;
  vendor_id?: string;
  payment_account_id?: string;
  frequency?: string;
  interval?: number;
  start_date?: Date;
  end_date?: Date | null;
  is_active?: boolean;
  description?: string | null;
  category?: string | null;
} 