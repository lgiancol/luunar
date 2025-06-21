import type { VendorModel } from '../../services/vendors/vendors.model';

export interface VendorEntity {
  id: string;
  created_at: Date;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organization_id: string;
}

export function mapVendorEntityToModel(entity: VendorEntity): VendorModel {
  return {
    id: entity.id,
    createdAt: entity.created_at,
    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    notes: entity.notes,
    organizationId: entity.organization_id,
  };
}

export function mapCreateVendorModelToEntity(model: Omit<VendorModel, 'id' | 'createdAt'>): Omit<VendorEntity, 'id' | 'created_at'> {
  return {
    name: model.name,
    email: model.email,
    phone: model.phone,
    notes: model.notes,
    organization_id: model.organizationId,
  };
} 