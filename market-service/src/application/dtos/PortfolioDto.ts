import { z } from 'zod';
import { Portfolio } from '../../domain/entities/Portfolio';

export const CreatePortfoliosSchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    name: z.string().min(2, 'Portfolio name must have at least 2 characters').max(100, 'Portfolio name is too long'),
});

export const UpdatePortfoliosSchema = z.object({
    name: z.string().min(2, 'Portfolio name must have at least 2 characters').max(100, 'Portfolio name is too long'),
});

export type CreatePortfoliosDto = z.infer<typeof CreatePortfoliosSchema>;
export type UpdatePortfoliosDto = z.infer<typeof UpdatePortfoliosSchema>;

export class PortfolioResponseDto {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly name: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static fromEntity(portfolio: Portfolio): PortfolioResponseDto {
        return new PortfolioResponseDto(
            portfolio.id,
            portfolio.userId,
            portfolio.name,
            portfolio.createdAt,
            portfolio.updatedAt
        );
    }
}