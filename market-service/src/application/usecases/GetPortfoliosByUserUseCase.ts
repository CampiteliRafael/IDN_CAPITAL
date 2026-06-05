import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioNotFoundError } from "../../domain/errors/index";
import { PortfolioResponseDto } from "../dtos/PortfolioDto";

export class GetPortfoliosByUserUseCase {
    constructor(private portfolioRepository: IPortfolioRepository) {}

    async execute(userId: string): Promise<PortfolioResponseDto[]> {
        const portfolios = await this.portfolioRepository.findAllByUserId(userId);
        if (!portfolios || portfolios.length === 0) {
            throw new PortfolioNotFoundError(`No portfolios found for user with ID: ${userId}`);
        }

        return portfolios.map(PortfolioResponseDto.fromEntity);
    }
}