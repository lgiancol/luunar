import {
  mapPaginatedResponseDTO,
  type PaginatedPayloadDTO,
  type PaginatedResponse,
  type PaginatedResponseDTO,
} from '~/shared/pagination';
import type { Result } from '~/types/result';
import { apiGet, apiPost } from '~/utils/api';
import type { PaymentAccount } from './payment-account.model';
import { mapGetPaymentAccountResponseDTO } from './payment-accounts.mapper';
import type { AddPaymentAccountPayloadDTO, GetPaymentAccountResponseDTO } from './payment_accounts.dto';

export async function addPaymentAccount(payload: AddPaymentAccountPayloadDTO): Promise<Result<PaymentAccount>> {
  return apiPost('/payment_accounts', payload, mapGetPaymentAccountResponseDTO);
}

export async function getPaymentAccounts({
  page,
  pageSize,
}: PaginatedPayloadDTO): Promise<Result<PaginatedResponse<PaymentAccount>>> {
  return apiGet<PaginatedResponseDTO<GetPaymentAccountResponseDTO>, PaginatedResponse<PaymentAccount>>(
    `/payment_accounts?page=${page}&pageSize=${pageSize}`,
    mapPaginatedResponseDTO(mapGetPaymentAccountResponseDTO)
  );
}
