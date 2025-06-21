import prisma from '../../db/prisma';
import { DateFilter } from '../payments/payments.repository';
import { Result, resultError, resultSuccess } from '../../types/result';

export interface DashboardMetricsData {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  cashFlow: number;
  bestPerformingMonth: {
    month: string;
    profit: number;
  } | null;
}

export async function getDashboardMetricsAggregated(dateFilter?: DateFilter): Promise<Result<DashboardMetricsData>> {
  try {
    // Get aggregated totals
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
    const cashFlow = totalIncome - totalExpenses;

    // Get monthly breakdown for best performing month calculation
    let monthlyBreakdown: Array<{
      month: string;
      year: number;
      income: number;
      expenses: number;
      profit: number;
    }> = [];

    if (dateFilter?.startDate && dateFilter?.endDate) {
      monthlyBreakdown = await prisma.$queryRaw<Array<{
        month: string;
        year: number;
        income: number;
        expenses: number;
        profit: number;
      }>>`
        SELECT 
          TO_CHAR(received_at, 'Month') as month,
          EXTRACT(YEAR FROM received_at) as year,
          SUM(CASE WHEN type = 'incoming' THEN amount ELSE 0 END) as income,
          SUM(CASE WHEN type = 'outgoing' THEN amount ELSE 0 END) as expenses,
          SUM(CASE WHEN type = 'incoming' THEN amount ELSE -amount END) as profit
        FROM payments
        WHERE received_at >= ${dateFilter.startDate} AND received_at <= ${dateFilter.endDate}
        GROUP BY TO_CHAR(received_at, 'Month'), EXTRACT(YEAR FROM received_at)
        ORDER BY profit DESC
        LIMIT 1
      `;
    } else {
      monthlyBreakdown = await prisma.$queryRaw<Array<{
        month: string;
        year: number;
        income: number;
        expenses: number;
        profit: number;
      }>>`
        SELECT 
          TO_CHAR(received_at, 'Month') as month,
          EXTRACT(YEAR FROM received_at) as year,
          SUM(CASE WHEN type = 'incoming' THEN amount ELSE 0 END) as income,
          SUM(CASE WHEN type = 'outgoing' THEN amount ELSE 0 END) as expenses,
          SUM(CASE WHEN type = 'incoming' THEN amount ELSE -amount END) as profit
        FROM payments
        GROUP BY TO_CHAR(received_at, 'Month'), EXTRACT(YEAR FROM received_at)
        ORDER BY profit DESC
        LIMIT 1
      `;
    }

    const bestPerformingMonth = monthlyBreakdown.length > 0 ? {
      month: monthlyBreakdown[0].month.trim(),
      profit: Number(monthlyBreakdown[0].profit)
    } : null;

    return {
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        netProfit,
        cashFlow,
        bestPerformingMonth,
      }
    };
  } catch (e: any) {
    const message = e.message ?? 'Failed to get dashboard metrics';
    return resultError(message);
  }
} 