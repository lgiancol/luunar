import { Request, Response } from 'express';
import { CreatePaymentAccountModel } from '../services/payments/payment-account.model';
import { paymentAccountsService } from '../services/payments/payment-accounts.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export class PaymentAccountsController {
  async addPaymentAccount(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const createPaymentAccountModel = req.body as CreatePaymentAccountModel;

    const paymentResult = await paymentAccountsService.addPaymentAccount(createPaymentAccountModel);

    if (isResultError(paymentResult)) {
      res.status(500).json({ error: paymentResult.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(paymentResult.data));
  }

  async getAllPaymentAccounts(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { page, pageSize } = req.query as { page: string; pageSize: string };

    const result = await paymentAccountsService.getPaymentAccounts({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }
}

// Single instance
export const paymentAccountsController = new PaymentAccountsController();
