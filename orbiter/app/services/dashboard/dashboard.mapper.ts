import type { DashboardMetrics } from './dashboard.model';
import type { DashboardMetricsDto } from './dashboard.dto';

export function mapDashboardMetricsDtoToModel(dto: DashboardMetricsDto): DashboardMetrics {
  return {
    totalIncome: dto.total_income,
    totalExpenses: dto.total_expenses,
    netProfit: dto.net_profit,
    cashFlow: dto.cash_flow,
    bestPerformingMonth: dto.best_performing_month,
    worstPerformingMonth: dto.worst_performing_month,
  };
}
