import { Router } from 'express';
import * as vendorsController from '../../controllers/vendors.controller';
import { mapBodyPayload } from '../../middleware/map-body-payload.middleware';
import { verifyPaginatedQueryParams } from '../../middleware/verify-paginated-query-params.middleware';
import { mapAddVendorPayload } from './vendors-routes.mapper';

const router = Router();
router.post('/', mapBodyPayload(mapAddVendorPayload), vendorsController.addVendor);
router.get('/', verifyPaginatedQueryParams, vendorsController.getAllVendors);
router.get('/recent', vendorsController.getRecentVendors);

export default router; 