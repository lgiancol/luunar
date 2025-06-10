import type { PaymentAccountType } from './payment-account.model';
import type { GetPaymentResponseDTO } from './payments.dto';

export interface AddPaymentAccountPayloadDTO {
  name: string;
  type: PaymentAccountType;
  notes?: string;
}

export interface GetPaymentAccountResponseDTO {
  id: string;
  created_at: string;

  name: string;
  type: PaymentAccountType;
  notes: string | null;

  payment: GetPaymentResponseDTO | null;
}
