import { getPaymentsByType, DateFilter } from '../repositories/payments/payments.repository';
import { PaymentType } from './payments/payments.model';
import { Result } from '../types/result';

export interface DashboardMetrics {
  totalIncome: number;
}

export interface DashboardFilters {
  startDate?: Date;
  endDate?: Date;
}

export async function getDashboardMetrics(filters?: DashboardFilters): Promise<Result<DashboardMetrics>> {
  try {
    // Build date filter for Prisma
    const dateFilter: DateFilter = {};
    if (filters?.startDate || filters?.endDate) {
      if (filters.startDate) {
        dateFilter.startDate = filters.startDate;
      }
      if (filters.endDate) {
        dateFilter.endDate = filters.endDate;
      }
    }

    // Get all incoming payments to calculate total income
    const incomingPaymentsResult = await getPaymentsByType({ 
      type: PaymentType.incoming,
      page: 1,
      pageSize: 10000, // Get all payments for calculation
      dateFilter
    });

    if (!incomingPaymentsResult.success) {
      return incomingPaymentsResult;
    }

    // Calculate total income by summing all incoming payment amounts
    const totalIncome = incomingPaymentsResult.data.data.reduce((sum: number, payment) => {
      return sum + Number(payment.amount);
    }, 0);

    return {
      success: true,
      data: {
        totalIncome
      }
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message ?? 'Failed to get dashboard metrics'
    };
  }
} 