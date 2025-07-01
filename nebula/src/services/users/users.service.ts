import { UsersRepository } from '../../repositories/users/users.repository';

export class UsersService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async listUsers() {
    return this.usersRepository.listUsers();
  }
}

// Single instance
export const usersService = new UsersService(new UsersRepository());
