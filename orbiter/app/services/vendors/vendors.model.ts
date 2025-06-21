export interface Vendor {
  id: string;
  createdAt: Date;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organizationId: string;
  income: number;
}

export type CreateVendorModel = Omit<Vendor, 'id' | 'createdAt'>; 