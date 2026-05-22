import { DomainError } from './DomainError.js';

export class UserInactiveError extends DomainError {
  constructor() {
    super('User account is inactive.');
  }
}
