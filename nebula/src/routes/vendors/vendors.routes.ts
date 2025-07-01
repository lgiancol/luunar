import { Router } from 'express';
import { vendorsController } from '../../controllers/vendors.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddVendorPayload } from './vendors-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddVendorPayload), (req, res) => vendorsController.addVendor(req, res));
router.get('/', verifyPaginatedQueryParams, (req, res) => vendorsController.getAllVendors(req, res));
router.get('/recent', (req, res) => vendorsController.getRecentVendors(req, res));

export default router;
