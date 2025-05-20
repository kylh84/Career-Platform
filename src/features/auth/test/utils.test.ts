import { validateToken } from '../utils';

describe('auth utils', () => {
  describe('validateToken', () => {
    beforeEach(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => 1625097600000); // 2021-07-01T00:00:00.000Z
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should return true for valid token', () => {
      const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI1MDk3NTAwLCJleHAiOjE2MjUxMDExMDB9.Q6J7-7yBJEtH5xzah6EDFfKIqV8iZeiUxAZc-5xtUzE';
      expect(validateToken(validToken)).toBe(true);
    });

    it('should return false for expired token', () => {
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI1MDk3NTAwLCJleHAiOjE2MjUwOTc1MDB9.Q6J7-7yBJEtH5xzah6EDFfKIqV8iZeiUxAZc-5xtUzE';
      expect(validateToken(expiredToken)).toBe(false);
    });

    it('should return false for invalid token format', () => {
      expect(validateToken('invalid.token.format')).toBe(false);
    });

    it('should return false for token with missing required fields', () => {
      const tokenWithoutSub = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjUwOTc1MDAsImV4cCI6MTYyNTEwMTEwMH0.Q6J7-7yBJEtH5xzah6EDFfKIqV8iZeiUxAZc-5xtUzE';
      expect(validateToken(tokenWithoutSub)).toBe(false);
    });

    it('should return false for null token', () => {
      expect(validateToken(null)).toBe(false);
    });

    it('should return false for empty token', () => {
      expect(validateToken('')).toBe(false);
    });

    it('should return false for token with invalid expiration', () => {
      const tokenWithInvalidExp = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjI1MDk3NTAwLCJleHAiOiJpbnZhbGlkIn0.Q6J7-7yBJEtH5xzah6EDFfKIqV8iZeiUxAZc-5xtUzE';
      expect(validateToken(tokenWithInvalidExp)).toBe(false);
    });

    it('should return false for token with invalid issued at', () => {
      const tokenWithInvalidIat = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWF0IjoiaW52YWxpZCIsImV4cCI6MTYyNTEwMTEwMH0.Q6J7-7yBJEtH5xzah6EDFfKIqV8iZeiUxAZc-5xtUzE';
      expect(validateToken(tokenWithInvalidIat)).toBe(false);
    });
  });
});
