import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { ClientsRepository } from '../../repositories/clients/clients.repository';
import { CreateClientModel } from '../../services/clients/clients.model';
import { ClientsService } from '../../services/clients/clients.service';

jest.mock('../../repositories/clients/clients.repository');
const mockClientsRepository = ClientsRepository as jest.MockedClass<typeof ClientsRepository>;

describe('Clients Service', () => {
  let clientsService: ClientsService;
  let mockRepository: jest.Mocked<ClientsRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new mockClientsRepository() as jest.Mocked<ClientsRepository>;
    clientsService = new ClientsService(mockRepository);
  });

  it('should add client (happy path)', async () => {
    const data: CreateClientModel = { name: 'C', email: 'c@c.com', phone: '', notes: '', organizationId: 'org' };
    mockRepository.createClient.mockResolvedValue({
      success: true,
      data: { ...data, id: 'id', createdAt: new Date() },
    });
    const result = await clientsService.addClient(data);
    expect(mockRepository.createClient).toHaveBeenCalledWith(data);
    expect(result.success).toBe(true);
  });

  it('should return error if add client fails', async () => {
    const data: CreateClientModel = { name: 'C', email: 'c@c.com', phone: '', notes: '', organizationId: 'org' };
    mockRepository.createClient.mockResolvedValue({ success: false, error: 'fail' });
    const result = await clientsService.addClient(data);
    expect(result.success).toBe(false);
  });

  it('should index clients (happy path)', async () => {
    mockRepository.fetchClientsPaginated.mockResolvedValue({
      success: true,
      data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } },
    });
    const result = await clientsService.indexClients({ page: 1, pageSize: 10 });
    expect(result.success).toBe(true);
  });

  it('should fetch recent clients (happy path)', async () => {
    mockRepository.fetchRecentClients.mockResolvedValue({
      success: true,
      data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } },
    });
    const result = await clientsService.fetchRecentClients(10);
    expect(mockRepository.fetchRecentClients).toHaveBeenCalledWith(10);
    expect(result.success).toBe(true);
  });
});
