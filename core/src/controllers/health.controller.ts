import { Request, Response } from 'express';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const getHealth = async (req: Request, res: Response) => {
  res.json(ModelToResponseBodyMapper({ status: 'ok' }));
};
