import { LoginSchema } from '../LoginDto.js';
import { ZodError } from 'zod';

describe('LoginSchema', () => {
  describe('successful validations', () => {
    it('should accept valid data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'senha123',
      };

      const result = LoginSchema.parse(validData);

      expect(result).toEqual(validData);
    });

    it('should accept password with minimum 6 characters', () => {
      const data = {
        email: 'test@example.com',
        password: '123456',
      };

      const result = LoginSchema.parse(data);

      expect(result.password).toBe('123456');
    });
  });

  describe('transformations', () => {
    it('should convert email to lowercase', () => {
      const data = {
        email: 'TEST@EXAMPLE.COM',
        password: 'senha123',
      };

      const result = LoginSchema.parse(data);

      expect(result.email).toBe('test@example.com');
    });

    it('should trim email', () => {
      const data = {
        email: '  test@example.com  ',
        password: 'senha123',
      };

      const result = LoginSchema.parse(data);

      expect(result.email).toBe('test@example.com');
    });
  });

  describe('validations that should fail', () => {
    it('should reject invalid email', () => {
      const invalidData = {
        email: 'emailinvalido',
        password: 'senha123',
      };

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);

      try {
        LoginSchema.parse(invalidData);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.issues[0].message).toContain('Invalid email');
        }
      }
    });

    it('should reject password shorter than 6 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '12345',
      };

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);

      try {
        LoginSchema.parse(invalidData);
      } catch (error) {
        if (error instanceof ZodError) {
          expect(error.issues[0].message).toContain('at least 6 characters');
        }
      }
    });

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        password: 'senha123',
      };

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject empty password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: '',
      };

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject missing email', () => {
      const invalidData = {
        password: 'senha123',
      };

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject missing password', () => {
      const invalidData = {
        email: 'test@example.com',
      };

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);
    });

    it('should reject completely empty data', () => {
      const invalidData = {};

      expect(() => LoginSchema.parse(invalidData)).toThrow(ZodError);
    });
  });
});
