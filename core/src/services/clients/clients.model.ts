export interface ClientModel {
  id: string;
  createdAt: Date;

  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  organizationId: string;
}

export type CreateClientModel = Omit<ClientModel, 'id' | 'createdAt'>;
