import {
  mapPaginatedResponseDTO,
  type PaginatedPayloadDTO,
  type PaginatedResponse,
  type PaginatedResponseDTO,
} from '~/shared/pagination';
import type { Result } from '~/types/result';
import { apiGet, apiPost } from '~/utils/api';
import type { AddClientPayloadDTO, GetClientResponseDTO } from './clients.dto';
import { mapGetClientResponseDTO } from './clients.mapper';
import type { Client } from './clients.model';

export async function addClient(payload: AddClientPayloadDTO): Promise<Result<Client>> {
  return apiPost('/clients', payload, mapGetClientResponseDTO);
}

export async function getClients({ page, pageSize }: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<Client>>> {
  return apiGet<PaginatedResponseDTO<GetClientResponseDTO>, PaginatedResponse<Client>>(
    `/clients?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapGetClientResponseDTO)
  );
}

export async function getRecentClients(limit: number): Promise<Result<PaginatedResponse<Client>>> {
  return apiGet<PaginatedResponseDTO<GetClientResponseDTO>, PaginatedResponse<Client>>(
    `/clients/recent?limit=${limit}`,
    mapPaginatedResponseDTO(mapGetClientResponseDTO)
  );
}
