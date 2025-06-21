import { CreatePaymentModel } from '../../services/payments/payments.model';

export function mapAddPaymentPayload(payload: any): CreatePaymentModel {
  return {
    type: payload['type'],
    receivedAt: new Date(payload['received_at']),
    amount: payload['amount'],
    paymentAccountId: payload['payment_account_id'],
    clientId: payload['client_id'],
    vendorId: payload['vendor_id'],
    invoiceId: payload['invoice_id'],
  };
}
