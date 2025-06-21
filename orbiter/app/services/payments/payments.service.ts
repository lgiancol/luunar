import {
  mapPaginatedResponseDTO,
  type PaginatedPayloadDTO,
  type PaginatedResponse,
  type PaginatedResponseDTO,
} from '~/shared/pagination';
import type { Result } from '~/types/result';
import { apiGet, apiPost } from '~/utils/api';
import type { AddPaymentPayloadDTO, GetPaymentResponseDTO } from './payments.dto';
import { mapGetPaymentResponseDTO } from './payments.mapper';
import type { Payment } from './payment.model';

export async function addPayment(payload: AddPaymentPayloadDTO): Promise<Result<Payment>> {
  return apiPost('/payments', payload, mapGetPaymentResponseDTO);
}

export async function getPayments({
  page,
  pageSize,
}: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<Payment>>> {
  return apiGet<PaginatedResponseDTO<GetPaymentResponseDTO>, PaginatedResponse<Payment>>(
    `/payments?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapGetPaymentResponseDTO)
  );
}

export async function getIncomingPayments({
  page,
  pageSize,
}: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<Payment>>> {
  return apiGet<PaginatedResponseDTO<GetPaymentResponseDTO>, PaginatedResponse<Payment>>(
    `/payments/incoming?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapGetPaymentResponseDTO)
  );
}

export async function getOutgoingPayments({
  page,
  pageSize,
}: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<Payment>>> {
  return apiGet<PaginatedResponseDTO<GetPaymentResponseDTO>, PaginatedResponse<Payment>>(
    `/payments/outgoing?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapGetPaymentResponseDTO)
  );
}
