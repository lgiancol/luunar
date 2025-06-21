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
  });
}); 