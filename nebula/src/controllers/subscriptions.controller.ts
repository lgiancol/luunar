import { Request, Response } from 'express';
import { CreateSubscriptionModel, UpdateSubscriptionModel } from '../services/subscriptions/subscriptions.model';
import { subscriptionsService } from '../services/subscriptions/subscriptions.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

class SubscriptionsController {
  async addSubscription(req: Request, res: Response) {
    const createSubscriptionModel = req.body as CreateSubscriptionModel;
    const result = await subscriptionsService.createSubscription(createSubscriptionModel);

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    const subscription = result.data;

    if (createSubscriptionModel.backfill) {
      console.log('Backfill');
      //   await subscriptionsService.backfillSubscription(subscription.id);
    }

    res.json(ModelToResponseBodyMapper(subscription));
  }

  async getSubscriptions(req: Request, res: Response) {
    const { page, pageSize } = req.query as { page: string; pageSize: string };
    const result = await subscriptionsService.getSubscriptions({
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
    const result = await subscriptionsService.getSubscriptionById(id);

    if (isResultError(result)) {
      res.status(404).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async updateSubscription(req: Request, res: Response) {
    const { id } = req.params;
    const updateSubscriptionModel = req.body as UpdateSubscriptionModel;
    const result = await subscriptionsService.updateSubscription(id, updateSubscriptionModel);

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async deleteSubscription(req: Request, res: Response) {
    const { id } = req.params;
    const result = await subscriptionsService.deleteSubscription(id);

    if (isResultError(result)) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(204).send();
  }
}

export const subscriptionsController = new SubscriptionsController();
