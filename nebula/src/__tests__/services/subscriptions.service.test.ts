import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { SubscriptionsRepository } from '../../repositories/subscriptions/subscriptions.repository';
import { CreateSubscriptionModel, UpdateSubscriptionModel } from '../../services/subscriptions/subscriptions.model';
import { SubscriptionsService } from '../../services/subscriptions/subscriptions.service';

// Mock the repository
jest.mock('../../repositories/subscriptions/subscriptions.repository');
const mockSubscriptionsRepository = SubscriptionsRepository as jest.MockedClass<typeof SubscriptionsRepository>;

describe('Subscriptions Service', () => {
  let subscriptionsService: SubscriptionsService;
  let mockRepository: jest.Mocked<SubscriptionsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new mockSubscriptionsRepository() as jest.Mocked<SubscriptionsRepository>;
    subscriptionsService = new SubscriptionsService(mockRepository);
  });

  describe('createSubscription', () => {
    it('should create subscription with valid data', async () => {
      // Arrange
      const subscriptionData: CreateSubscriptionModel = {
        name: 'Netflix Subscription',
        amount: 1599,
        vendorId: 'vendor-123',
        paymentAccountId: 'payment-account-123',
        frequency: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: null,
        description: 'Monthly Netflix subscription',
        category: 'entertainment',
      };

      const expectedSubscription = {
        id: 'subscription-123',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        name: 'Netflix Subscription',
        amount: 1599,
        vendorId: 'vendor-123',
        paymentAccountId: 'payment-account-123',
        frequency: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: null,
        isActive: true,
        lastProcessed: null,
        description: 'Monthly Netflix subscription',
        category: 'entertainment',
        vendor: {
          id: 'vendor-123',
          createdAt: new Date(),
          name: 'Netflix',
          email: 'support@netflix.com',
          phone: null,
          notes: null,
          organizationId: 'org-123',
        },
        paymentAccount: {
          id: 'payment-account-123',
          createdAt: new Date(),
          name: 'Credit Card',
          type: 'card',
          notes: null,
          payments: [],
        },
      };

      mockRepository.createSubscription.mockResolvedValue({
        success: true,
        data: expectedSubscription,
      });

      // Act
      const result = await subscriptionsService.createSubscription(subscriptionData);

      // Assert
      expect(mockRepository.createSubscription).toHaveBeenCalledWith(subscriptionData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(expectedSubscription);
      }
    });

    it('should return error if repository fails', async () => {
      const subscriptionData: CreateSubscriptionModel = {
        name: 'Netflix Subscription',
        amount: 1599,
        vendorId: 'vendor-123',
        paymentAccountId: 'payment-account-123',
        frequency: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: null,
        description: 'Monthly Netflix subscription',
        category: 'entertainment',
      };

      mockRepository.createSubscription.mockResolvedValue({
        success: false,
        error: 'Database error',
      });

      const result = await subscriptionsService.createSubscription(subscriptionData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Database error');
      }
    });
  });

  describe('getSubscriptions', () => {
    it('should return paginated subscriptions', async () => {
      const paginatedResult = {
        data: [
          {
            id: 'subscription-1',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            name: 'Netflix',
            amount: 1599,
            vendorId: 'vendor-1',
            paymentAccountId: 'payment-account-1',
            frequency: 'monthly',
            interval: 1,
            startDate: new Date('2024-01-01'),
            endDate: null,
            isActive: true,
            lastProcessed: null,
            description: 'Monthly Netflix subscription',
            category: 'entertainment',
            vendor: {
              id: 'vendor-1',
              createdAt: new Date(),
              name: 'Netflix',
              email: 'support@netflix.com',
              phone: null,
              notes: null,
              organizationId: 'org-1',
            },
            paymentAccount: {
              id: 'payment-account-1',
              createdAt: new Date(),
              name: 'Credit Card',
              type: 'card',
              notes: null,
              payments: [],
            },
          },
        ],
        meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
      };

      mockRepository.getSubscriptionsPaginated.mockResolvedValue({
        success: true,
        data: paginatedResult,
      });

      const result = await subscriptionsService.getSubscriptions({ page: 1, pageSize: 10 });
      expect(mockRepository.getSubscriptionsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(paginatedResult);
      }
    });

    it('should handle empty subscription list', async () => {
      const paginatedResult = {
        data: [],
        meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      };

      mockRepository.getSubscriptionsPaginated.mockResolvedValue({
        success: true,
        data: paginatedResult,
      });

      const result = await subscriptionsService.getSubscriptions({ page: 1, pageSize: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toHaveLength(0);
      }
    });

    it('should return error if repository fails', async () => {
      mockRepository.getSubscriptionsPaginated.mockResolvedValue({
        success: false,
        error: 'Database error',
      });

      const result = await subscriptionsService.getSubscriptions({ page: 1, pageSize: 10 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Database error');
      }
    });
  });

  describe('getSubscriptionById', () => {
    it('should return subscription by id', async () => {
      const subscription = {
        id: 'subscription-123',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        name: 'Netflix Subscription',
        amount: 1599,
        vendorId: 'vendor-123',
        paymentAccountId: 'payment-account-123',
        frequency: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: null,
        isActive: true,
        lastProcessed: null,
        description: 'Monthly Netflix subscription',
        category: 'entertainment',
        vendor: {
          id: 'vendor-123',
          createdAt: new Date(),
          name: 'Netflix',
          email: 'support@netflix.com',
          phone: null,
          notes: null,
          organizationId: 'org-123',
        },
        paymentAccount: {
          id: 'payment-account-123',
          createdAt: new Date(),
          name: 'Credit Card',
          type: 'card',
          notes: null,
          payments: [],
        },
      };

      mockRepository.getSubscriptionById.mockResolvedValue({
        success: true,
        data: subscription,
      });

      const result = await subscriptionsService.getSubscriptionById('subscription-123');
      expect(mockRepository.getSubscriptionById).toHaveBeenCalledWith('subscription-123');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(subscription);
      }
    });

    it('should return error if subscription not found', async () => {
      mockRepository.getSubscriptionById.mockResolvedValue({
        success: false,
        error: 'Subscription not found',
      });

      const result = await subscriptionsService.getSubscriptionById('non-existent-id');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Subscription not found');
      }
    });
  });

  describe('updateSubscription', () => {
    it('should update subscription with valid data', async () => {
      const updateData: UpdateSubscriptionModel = {
        name: 'Updated Netflix Subscription',
        amount: 1999,
        isActive: false,
      };

      const updatedSubscription = {
        id: 'subscription-123',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-02'),
        name: 'Updated Netflix Subscription',
        amount: 1999,
        vendorId: 'vendor-123',
        paymentAccountId: 'payment-account-123',
        frequency: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: null,
        isActive: false,
        lastProcessed: null,
        description: 'Monthly Netflix subscription',
        category: 'entertainment',
        vendor: {
          id: 'vendor-123',
          createdAt: new Date(),
          name: 'Netflix',
          email: 'support@netflix.com',
          phone: null,
          notes: null,
          organizationId: 'org-123',
        },
        paymentAccount: {
          id: 'payment-account-123',
          createdAt: new Date(),
          name: 'Credit Card',
          type: 'card',
          notes: null,
          payments: [],
        },
      };

      mockRepository.updateSubscription.mockResolvedValue({
        success: true,
        data: updatedSubscription,
      });

      const result = await subscriptionsService.updateSubscription('subscription-123', updateData);
      expect(mockRepository.updateSubscription).toHaveBeenCalledWith('subscription-123', updateData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(updatedSubscription);
      }
    });

    it('should return error if update fails', async () => {
      const updateData: UpdateSubscriptionModel = {
        name: 'Updated Netflix Subscription',
      };

      mockRepository.updateSubscription.mockResolvedValue({
        success: false,
        error: 'Update failed',
      });

      const result = await subscriptionsService.updateSubscription('subscription-123', updateData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Update failed');
      }
    });
  });

  describe('deleteSubscription', () => {
    it('should delete subscription successfully', async () => {
      mockRepository.deleteSubscription.mockResolvedValue({
        success: true,
        data: true,
      });

      const result = await subscriptionsService.deleteSubscription('subscription-123');
      expect(mockRepository.deleteSubscription).toHaveBeenCalledWith('subscription-123');
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe(true);
      }
    });

    it('should return error if deletion fails', async () => {
      mockRepository.deleteSubscription.mockResolvedValue({
        success: false,
        error: 'Delete failed',
      });

      const result = await subscriptionsService.deleteSubscription('subscription-123');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Delete failed');
      }
    });
  });

  describe('getActiveSubscriptions', () => {
    it('should return active subscriptions', async () => {
      const activeSubscriptions = {
        data: [
          {
            id: 'subscription-1',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01'),
            name: 'Netflix',
            amount: 1599,
            vendorId: 'vendor-1',
            paymentAccountId: 'payment-account-1',
            frequency: 'monthly',
            interval: 1,
            startDate: new Date('2024-01-01'),
            endDate: null,
            isActive: true,
            lastProcessed: null,
            description: 'Monthly Netflix subscription',
            category: 'entertainment',
            vendor: {
              id: 'vendor-1',
              createdAt: new Date(),
              name: 'Netflix',
              email: 'support@netflix.com',
              phone: null,
              notes: null,
              organizationId: 'org-1',
            },
            paymentAccount: {
              id: 'payment-account-1',
              createdAt: new Date(),
              name: 'Credit Card',
              type: 'card',
              notes: null,
              payments: [],
            },
          },
        ],
        meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
      };

      mockRepository.getActiveSubscriptions.mockResolvedValue({
        success: true,
        data: activeSubscriptions,
      });

      const result = await subscriptionsService.getActiveSubscriptions({ page: 1, pageSize: 10 });
      expect(mockRepository.getActiveSubscriptions).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(activeSubscriptions);
      }
    });
  });

  describe('updateLastProcessed', () => {
    it('should update last processed date', async () => {
      const lastProcessed = new Date('2024-01-15');
      const updatedSubscription = {
        id: 'subscription-123',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
        name: 'Netflix Subscription',
        amount: 1599,
        vendorId: 'vendor-123',
        paymentAccountId: 'payment-account-123',
        frequency: 'monthly',
        interval: 1,
        startDate: new Date('2024-01-01'),
        endDate: null,
        isActive: true,
        lastProcessed: lastProcessed,
        description: 'Monthly Netflix subscription',
        category: 'entertainment',
        vendor: {
          id: 'vendor-123',
          createdAt: new Date(),
          name: 'Netflix',
          email: 'support@netflix.com',
          phone: null,
          notes: null,
          organizationId: 'org-123',
        },
        paymentAccount: {
          id: 'payment-account-123',
          createdAt: new Date(),
          name: 'Credit Card',
          type: 'card',
          notes: null,
          payments: [],
        },
      };

      mockRepository.updateLastProcessed.mockResolvedValue({
        success: true,
        data: updatedSubscription,
      });

      const result = await subscriptionsService.updateLastProcessed('subscription-123', lastProcessed);
      expect(mockRepository.updateLastProcessed).toHaveBeenCalledWith('subscription-123', lastProcessed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.lastProcessed).toEqual(lastProcessed);
      }
    });

    it('should return error if update fails', async () => {
      const lastProcessed = new Date('2024-01-15');

      mockRepository.updateLastProcessed.mockResolvedValue({
        success: false,
        error: 'Update failed',
      });

      const result = await subscriptionsService.updateLastProcessed('subscription-123', lastProcessed);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('Update failed');
      }
    });
  });
});
