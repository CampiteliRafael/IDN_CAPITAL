import { DomainError } from "./DomainError";

export class PortfolioNotFoundError extends DomainError {
    constructor(portfolioId: string) {
        super(`Portfolio with ID ${portfolioId} not found.`);
    }
}