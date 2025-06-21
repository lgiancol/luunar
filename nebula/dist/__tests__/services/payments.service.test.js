"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const payments_service_1 = require("../../services/payments/payments.service");
const payments_repository_1 = require("../../repositories/payments/payments.repository");
const payments_model_1 = require("../../services/payments/payments.model");
globals_1.jest.mock('../../repositories/payments/payments.repository');
const mockCreatePayment = payments_repository_1.createPayment;
const mockGetPaymentsPaginated = payments_repository_1.getPaymentsPaginated;
const mockGetPaymentsByType = payments_repository_1.getPaymentsByType;
(0, globals_1.describe)('Payments Service', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('should add payment (happy path)', async () => {
        const data = { type: payments_model_1.PaymentType.incoming, receivedAt: new Date(), amount: 100, clientId: 'c', vendorId: null, invoiceId: null, paymentAccountId: 'pa' };
        mockCreatePayment.mockResolvedValue({
            success: true,
            data: {
                ...data,
                id: 'id',
                createdAt: new Date(),
                paymentAccount: { id: 'pa', createdAt: new Date(), name: 'Bank', type: 'bank', notes: null, payments: [] },
                client: null,
                vendor: null
            }
        });
        const result = await (0, payments_service_1.addPayment)(data);
        (0, globals_1.expect)(mockCreatePayment).toHaveBeenCalledWith(data);
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should get payments (happy path)', async () => {
        mockGetPaymentsPaginated.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
        const result = await (0, payments_service_1.getPayments)({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(mockGetPaymentsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should get incoming payments (happy path)', async () => {
        mockGetPaymentsByType.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
        const result = await (0, payments_service_1.getIncomingPayments)({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(mockGetPaymentsByType).toHaveBeenCalledWith({ page: 1, pageSize: 10, type: payments_model_1.PaymentType.incoming });
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should get outgoing payments (happy path)', async () => {
        mockGetPaymentsByType.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
        const result = await (0, payments_service_1.getOutgoingPayments)({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(mockGetPaymentsByType).toHaveBeenCalledWith({ page: 1, pageSize: 10, type: payments_model_1.PaymentType.outgoing });
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should return error if addPayment fails', async () => {
        const data = { type: payments_model_1.PaymentType.incoming, receivedAt: new Date(), amount: 100, clientId: 'c', vendorId: null, invoiceId: null, paymentAccountId: 'pa' };
        mockCreatePayment.mockResolvedValue({ success: false, error: 'fail' });
        const result = await (0, payments_service_1.addPayment)(data);
        (0, globals_1.expect)(result.success).toBe(false);
    });
});
