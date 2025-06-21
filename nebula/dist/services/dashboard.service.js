"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = getDashboardMetrics;
const dashboard_repository_1 = require("../repositories/dashboard/dashboard.repository");
async function getDashboardMetrics(filters) {
    try {
        // Build date filter for repository
        const dateFilter = {};
        if (filters?.startDate || filters?.endDate) {
            if (filters.startDate) {
                dateFilter.startDate = filters.startDate;
            }
            if (filters.endDate) {
                dateFilter.endDate = filters.endDate;
            }
        }
        // Get metrics from repository
        const result = await (0, dashboard_repository_1.getDashboardMetricsAggregated)(dateFilter);
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
            }
        };
    }
    catch (error) {
        return {
            success: false,
            error: error.message ?? 'Failed to get dashboard metrics'
        };
    }
}
