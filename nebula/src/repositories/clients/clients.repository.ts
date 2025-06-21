import prisma from '../../db/prisma';
import { ClientModel, CreateClientModel } from '../../services/clients/clients.model';
import { Result, resultError, resultSuccess } from '../../types/result';
import { mapPaginatedEntities, PaginatedPayload, PaginatedResultData } from '../../utils/pagination.utils';
import { ClientEntity, mapClientEntityToModel, mapCreateClientDataToEntity } from './clients.entity';

export async function createClient(data: CreateClientModel): Promise<Result<ClientModel>> {
  try {
    const entity = await prisma.client.create({
      data: mapCreateClientDataToEntity(data),
    });

    return resultSuccess(entity, mapClientEntityToModel);
  } catch (e: any) {
    const message = e.message ?? 'Failed to create Client';
    return resultError(message);
  }
}

export async function fetchClientsPaginated({
  page,
  pageSize,
}: PaginatedPayload): Promise<Result<PaginatedResultData<ClientModel>>> {
  const skip = (page - 1) * pageSize;

  try {
    const [clients, total, incomeTotals] = await prisma.$transaction([
      prisma.client.findMany({
        skip,
        take: pageSize,
        orderBy: { name: 'asc' },
      }),
      prisma.client.count(),
      prisma.payment.groupBy({
        by: ['client_id'],
        where: {
          type: 'incoming',
          client_id: {
            not: null,
          },
        },
        orderBy: {
          client_id: 'asc',
        },
        _sum: {
          amount: true,
        },
      }),
    ]);

    // Create a map of client_id to income total
    const incomeMap = new Map(
      incomeTotals.map((item) => [item.client_id, item._sum?.amount || 0])
    );

    // Add income to each client
    const clientsWithIncome = clients.map((client) => ({
      ...client,
      income: incomeMap.get(client.id) || 0,
    }));

    const paginationData = {
      data: clientsWithIncome,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    } satisfies PaginatedResultData<ClientEntity>;

    return resultSuccess(paginationData, mapPaginatedEntities(mapClientEntityToModel));
  } catch (e: any) {
    const message = e.message ?? 'Failed to get Clients';
    return resultError(message);
  }
}

export async function fetchRecentClients(limit: number): Promise<Result<PaginatedResultData<ClientModel>>> {
  try {
    const [clients, total] = await prisma.$transaction([
      prisma.client.findMany({
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.client.count(),
    ]);

    const paginationData = {
      data: clients,
      meta: {
        page: 1,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    } satisfies PaginatedResultData<ClientEntity>;

    return resultSuccess(paginationData, mapPaginatedEntities(mapClientEntityToModel));
  } catch (e: any) {
    const message = e.message ?? 'Failed to create Client';
    return resultError(message);
  }
}
