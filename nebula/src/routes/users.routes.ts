import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

const router = Router();
router.get('/', (req, res) => usersController.getAllUsers(req, res));

export default router;
