import { Router } from 'express';
import authRoutes from './auth.routes';
import clientsRoutes from './clients/clients.routes';
import healthRoutes from './health.routes';
import paymentsRoutes from './payments/payments.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/clients', clientsRoutes);
router.use('/payments', paymentsRoutes);

export default router;
