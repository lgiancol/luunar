import { Router } from 'express';
import { getDashboardMetricsController } from '../controllers/dashboard.controller';

const router = Router();

router.get('/metrics', getDashboardMetricsController);

export default router; 