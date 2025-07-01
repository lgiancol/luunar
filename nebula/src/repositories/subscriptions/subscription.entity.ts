import { Subscription as PrismaSubscription } from '../../generated/prisma';
import { SubscriptionUncheckedCreateInput, SubscriptionUncheckedUpdateInput } from '../../generated/prisma/models';
import {
  mapPaymentAccountEntityToModel,
  PaymentAccountEntity,
} from '../../repositories/payments/payment-account.entity';
import { mapVendorEntityToModel, VendorEntity } from '../../repositories/vendors/vendor.entity';
import {
  CreateSubscriptionModel,
  Subscription,
  UpdateSubscriptionModel,
} from '../../services/subscriptions/subscriptions.model';

export interface SubscriptionEntity extends PrismaSubscription {
  vendor: VendorEntity;
  payment_account: PaymentAccountEntity;
}

export function mapCreateSubscriptionModelToEntity(model: CreateSubscriptionModel): SubscriptionUncheckedCreateInput {
  return {
    name: model.name,
    amount: model.amount,
    frequency: model.frequency,
    interval: model.interval,
    start_date: model.startDate,
    end_date: model.endDate,
    is_active: true,
    last_processed: null,
    description: model.description,
    vendor_id: model.vendorId,
    payment_account_id: model.paymentAccountId,
  };
}

export function mapUpdateSubscriptionModelToEntity(model: UpdateSubscriptionModel): SubscriptionUncheckedUpdateInput {
  return {
    name: model.name,
    amount: model.amount,
    frequency: model.frequency,
    interval: model.interval,
    start_date: model.startDate,
    end_date: model.endDate,
    is_active: model.isActive,
    last_processed: model.lastProcessed,
    description: model.description,
    vendor_id: model.vendorId,
    payment_account_id: model.paymentAccountId,
  };
}

export function mapSubscriptionEntityToModel(entity: SubscriptionEntity): Subscription {
  return {
    id: entity.id,
    createdAt: new Date(entity.created_at),
    updatedAt: new Date(entity.updated_at),
    name: entity.name,
    amount: entity.amount,
    vendorId: entity.vendor_id,
    paymentAccountId: entity.payment_account_id,
    frequency: entity.frequency,
    interval: entity.interval,
    startDate: entity.start_date,
    endDate: entity.end_date,
    isActive: entity.is_active,
    lastProcessed: entity.last_processed,
    description: entity.description,
    category: entity.category,
    vendor: mapVendorEntityToModel(entity.vendor),
    paymentAccount: mapPaymentAccountEntityToModel(entity.payment_account),
  };
}
