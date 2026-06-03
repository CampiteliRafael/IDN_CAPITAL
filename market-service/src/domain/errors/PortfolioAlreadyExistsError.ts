import { DomainError } from './DomainError';

export class PortfolioAlreadyExistsError extends DomainError {
    constructor(portfolioName: string) {
        super(`A portfolio with the name "${portfolioName}" already exists for this user.`);
    }
}