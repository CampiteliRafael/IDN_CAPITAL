import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { registerUserUseCase, loginUserUseCase } from '../../infrastructure/config/dependencies';

const authController = new AuthController(registerUserUseCase, loginUserUseCase);

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router