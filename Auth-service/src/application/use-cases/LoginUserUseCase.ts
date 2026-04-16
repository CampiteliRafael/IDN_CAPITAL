import { IUserRepository } from "../../domain/repositories/index.js";
import { IHashService } from "../services/index.js";
import { UserResponseDto } from "../dtos/index.js";
import { ITokenService, TokenPayload } from "../services/index.js";
import { LoginDto } from "../dtos/index.js";
import { InvalidCredentialsError, UserNotFoundError } from "../../domain/errors/index.js";

interface LoginResponse {
    user: UserResponseDto;
    token: string;
}

export class LoginUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private hashService: IHashService,
        private tokenService: ITokenService
    ) {}

    async execute(data: LoginDto): Promise<LoginResponse> {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new UserNotFoundError(data.email);
        }

        const isPasswordValid = await this.hashService.comparePassword(data.password, user.password);
        if (!isPasswordValid) {
            throw new InvalidCredentialsError();
        }

        if(!user.isActive) {
            throw new Error('User account is inactive.');
        }

        const tokenPayload: TokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const token = await this.tokenService.generateToken(tokenPayload);
        return {
            user: UserResponseDto.fromUser(user),
            token,
        };
    }   
}