import { IPortfolioRepository } from '../../domain/repositories/IPortfolioRepository';
import { Portfolio } from '../../domain/entities/Portfolio';
type PrismaInstance = typeof import('../database/prisma-client').prisma;

export class PrismaPortfolioRepository implements IPortfolioRepository {
    constructor(private readonly prisma: PrismaInstance) {}
    private toDomain(record: {
        id: string;
        userId: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }): Portfolio {
        return new Portfolio({
            id: record.id,
            userId: record.userId,
            name: record.name,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        });
    }

    async findById(id: string): Promise<Portfolio | null> {
        const record = await this.prisma.portfolio.findUnique({ where: { id } });
        return record ? this.toDomain(record) : null;
    }

    async findAllByUserId(userId: string): Promise<Portfolio[]> {
        const records = await this.prisma.portfolio.findMany({ where: { userId } });
        return records.map(r => this.toDomain(r));
    }

    async create(portfolio: Portfolio): Promise<Portfolio> {
        const data = portfolio.toObject();
        const record = await this.prisma.portfolio.create({ data });
        return this.toDomain(record);
    }

    async update(portfolio: Portfolio): Promise<Portfolio> {
        const { id, ...data } = portfolio.toObject();
        const record = await this.prisma.portfolio.update({
            where: { id },
            data,
        });
        return this.toDomain(record);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.portfolio.delete({ where: { id } });
    }
}