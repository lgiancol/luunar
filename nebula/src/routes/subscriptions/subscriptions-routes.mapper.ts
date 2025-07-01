import type {
  CreateSubscriptionModel,
  UpdateSubscriptionModel,
} from '../../services/subscriptions/subscriptions.model';

export function mapAddSubscriptionPayload(payload: any): CreateSubscriptionModel {
  return {
    name: payload.name,
    amount: payload.amount,
    vendorId: payload.vendorId,
    paymentAccountId: payload.paymentAccountId,
    frequency: payload.frequency,
    interval: payload.interval,
    startDate: new Date(payload.startDate),
    endDate: payload.endDate ? new Date(payload.endDate) : null,
    description: payload.description,
    category: payload.category,
  };
}

export function mapUpdateSubscriptionPayload(payload: any): UpdateSubscriptionModel {
  return {
    name: payload.name,
    amount: payload.amount,
    vendorId: payload.vendorId,
    paymentAccountId: payload.paymentAccountId,
    frequency: payload.frequency,
    interval: payload.interval,
    startDate: payload.startDate ? new Date(payload.startDate) : undefined,
    endDate: payload.endDate ? new Date(payload.endDate) : null,
    isActive: payload.isActive,
    description: payload.description,
    category: payload.category,
  };
}
