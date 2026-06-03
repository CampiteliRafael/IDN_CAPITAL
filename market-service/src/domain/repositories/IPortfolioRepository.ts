import { Portfolio } from "../entities/Portfolio";

export interface IPortfolioRepository {
    findById(portfolioId: string): Promise<Portfolio | null>;
    findAllByUserId(userId: string): Promise<Portfolio[]>;
    create(portfolio: Portfolio): Promise<Portfolio>;
    update(portfolio: Portfolio): Promise<Portfolio>;
    delete(portfolioId: string): Promise<void>;
}