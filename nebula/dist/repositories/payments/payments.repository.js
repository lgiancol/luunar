"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
exports.getPaymentsPaginated = getPaymentsPaginated;
exports.getPaymentsByType = getPaymentsByType;
const prisma_1 = __importDefault(require("../../db/prisma"));
const result_1 = require("../../types/result");
const pagination_utils_1 = require("../../utils/pagination.utils");
const payment_entity_1 = require("./payment.entity");
async function createPayment(data) {
    try {
        const entity = await prisma_1.default.payment.create({
            data: (0, payment_entity_1.mapCreatePaymentModelToEntity)(data),
            include: {
                payment_account: true,
                client: true,
                vendor: true,
            },
        });
        return (0, result_1.resultSuccess)(entity, payment_entity_1.mapPaymentEntityToModel);
    }
    catch (e) {
        const message = e.message ?? 'Failed to create payment';
        return (0, result_1.resultError)(message);
    }
}
async function getPaymentsPaginated({ page, pageSize, type, dateFilter, }) {
    const skip = (page - 1) * pageSize;
    try {
        const whereClause = type ? { type } : {};
        // Add date filters if provided
        if (dateFilter?.startDate || dateFilter?.endDate) {
            whereClause.received_at = {};
            if (dateFilter.startDate) {
                whereClause.received_at.gte = dateFilter.startDate;
            }
            if (dateFilter.endDate) {
                whereClause.received_at.lte = dateFilter.endDate;
            }
        }
        const [payments, total] = await prisma_1.default.$transaction([
            prisma_1.default.payment.findMany({
                where: whereClause,
                skip,
                take: pageSize,
                include: {
                    payment_account: true,
                    client: true,
                    vendor: true,
                },
                orderBy: { received_at: 'desc' },
            }),
            prisma_1.default.payment.count({ where: whereClause }),
        ]);
        const paginationData = {
            data: payments,
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
        return (0, result_1.resultSuccess)(paginationData, (0, pagination_utils_1.mapPaginatedEntities)(payment_entity_1.mapPaymentEntityToModel));
    }
    catch (e) {
        const message = e.message ?? 'Failed to get Payments';
        return (0, result_1.resultError)(message);
    }
}
async function getPaymentsByType({ page, pageSize, type, dateFilter, }) {
    return getPaymentsPaginated({ page, pageSize, type, dateFilter });
}
