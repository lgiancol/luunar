import { Router } from 'express';
import * as paymentsController from '../../controllers/payments.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddPaymentPayload } from './payments-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddPaymentPayload), paymentsController.addPayment);
router.get('/', verifyPaginatedQueryParams, paymentsController.getAllPayments);
router.get('/incoming', verifyPaginatedQueryParams, paymentsController.getIncomingPayments);
router.get('/outgoing', verifyPaginatedQueryParams, paymentsController.getOutgoingPayments);

export default router;
