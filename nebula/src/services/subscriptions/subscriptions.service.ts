import { SubscriptionsRepository } from '../../repositories/subscriptions/subscriptions.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import type { CreateSubscriptionModel, UpdateSubscriptionModel } from './subscriptions.model';

export class SubscriptionsService {
  private subscriptionsRepository: SubscriptionsRepository;

  constructor(subscriptionsRepository: SubscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async createSubscription(data: CreateSubscriptionModel) {
    return this.subscriptionsRepository.createSubscription({
      name: data.name,
      amount: data.amount,
      vendor_id: data.vendorId,
      payment_account_id: data.paymentAccountId,
      frequency: data.frequency,
      interval: data.interval,
      start_date: data.startDate,
      end_date: data.endDate,
      description: data.description,
      category: data.category,
    });
  }

  async getSubscriptions(data: PaginatedPayload) {
    return this.subscriptionsRepository.getSubscriptionsPaginated(data);
  }

  async getSubscriptionById(id: string) {
    return this.subscriptionsRepository.getSubscriptionById(id);
  }

  async updateSubscription(id: string, data: UpdateSubscriptionModel) {
    return this.subscriptionsRepository.updateSubscription(id, {
      name: data.name,
      amount: data.amount,
      vendor_id: data.vendorId,
      payment_account_id: data.paymentAccountId,
      frequency: data.frequency,
      interval: data.interval,
      start_date: data.startDate,
      end_date: data.endDate,
      is_active: data.isActive,
      description: data.description,
      category: data.category,
    });
  }

  async deleteSubscription(id: string) {
    return this.subscriptionsRepository.deleteSubscription(id);
  }

  async getActiveSubscriptions() {
    return this.subscriptionsRepository.getActiveSubscriptions();
  }

  async updateLastProcessed(id: string, lastProcessed: Date) {
    return this.subscriptionsRepository.updateLastProcessed(id, lastProcessed);
  }
} 