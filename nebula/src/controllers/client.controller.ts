import { Request, Response } from 'express';
import { CreateClientModel } from '../services/clients/clients.model';
import { clientsService } from '../services/clients/clients.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export class ClientsController {
  async addClientHandler(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const createClientModel = req.body as CreateClientModel;

    const clientResult = await clientsService.addClient(createClientModel);

    if (isResultError(clientResult)) {
      res.status(500).json({ error: clientResult.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(clientResult.data));
  }

  async getPaginatedClients(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { page, pageSize } = req.query as { page: string; pageSize: string };

    const result = await clientsService.indexClients({ page: parseInt(page), pageSize: parseInt(pageSize) });
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async getRecentClients(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { limit } = req.query as { limit: string };

    const result = await clientsService.fetchRecentClients(parseInt(limit));
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }
}

// Single instance
export const clientsController = new ClientsController();
