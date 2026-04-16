import { DomainError } from "./DomainError.js";

export class UserAlreadyExistsError extends DomainError {
    constructor(email: string) {
        super(`User with email ${email} already exists.`);
    }
}