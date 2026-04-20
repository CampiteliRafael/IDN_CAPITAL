import { BcryptHashService } from '../BcryptHashService.js';

describe('BcryptHashService', () => {
  let hashService: BcryptHashService;

  beforeEach(() => {
    hashService = new BcryptHashService(10);
  });

  describe('hashPassword', () => {
    it('should hash the password correctly', async () => {
      const password = 'mySecurePassword123';
      const hashedPassword = await hashService.hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it('should produce different hashes for the same password', async () => {
      const password = 'mySecurePassword123';
      const hashedPassword1 = await hashService.hashPassword(password);
      const hashedPassword2 = await hashService.hashPassword(password);

      expect(hashedPassword1).not.toBe(hashedPassword2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password and hash', async () => {
      const password = 'mySecurePassword123';
      const hashedPassword = await hashService.hashPassword(password);
      const isMatch = await hashService.comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching password and hash', async () => {
      const password = 'mySecurePassword123';
      const wrongPassword = 'wrongPassword456';
      const hashedPassword = await hashService.hashPassword(password);
      const isMatch = await hashService.comparePassword(wrongPassword, hashedPassword);
      expect(isMatch).toBe(false);
    });
  });
});
