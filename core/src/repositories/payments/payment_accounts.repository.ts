import prisma from '../../db/prisma';
import { CreatePaymentAccountModel, PaymentAccount } from '../../services/payments/payment-account.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapCreatePaymentAccountModelToEntity, mapPaymentAccountEntityToModel } from './payment-account.entity';

export async function createPaymentAccount(data: CreatePaymentAccountModel): Promise<Result<PaymentAccount>> {
  try {
    const entity = await prisma.paymentAccount.create({
      data: mapCreatePaymentAccountModelToEntity(data),
    });

    return resultSuccess(entity, mapPaymentAccountEntityToModel);
  } catch (e: any) {
    const message = e.message ?? 'Failed to create payment account';
    return resultError(message);
  }
}
