import { Router } from 'express';
import { clientsController } from '../../controllers/client.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddClientPayload } from './clients-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddClientPayload), (req, res) => clientsController.addClientHandler(req, res));
router.get('/', verifyPaginatedQueryParams, (req, res) => clientsController.getPaginatedClients(req, res));
router.get('/recent', (req, res) => clientsController.getRecentClients(req, res));

export default router;
