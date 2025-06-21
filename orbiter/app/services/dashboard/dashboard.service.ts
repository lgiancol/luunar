import { apiGet } from '../../utils/api';
import type { DashboardMetrics } from './dashboard.model';
import type { DashboardMetricsDto } from './dashboard.dto';
import { mapDashboardMetricsDtoToModel } from './dashboard.mapper';
import type { Result } from '../../types/result';

export interface DashboardFilters {
  startDate?: Date;
  endDate?: Date;
}

export async function getDashboardMetrics(filters?: DashboardFilters): Promise<Result<DashboardMetrics>> {
  // Build query parameters
  const params = new URLSearchParams();
  if (filters?.startDate) {
    params.append('start_date', filters.startDate.toISOString());
  }
  if (filters?.endDate) {
    params.append('end_date', filters.endDate.toISOString());
  }

  const queryString = params.toString();
  const endpoint = `/dashboard/metrics${queryString ? `?${queryString}` : ''}`;

  return apiGet<DashboardMetricsDto, DashboardMetrics>(endpoint, mapDashboardMetricsDtoToModel);
} 