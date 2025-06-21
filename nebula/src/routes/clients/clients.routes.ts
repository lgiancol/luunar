import { Router } from 'express';
import * as clientsController from '../../controllers/client.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddClientPayload } from './clients-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddClientPayload), clientsController.addClientHandler);
router.get('/', verifyPaginatedQueryParams, clientsController.getPaginatedClients);
router.get('/recent', clientsController.getRecentClients);

export default router;
