import { Request, Response, NextFunction } from 'express';
import {
  RegisterUserUseCase,
  LoginUserUseCase,
  GetCurrentUserUseCase,
} from '../../application/use-cases/index.js';
import { CreateUserSchema, LoginSchema } from '../../application/dtos/index.js';

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private getCurrentUserUseCase: GetCurrentUserUseCase
  ) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = CreateUserSchema.parse(req.body);
      const result = await this.registerUserUseCase.execute(data);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      res.status(201).json({
        success: true,
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = LoginSchema.parse(req.body);
      const result = await this.loginUserUseCase.execute(data);

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });

      res.status(200).json({
        success: true,
        data: { user: result.user },
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token as string | undefined;
      const user = await this.getCurrentUserUseCase.execute({ token });

      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  };
}
