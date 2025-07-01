import { PaymentAccountsRepository } from '../../repositories/payments/payment-accounts.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreatePaymentAccountModel } from './payment-account.model';

export class PaymentAccountsService {
  private paymentAccountsRepository: PaymentAccountsRepository;

  constructor(paymentAccountsRepository: PaymentAccountsRepository) {
    this.paymentAccountsRepository = paymentAccountsRepository;
  }

  async addPaymentAccount(data: CreatePaymentAccountModel) {
    return this.paymentAccountsRepository.createPaymentAccount(data);
  }

  async getPaymentAccounts(data: PaginatedPayload) {
    return this.paymentAccountsRepository.getPaymentAccountsPaginated(data);
  }
}

// Single instance
export const paymentAccountsService = new PaymentAccountsService(new PaymentAccountsRepository());
