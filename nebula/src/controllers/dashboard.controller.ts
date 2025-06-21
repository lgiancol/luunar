import { Request, Response } from 'express';
import { getDashboardMetrics as getDashboardMetricsService, DashboardFilters } from '../services/dashboard.service';
import { ModelToResponseBodyMapper } from '../utils/controller.utils';

export const getDashboardMetricsController = async (req: Request, res: Response) => {
  // Parse query parameters
  const { start_date, end_date } = req.query as { start_date?: string; end_date?: string };
  
  const filters: DashboardFilters = {};
  if (start_date) {
    filters.startDate = new Date(start_date);
  }
  if (end_date) {
    filters.endDate = new Date(end_date);
  }

  const result = await getDashboardMetricsService(filters);
  
  if (!result.success) {
    res.status(500).json({ error: result.error });
    return;
  }

  res.json(ModelToResponseBodyMapper(result.data));
}; 