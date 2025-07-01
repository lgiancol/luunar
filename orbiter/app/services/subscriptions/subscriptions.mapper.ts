import { mapGetPaymentAccountResponseDTO } from '../payments/payment-accounts.mapper';
import { mapVendorDtoToModel } from '../vendors/vendors.mapper';
import type { FetchSubscriptionDto } from './subscriptions.dto';
import type { Subscription } from './subscriptions.model';

export const mapSubscriptionDtoToModel = (dto: FetchSubscriptionDto): Subscription => ({
  id: dto.id,
  createdAt: new Date(dto.created_at),
  updatedAt: new Date(dto.updated_at),
  name: dto.name,
  amount: dto.amount,
  vendorId: dto.vendor_id,
  paymentAccountId: dto.payment_account_id,
  frequency: dto.frequency,
  interval: dto.interval,
  startDate: new Date(dto.start_date),
  endDate: dto.end_date ? new Date(dto.end_date) : null,
  isActive: dto.is_active,
  lastProcessed: dto.last_processed ? new Date(dto.last_processed) : null,
  description: dto.description,
  category: dto.category,
  vendor: dto.vendor ? mapVendorDtoToModel(dto.vendor) : null,
  paymentAccount: dto.payment_account ? mapGetPaymentAccountResponseDTO(dto.payment_account) : null,
});
