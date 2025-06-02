export interface Client {
  id: string;
  createdAt: string;

  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organizationId: string;
}
