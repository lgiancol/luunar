"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentAccount = createPaymentAccount;
exports.getPaymentAccountsPaginated = getPaymentAccountsPaginated;
const prisma_1 = __importDefault(require("../../db/prisma"));
const result_1 = require("../../types/result");
const pagination_utils_1 = require("../../utils/pagination.utils");
const payment_account_entity_1 = require("./payment-account.entity");
async function createPaymentAccount(data) {
    try {
        const entity = await prisma_1.default.paymentAccount.create({
            data: (0, payment_account_entity_1.mapCreatePaymentAccountModelToEntity)(data),
        });
        return (0, result_1.resultSuccess)(entity, payment_account_entity_1.mapPaymentAccountEntityToModel);
    }
    catch (e) {
        const message = e.message ?? 'Failed to create payment account';
        return (0, result_1.resultError)(message);
    }
}
async function getPaymentAccountsPaginated({ page, pageSize, }) {
    const skip = (page - 1) * pageSize;
    try {
        const [paymentAccounts, total] = await prisma_1.default.$transaction([
            prisma_1.default.paymentAccount.findMany({
                skip,
                take: pageSize,
            }),
            prisma_1.default.paymentAccount.count(),
        ]);
        const paginationData = {
            data: paymentAccounts,
            meta: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        };
        return (0, result_1.resultSuccess)(paginationData, (0, pagination_utils_1.mapPaginatedEntities)(payment_account_entity_1.mapPaymentAccountEntityToModel));
    }
    catch (e) {
        const message = e.message ?? 'Failed to get Payment Accounts';
        return (0, result_1.resultError)(message);
    }
}
