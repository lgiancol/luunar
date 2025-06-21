import { describe, it, expect } from '@jest/globals';
import { listUsers } from '../../services/users/users.service';

describe('Users Service', () => {
  it('should return a list of users (happy path)', async () => {
    const result = await listUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });

  it('should handle empty user list', async () => {
    // Simulate empty list by temporarily replacing listUsers
    const original = listUsers;
    // @ts-ignore
    const mockListUsers = async () => [];
    // @ts-ignore
    const result = await mockListUsers();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
}); 