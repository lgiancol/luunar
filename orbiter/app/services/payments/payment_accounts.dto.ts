import type { GetPaymentResponseDTO } from './payments.dto';

export interface GetPaymentAccountResponseDTO {
  id: string;
  created_at: string;

  name: string;
  type: string;
  notes: string | null;

  payment: GetPaymentResponseDTO | null;
}
