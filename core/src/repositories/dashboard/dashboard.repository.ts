import prisma from '../../db/prisma';
import { DateFilter } from '../payments/payments.repository';
import { Result, resultError, resultSuccess } from '../../types/result';

export interface DashboardMetricsData {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
}

export async function getDashboardMetricsAggregated(dateFilter?: DateFilter): Promise<Result<DashboardMetricsData>> {
  try {
    const results = await prisma.payment.groupBy({
      by: ['type'],
      where: {
        ...(dateFilter?.startDate || dateFilter?.endDate
          ? {
              received_at: {
                ...(dateFilter.startDate ? { gte: dateFilter.startDate } : {}),
                ...(dateFilter.endDate ? { lte: dateFilter.endDate } : {}),
              },
            }
          : {}),
      },
      _sum: {
        amount: true,
      },
    });

    type GroupedResult = { type: string; _sum: { amount: number | null } };
    const totalIncome = (results.find((result: GroupedResult) => result.type === 'incoming')?._sum.amount) || 0;
    const totalExpenses = (results.find((result: GroupedResult) => result.type === 'outgoing')?._sum.amount) || 0;
    const netProfit = totalIncome - totalExpenses;

    return {
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        netProfit,
      }
    };
  } catch (e: any) {
    const message = e.message ?? 'Failed to get dashboard metrics';
    return resultError(message);
  }
} 