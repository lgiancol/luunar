import { Payment as PrismaPayment } from '../../generated/prisma';
import { PaymentUncheckedCreateInput } from '../../generated/prisma/models';
import { CreatePaymentModel, Payment, PaymentType } from '../../services/payments/payments.model';
import { ClientEntity, mapClientEntityToModel } from '../clients/clients.entity';
import { mapPaymentAccountEntityToModel, PaymentAccountEntity } from './payment-account.entity';

export interface PaymentEntity extends PrismaPayment {
  client?: ClientEntity | null;
  payment_account: PaymentAccountEntity;
}

export function mapCreatePaymentModelToEntity(model: CreatePaymentModel): PaymentUncheckedCreateInput {
  return {
    type: model.type,
    received_at: model.receivedAt,
    amount: model.amount,
    client_id: model.clientId,
    payment_account_id: model.paymentAccountId,
    invoice_id: model.invoiceId,
  };
}

export function mapPaymentEntityToModel(entity: PaymentEntity): Payment {
  return {
    id: entity.id,
    createdAt: new Date(entity.created_at),

    type: entity.type as PaymentType,
    receivedAt: new Date(entity.received_at),
    amount: entity.amount,
    clientId: entity.client_id,
    paymentAccountId: entity.payment_account_id,
    invoiceId: entity.invoice_id,

    paymentAccount: mapPaymentAccountEntityToModel(entity.payment_account),
    client: entity.client ? mapClientEntityToModel(entity.client) : null,
  };
}
