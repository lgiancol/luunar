import {
  mapPaginatedResponseDTO,
  type PaginatedPayloadDTO,
  type PaginatedResponse,
  type PaginatedResponseDTO,
} from '~/shared/pagination';
import type { Result } from '~/types/result';
import { apiGet } from '~/utils/api';
import type { FetchSubscriptionDto } from './subscriptions.dto';
import { mapSubscriptionDtoToModel } from './subscriptions.mapper';
import type { Subscription } from './subscriptions.model';

export async function getSubscriptions({
  page,
  pageSize,
}: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<Subscription>>> {
  return apiGet<PaginatedResponseDTO<FetchSubscriptionDto>, PaginatedResponse<Subscription>>(
    `/subscriptions?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapSubscriptionDtoToModel)
  );
}
