import { ClientsRepository } from '../../repositories/clients/clients.repository';
import { PaginatedPayload } from '../../utils/pagination.utils';
import { CreateClientModel } from './clients.model';

export class ClientsService {
  private clientsRepository: ClientsRepository;

  constructor(clientsRepository: ClientsRepository) {
    this.clientsRepository = clientsRepository;
  }

  async addClient(data: CreateClientModel) {
    return this.clientsRepository.createClient(data);
  }

  async indexClients(data: PaginatedPayload) {
    return this.clientsRepository.fetchClientsPaginated(data);
  }

  async fetchRecentClients(limit: number) {
    return this.clientsRepository.fetchRecentClients(limit);
  }
}

// Single instance
export const clientsService = new ClientsService(new ClientsRepository());
