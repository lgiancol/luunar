import { Router } from 'express';
import { login, logout, register, validate } from '../controllers/auth.controller';

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/validate', validate);

export default router;
