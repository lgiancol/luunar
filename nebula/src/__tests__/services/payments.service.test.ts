import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { addPayment, getPayments, getIncomingPayments, getOutgoingPayments } from '../../services/payments/payments.service';
import { createPayment, getPaymentsPaginated, getPaymentsByType } from '../../repositories/payments/payments.repository';
import { CreatePaymentModel, PaymentType } from '../../services/payments/payments.model';

jest.mock('../../repositories/payments/payments.repository');
const mockCreatePayment = createPayment as jest.MockedFunction<typeof createPayment>;
const mockGetPaymentsPaginated = getPaymentsPaginated as jest.MockedFunction<typeof getPaymentsPaginated>;
const mockGetPaymentsByType = getPaymentsByType as jest.MockedFunction<typeof getPaymentsByType>;

describe('Payments Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add payment (happy path)', async () => {
    const data: CreatePaymentModel = { type: PaymentType.incoming, receivedAt: new Date(), amount: 100, clientId: 'c', vendorId: null, invoiceId: null, paymentAccountId: 'pa' };
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
    const result = await addPayment(data);
    expect(mockCreatePayment).toHaveBeenCalledWith(data);
    expect(result.success).toBe(true);
  });

  it('should get payments (happy path)', async () => {
    mockGetPaymentsPaginated.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
    const result = await getPayments({ page: 1, pageSize: 10 });
    expect(mockGetPaymentsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result.success).toBe(true);
  });

  it('should get incoming payments (happy path)', async () => {
    mockGetPaymentsByType.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
    const result = await getIncomingPayments({ page: 1, pageSize: 10 });
    expect(mockGetPaymentsByType).toHaveBeenCalledWith({ page: 1, pageSize: 10, type: PaymentType.incoming });
    expect(result.success).toBe(true);
  });

  it('should get outgoing payments (happy path)', async () => {
    mockGetPaymentsByType.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
    const result = await getOutgoingPayments({ page: 1, pageSize: 10 });
    expect(mockGetPaymentsByType).toHaveBeenCalledWith({ page: 1, pageSize: 10, type: PaymentType.outgoing });
    expect(result.success).toBe(true);
  });

  it('should return error if addPayment fails', async () => {
    const data: CreatePaymentModel = { type: PaymentType.incoming, receivedAt: new Date(), amount: 100, clientId: 'c', vendorId: null, invoiceId: null, paymentAccountId: 'pa' };
    mockCreatePayment.mockResolvedValue({ success: false, error: 'fail' });
    const result = await addPayment(data);
    expect(result.success).toBe(false);
  });
}); 