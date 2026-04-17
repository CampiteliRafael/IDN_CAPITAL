import { IUserRepository } from '../../domain/repositories/index.js';
import { IHashService } from '../services/index.js';
import { User } from '../../domain/entities/User.js';
import { ITokenService, TokenPayload } from '../services/index.js';
import { CreateUserDto } from '../dtos/index.js';
import { UserAlreadyExistsError } from '../../domain/errors/index.js';
import { UserResponseDto } from '../dtos/index.js';

interface RegisterResponse {
  user: UserResponseDto;
  token: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: ITokenService
  ) {}

  async execute(data: CreateUserDto): Promise<RegisterResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new UserAlreadyExistsError(data.email);
    }

    const hashedPassword = await this.hashService.hashPassword(data.password);
    const user = new User({
      id: crypto.randomUUID(),
      email: data.email,
      password: hashedPassword,
      name: data.name,
      role: data.role,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedUser = await this.userRepository.create(user);

    const tokenPayload: TokenPayload = {
      userId: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    };
    const token = await this.tokenService.generateToken(tokenPayload);

    return {
      user: UserResponseDto.fromUser(savedUser),
      token,
    };
  }
}
