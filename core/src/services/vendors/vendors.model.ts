export interface VendorModel {
  id: string;
  createdAt: Date;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organizationId: string;
  income?: number; // Total income from incoming payments
}

export type CreateVendorModel = Omit<VendorModel, 'id' | 'createdAt'>; 