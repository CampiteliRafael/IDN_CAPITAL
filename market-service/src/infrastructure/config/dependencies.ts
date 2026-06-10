import { prisma } from '../database/prisma-client';
import { PrismaPortfolioRepository } from '../repositories/PrismaPortfolioRepository';
import { CreatePortfolioUseCase } from '../../application/usecases/CreatePortfolioUseCase';
import { GetPortfoliosByUserUseCase } from '../../application/usecases/GetPortfoliosByUserUseCase';
import { RenamePortfolioUseCase } from '../../application/usecases/RenamePortfolioUseCase';
import { DeletePortfolioUseCase } from '../../application/usecases/DeletePortfolioUseCase';

const portfolioRepository = new PrismaPortfolioRepository(prisma);

export const createPortfolioUseCase = new CreatePortfolioUseCase(portfolioRepository);
export const getPortfoliosByUserUseCase = new GetPortfoliosByUserUseCase(portfolioRepository);
export const renamePortfolioUseCase = new RenamePortfolioUseCase(portfolioRepository);
export const deletePortfolioUseCase = new DeletePortfolioUseCase(portfolioRepository);