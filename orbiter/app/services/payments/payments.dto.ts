import type { GetClientResponseDTO } from '../clients/clients.dto';
import type { GetPaymentAccountResponseDTO } from './payment_accounts.dto';
import type { PaymentType } from './payment.model';

export interface AddPaymentPayloadDTO {
  type: PaymentType;
  received_at: Date;
  amount: number;
  client_id?: string;
  invoice_id?: string;
  payment_account_id: string;
}

export interface GetPaymentResponseDTO {
  id: string;
  created_at: string;

  type: PaymentType;
  received_at: Date;
  amount: number;
  client_id: string | null;
  invoice_id: string | null;
  payment_account_id: string;

  client: GetClientResponseDTO | null;
  payment_account: GetPaymentAccountResponseDTO;
}
