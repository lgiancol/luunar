import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { registerUser } from '../../services/auth.service';
import { createUser } from '../../repositories/users/users.repository';
import bcrypt from 'bcryptjs';

jest.mock('../../repositories/users/users.repository');
jest.mock('bcryptjs');
const mockBcryptHash = bcrypt.hash as jest.MockedFunction<any>;
const mockCreateUser = createUser as jest.MockedFunction<typeof createUser>;

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register user with hashed password', async () => {
    mockBcryptHash.mockResolvedValue('hashedpw');
    mockCreateUser.mockResolvedValue({ 
      success: true, 
      data: { 
        id: 'u1', 
        email: 'a@b.com', 
        firstName: 'A', 
        lastName: 'B', 
        createdAt: new Date() 
      } 
    });
    const result = await registerUser('A', 'B', 'a@b.com', 'pw');
    expect(mockBcryptHash).toHaveBeenCalledWith('pw', 10);
    expect(mockCreateUser).toHaveBeenCalledWith({ firstName: 'A', lastName: 'B', email: 'a@b.com', password: 'hashedpw' });
    expect(result.success).toBe(true);
  });

  it('should return error if createUser fails', async () => {
    mockBcryptHash.mockResolvedValue('hashedpw');
    mockCreateUser.mockResolvedValue({ success: false, error: 'fail' });
    const result = await registerUser('A', 'B', 'a@b.com', 'pw');
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error).toBe('fail');
  });
}); 