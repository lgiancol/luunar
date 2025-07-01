import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import bcrypt from 'bcryptjs';
import { UsersRepository } from '../../repositories/users/users.repository';
import { AuthService } from '../../services/auth.service';

jest.mock('../../repositories/users/users.repository');
jest.mock('bcryptjs');
const mockBcryptHash = bcrypt.hash as jest.MockedFunction<any>;
const mockUsersRepository = UsersRepository as jest.MockedClass<typeof UsersRepository>;

describe('Auth Service', () => {
  let authService: AuthService;
  let mockRepository: jest.Mocked<UsersRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepository = new mockUsersRepository() as jest.Mocked<UsersRepository>;
    authService = new AuthService(mockRepository);
  });

  it('should register user with hashed password', async () => {
    mockBcryptHash.mockResolvedValue('hashedpw');
    mockRepository.createUser.mockResolvedValue({
      success: true,
      data: {
        id: 'u1',
        email: 'a@b.com',
        firstName: 'A',
        lastName: 'B',
        createdAt: new Date(),
      },
    });
    const result = await authService.registerUser('A', 'B', 'a@b.com', 'pw');
    expect(mockBcryptHash).toHaveBeenCalledWith('pw', 10);
    expect(mockRepository.createUser).toHaveBeenCalledWith({
      firstName: 'A',
      lastName: 'B',
      email: 'a@b.com',
      password: 'hashedpw',
    });
    expect(result.success).toBe(true);
  });

  it('should return error if createUser fails', async () => {
    mockBcryptHash.mockResolvedValue('hashedpw');
    mockRepository.createUser.mockResolvedValue({ success: false, error: 'fail' });
    const result = await authService.registerUser('A', 'B', 'a@b.com', 'pw');
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBe('fail');
  });
});
