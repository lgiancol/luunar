import type { PaymentAccount } from './payment-account.model';
import type { GetPaymentAccountResponseDTO } from './payment_accounts.dto';
import { mapGetPaymentResponseDTO } from './payments.mapper';

export function mapGetPaymentAccountResponseDTO(dto: GetPaymentAccountResponseDTO): PaymentAccount {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at),

    type: dto.type,
    name: dto.name,
    notes: dto.notes,

    payment: dto.payment ? mapGetPaymentResponseDTO(dto.payment) : null,
  };
}
