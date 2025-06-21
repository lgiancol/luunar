"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const payment_accounts_service_1 = require("../../services/payments/payment-accounts.service");
const paymentAccountsRepository = __importStar(require("../../repositories/payments/payment-accounts.repository"));
globals_1.jest.mock('../../repositories/payments/payment-accounts.repository');
const mockCreatePaymentAccount = paymentAccountsRepository.createPaymentAccount;
const mockGetPaymentAccountsPaginated = paymentAccountsRepository.getPaymentAccountsPaginated;
(0, globals_1.describe)('Payment Accounts Service', () => {
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, globals_1.it)('should add payment account (happy path)', async () => {
        const data = { name: 'Bank', type: 'bank', notes: '' };
        mockCreatePaymentAccount.mockResolvedValue({ success: true, data: { ...data, id: 'id', createdAt: new Date(), payments: [] } });
        const result = await (0, payment_accounts_service_1.addPaymentAccount)(data);
        (0, globals_1.expect)(mockCreatePaymentAccount).toHaveBeenCalledWith(data);
        (0, globals_1.expect)(result.success).toBe(true);
    });
    (0, globals_1.it)('should return error if add payment account fails', async () => {
        const data = { name: 'Bank', type: 'bank', notes: '' };
        mockCreatePaymentAccount.mockResolvedValue({ success: false, error: 'fail' });
        const result = await (0, payment_accounts_service_1.addPaymentAccount)(data);
        (0, globals_1.expect)(result.success).toBe(false);
    });
    (0, globals_1.it)('should get payment accounts (happy path)', async () => {
        mockGetPaymentAccountsPaginated.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
        const result = await (0, payment_accounts_service_1.getPaymentAccounts)({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(mockGetPaymentAccountsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
        (0, globals_1.expect)(result.success).toBe(true);
    });
});
