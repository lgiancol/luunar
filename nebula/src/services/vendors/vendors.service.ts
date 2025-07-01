import { VendorsRepository } from '../../repositories/vendors/vendors.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreateVendorModel } from './vendors.model';

export class VendorsService {
  private vendorsRepository: VendorsRepository;

  constructor(vendorsRepository: VendorsRepository) {
    this.vendorsRepository = vendorsRepository;
  }

  async addVendor(data: CreateVendorModel) {
    return this.vendorsRepository.createVendor(data);
  }

  async getVendors(data: PaginatedPayload) {
    return this.vendorsRepository.getVendorsPaginated(data);
  }

  async getRecentVendorsService(limit: number) {
    return this.vendorsRepository.getRecentVendors(limit);
  }
}

// Single instance
export const vendorsService = new VendorsService(new VendorsRepository());
