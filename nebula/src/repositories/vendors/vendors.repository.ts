import prisma from '../../db/prisma';
import { CreateVendorModel, VendorModel } from '../../services/vendors/vendors.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapPaginatedEntities, PaginatedPayload, PaginatedResultData } from '../../utils/pagination.utils';
import { mapCreateVendorModelToEntity, mapVendorEntityToModel, VendorEntity } from './vendor.entity';

export class VendorsRepository {
  async createVendor(data: CreateVendorModel): Promise<Result<VendorModel>> {
    try {
      const entity = await prisma.vendor.create({
        data: mapCreateVendorModelToEntity(data),
      });

      return resultSuccess(entity, mapVendorEntityToModel);
    } catch (e: any) {
      const message = e.message ?? 'Failed to create vendor';
      return resultError(message);
    }
  }

  async getVendorsPaginated({ page, pageSize }: PaginatedPayload): Promise<Result<PaginatedResultData<VendorModel>>> {
    const skip = (page - 1) * pageSize;

    try {
      const [vendors, total, expenseTotals] = await prisma.$transaction([
        prisma.vendor.findMany({
          skip,
          take: pageSize,
          orderBy: { created_at: 'desc' },
        }),
        prisma.vendor.count(),
        prisma.payment.groupBy({
          by: ['vendor_id'],
          where: {
            type: 'outgoing',
            vendor_id: {
              not: null,
            },
          },
          orderBy: {
            vendor_id: 'asc',
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

      // Create a map of vendor_id to expense total
      const expenseMap = new Map(expenseTotals.map((item) => [item.vendor_id, item._sum?.amount || 0]));

      // Add expenses to each vendor (keeping field name as 'income' for now to avoid breaking changes)
      const vendorsWithExpenses = vendors.map((vendor) => ({
        ...vendor,
        income: expenseMap.get(vendor.id) || 0,
      }));

      const paginationData = {
        data: vendorsWithExpenses,
        meta: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      } satisfies PaginatedResultData<VendorEntity>;

      return resultSuccess(paginationData, mapPaginatedEntities(mapVendorEntityToModel));
    } catch (e: any) {
      const message = e.message ?? 'Failed to get vendors';
      return resultError(message);
    }
  }

  async getRecentVendors(limit: number): Promise<Result<PaginatedResultData<VendorModel>>> {
    try {
      const [vendors, total] = await prisma.$transaction([
        prisma.vendor.findMany({
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        prisma.vendor.count(),
      ]);

      const paginationData = {
        data: vendors,
        meta: {
          page: 1,
          pageSize: limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      } satisfies PaginatedResultData<VendorEntity>;

      return resultSuccess(paginationData, mapPaginatedEntities(mapVendorEntityToModel));
    } catch (e: any) {
      const message = e.message ?? 'Failed to get recent vendors';
      return resultError(message);
    }
  }
}

// Single instance
export const vendorsRepository = new VendorsRepository();
