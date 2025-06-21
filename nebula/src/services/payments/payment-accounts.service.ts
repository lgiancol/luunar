import * as paymentAccountsRepository from '../../repositories/payments/payment-accounts.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreatePaymentAccountModel } from './payment-account.model';

export async function addPaymentAccount(data: CreatePaymentAccountModel) {
  return paymentAccountsRepository.createPaymentAccount(data);
}

export async function getPaymentAccounts(data: PaginatedPayload) {
  return paymentAccountsRepository.getPaymentAccountsPaginated(data);
}
