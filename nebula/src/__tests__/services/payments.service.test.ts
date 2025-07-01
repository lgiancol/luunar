import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PaymentsRepository } from '../../repositories/payments/payments.repository';
import { CreatePaymentModel, PaymentType } from '../../services/payments/payments.model';
import { PaymentsService } from '../../services/payments/payments.service';

jest.mock('../../repositories/payments/payments.repository');
const mockPaymentsRepository = PaymentsRepository as jest.MockedClass<typeof PaymentsRepository>;

describe('Payments Service', () => {
  let paymentsService: PaymentsService;
  let mockRepository: jest.Mocked<PaymentsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new mockPaymentsRepository() as jest.Mocked<PaymentsRepository>;
    paymentsService = new PaymentsService(mockRepository);
  });

  it('should add payment (happy path)', async () => {
    const data: CreatePaymentModel = {
      type: PaymentType.incoming,
      receivedAt: new Date(),
      amount: 100,
      clientId: 'c',
      vendorId: null,
      invoiceId: null,
      paymentAccountId: 'pa',
    };
    mockRepository.createPayment.mockResolvedValue({
      success: true,
      data: {
        ...data,
        id: 'id',
        createdAt: new Date(),
        paymentAccount: { id: 'pa', createdAt: new Date(), name: 'Bank', type: 'bank', notes: null, payments: [] },
        client: null,
        vendor: null,
      },
    });
    const result = await paymentsService.addPayment(data);
    expect(mockRepository.createPayment).toHaveBeenCalledWith(data);
    expect(result.success).toBe(true);
  });

  it('should get payments (happy path)', async () => {
    mockRepository.getPaymentsPaginated.mockResolvedValue({
      success: true,
      data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } },
    });
    const result = await paymentsService.getPayments({ page: 1, pageSize: 10 });
    expect(mockRepository.getPaymentsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result.success).toBe(true);
  });

  it('should get incoming payments (happy path)', async () => {
    mockRepository.getPaymentsByType.mockResolvedValue({
      success: true,
      data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } },
    });
    const result = await paymentsService.getIncomingPayments({ page: 1, pageSize: 10 });
    expect(mockRepository.getPaymentsByType).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      type: PaymentType.incoming,
    });
    expect(result.success).toBe(true);
  });

  it('should get outgoing payments (happy path)', async () => {
    mockRepository.getPaymentsByType.mockResolvedValue({
      success: true,
      data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } },
    });
    const result = await paymentsService.getOutgoingPayments({ page: 1, pageSize: 10 });
    expect(mockRepository.getPaymentsByType).toHaveBeenCalledWith({
      page: 1,
      pageSize: 10,
      type: PaymentType.outgoing,
    });
    expect(result.success).toBe(true);
  });

  it('should return error if addPayment fails', async () => {
    const data: CreatePaymentModel = {
      type: PaymentType.incoming,
      receivedAt: new Date(),
      amount: 100,
      clientId: 'c',
      vendorId: null,
      invoiceId: null,
      paymentAccountId: 'pa',
    };
    mockRepository.createPayment.mockResolvedValue({ success: false, error: 'fail' });
    const result = await paymentsService.addPayment(data);
    expect(result.success).toBe(false);
  });
});
