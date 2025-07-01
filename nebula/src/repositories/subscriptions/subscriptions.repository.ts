import prisma from '../../db/prisma';
import {
  CreateSubscriptionModel,
  Subscription,
  UpdateSubscriptionModel,
} from '../../services/subscriptions/subscriptions.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapPaginatedEntities, type PaginatedPayload, type PaginatedResultData } from '../../utils/pagination.utils';
import {
  mapCreateSubscriptionModelToEntity,
  mapSubscriptionEntityToModel,
  mapUpdateSubscriptionModelToEntity,
  SubscriptionEntity,
} from './subscription.entity';

export class SubscriptionsRepository {
  async createSubscription(data: CreateSubscriptionModel): Promise<Result<Subscription>> {
    try {
      const subscription = await prisma.subscription.create({
        data: mapCreateSubscriptionModelToEntity(data),
        include: {
          vendor: true,
          payment_account: true,
        },
      });

      return resultSuccess(subscription, mapSubscriptionEntityToModel);
    } catch (e: any) {
      const message = e.message ?? 'Failed to create subscription';
      return resultError(message);
    }
  }

  async getSubscriptionsPaginated({
    page,
    pageSize,
  }: PaginatedPayload): Promise<Result<PaginatedResultData<Subscription>>> {
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

      return resultSuccess(paginationData, mapPaginatedEntities(mapSubscriptionEntityToModel));
    } catch (e: any) {
      const message = e.message ?? 'Failed to get subscriptions';
      return resultError(message);
    }
  }

  async getSubscriptionById(id: string): Promise<Result<Subscription>> {
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

      return resultSuccess(subscription, mapSubscriptionEntityToModel);
    } catch (e: any) {
      const message = e.message ?? 'Failed to get subscription';
      return resultError(message);
    }
  }

  async updateSubscription(id: string, data: UpdateSubscriptionModel): Promise<Result<Subscription>> {
    try {
      const subscription = await prisma.subscription.update({
        where: { id },
        data: mapUpdateSubscriptionModelToEntity(data),
        include: {
          vendor: true,
          payment_account: true,
        },
      });

      return resultSuccess(subscription, mapSubscriptionEntityToModel);
    } catch (e: any) {
      const message = e.message ?? 'Failed to update subscription';
      return resultError(message);
    }
  }

  async deleteSubscription(id: string): Promise<Result<boolean>> {
    try {
      await prisma.subscription.delete({
        where: { id },
      });

      return resultSuccess(undefined, () => true);
    } catch (e: any) {
      const message = e.message ?? 'Failed to delete subscription';
      return resultError(message);
    }
  }

  async getActiveSubscriptions({
    page,
    pageSize,
  }: PaginatedPayload): Promise<Result<PaginatedResultData<Subscription>>> {
    const skip = (page - 1) * pageSize;

    try {
      const [subscriptions, total] = await prisma.$transaction([
        prisma.subscription.findMany({
          skip,
          take: pageSize,
          where: {
            is_active: true,
            OR: [{ end_date: null }, { end_date: { gt: new Date() } }],
          },
          include: {
            vendor: true,
            payment_account: true,
          },
        }),
        prisma.subscription.count({
          where: {
            is_active: true,
            OR: [{ end_date: null }, { end_date: { gt: new Date() } }],
          },
        }),
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

      return resultSuccess(paginationData, mapPaginatedEntities(mapSubscriptionEntityToModel));
    } catch (e: any) {
      const message = e.message ?? 'Failed to get active subscriptions';
      return resultError(message);
    }
  }

  async updateLastProcessed(id: string, lastProcessed: Date): Promise<Result<Subscription>> {
    try {
      const subscription = await prisma.subscription.update({
        where: { id },
        data: mapUpdateSubscriptionModelToEntity({ lastProcessed }),
        include: {
          vendor: true,
          payment_account: true,
        },
      });

      return resultSuccess(subscription, mapSubscriptionEntityToModel);
    } catch (e: any) {
      const message = e.message ?? 'Failed to update last processed date';
      return resultError(message);
    }
  }
}
