import { Router } from 'express';
import { addClientHandler, getPaginatedClients } from '../../controllers/client.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddClientPayload } from './clients-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddClientPayload), addClientHandler);
router.get('/', verifyPaginatedQueryParams, getPaginatedClients);

export default router;
