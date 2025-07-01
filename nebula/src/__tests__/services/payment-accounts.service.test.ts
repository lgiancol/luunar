import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PaymentAccountsRepository } from '../../repositories/payments/payment-accounts.repository';
import { CreatePaymentAccountModel } from '../../services/payments/payment-account.model';
import { PaymentAccountsService } from '../../services/payments/payment-accounts.service';

jest.mock('../../repositories/payments/payment-accounts.repository');
const mockPaymentAccountsRepository = PaymentAccountsRepository as jest.MockedClass<typeof PaymentAccountsRepository>;

describe('Payment Accounts Service', () => {
  let paymentAccountsService: PaymentAccountsService;
  let mockRepository: jest.Mocked<PaymentAccountsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new mockPaymentAccountsRepository() as jest.Mocked<PaymentAccountsRepository>;
    paymentAccountsService = new PaymentAccountsService(mockRepository);
  });

  it('should add payment account (happy path)', async () => {
    const data: CreatePaymentAccountModel = { name: 'Bank', type: 'bank', notes: '' };
    mockRepository.createPaymentAccount.mockResolvedValue({
      success: true,
      data: { ...data, id: 'id', createdAt: new Date(), payments: [] },
    });
    const result = await paymentAccountsService.addPaymentAccount(data);
    expect(mockRepository.createPaymentAccount).toHaveBeenCalledWith(data);
    expect(result.success).toBe(true);
  });

  it('should return error if add payment account fails', async () => {
    const data: CreatePaymentAccountModel = { name: 'Bank', type: 'bank', notes: '' };
    mockRepository.createPaymentAccount.mockResolvedValue({ success: false, error: 'fail' });
    const result = await paymentAccountsService.addPaymentAccount(data);
    expect(result.success).toBe(false);
  });

  it('should get payment accounts (happy path)', async () => {
    mockRepository.getPaymentAccountsPaginated.mockResolvedValue({
      success: true,
      data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } },
    });
    const result = await paymentAccountsService.getPaymentAccounts({ page: 1, pageSize: 10 });
    expect(mockRepository.getPaymentAccountsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result.success).toBe(true);
  });
});
