import { prisma } from '../database/prisma-client.js';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository.js';
import { BcryptHashService } from '../../application/services/index.js';
import { JwtTokenService } from '../../application/services/index.js';
import { env } from '../config/env.js';
import { RegisterUserUseCase, LoginUserUseCase } from '../../application/use-cases/index.js';

export const userRepository = new PrismaUserRepository(prisma);
export const hashService = new BcryptHashService(10);
export const tokenService = new JwtTokenService(env.jwtSecret, env.jwtExpiresIn);

export const registerUserUseCase = new RegisterUserUseCase(
  userRepository,
  hashService,
  tokenService
);
export const loginUserUseCase = new LoginUserUseCase(userRepository, hashService, tokenService);
