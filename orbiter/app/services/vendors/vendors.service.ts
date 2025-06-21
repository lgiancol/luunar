import {
  mapPaginatedResponseDTO,
  type PaginatedPayloadDTO,
  type PaginatedResponse,
  type PaginatedResponseDTO,
} from '~/shared/pagination';
import type { Result } from '~/types/result';
import { apiGet, apiPost } from '~/utils/api';
import type { Vendor, CreateVendorModel } from './vendors.model';
import type { VendorDto, CreateVendorDto, UpdateVendorDto } from './vendors.dto';
import { mapVendorDtoToModel, mapCreateVendorModelToDto, mapUpdateVendorModelToDto } from './vendors.mapper';

export async function addVendor(payload: CreateVendorDto): Promise<Result<Vendor>> {
  return apiPost('/vendors', payload, mapVendorDtoToModel);
}

export async function getVendors({ page, pageSize }: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<Vendor>>> {
  return apiGet<PaginatedResponseDTO<VendorDto>, PaginatedResponse<Vendor>>(
    `/vendors?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapVendorDtoToModel)
  );
}

export async function getRecentVendors(limit: number): Promise<Result<PaginatedResponse<Vendor>>> {
  return apiGet<PaginatedResponseDTO<VendorDto>, PaginatedResponse<Vendor>>(
    `/vendors/recent?limit=${limit}`,
    mapPaginatedResponseDTO(mapVendorDtoToModel)
  );
}

export async function getVendorById(id: string): Promise<Result<Vendor>> {
  return apiGet<VendorDto, Vendor>(`/vendors/${id}`, mapVendorDtoToModel);
}

export async function updateVendor(id: string, payload: UpdateVendorDto): Promise<Result<Vendor>> {
  return apiPost(`/vendors/${id}`, payload, mapVendorDtoToModel);
}

export async function deleteVendor(id: string): Promise<Result<void>> {
  return apiPost(`/vendors/${id}/delete`, {}, () => undefined);
} 