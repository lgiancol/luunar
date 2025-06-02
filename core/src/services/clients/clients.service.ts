import { createClient, getClientsPaginated } from '../../repositories/clients/clients.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreateClientModel } from './clients.model';

export async function addClient(data: CreateClientModel) {
  return createClient(data);
}

export async function getClients(data: PaginatedPayload) {
  return getClientsPaginated(data);
}
