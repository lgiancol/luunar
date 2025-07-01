import prisma from '../../db/prisma';
import { CreatePaymentModel, Payment, PaymentType } from '../../services/payments/payments.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapPaginatedEntities, PaginatedPayload, PaginatedResultData } from '../../utils/pagination.utils';
import { mapCreatePaymentModelToEntity, mapPaymentEntityToModel, PaymentEntity } from './payment.entity';

export interface DateFilter {
  startDate?: Date;
  endDate?: Date;
}

export class PaymentsRepository {
  async createPayment(data: CreatePaymentModel): Promise<Result<Payment>> {
    try {
      const entity = await prisma.payment.create({
        data: mapCreatePaymentModelToEntity(data),
        include: {
          payment_account: true,
          client: true,
          vendor: true,
        },
      });

      return resultSuccess(entity, mapPaymentEntityToModel);
    } catch (e: any) {
      const message = e.message ?? 'Failed to create payment';
      return resultError(message);
    }
  }

  async getPaymentsPaginated({
    page,
    pageSize,
    type,
    dateFilter,
  }: PaginatedPayload & { type?: PaymentType; dateFilter?: DateFilter }): Promise<
    Result<PaginatedResultData<Payment>>
  > {
    const skip = (page - 1) * pageSize;

    try {
      const whereClause: any = type ? { type } : {};

      // Add date filters if provided
      if (dateFilter?.startDate || dateFilter?.endDate) {
        whereClause.received_at = {};
        if (dateFilter.startDate) {
          whereClause.received_at.gte = dateFilter.startDate;
        }
        if (dateFilter.endDate) {
          whereClause.received_at.lte = dateFilter.endDate;
        }
      }

      const [payments, total] = await prisma.$transaction([
        prisma.payment.findMany({
          where: whereClause,
          skip,
          take: pageSize,
          include: {
            payment_account: true,
            client: true,
            vendor: true,
          },
          orderBy: { received_at: 'desc' },
        }),
        prisma.payment.count({ where: whereClause }),
      ]);

      const paginationData = {
        data: payments,
        meta: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      } satisfies PaginatedResultData<PaymentEntity>;

      return resultSuccess(paginationData, mapPaginatedEntities(mapPaymentEntityToModel));
    } catch (e: any) {
      const message = e.message ?? 'Failed to get Payments';
      return resultError(message);
    }
  }

  async getPaymentsByType({
    page,
    pageSize,
    type,
    dateFilter,
  }: PaginatedPayload & { type: PaymentType; dateFilter?: DateFilter }): Promise<Result<PaginatedResultData<Payment>>> {
    return this.getPaymentsPaginated({ page, pageSize, type, dateFilter });
  }
}

// Single instance
export const paymentsRepository = new PaymentsRepository();
