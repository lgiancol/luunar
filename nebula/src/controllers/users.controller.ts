import { Request, Response } from 'express';
import { usersService } from '../services/users/users.service';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export class UsersController {
  async getAllUsers(req: Request, res: Response) {
    const users = await usersService.listUsers();
    res.json(ModelToResponseBodyMapper(users));
  }
}

// Single instance
export const usersController = new UsersController();
