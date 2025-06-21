import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { addVendor, getVendors, getRecentVendorsService } from '../../services/vendors/vendors.service';
import { createVendor, getVendorsPaginated, getRecentVendors } from '../../repositories/vendors/vendors.repository';
import { CreateVendorModel } from '../../services/vendors/vendors.model';

// Mock the repository
jest.mock('../../repositories/vendors/vendors.repository');
const mockCreateVendor = createVendor as jest.MockedFunction<typeof createVendor>;
const mockGetVendorsPaginated = getVendorsPaginated as jest.MockedFunction<typeof getVendorsPaginated>;
const mockGetRecentVendors = getRecentVendors as jest.MockedFunction<typeof getRecentVendors>;

describe('Vendors Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addVendor', () => {
    it('should create vendor with valid data', async () => {
      // Arrange
      const vendorData: CreateVendorModel = {
        name: 'Office Supplies Co',
        email: 'orders@officesupplies.com',
        phone: '+1-555-0123',
        notes: 'Primary office supplies vendor',
        organizationId: 'test-org-123'
      };

      const expectedVendor = {
        id: 'vendor-123',
        createdAt: new Date('2024-01-01'),
        name: 'Office Supplies Co',
        email: 'orders@officesupplies.com',
        phone: '+1-555-0123',
        notes: 'Primary office supplies vendor',
        organizationId: 'test-org-123'
      };

      mockCreateVendor.mockResolvedValue({
        success: true,
        data: expectedVendor
      });

      // Act
      const result = await addVendor(vendorData);

      // Assert
      expect(mockCreateVendor).toHaveBeenCalledWith(vendorData);
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
        organizationId: 'test-org-123'
      };
      mockCreateVendor.mockResolvedValue({ success: false, error: 'DB error' });
      const result = await addVendor(vendorData);
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
      mockGetVendorsPaginated.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await getVendors({ page: 1, pageSize: 10 });
      expect(mockGetVendorsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
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
      mockGetVendorsPaginated.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await getVendors({ page: 1, pageSize: 10 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toHaveLength(0);
      }
    });

    it('should return error if repository fails', async () => {
      mockGetVendorsPaginated.mockResolvedValue({ success: false, error: 'DB error' });
      const result = await getVendors({ page: 1, pageSize: 10 });
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
      mockGetRecentVendors.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await getRecentVendorsService(1);
      expect(mockGetRecentVendors).toHaveBeenCalledWith(1);
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
      mockGetRecentVendors.mockResolvedValue({ success: true, data: paginatedResult });
      const result = await getRecentVendorsService(1);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.data).toHaveLength(0);
      }
    });

    it('should return error if repository fails', async () => {
      mockGetRecentVendors.mockResolvedValue({ success: false, error: 'DB error' });
      const result = await getRecentVendorsService(1);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('DB error');
      }
    });
  });
}); 