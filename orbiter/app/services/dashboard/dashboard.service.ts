import { apiGet } from '../../utils/api';
import type { DashboardMetrics } from './dashboard.model';
import type { DashboardMetricsDto } from './dashboard.dto';
import { mapDashboardMetricsDtoToModel } from './dashboard.mapper';
import type { Result } from '../../types/result';

export async function getDashboardMetrics(): Promise<Result<DashboardMetrics>> {
  return apiGet<DashboardMetricsDto, DashboardMetrics>('/dashboard/metrics', mapDashboardMetricsDtoToModel);
} 