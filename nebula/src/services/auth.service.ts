import bcrypt from 'bcryptjs';
import { UsersRepository } from '../repositories/users/users.repository';

export class AuthService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async registerUser(firstName: string, lastName: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.usersRepository.createUser({ firstName, lastName, email, password: hashed });
  }
}

// Single instance
export const authService = new AuthService(new UsersRepository());
