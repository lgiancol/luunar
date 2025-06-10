import {
  createPaymentAccount,
  getPaymentAccountsPaginated,
} from '../../repositories/payments/payment_accounts.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreatePaymentAccountModel } from './payment-account.model';

export async function addPaymentAccount(data: CreatePaymentAccountModel) {
  return createPaymentAccount(data);
}

export async function getPaymentAccounts(data: PaginatedPayload) {
  return getPaymentAccountsPaginated(data);
}
