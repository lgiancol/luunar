export interface CreateSubscriptionDto {
  name: string;
  amount: number;
  vendor_id: string;
  payment_account_id: string;
  frequency: string;
  interval: number;
  start_date: string;
  end_date?: string | null;
  is_active?: boolean;
  description?: string | null;
  category?: string | null;
}

export interface FetchSubscriptionDto {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  amount: number;
  vendor_id: string;
  payment_account_id: string;
  frequency: string;
  interval: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  last_processed: string | null;
  description: string | null;
  category: string | null;
  // Optionally, include vendor and payment_account as nested objects if API returns them
  vendor?: any;
  payment_account?: any;
}

export interface PaginatedSubscriptionsDto {
  data: FetchSubscriptionDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
