import { Router } from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/logout', (req, res, next) => authController.logout(req, res, next));
router.post('/validate', (req, res) => authController.validate(req, res));

export default router;
