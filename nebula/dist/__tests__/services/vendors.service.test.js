"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const vendors_service_1 = require("../../services/vendors/vendors.service");
const vendors_repository_1 = require("../../repositories/vendors/vendors.repository");
// Mock the repository
globals_1.jest.mock('../../repositories/vendors/vendors.repository');
const mockCreateVendor = vendors_repository_1.createVendor;
const mockGetVendorsPaginated = vendors_repository_1.getVendorsPaginated;
const mockGetRecentVendors = vendors_repository_1.getRecentVendors;
(0, globals_1.describe)('Vendors Service', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.describe)('addVendor', () => {
        (0, globals_1.it)('should create vendor with valid data', async () => {
            // Arrange
            const vendorData = {
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
            const result = await (0, vendors_service_1.addVendor)(vendorData);
            // Assert
            (0, globals_1.expect)(mockCreateVendor).toHaveBeenCalledWith(vendorData);
            (0, globals_1.expect)(result.success).toBe(true);
            if (result.success) {
                (0, globals_1.expect)(result.data).toEqual(expectedVendor);
            }
        });
        (0, globals_1.it)('should return error if repository fails', async () => {
            const vendorData = {
                name: 'Office Supplies Co',
                email: 'orders@officesupplies.com',
                phone: '+1-555-0123',
                notes: 'Primary office supplies vendor',
                organizationId: 'test-org-123'
            };
            mockCreateVendor.mockResolvedValue({ success: false, error: 'DB error' });
            const result = await (0, vendors_service_1.addVendor)(vendorData);
            (0, globals_1.expect)(result.success).toBe(false);
            if (!result.success) {
                (0, globals_1.expect)(result.error).toBe('DB error');
            }
        });
    });
    (0, globals_1.describe)('getVendors', () => {
        (0, globals_1.it)('should return paginated vendors', async () => {
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
            const result = await (0, vendors_service_1.getVendors)({ page: 1, pageSize: 10 });
            (0, globals_1.expect)(mockGetVendorsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
            (0, globals_1.expect)(result.success).toBe(true);
            if (result.success) {
                (0, globals_1.expect)(result.data).toEqual(paginatedResult);
            }
        });
        (0, globals_1.it)('should handle empty vendor list', async () => {
            const paginatedResult = {
                data: [],
                meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
            };
            mockGetVendorsPaginated.mockResolvedValue({ success: true, data: paginatedResult });
            const result = await (0, vendors_service_1.getVendors)({ page: 1, pageSize: 10 });
            (0, globals_1.expect)(result.success).toBe(true);
            if (result.success) {
                (0, globals_1.expect)(result.data.data).toHaveLength(0);
            }
        });
        (0, globals_1.it)('should return error if repository fails', async () => {
            mockGetVendorsPaginated.mockResolvedValue({ success: false, error: 'DB error' });
            const result = await (0, vendors_service_1.getVendors)({ page: 1, pageSize: 10 });
            (0, globals_1.expect)(result.success).toBe(false);
            if (!result.success) {
                (0, globals_1.expect)(result.error).toBe('DB error');
            }
        });
    });
    (0, globals_1.describe)('getRecentVendorsService', () => {
        (0, globals_1.it)('should return recent vendors', async () => {
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
            const result = await (0, vendors_service_1.getRecentVendorsService)(1);
            (0, globals_1.expect)(mockGetRecentVendors).toHaveBeenCalledWith(1);
            (0, globals_1.expect)(result.success).toBe(true);
            if (result.success) {
                (0, globals_1.expect)(result.data).toEqual(paginatedResult);
            }
        });
        (0, globals_1.it)('should handle empty recent vendor list', async () => {
            const paginatedResult = {
                data: [],
                meta: { page: 1, pageSize: 1, total: 0, totalPages: 0 },
            };
            mockGetRecentVendors.mockResolvedValue({ success: true, data: paginatedResult });
            const result = await (0, vendors_service_1.getRecentVendorsService)(1);
            (0, globals_1.expect)(result.success).toBe(true);
            if (result.success) {
                (0, globals_1.expect)(result.data.data).toHaveLength(0);
            }
        });
        (0, globals_1.it)('should return error if repository fails', async () => {
            mockGetRecentVendors.mockResolvedValue({ success: false, error: 'DB error' });
            const result = await (0, vendors_service_1.getRecentVendorsService)(1);
            (0, globals_1.expect)(result.success).toBe(false);
            if (!result.success) {
                (0, globals_1.expect)(result.error).toBe('DB error');
            }
        });
    });
});
