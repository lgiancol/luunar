"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetricsAggregated = getDashboardMetricsAggregated;
const prisma_1 = __importDefault(require("../../db/prisma"));
const result_1 = require("../../types/result");
async function getDashboardMetricsAggregated(dateFilter) {
    try {
        // Get aggregated totals
        const results = await prisma_1.default.payment.groupBy({
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
        const totalIncome = Number(results.find((result) => result.type === 'incoming')?._sum.amount) || 0;
        const totalExpenses = Number(results.find((result) => result.type === 'outgoing')?._sum.amount) || 0;
        const netProfit = totalIncome - totalExpenses;
        const cashFlow = totalIncome - totalExpenses;
        // Get monthly breakdown for best and worst performing month calculation
        let monthlyBreakdown = [];
        if (dateFilter?.startDate && dateFilter?.endDate) {
            // Generate all months in the date range and include payment data
            monthlyBreakdown = await prisma_1.default.$queryRaw `
        WITH RECURSIVE months AS (
          SELECT 
            DATE_TRUNC('month', ${dateFilter.startDate}) as month_start
          UNION ALL
          SELECT 
            month_start + INTERVAL '1 month'
          FROM months 
          WHERE month_start < DATE_TRUNC('month', ${dateFilter.endDate})
            AND month_start < DATE_TRUNC('month', CURRENT_DATE)
        ),
        monthly_data AS (
          SELECT 
            TO_CHAR(months.month_start, 'Month') as month,
            EXTRACT(YEAR FROM months.month_start) as year,
            months.month_start,
            COALESCE(SUM(CASE WHEN p.type = 'incoming' THEN p.amount ELSE 0 END), 0) as income,
            COALESCE(SUM(CASE WHEN p.type = 'outgoing' THEN p.amount ELSE 0 END), 0) as expenses,
            COALESCE(SUM(CASE WHEN p.type = 'incoming' THEN p.amount ELSE -p.amount END), 0) as profit
          FROM months
          LEFT JOIN payments p ON 
            DATE_TRUNC('month', p.received_at) = months.month_start
          GROUP BY months.month_start
        )
        SELECT * FROM monthly_data
        ORDER BY profit DESC, month_start ASC
      `;
        }
        else {
            // For all time, just get months with actual data
            monthlyBreakdown = await prisma_1.default.$queryRaw `
        SELECT 
          TO_CHAR(received_at, 'Month') as month,
          EXTRACT(YEAR FROM received_at) as year,
          DATE_TRUNC('month', received_at) as month_start,
          SUM(CASE WHEN type = 'incoming' THEN amount ELSE 0 END) as income,
          SUM(CASE WHEN type = 'outgoing' THEN amount ELSE 0 END) as expenses,
          SUM(CASE WHEN type = 'incoming' THEN amount ELSE -amount END) as profit
        FROM payments
        GROUP BY TO_CHAR(received_at, 'Month'), EXTRACT(YEAR FROM received_at), DATE_TRUNC('month', received_at)
        ORDER BY profit DESC, month_start ASC
      `;
        }
        const bestPerformingMonth = monthlyBreakdown.length > 0 ? {
            month: monthlyBreakdown[0].month.trim(),
            profit: Number(monthlyBreakdown[0].profit)
        } : null;
        // If all months have the same profit, show the same month for both best and worst
        const allSameProfit = monthlyBreakdown.length > 0 &&
            monthlyBreakdown.every(month => Number(month.profit) === Number(monthlyBreakdown[0].profit));
        let worstPerformingMonth = null;
        if (monthlyBreakdown.length > 0) {
            if (allSameProfit) {
                worstPerformingMonth = {
                    month: monthlyBreakdown[0].month.trim(),
                    profit: Number(monthlyBreakdown[0].profit)
                };
            }
            else {
                // Find the minimum profit value
                const minProfit = Math.min(...monthlyBreakdown.map(month => Number(month.profit)));
                // Find the earliest month with the minimum profit
                const worstMonth = monthlyBreakdown.find(month => Number(month.profit) === minProfit);
                worstPerformingMonth = {
                    month: worstMonth.month.trim(),
                    profit: Number(worstMonth.profit)
                };
            }
        }
        return {
            success: true,
            data: {
                totalIncome,
                totalExpenses,
                netProfit,
                cashFlow,
                bestPerformingMonth,
                worstPerformingMonth,
            }
        };
    }
    catch (e) {
        const message = e.message ?? 'Failed to get dashboard metrics';
        return (0, result_1.resultError)(message);
    }
}
