import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { VendorsRepository } from '../../repositories/vendors/vendors.repository';
import { CreateVendorModel } from '../../services/vendors/vendors.model';
import { VendorsService } from '../../services/vendors/vendors.service';

// Mock the repository
jest.mock('../../repositories/vendors/vendors.repository');
const mockVendorsRepository = VendorsRepository as jest.MockedClass<typeof VendorsRepository>;

describe('Vendors Service', () => {
  let vendorsService: VendorsService;
  let mockRepository: jest.Mocked<VendorsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new mockVendorsRepository() as jest.Mocked<VendorsRepository>;
    vendorsService = new VendorsService(mockRepository);
  });

  describe('addVendor', () => {
    it('should create vendor with valid data', async () => {
      // Arrange
      const vendorData: CreateVendorModel = {
        name: 'Office Supplies Co',
        email: 'orders@officesupplies.com',
        phone: '+1-555-0123',
        notes: 'Primary office supplies vendor',
        organizationId: 'test-org-123',
      };

      const expectedVendor = {
        id: 'vendor-123',
        createdAt: new Date('2024-01-01'),
        name: 'Office Supplies Co',
        email: 'orders@officesupplies.com',
        phone: '+1-555-0123',
        notes: 'Primary office supplies vendor',
        organizationId: 'test-org-123',
      };

      mockRepository.createVendor.mockResolvedValue({
        success: true,
        data: expectedVendor,
      });

      // Act
      const result = await vendorsService.addVendor(vendorData);

      // Assert
      expect(mockRepository.createVendor).toHaveBeenCalledWith(vendorData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(expectedVendor);
      }
    });

    it('should return error if repository fails', async () => {
      const vendorData: CreateVendorModel = {
        name: 'Office Supplies Co',
        email: 'orders@officesupplies.com',
        phone: '+1-555-0123',
        notes: 'Primary office supplies vendor',
        organizationId: 'test-org-123',
      };
      mockRepository.createVendor.mockResolvedValue({ success: false, error: 'DB error' });
      const result = await vendorsService.addVendor(vendorData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('DB error');
      }
    });
  });

  describe('getVendors', () => {
    it('should return paginated vendors', async () => {
      const paginatedResult = {
        data: [
          {
            id: 'vendor-1',
            createdAt: new Date('2024-01-01'),
            name: 'Vendor 1',
            email: 'v1@email.com',
            phone: null,
            notes: null,
            organizationId: 'org-1',
          },
        ],
        meta: { page: 1, pageSize: 10, total: 1, totalPages: 1 },
      };
      mockRepository.getVendorsPaginated.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await vendorsService.getVendors({ page: 1, pageSize: 10 });
      expect(mockRepository.getVendorsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(paginatedResult);
      }
    });

    it('should handle empty vendor list', async () => {
      const paginatedResult = {
        data: [],
        meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
      };
      mockRepository.getVendorsPaginated.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await vendorsService.getVendors({ page: 1, pageSize: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toHaveLength(0);
      }
    });

    it('should return error if repository fails', async () => {
      mockRepository.getVendorsPaginated.mockResolvedValue({ success: false, error: 'DB error' });
      const result = await vendorsService.getVendors({ page: 1, pageSize: 10 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('DB error');
      }
    });
  });

  describe('getRecentVendorsService', () => {
    it('should return recent vendors', async () => {
      const paginatedResult = {
        data: [
          {
            id: 'vendor-1',
            createdAt: new Date('2024-01-01'),
            name: 'Vendor 1',
            email: 'v1@email.com',
            phone: null,
            notes: null,
            organizationId: 'org-1',
          },
        ],
        meta: { page: 1, pageSize: 1, total: 1, totalPages: 1 },
      };
      mockRepository.getRecentVendors.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await vendorsService.getRecentVendorsService(1);
      expect(mockRepository.getRecentVendors).toHaveBeenCalledWith(1);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(paginatedResult);
      }
    });

    it('should handle empty recent vendor list', async () => {
      const paginatedResult = {
        data: [],
        meta: { page: 1, pageSize: 1, total: 0, totalPages: 0 },
      };
      mockRepository.getRecentVendors.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await vendorsService.getRecentVendorsService(1);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toHaveLength(0);
      }
    });

    it('should return error if repository fails', async () => {
      mockRepository.getRecentVendors.mockResolvedValue({ success: false, error: 'DB error' });
      const result = await vendorsService.getRecentVendorsService(1);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('DB error');
      }
    });
  });
});
