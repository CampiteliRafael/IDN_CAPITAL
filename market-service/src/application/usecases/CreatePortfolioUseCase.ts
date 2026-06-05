import { Portfolio } from "../../domain/entities/Portfolio";
import { IPortfolioRepository } from "../../domain/repositories/IPortfolioRepository";
import { PortfolioAlreadyExistsError } from "../../domain/errors/index";
import { CreatePortfoliosDto, PortfolioResponseDto } from "../dtos/PortfolioDto";

export class CreatePortfolioUseCase {
    constructor(private readonly portfolioRepository: IPortfolioRepository) {}

    async execute(dto: CreatePortfoliosDto): Promise<PortfolioResponseDto> {
        const existing = await this.portfolioRepository.findAllByUserId(dto.userId)
        const nameExists = existing.some(p => p.name === dto.name);
        if (nameExists) {
            throw new PortfolioAlreadyExistsError(dto.name);
        }

        const portfolio = new Portfolio({
            id: crypto.randomUUID(),
            userId: dto.userId,
            name: dto.name,
            createdAt: new Date(),
            updatedAt: new Date(),
         });

         const created = await this.portfolioRepository.create(portfolio);
         return PortfolioResponseDto.fromEntity(created);
    }
}