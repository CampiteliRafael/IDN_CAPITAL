import { IUserRepository } from '../../domain/repositories/IUserRepository.js';
import { UserNotFoundError, InvalidTokenError } from '../../domain/errors/index.js';
import { ITokenService } from '../services/interfaces/ITokenService.js';

interface GetCurrentUserInput {
  token?: string;
}

export class GetCurrentUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService
  ) {}

  async execute({ token }: GetCurrentUserInput) {
    if (!token) {
      throw new InvalidTokenError('Authentication token not provided');
    }

    const payload = await this.tokenService.verifyToken(token);
    const user = await this.userRepository.findById(payload.userId);

    if (!user) {
      throw new UserNotFoundError(token);
    }

    return user.toObject();
  }
}
