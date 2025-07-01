import prisma from '../../db/prisma';
import { CreatePaymentAccountModel, PaymentAccount } from '../../services/payments/payment-account.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapPaginatedEntities, PaginatedPayload, PaginatedResultData } from '../../utils/pagination.utils';
import {
  mapCreatePaymentAccountModelToEntity,
  mapPaymentAccountEntityToModel,
  PaymentAccountEntity,
} from './payment-account.entity';

export class PaymentAccountsRepository {
  async createPaymentAccount(data: CreatePaymentAccountModel): Promise<Result<PaymentAccount>> {
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

  async getPaymentAccountsPaginated({
    page,
    pageSize,
  }: PaginatedPayload): Promise<Result<PaginatedResultData<PaymentAccount>>> {
    const skip = (page - 1) * pageSize;

    try {
      const [paymentAccounts, total] = await prisma.$transaction([
        prisma.paymentAccount.findMany({
          skip,
          take: pageSize,
        }),
        prisma.paymentAccount.count(),
      ]);

      const paginationData = {
        data: paymentAccounts,
        meta: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      } satisfies PaginatedResultData<PaymentAccountEntity>;

      return resultSuccess(paginationData, mapPaginatedEntities(mapPaymentAccountEntityToModel));
    } catch (e: any) {
      const message = e.message ?? 'Failed to get Payment Accounts';
      return resultError(message);
    }
  }
}

// Single instance
export const paymentAccountsRepository = new PaymentAccountsRepository();
