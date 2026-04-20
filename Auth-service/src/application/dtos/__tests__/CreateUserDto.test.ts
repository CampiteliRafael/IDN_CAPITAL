import { CreateUserSchema } from '../CreateUserDto.js';
import { Role } from '../../../domain/entities/User.js';
import { ZodError } from 'zod';

describe('CreateUserSchema', () => {
  describe('successful validations', () => {
    it('should accept complete valid data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'senha123',
        name: 'Test User',
        role: Role.USER,
      };

      const result = CreateUserSchema.parse(validData);

      expect(result).toEqual(validData);
    });

    it('should use USER role as default if not provided', () => {
      const dataWithoutRole = {
        email: 'test@example.com',
        password: 'senha123',
        name: 'Test User',
      };

      const result = CreateUserSchema.parse(dataWithoutRole);

      expect(result.role).toBe(Role.USER);
    });

    it('should accept password with 6 characters (minimum)', () => {
      const data = {
        email: 'test@example.com',
        password: '123456',
        name: 'Test User',
      };

      const result = CreateUserSchema.parse(data);

      expect(result.password).toBe('123456');
    });

    it('should accept password with 100 characters (maximum)', () => {
      const data = {
        email: 'test@example.com',
        password: 'a'.repeat(100),
        name: 'Test User',
      };

      const result = CreateUserSchema.parse(data);

      expect(result.password.length).toBe(100);
    });
  });

  describe('transformations', () => {
    it('should convert email to lowercase', () => {
      const data = {
        email: 'TEST@EXAMPLE.COM',
        password: 'senha123',
        name: 'Test User',
      };

      const result = CreateUserSchema.parse(data);

      expect(result.email).toBe('test@example.com');
    });

    it('should trim email', () => {
      const data = {
        email: '  test@example.com  ',
        password: 'senha123',
        name: 'Test User',
      };

      const result = CreateUserSchema.parse(data);

      expect(result.email).toBe('test@example.com');
    });

    it('should trim name', () => {
      const data = {
        email: 'test@example.com',
        password: 'senha123',
        name: '  Test User  ',
      };

      const result = CreateUserSchema.parse(data);

      expect(result.name).toBe('Test User');
    });
  });

  describe('validations that should fail', () => {
    it('should reject invalid email', () => {
      const invalidData = {
        email: 'emailinvalido',
        password: 'senha123',
        name: 'Test User',
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject too short password (less than 6 characters)', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
        name: 'Test User',
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);

      try {
        CreateUserSchema.parse(invalidData);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.issues[0].message).toContain('at least 6 characters');
        }
      }
    });

    it('should reject too long password (more than 100 characters)', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'a'.repeat(101),
        name: 'Test User',
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);

      try {
        CreateUserSchema.parse(invalidData);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.issues[0].message).toContain('at most 100 characters');
        }
      }
    });

    it('should reject too short name (less than 2 characters)', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'senha123',
        name: 'A',
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject too long name (more than 100 characters)', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'senha123',
        name: 'a'.repeat(101),
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject invalid role', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'senha123',
        name: 'Test User',
        role: 'INVALID_ROLE',
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        email: 'test@example.com',
      };

      expect(() => CreateUserSchema.parse(invalidData)).toThrow(ZodError);
    });
  });
});
