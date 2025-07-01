import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';

const router = Router();

router.get('/metrics', (req, res) => dashboardController.getDashboardMetricsController(req, res));

export default router;
