import { CreateVendorModel } from '../../services/vendors/vendors.model';

export function mapAddVendorPayload(payload: any): CreateVendorModel {
  return {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    notes: payload.notes,
    organizationId: payload.organization_id,
  };
} 