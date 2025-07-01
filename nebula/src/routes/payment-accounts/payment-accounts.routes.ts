import { Router } from 'express';
import { paymentAccountsController } from '../../controllers/payment-accounts.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddPaymentAccountPayload } from './payment-accounts-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddPaymentAccountPayload), (req, res) =>
  paymentAccountsController.addPaymentAccount(req, res),
);
router.get('/', verifyPaginatedQueryParams, (req, res) => paymentAccountsController.getAllPaymentAccounts(req, res));

export default router;
