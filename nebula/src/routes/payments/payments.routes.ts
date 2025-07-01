import { Router } from 'express';
import { paymentsController } from '../../controllers/payments.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddPaymentPayload } from './payments-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddPaymentPayload), (req, res) => paymentsController.addPayment(req, res));
router.get('/', verifyPaginatedQueryParams, (req, res) => paymentsController.getAllPayments(req, res));
router.get('/incoming', verifyPaginatedQueryParams, (req, res) => paymentsController.getIncomingPayments(req, res));
router.get('/outgoing', verifyPaginatedQueryParams, (req, res) => paymentsController.getOutgoingPayments(req, res));

export default router;
