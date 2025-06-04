import { mapGetClientResponseDTO } from '../clients/clients.mapper';
import { mapGetPaymentAccountResponseDTO } from './payment-accounts.mapper';
import type { GetPaymentResponseDTO } from './payments.dto';
import type { Payment } from './payment.model';

export function mapGetPaymentResponseDTO(dto: GetPaymentResponseDTO): Payment {
  return {
    id: dto.id,
    createdAt: new Date(dto.created_at),

    type: dto.type,
    receivedAt: new Date(dto.received_at),
    amount: dto.amount,
    clientId: dto.client_id,
    invoiceId: dto.invoice_id,
    paymentAccountId: dto.payment_account_id,

    client: dto.client ? mapGetClientResponseDTO(dto.client) : null,
    paymentAccount: mapGetPaymentAccountResponseDTO(dto.payment_account),
  };
}
