"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetricsController = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const controller_utils_1 = require("../utils/controller.utils");
const getDashboardMetricsController = async (req, res) => {
    // Parse query parameters
    const { start_date, end_date } = req.query;
    const filters = {};
    if (start_date) {
        filters.startDate = new Date(start_date);
    }
    if (end_date) {
        filters.endDate = new Date(end_date);
    }
    const result = await (0, dashboard_service_1.getDashboardMetrics)(filters);
    if (!result.success) {
        res.status(500).json({ error: result.error });
        return;
    }
    res.json((0, controller_utils_1.ModelToResponseBodyMapper)(result.data));
};
exports.getDashboardMetricsController = getDashboardMetricsController;
