import { RegisterUserUseCase } from '../RegisterUserUseCase.js';
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import { IHashService, ITokenService } from '../../services/index.js';
import { User, Role } from '../../../domain/entities/User.js';
import { UserAlreadyExistsError } from '../../../domain/errors/UserAlreadyExistsError.js';

describe('RegisterUserUseCase', () => {
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockHashService: jest.Mocked<IHashService>;
  let mockTokenService: jest.Mocked<ITokenService>;
  let registerUserUseCase: RegisterUserUseCase;

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
    registerUserUseCase = new RegisterUserUseCase(
      mockUserRepository,
      mockHashService,
      mockTokenService
    );
  });

  describe('execute', () => {
    const validUserData = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      role: Role.USER,
    };

    it('should register a new user successfully', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockHashService.hashPassword.mockResolvedValue('hashedPassword');

      const createdUser = new User({
        id: '1',
        email: validUserData.email,
        password: 'hashedPassword',
        name: validUserData.name,
        role: validUserData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.create.mockResolvedValue(createdUser);
      mockTokenService.generateToken.mockResolvedValue('validToken');

      const result = await registerUserUseCase.execute(validUserData);

      expect(result).toBeDefined();
      expect(result.user.email).toBe(validUserData.email);
      expect(result.user.name).toBe(validUserData.name);
      expect(result.user.role).toBe(validUserData.role);
      expect(result.token).toBe('validToken');
    });

    it('should throw UserAlreadyExistsError if email is already registered', async () => {
      const existingUser = new User({
        id: '1',
        email: validUserData.email,
        password: 'hashedPassword',
        name: validUserData.name,
        role: validUserData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(registerUserUseCase.execute(validUserData)).rejects.toThrow(
        UserAlreadyExistsError
      );
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('should hash the password before saving', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockHashService.hashPassword.mockResolvedValue('hashedPassword');

      const createdUser = new User({
        id: '1',
        email: validUserData.email,
        password: 'hashedPassword',
        name: validUserData.name,
        role: validUserData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.create.mockResolvedValue(createdUser);
      mockTokenService.generateToken.mockResolvedValue('validToken');

      await registerUserUseCase.execute(validUserData);

      expect(mockHashService.hashPassword).toHaveBeenCalledWith(validUserData.password);

      const createCall = mockUserRepository.create.mock.calls[0][0];
      expect(createCall.password).toBe('hashedPassword');
    });

    it('should generate token with correct payload', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockHashService.hashPassword.mockResolvedValue('hashedPassword');

      const createdUser = new User({
        id: '1',
        email: validUserData.email,
        password: 'hashedPassword',
        name: validUserData.name,
        role: validUserData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.create.mockResolvedValue(createdUser);
      mockTokenService.generateToken.mockResolvedValue('validToken');

      await registerUserUseCase.execute(validUserData);

      expect(mockTokenService.generateToken).toHaveBeenCalledWith({
        userId: '1',
        email: validUserData.email,
        role: validUserData.role,
      });
    });
    it('should set isActive to true for new user', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockHashService.hashPassword.mockResolvedValue('hashedPassword');

      const createdUser = new User({
        id: '1',
        email: validUserData.email,
        password: 'hashedPassword',
        name: validUserData.name,
        role: validUserData.role,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockUserRepository.create.mockResolvedValue(createdUser);
      mockTokenService.generateToken.mockResolvedValue('validToken');

      await registerUserUseCase.execute(validUserData);

      const createCall = mockUserRepository.create.mock.calls[0][0];
      expect(createCall.isActive).toBe(true);
    });
  });
});
