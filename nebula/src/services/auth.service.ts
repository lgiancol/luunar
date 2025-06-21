import bcrypt from 'bcryptjs';
import { createUser } from '../repositories/users/users.repository';

export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
  const hashed = await bcrypt.hash(password, 10);
  return createUser({ firstName, lastName, email, password: hashed });
}
