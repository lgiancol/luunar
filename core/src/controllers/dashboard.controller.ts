import { Request, Response } from 'express';
import { getDashboardMetrics as getDashboardMetricsService } from '../services/dashboard.service';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const getDashboardMetricsController = async (req: Request, res: Response) => {
  const result = await getDashboardMetricsService();
  
  if (!result.success) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
}; 