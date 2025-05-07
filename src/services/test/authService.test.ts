import authService from '../authService';
import { User } from '../../features/auth/types';

// Define mock storage interface
interface MockStorage {
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
  clear: jest.Mock;
}

// Create mock storage objects with proper type assertions
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
} as MockStorage;

const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
} as MockStorage;

// Mock window.location
const mockLocation = {
  href: '',
};

// Mock global objects
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
  writable: true,
});

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('authService', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with mock user', async () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Male',
        image: 'https://robohash.org/testuser.png',
        token: 'mock-token-123',
      };

      const result = await authService.login({ email: 'test@example.com', password: 'test123' });

      expect(result).toEqual(mockUser);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
      expect(window.localStorage.setItem).toHaveBeenCalledWith('token', mockUser.token);
    });

    it('should handle login failure', async () => {
      await expect(authService.login({ email: 'invalid@example.com', password: 'wrongpass' })).rejects.toThrow('Incorrect email or password');
      expect(window.localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should clear auth data and redirect to login page', () => {
      authService.logout();

      expect(window.localStorage.removeItem).toHaveBeenCalledWith('user');
      expect(window.sessionStorage.removeItem).toHaveBeenCalledWith('token');
      expect(window.location.href).toBe('/login');
    });
  });

  describe('getCurrentUser', () => {
    it('should return null if not logged in', () => {
      (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

      const result = authService.getCurrentUser();

      expect(result).toBeNull();
    });

    it('should return cached user if logged in', () => {
      const mockUser: User = {
        id: 1,
        username: 'emilys',
        email: 'emily@example.com',
        firstName: 'Emily',
        lastName: 'Smith',
        gender: 'female',
        image: 'https://example.com/image.jpg',
        token: 'mock-token',
      };

      (window.localStorage.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(mockUser));

      const result = authService.getCurrentUser();

      expect(result).toEqual(mockUser);
    });
  });

  describe('isSessionValid', () => {
    it('should return false if no token', () => {
      (window.sessionStorage.getItem as jest.Mock).mockReturnValueOnce(null);

      const result = authService.isSessionValid();

      expect(result).toBe(false);
    });

    it('should return true if token exists', () => {
      (window.sessionStorage.getItem as jest.Mock).mockReturnValueOnce('valid-token');

      const result = authService.isSessionValid();

      expect(result).toBe(true);
    });
  });
});
