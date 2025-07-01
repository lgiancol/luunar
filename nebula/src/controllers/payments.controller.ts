import { Request, Response } from 'express';
import { CreatePaymentModel, PaymentType } from '../services/payments/payments.model';
import { paymentsService } from '../services/payments/payments.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export class PaymentsController {
  async addPayment(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const createPaymentModel = req.body as CreatePaymentModel;

    const paymentResult = await paymentsService.addPayment(createPaymentModel);

    if (isResultError(paymentResult)) {
      res.status(500).json({ error: paymentResult.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(paymentResult.data));
  }

  async getAllPayments(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { page, pageSize, type } = req.query as { page: string; pageSize: string; type?: string };

    const result = await paymentsService.getPayments({
      page: parseInt(page),
      pageSize: parseInt(pageSize),
      type: type as PaymentType | undefined,
    });

    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async getIncomingPayments(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { page, pageSize } = req.query as { page: string; pageSize: string };

    const result = await paymentsService.getIncomingPayments({ page: parseInt(page), pageSize: parseInt(pageSize) });
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async getOutgoingPayments(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { page, pageSize } = req.query as { page: string; pageSize: string };

    const result = await paymentsService.getOutgoingPayments({ page: parseInt(page), pageSize: parseInt(pageSize) });
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }
}

// Single instance
export const paymentsController = new PaymentsController();
