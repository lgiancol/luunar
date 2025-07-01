import prisma from 'db/prisma';
import type { Result } from '../../types/result';
import { resultError, resultSuccess } from '../../types/result';
import type { PaginatedPayload, PaginatedResultData } from '../../utils/pagination.utils';
import type { CreateSubscriptionEntity, SubscriptionEntity, UpdateSubscriptionEntity } from './subscription.entity';

export class SubscriptionsRepository {
  async createSubscription(data: CreateSubscriptionEntity): Promise<Result<SubscriptionEntity>> {
    try {
      const subscription = await prisma.subscription.create({
        data: {
          name: data.name,
          amount: data.amount,
          vendor_id: data.vendor_id,
          payment_account_id: data.payment_account_id,
          frequency: data.frequency,
          interval: data.interval,
          start_date: data.start_date,
          end_date: data.end_date,
          description: data.description,
          category: data.category,
        },
      });

      return resultSuccess(subscription);
    } catch (e: any) {
      const message = e.message ?? 'Failed to create subscription';
      return resultError(message);
    }
  }

  async getSubscriptionsPaginated({
    page,
    pageSize,
  }: PaginatedPayload): Promise<Result<PaginatedResultData<SubscriptionEntity>>> {
    const skip = (page - 1) * pageSize;

    try {
      const [subscriptions, total] = await prisma.$transaction([
        prisma.subscription.findMany({
          skip,
          take: pageSize,
          orderBy: { created_at: 'desc' },
          include: {
            vendor: true,
            payment_account: true,
          },
        }),
        prisma.subscription.count(),
      ]);

      const paginationData = {
        data: subscriptions,
        meta: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      } satisfies PaginatedResultData<SubscriptionEntity>;

      return resultSuccess(paginationData);
    } catch (e: any) {
      const message = e.message ?? 'Failed to get subscriptions';
      return resultError(message);
    }
  }

  async getSubscriptionById(id: string): Promise<Result<SubscriptionEntity>> {
    try {
      const subscription = await prisma.subscription.findUnique({
        where: { id },
        include: {
          vendor: true,
          payment_account: true,
        },
      });

      if (!subscription) {
        return resultError('Subscription not found');
      }

      return resultSuccess(subscription);
    } catch (e: any) {
      const message = e.message ?? 'Failed to get subscription';
      return resultError(message);
    }
  }

  async updateSubscription(id: string, data: UpdateSubscriptionEntity): Promise<Result<SubscriptionEntity>> {
    try {
      const subscription = await prisma.subscription.update({
        where: { id },
        data,
      });

      return resultSuccess(subscription);
    } catch (e: any) {
      const message = e.message ?? 'Failed to update subscription';
      return resultError(message);
    }
  }

  async deleteSubscription(id: string): Promise<Result<void>> {
    try {
      await prisma.subscription.delete({
        where: { id },
      });

      return resultSuccess(undefined);
    } catch (e: any) {
      const message = e.message ?? 'Failed to delete subscription';
      return resultError(message);
    }
  }

  async getActiveSubscriptions(): Promise<Result<SubscriptionEntity[]>> {
    try {
      const subscriptions = await prisma.subscription.findMany({
        where: {
          is_active: true,
          OR: [{ end_date: null }, { end_date: { gt: new Date() } }],
        },
        include: {
          vendor: true,
          payment_account: true,
        },
      });

      return resultSuccess(subscriptions);
    } catch (e: any) {
      const message = e.message ?? 'Failed to get active subscriptions';
      return resultError(message);
    }
  }

  async updateLastProcessed(id: string, lastProcessed: Date): Promise<Result<void>> {
    try {
      await prisma.subscription.update({
        where: { id },
        data: { last_processed: lastProcessed },
      });

      return resultSuccess(undefined);
    } catch (e: any) {
      const message = e.message ?? 'Failed to update last processed date';
      return resultError(message);
    }
  }
}
