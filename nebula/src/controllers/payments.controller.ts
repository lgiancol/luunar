import { Request, Response } from 'express';
import { CreatePaymentModel, PaymentType } from '../services/payments/payments.model';
import * as paymentService from '../services/payments/payments.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const addPayment = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const createPaymentModel = req.body as CreatePaymentModel;

  const paymentResult = await paymentService.addPayment(createPaymentModel);

  if (isResultError(paymentResult)) {
    res.status(500).json({ error: paymentResult.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(paymentResult.data));
};

export const getAllPayments = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { page, pageSize, type } = req.query as { page: string; pageSize: string; type?: string };

  const result = await paymentService.getPayments({ 
    page: parseInt(page), 
    pageSize: parseInt(pageSize),
    type: type as PaymentType | undefined
  });
  
  if (isResultError(result)) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
};

export const getIncomingPayments = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { page, pageSize } = req.query as { page: string; pageSize: string };

  const result = await paymentService.getIncomingPayments({ page: parseInt(page), pageSize: parseInt(pageSize) });
  if (isResultError(result)) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
};

export const getOutgoingPayments = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { page, pageSize } = req.query as { page: string; pageSize: string };

  const result = await paymentService.getOutgoingPayments({ page: parseInt(page), pageSize: parseInt(pageSize) });
  if (isResultError(result)) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
};
