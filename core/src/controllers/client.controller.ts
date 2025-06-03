import { Request, Response } from 'express';
import { CreateClientModel } from '../services/clients/clients.model';
import { addClient, getClients } from '../services/clients/clients.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const addClientHandler = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const createClientModel = req.body as CreateClientModel;

  const clientResult = await addClient(createClientModel);

  if (isResultError(clientResult)) {
    res.status(500).json({ error: clientResult.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(clientResult.data));
};

export const getPaginatedClients = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { page, pageSize } = req.query as { page: string; pageSize: string };

  const result = await getClients({ page: parseInt(page), pageSize: parseInt(pageSize) });
  if (isResultError(result)) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
};
