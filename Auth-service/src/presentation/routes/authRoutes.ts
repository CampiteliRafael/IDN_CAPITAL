import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import {
  registerUserUseCase,
  loginUserUseCase,
  getCurrentUserUseCase,
} from '../../infrastructure/config/dependencies.js';

const authController = new AuthController(
  registerUserUseCase,
  loginUserUseCase,
  getCurrentUserUseCase
);

const router = Router();

router.get('/me', authController.me);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
