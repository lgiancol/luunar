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