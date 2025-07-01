import type {
  CreateSubscriptionModel,
  UpdateSubscriptionModel,
} from '../../services/subscriptions/subscriptions.model';

export function mapAddSubscriptionPayload(payload: any): CreateSubscriptionModel {
  return {
    name: payload.name,
    amount: payload.amount,
    vendorId: payload.vendor_id,
    paymentAccountId: payload.payment_account_id,
    frequency: payload.frequency,
    interval: payload.interval,
    startDate: new Date(payload.start_date),
    endDate: payload.end_date ? new Date(payload.end_date) : null,
    description: payload.description,
    category: payload.category,
  };
}

export function mapUpdateSubscriptionPayload(payload: any): UpdateSubscriptionModel {
  return {
    name: payload.name,
    amount: payload.amount,
    vendorId: payload.vendor_id,
    paymentAccountId: payload.payment_account_id,
    frequency: payload.frequency,
    interval: payload.interval,
    startDate: payload.start_date ? new Date(payload.start_date) : undefined,
    endDate: payload.end_date ? new Date(payload.end_date) : null,
    isActive: payload.is_active,
    description: payload.description,
    category: payload.category,
  };
}
