import type { ResponseMapper } from '~/utils/api';

export interface PaginatedPayloadDTO {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponseDTO<T> {
  data: T[];
  meta: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export function mapPaginatedResponseDTO<RESPONSE, MODEL>(mapper: ResponseMapper<RESPONSE, MODEL>) {
  return (dto: PaginatedResponseDTO<RESPONSE>): PaginatedResponse<MODEL> => {
    return {
      data: dto.data.map(mapper),
      meta: {
        page: dto.meta.page,
        pageSize: dto.meta.page_size,
        total: dto.meta.total,
        totalPages: dto.meta.total_pages,
      },
    };
  };
}
