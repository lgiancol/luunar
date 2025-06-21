import { createPayment, getPaymentsPaginated, getPaymentsByType } from '../../repositories/payments/payments.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreatePaymentModel, PaymentType } from './payments.model';

export async function addPayment(data: CreatePaymentModel) {
  return createPayment(data);
}

export async function getPayments(data: PaginatedPayload & { type?: PaymentType }) {
  return getPaymentsPaginated(data);
}

export async function getIncomingPayments(data: PaginatedPayload) {
  return getPaymentsByType({ ...data, type: PaymentType.incoming });
}

export async function getOutgoingPayments(data: PaginatedPayload) {
  return getPaymentsByType({ ...data, type: PaymentType.outgoing });
}
