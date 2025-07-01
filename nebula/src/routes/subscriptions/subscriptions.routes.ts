import { Router } from 'express';
import { subscriptionsController } from '../../controllers/subscriptions.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddSubscriptionPayload, mapUpdateSubscriptionPayload } from './subscriptions-routes.mapper';

const router = Router();

router.post('/', mapBodyPayload(mapAddSubscriptionPayload), (req, res) =>
  subscriptionsController.addSubscription(req, res),
);
router.get('/', verifyPaginatedQueryParams, (req, res) => subscriptionsController.getSubscriptions(req, res));
router.get('/:id', (req, res) => subscriptionsController.getSubscriptionById(req, res));
router.put('/:id', mapBodyPayload(mapUpdateSubscriptionPayload), (req, res) =>
  subscriptionsController.updateSubscription(req, res),
);
router.delete('/:id', (req, res) => subscriptionsController.deleteSubscription(req, res));

export default router;
