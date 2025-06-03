import { createPayment, getPaymentsPaginated } from '../../repositories/payments/payments.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreatePaymentModel } from './payments.model';

export async function addPayment(data: CreatePaymentModel) {
  return createPayment(data);
}

export async function getPayments(data: PaginatedPayload) {
  return getPaymentsPaginated(data);
}
