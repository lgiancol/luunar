import { Request, Response } from 'express';
import { listUsers } from '../services/users/users.service';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await listUsers();
  res.json(ModelToResponseBodyMapper(users));
};
