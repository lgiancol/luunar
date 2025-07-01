import { DashboardRepository } from '../repositories/dashboard/dashboard.repository';
import { DateFilter } from '../repositories/payments/payments.repository';
import { Result } from '../types/result';

export interface DashboardMetrics {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  cashFlow: number;
  bestPerformingMonth: {
    month: string;
    profit: number;
  } | null;
  worstPerformingMonth: {
    month: string;
    profit: number;
  } | null;
}

export interface DashboardFilters {
  startDate?: Date;
  endDate?: Date;
}

export class DashboardService {
  private dashboardRepository: DashboardRepository;

  constructor(dashboardRepository: DashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async getDashboardMetrics(filters?: DashboardFilters): Promise<Result<DashboardMetrics>> {
    try {
      // Build date filter for repository
      const dateFilter: DateFilter = {};
      if (filters?.startDate || filters?.endDate) {
        if (filters.startDate) {
          dateFilter.startDate = filters.startDate;
        }
        if (filters.endDate) {
          dateFilter.endDate = filters.endDate;
        }
      }

      // Get metrics from repository
      const result = await this.dashboardRepository.getDashboardMetricsAggregated(dateFilter);

      if (!result.success) {
        return result;
      }

      return {
        success: true,
        data: {
          totalIncome: result.data.totalIncome,
          totalExpenses: result.data.totalExpenses,
          netProfit: result.data.netProfit,
          cashFlow: result.data.cashFlow,
          bestPerformingMonth: result.data.bestPerformingMonth,
          worstPerformingMonth: result.data.worstPerformingMonth,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message ?? 'Failed to get dashboard metrics',
      };
    }
  }
}

// Single instance
export const dashboardService = new DashboardService(new DashboardRepository());
