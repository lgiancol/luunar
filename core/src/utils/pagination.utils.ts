import { ResponseMapper } from '../types/result';

export interface PaginatedPayload {
  page: number;
  pageSize: number;
}

export interface PaginatedResultData<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export function mapPaginatedEntities<ENTITY, MODEL>(mapper: ResponseMapper<ENTITY, MODEL>) {
  return (dto: PaginatedResultData<ENTITY>): PaginatedResultData<MODEL> => {
    return {
      data: dto.data.map(mapper),
      meta: {
        page: dto.meta.page,
        pageSize: dto.meta.pageSize,
        total: dto.meta.total,
        totalPages: dto.meta.totalPages,
      },
    };
  };
}
