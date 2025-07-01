import { Request, Response } from 'express';
import { SubscriptionsRepository } from 'repositories/subscriptions/subscriptions.repository';
import { CreateSubscriptionModel, UpdateSubscriptionModel } from 'services/subscriptions/subscriptions.model';
import { SubscriptionsService } from 'services/subscriptions/subscriptions.service';
import { ModelToResponseBodyMapper } from 'utils/controller.utils';
import { isResultError } from '../types/result';

export class SubscriptionsController {
  private subscriptionsService: SubscriptionsService;

  constructor() {
    const subscriptionsRepository = new SubscriptionsRepository();
    this.subscriptionsService = new SubscriptionsService(subscriptionsRepository);
  }

  async addSubscription(req: Request, res: Response) {
    const createSubscriptionModel = req.body as CreateSubscriptionModel;
    const result = await this.subscriptionsService.createSubscription(createSubscriptionModel);

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async getSubscriptions(req: Request, res: Response) {
    const { page, pageSize } = req.query as { page: string; pageSize: string };
    const result = await this.subscriptionsService.getSubscriptions({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async getSubscriptionById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.subscriptionsService.getSubscriptionById(id);

    if (isResultError(result)) {
      res.status(404).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async updateSubscription(req: Request, res: Response) {
    const { id } = req.params;
    const updateSubscriptionModel = req.body as UpdateSubscriptionModel;
    const result = await this.subscriptionsService.updateSubscription(id, updateSubscriptionModel);

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async deleteSubscription(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.subscriptionsService.deleteSubscription(id);

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(204).send();
  }
}
