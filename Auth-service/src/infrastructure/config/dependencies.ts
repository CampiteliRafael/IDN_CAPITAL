import { prisma } from '../database/prisma-client';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { BcryptHashService } from '../../application/services';
import { JwtTokenService } from '../../application/services';
import { env } from '../config/env';
import { RegisterUserUseCase, LoginUserUseCase } from '../../application/use-cases';


export const userRepository = new PrismaUserRepository(prisma);
export const hashService = new BcryptHashService(10);
export const tokenService = new JwtTokenService(env.jwtSecret, env.jwtExpiresIn);

export const registerUserUseCase = new RegisterUserUseCase(userRepository, hashService, tokenService);
export const loginUserUseCase = new LoginUserUseCase(userRepository, hashService, tokenService);