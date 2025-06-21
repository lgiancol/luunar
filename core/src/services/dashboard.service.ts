import { getPaymentsByType } from '../repositories/payments/payments.repository';
import { PaymentType } from './payments/payments.model';
import { Result } from '../types/result';

export interface DashboardMetrics {
  totalIncome: number;
}

export async function getDashboardMetrics(): Promise<Result<DashboardMetrics>> {
  try {
    // Get all incoming payments to calculate total income
    const incomingPaymentsResult = await getPaymentsByType({ 
      type: PaymentType.incoming,
      page: 1,
      pageSize: 10000 // Get all payments for calculation
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