import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { addPaymentAccount, getPaymentAccounts } from '../../services/payments/payment-accounts.service';
import * as paymentAccountsRepository from '../../repositories/payments/payment-accounts.repository';
import { CreatePaymentAccountModel } from '../../services/payments/payment-account.model';

jest.mock('../../repositories/payments/payment-accounts.repository');
const mockCreatePaymentAccount = paymentAccountsRepository.createPaymentAccount as jest.MockedFunction<typeof paymentAccountsRepository.createPaymentAccount>;
const mockGetPaymentAccountsPaginated = paymentAccountsRepository.getPaymentAccountsPaginated as jest.MockedFunction<typeof paymentAccountsRepository.getPaymentAccountsPaginated>;

describe('Payment Accounts Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add payment account (happy path)', async () => {
    const data: CreatePaymentAccountModel = { name: 'Bank', type: 'bank', notes: '' };
    mockCreatePaymentAccount.mockResolvedValue({ success: true, data: { ...data, id: 'id', createdAt: new Date(), payments: [] } });
    const result = await addPaymentAccount(data);
    expect(mockCreatePaymentAccount).toHaveBeenCalledWith(data);
    expect(result.success).toBe(true);
  });

  it('should return error if add payment account fails', async () => {
    const data: CreatePaymentAccountModel = { name: 'Bank', type: 'bank', notes: '' };
    mockCreatePaymentAccount.mockResolvedValue({ success: false, error: 'fail' });
    const result = await addPaymentAccount(data);
    expect(result.success).toBe(false);
  });

  it('should get payment accounts (happy path)', async () => {
    mockGetPaymentAccountsPaginated.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
    const result = await getPaymentAccounts({ page: 1, pageSize: 10 });
    expect(mockGetPaymentAccountsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result.success).toBe(true);
  });
}); 