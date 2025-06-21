import { createVendor, getVendorsPaginated, getRecentVendors } from '../../repositories/vendors/vendors.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreateVendorModel, VendorModel } from './vendors.model';

export async function addVendor(data: CreateVendorModel) {
  return createVendor(data);
}

export async function getVendors(data: PaginatedPayload) {
  return getVendorsPaginated(data);
}

export async function getRecentVendorsService(limit: number) {
  return getRecentVendors(limit);
} 