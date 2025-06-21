import { Router } from 'express';
import * as paymentAccountsController from '../../controllers/payment-accounts.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { mapAddPaymentAccountPayload } from './payment-accounts-routes.mapper';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';

const router = Router();
router.post('/', mapBodyPayload(mapAddPaymentAccountPayload), paymentAccountsController.addPaymentAccount);
router.get('/', verifyPaginatedQueryParams, paymentAccountsController.getAllPaymentAccounts);

export default router;
