import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioNotFoundError } from "../../domain/errors/index";

export class DeletePortfolioUseCase {
    constructor(private portfolioRepository: IPortfolioRepository) {}

    async execute(portfolioId: string): Promise<void> {
        const portfolio = await this.portfolioRepository.findById(portfolioId);
        if (!portfolio) {
            throw new PortfolioNotFoundError(`Portfolio with ID ${portfolioId} not found`);
        }
        await this.portfolioRepository.delete(portfolioId);
    }
}