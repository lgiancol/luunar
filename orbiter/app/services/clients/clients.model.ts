export interface Client {
  id: string;
  createdAt: Date;

  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organizationId: string;
}
