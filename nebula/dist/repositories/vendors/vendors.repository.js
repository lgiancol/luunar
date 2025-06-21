"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendor = createVendor;
exports.getVendorsPaginated = getVendorsPaginated;
exports.getRecentVendors = getRecentVendors;
const prisma_1 = __importDefault(require("../../db/prisma"));
const result_1 = require("../../types/result");
const pagination_utils_1 = require("../../utils/pagination.utils");
const vendor_entity_1 = require("./vendor.entity");
async function createVendor(data) {
    try {
        const entity = await prisma_1.default.vendor.create({
            data: (0, vendor_entity_1.mapCreateVendorModelToEntity)(data),
        });
        return (0, result_1.resultSuccess)(entity, vendor_entity_1.mapVendorEntityToModel);
    }
    catch (e) {
        const message = e.message ?? 'Failed to create vendor';
        return (0, result_1.resultError)(message);
    }
}
async function getVendorsPaginated({ page, pageSize, }) {
    const skip = (page - 1) * pageSize;
    try {
        const [vendors, total, expenseTotals] = await prisma_1.default.$transaction([
            prisma_1.default.vendor.findMany({
                skip,
                take: pageSize,
                orderBy: { created_at: 'desc' },
            }),
            prisma_1.default.vendor.count(),
            prisma_1.default.payment.groupBy({
                by: ['vendor_id'],
                where: {
                    type: 'outgoing',
                    vendor_id: {
                        not: null,
                    },
                },
                orderBy: {
                    vendor_id: 'asc',
                },
                _sum: {
                    amount: true,
                },
            }),
        ]);
        // Create a map of vendor_id to expense total
        const expenseMap = new Map(expenseTotals.map((item) => [item.vendor_id, item._sum?.amount || 0]));
        // Add expenses to each vendor (keeping field name as 'income' for now to avoid breaking changes)
        const vendorsWithExpenses = vendors.map((vendor) => ({
            ...vendor,
            income: expenseMap.get(vendor.id) || 0,
        }));
        const paginationData = {
            data: vendorsWithExpenses,
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
        return (0, result_1.resultSuccess)(paginationData, (0, pagination_utils_1.mapPaginatedEntities)(vendor_entity_1.mapVendorEntityToModel));
    }
    catch (e) {
        const message = e.message ?? 'Failed to get vendors';
        return (0, result_1.resultError)(message);
    }
}
async function getRecentVendors(limit) {
    try {
        const [vendors, total] = await prisma_1.default.$transaction([
            prisma_1.default.vendor.findMany({
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prisma_1.default.vendor.count(),
        ]);
        const paginationData = {
            data: vendors,
            meta: {
                page: 1,
                pageSize: limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
        return (0, result_1.resultSuccess)(paginationData, (0, pagination_utils_1.mapPaginatedEntities)(vendor_entity_1.mapVendorEntityToModel));
    }
    catch (e) {
        const message = e.message ?? 'Failed to get recent vendors';
        return (0, result_1.resultError)(message);
    }
}
