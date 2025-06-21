import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { addClient, indexClients, fetchRecentClients } from '../../services/clients/clients.service';
import * as clientsRepository from '../../repositories/clients/clients.repository';
import { CreateClientModel } from '../../services/clients/clients.model';

jest.mock('../../repositories/clients/clients.repository');
const mockCreateClient = clientsRepository.createClient as jest.MockedFunction<typeof clientsRepository.createClient>;
const mockFetchClientsPaginated = clientsRepository.fetchClientsPaginated as jest.MockedFunction<typeof clientsRepository.fetchClientsPaginated>;
const mockFetchRecentClients = clientsRepository.fetchRecentClients as jest.MockedFunction<typeof clientsRepository.fetchRecentClients>;

describe('Clients Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add client (happy path)', async () => {
    const data: CreateClientModel = { name: 'C', email: 'c@c.com', phone: '', notes: '', organizationId: 'org' };
    mockCreateClient.mockResolvedValue({ success: true, data: { ...data, id: 'id', createdAt: new Date() } });
    const result = await addClient(data);
    expect(mockCreateClient).toHaveBeenCalledWith(data);
    expect(result.success).toBe(true);
  });

  it('should return error if add client fails', async () => {
    const data: CreateClientModel = { name: 'C', email: 'c@c.com', phone: '', notes: '', organizationId: 'org' };
    mockCreateClient.mockResolvedValue({ success: false, error: 'fail' });
    const result = await addClient(data);
    expect(result.success).toBe(false);
  });

  it('should index clients (happy path)', async () => {
    mockFetchClientsPaginated.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
    const result = await indexClients({ page: 1, pageSize: 10 });
    expect(mockFetchClientsPaginated).toHaveBeenCalledWith({ page: 1, pageSize: 10 });
    expect(result.success).toBe(true);
  });

  it('should fetch recent clients (happy path)', async () => {
    mockFetchRecentClients.mockResolvedValue({ success: true, data: { data: [], meta: { page: 1, pageSize: 10, total: 0, totalPages: 0 } } });
    const result = await fetchRecentClients(10);
    expect(mockFetchRecentClients).toHaveBeenCalledWith(10);
    expect(result.success).toBe(true);
  });
}); 