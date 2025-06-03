import * as clientsRespository from '../../repositories/clients/clients.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreateClientModel } from './clients.model';

export async function addClient(data: CreateClientModel) {
  return clientsRespository.createClient(data);
}

export async function indexClients(data: PaginatedPayload) {
  return clientsRespository.fetchClientsPaginated(data);
}

export async function fetchRecentClients(limit: number) {
  return clientsRespository.fetchRecentClients(limit);
}
