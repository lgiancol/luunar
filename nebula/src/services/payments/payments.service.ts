import { PaymentsRepository } from '../../repositories/payments/payments.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreatePaymentModel, PaymentType } from './payments.model';

export class PaymentsService {
  private paymentsRepository: PaymentsRepository;

  constructor(paymentsRepository: PaymentsRepository) {
    this.paymentsRepository = paymentsRepository;
  }

  async addPayment(data: CreatePaymentModel) {
    return this.paymentsRepository.createPayment(data);
  }

  async getPayments(data: PaginatedPayload & { type?: PaymentType }) {
    return this.paymentsRepository.getPaymentsPaginated(data);
  }

  async getIncomingPayments(data: PaginatedPayload) {
    return this.paymentsRepository.getPaymentsByType({ ...data, type: PaymentType.incoming });
  }

  async getOutgoingPayments(data: PaginatedPayload) {
    return this.paymentsRepository.getPaymentsByType({ ...data, type: PaymentType.outgoing });
  }
}

// Single instance
export const paymentsService = new PaymentsService(new PaymentsRepository());
