import { LoginUserUseCase } from '../LoginUserUseCase.js';
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IHashService, ITokenService } from '../../services/index.js';
import { User, Role } from '../../../domain/entities/User.js';
import { InvalidCredentialsError, UserNotFoundError } from '../../../domain/errors/index.js';

describe('LoginUserUseCase', () => {
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockHashService: jest.Mocked<IHashService>;
  let mockTokenService: jest.Mocked<ITokenService>;
  let loginUserUseCase: LoginUserUseCase;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    };
    mockHashService = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };
    mockTokenService = {
      generateToken: jest.fn(),
      verifyToken: jest.fn(),
    };
    loginUserUseCase = new LoginUserUseCase(mockUserRepository, mockHashService, mockTokenService);
  });

  describe('execute', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const existingUser = new User({
      id: '1',
      email: loginData.email,
      password: 'hashedPassword',
      name: 'Test User',
      role: Role.USER,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    it('should login successfully with valid credentials', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);
      mockHashService.comparePassword.mockResolvedValue(true);
      mockTokenService.generateToken.mockResolvedValue('validToken');

      const result = await loginUserUseCase.execute(loginData);

      expect(result).toBeDefined();
      expect(result.user.email).toBe(loginData.email);
      expect(result.user.name).toBe('Test User');
      expect(result.token).toBe('validToken');
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginData.email);
      expect(mockHashService.comparePassword).toHaveBeenCalledWith(
        loginData.password,
        existingUser.password
      );
    });

    it('should throw UserNotFoundError if user does not exist', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(loginUserUseCase.execute(loginData)).rejects.toThrow(UserNotFoundError);
      expect(mockHashService.comparePassword).not.toHaveBeenCalled();
    });

    it('should throw InvalidCredentialsError if password is incorrect', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);
      mockHashService.comparePassword.mockResolvedValue(false);

      await expect(loginUserUseCase.execute(loginData)).rejects.toThrow(InvalidCredentialsError);
      expect(mockTokenService.generateToken).not.toHaveBeenCalled();
    });

    it('should throw error if user account is inactive', async () => {
      const inactiveUser = new User({
        id: '1',
        email: loginData.email,
        password: 'hashedPassword',
        name: 'Test User',
        role: Role.USER,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      mockUserRepository.findByEmail.mockResolvedValue(inactiveUser);
      mockHashService.comparePassword.mockResolvedValue(true);

      await expect(loginUserUseCase.execute(loginData)).rejects.toThrow(
        'User account is inactive.'
      );
    });

    it('should generate a token with correct payload', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);
      mockHashService.comparePassword.mockResolvedValue(true);
      mockTokenService.generateToken.mockResolvedValue('validToken');

      await loginUserUseCase.execute(loginData);

      expect(mockTokenService.generateToken).toHaveBeenCalledWith({
        userId: existingUser.id,
        email: existingUser.email,
        role: existingUser.role,
      });
    });
  });
});
