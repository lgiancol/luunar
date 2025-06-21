import { CreateClientModel } from '../../services/clients/clients.model';

export function mapAddClientPayload(payload: any): CreateClientModel {
  return {
    name: payload['name'],
    email: payload['email'],
    phone: payload['phone'],
    notes: payload['notes'],
    organizationId: payload['organization_id'],
  };
}
