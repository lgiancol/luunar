export interface DashboardMetricsDto {
  total_income: number;
  total_expenses: number;
  net_profit: number;
  cash_flow: number;
  best_performing_month: {
    month: string;
    profit: number;
  } | null;
} 