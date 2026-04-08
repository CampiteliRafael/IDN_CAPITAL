import { Request, Response, NextFunction } from "express";
import { RegisterUserUseCase, LoginUserUseCase } from "../../application/use-cases";
import { CreateUserSchema, LoginSchema } from "../../application/dtos";

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase
  ) {}

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const data = CreateUserSchema.parse(req.body);
        const result = await this.registerUserUseCase.execute(data);
        res.status(201).json({
            success: true,
            data: result,
        });
        } catch (error) {
            next(error);
        }
    };
  
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const data = LoginSchema.parse(req.body);
        const result = await this.loginUserUseCase.execute(data);
        res.status(200).json({
            success: true,
            data: result,
        });
        } catch (error) {
            next(error);
        }
    }
}
