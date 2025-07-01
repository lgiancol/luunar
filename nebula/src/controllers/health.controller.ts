import { Request, Response } from 'express';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export class HealthController {
  async getHealth(req: Request, res: Response) {
    res.json(ModelToResponseBodyMapper({ status: 'ok' }));
  }
}

// Single instance
export const healthController = new HealthController();
