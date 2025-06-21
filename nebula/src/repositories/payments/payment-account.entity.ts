import { PaymentAccount as PrismaPaymentAccount } from '../../generated/prisma';
import { PaymentAccountUncheckedCreateInput } from '../../generated/prisma/models';
import { CreatePaymentAccountModel, PaymentAccount } from '../../services/payments/payment-account.model';
import { mapPaymentEntityToModel, PaymentEntity } from './payment.entity';

export interface PaymentAccountEntity extends PrismaPaymentAccount {
  payments?: PaymentEntity[] | null;
}

export function mapCreatePaymentAccountModelToEntity(
  model: CreatePaymentAccountModel,
): PaymentAccountUncheckedCreateInput {
  return {
    type: model.type,
    name: model.name,
    notes: model.notes,
  };
}

export function mapPaymentAccountEntityToModel(entity: PaymentAccountEntity): PaymentAccount {
  return {
    id: entity.id,
    createdAt: new Date(entity.created_at),

    type: entity.type,
    name: entity.name,
    notes: entity.notes,

    payments: entity.payments?.map(mapPaymentEntityToModel) ?? null,
  };
}
