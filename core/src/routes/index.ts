import { Router } from 'express';
import authRoutes from './auth.routes';
import clientsRoutes from './clients/clients.routes';
import healthRoutes from './health.routes';
import paymentAccountsRoutes from './payment-accounts/payment-accounts.routes';
import paymentsRoutes from './payments/payments.routes';
import usersRoutes from './users.routes';
import vendorsRoutes from './vendors/vendors.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/clients', clientsRoutes);
router.use('/vendors', vendorsRoutes);
router.use('/payments', paymentsRoutes);
router.use('/payment_accounts', paymentAccountsRoutes);

export default router;
