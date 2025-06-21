import type { Vendor, CreateVendorModel } from './vendors.model';
import type { VendorDto, CreateVendorDto, UpdateVendorDto } from './vendors.dto';

export const mapVendorDtoToModel = (dto: VendorDto): Vendor => ({
  id: dto.id,
  createdAt: new Date(dto.created_at),
  name: dto.name,
  email: dto.email,
  phone: dto.phone,
  notes: dto.notes,
  organizationId: dto.organization_id,
});

export const mapCreateVendorModelToDto = (model: CreateVendorModel): CreateVendorDto => ({
  name: model.name,
  email: model.email || undefined,
  phone: model.phone || undefined,
  notes: model.notes || undefined,
});

export const mapUpdateVendorModelToDto = (model: Partial<CreateVendorModel>): UpdateVendorDto => ({
  name: model.name,
  email: model.email || undefined,
  phone: model.phone || undefined,
  notes: model.notes || undefined,
}); 