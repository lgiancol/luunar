import { SubscriptionsRepository } from '../../repositories/subscriptions/subscriptions.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import type { CreateSubscriptionModel, UpdateSubscriptionModel } from './subscriptions.model';

class SubscriptionsService {
  private subscriptionsRepository: SubscriptionsRepository;

  constructor(subscriptionsRepository: SubscriptionsRepository) {
    this.subscriptionsRepository = subscriptionsRepository;
  }

  async createSubscription(data: CreateSubscriptionModel) {
    return this.subscriptionsRepository.createSubscription(data);
  }

  async getSubscriptions(data: PaginatedPayload) {
    return this.subscriptionsRepository.getSubscriptionsPaginated(data);
  }

  async getSubscriptionById(id: string) {
    return this.subscriptionsRepository.getSubscriptionById(id);
  }

  async updateSubscription(id: string, data: UpdateSubscriptionModel) {
    return this.subscriptionsRepository.updateSubscription(id, data);
  }

  async deleteSubscription(id: string) {
    return this.subscriptionsRepository.deleteSubscription(id);
  }

  async getActiveSubscriptions(data: PaginatedPayload) {
    return this.subscriptionsRepository.getActiveSubscriptions(data);
  }

  async updateLastProcessed(id: string, lastProcessed: Date) {
    return this.subscriptionsRepository.updateLastProcessed(id, lastProcessed);
  }
}

export const subscriptionsService = new SubscriptionsService(new SubscriptionsRepository());
