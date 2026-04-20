import { InvalidTokenError } from '../../../domain/errors/InvalidTokenError.js';
import { TokenPayload } from '../interfaces/ITokenService.js';
import { JwtTokenService } from '../JwtTokenService.js';

describe('JwtTokenService', () => {
  let tokenService: JwtTokenService;
  const secret = 'supersecretkey';
  const expiresIn = '1h';
  beforeEach(() => {
    tokenService = new JwtTokenService(secret, expiresIn);
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', async () => {
      const payload = { userId: '123', email: 'user@example.com', role: 'USER' };
      const token = await tokenService.generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid JWT token', async () => {
      const payload: TokenPayload = { userId: '123', email: 'user@example.com', role: 'USER' };
      const token = await tokenService.generateToken(payload);
      const decoded = await tokenService.verifyToken(token);

      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });

    it('should throw an error for an invalid JWT token', async () => {
      const invalidToken = 'invalid.token.here';
      await expect(tokenService.verifyToken(invalidToken)).rejects.toThrow(InvalidTokenError);
    });

    it('should throw an error for an expired JWT token', async () => {
      const shortLivedTokenService = new JwtTokenService(secret, '1s');
      const payload: TokenPayload = { userId: '123', email: 'user@example.com', role: 'USER' };
      const token = await shortLivedTokenService.generateToken(payload);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await expect(shortLivedTokenService.verifyToken(token)).rejects.toThrow(InvalidTokenError);
    });
  });
});
