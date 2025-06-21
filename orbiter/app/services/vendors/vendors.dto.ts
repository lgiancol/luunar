export interface CreateVendorDto {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface UpdateVendorDto {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface VendorDto {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organization_id: string;
}

export interface PaginatedVendorsDto {
  data: VendorDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 