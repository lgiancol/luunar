import { CreatePaymentAccountModel } from '../../services/payments/payment-account.model';

export function mapAddPaymentAccountPayload(payload: any): CreatePaymentAccountModel {
  return {
    name: payload['name'],
    type: payload['type'],
    notes: payload['notes'],
  };
}
