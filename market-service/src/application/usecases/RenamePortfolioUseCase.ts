import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioNotFoundError } from "../../domain/errors/index";
import { UpdatePortfoliosDto, PortfolioResponseDto } from "../dtos/PortfolioDto";

export class RenamePortfolioUseCase {
    constructor(private portfolioRepository: IPortfolioRepository) {}

    async execute(portfolioId: string, updateData: UpdatePortfoliosDto): Promise<PortfolioResponseDto> {
        const portfolio = await this.portfolioRepository.findById(portfolioId);
        if (!portfolio) {
            throw new PortfolioNotFoundError(`Portfolio with ID ${portfolioId} not found`);
        }
        portfolio.rename(updateData.name);
        const updatedPortfolio = await this.portfolioRepository.update(portfolio);
        return PortfolioResponseDto.fromEntity(updatedPortfolio);
    }
}