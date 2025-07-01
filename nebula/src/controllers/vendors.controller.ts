import { Request, Response } from 'express';
import { CreateVendorModel } from '../services/vendors/vendors.model';
import { vendorsService } from '../services/vendors/vendors.service';
import { isResultError } from '../types/result';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export class VendorsController {
  async addVendor(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const createVendorModel = req.body as CreateVendorModel;

    // Add default organization ID if not provided
    const vendorData: CreateVendorModel = {
      ...createVendorModel,
      organizationId: createVendorModel.organizationId || 'test-organization',
    };

    const vendorResult = await vendorsService.addVendor(vendorData);

    if (isResultError(vendorResult)) {
      res.status(500).json({ error: vendorResult.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(vendorResult.data));
  }

  async getAllVendors(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { page, pageSize } = req.query as { page: string; pageSize: string };

    const result = await vendorsService.getVendors({ page: parseInt(page), pageSize: parseInt(pageSize) });
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }

  async getRecentVendors(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { limit } = req.query as { limit: string };

    const result = await vendorsService.getRecentVendorsService(parseInt(limit));
    if (isResultError(result)) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.json(ModelToResponseBodyMapper(result.data));
  }
}

// Single instance
export const vendorsController = new VendorsController();
