import prisma from '../../db/prisma';
import { CreateVendorModel, VendorModel } from '../../services/vendors/vendors.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapPaginatedEntities, PaginatedPayload, PaginatedResultData } from '../../utils/pagination.utils';
import { mapCreateVendorModelToEntity, mapVendorEntityToModel, VendorEntity } from './vendor.entity';

export async function createVendor(data: CreateVendorModel): Promise<Result<VendorModel>> {
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

export async function getVendorsPaginated({
  page,
  pageSize,
}: PaginatedPayload): Promise<Result<PaginatedResultData<VendorModel>>> {
  const skip = (page - 1) * pageSize;

  try {
    const [vendors, total, incomeTotals] = await prisma.$transaction([
      prisma.vendor.findMany({
        skip,
        take: pageSize,
        orderBy: { created_at: 'desc' },
      }),
      prisma.vendor.count(),
      prisma.payment.groupBy({
        by: ['vendor_id'],
        where: {
          type: 'incoming',
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

    // Create a map of vendor_id to income total
    const incomeMap = new Map(
      incomeTotals.map((item) => [item.vendor_id, item._sum?.amount || 0])
    );

    // Add income to each vendor
    const vendorsWithIncome = vendors.map((vendor) => ({
      ...vendor,
      income: incomeMap.get(vendor.id) || 0,
    }));

    const paginationData = {
      data: vendorsWithIncome,
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

export async function getRecentVendors(limit: number): Promise<Result<PaginatedResultData<VendorModel>>> {
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