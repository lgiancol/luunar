export interface AddClientPayloadDTO {
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organization_id: string;
}

export interface AddClientResponseDTO {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organization_id: string;
}

export interface GetClientResponseDTO {
  id: string;
  created_at: string;

  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organization_id: string;
}
