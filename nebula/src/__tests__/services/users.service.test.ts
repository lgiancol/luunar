import { describe, expect, it } from '@jest/globals';
import { UsersRepository } from '../../repositories/users/users.repository';
import { UsersService } from '../../services/users/users.service';

describe('Users Service', () => {
  let usersService: UsersService;
  let mockRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new UsersRepository() as jest.Mocked<UsersRepository>;
    usersService = new UsersService(mockRepository);
  });
  it('should return a list of users (happy path)', async () => {
    const result = await usersService.listUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});
