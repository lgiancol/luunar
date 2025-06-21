import { Request, Response } from 'express';
import { CreateVendorModel } from '../services/vendors/vendors.model';
import * as vendorService from '../services/vendors/vendors.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const addVendor = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const createVendorModel = req.body as CreateVendorModel;

  const vendorResult = await vendorService.addVendor(createVendorModel);

  if (isResultError(vendorResult)) {
    res.status(500).json({ error: vendorResult.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(vendorResult.data));
};

export const getAllVendors = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { page, pageSize } = req.query as { page: string; pageSize: string };

  const result = await vendorService.getVendors({ page: parseInt(page), pageSize: parseInt(pageSize) });
  if (isResultError(result)) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
};

export const getRecentVendors = async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { limit } = req.query as { limit: string };

  const result = await vendorService.getRecentVendorsService(parseInt(limit));
  if (isResultError(result)) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
}; 