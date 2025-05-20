import authService from '../authService';
import { LoginCredentials, User } from '../../features/auth/types';

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
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    global.localStorage = {
      getItem: (key: string) => mockLocalStorage[key] || null,
      setItem: (key: string, value: string) => {
        mockLocalStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockLocalStorage[key];
      },
      clear: () => {
        mockLocalStorage = {};
      },
      length: 0,
      key: () => null,
    };

    // Mock window.location
    const mockLocation = {
      href: window.location.href,
    };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    // Clear cache between tests
    jest.resetModules();
  });

  describe('login', () => {
    it('should login successfully with test@example.com', async () => {
      const credentials: LoginCredentials = {
        email: 'test@example.com',
        password: 'test123',
      };

      const user = await authService.login(credentials);

      expect(user).toBeDefined();
      expect(user?.email).toBe('test@example.com');
      expect(user?.token).toBe('mock-token-123');
      expect(localStorage.getItem('token')).toBe('mock-token-123');
      expect(localStorage.getItem('login_timestamp')).toBeDefined();
    });

    it('should login successfully with mock user', async () => {
      const mockUser = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      };
      localStorage.setItem('mock_users', JSON.stringify([mockUser]));

      const credentials: LoginCredentials = {
        email: 'john@example.com',
        password: 'password123',
      };

      const user = await authService.login(credentials);

      expect(user).toBeDefined();
      expect(user?.email).toBe('john@example.com');
      expect(user?.token).toBeDefined();
      expect(localStorage.getItem('token')).toBe(user?.token);
      expect(localStorage.getItem('login_timestamp')).toBeDefined();
    });

    it('should throw error for invalid credentials', async () => {
      const credentials: LoginCredentials = {
        email: 'invalid@example.com',
        password: 'wrongpass',
      };

      await expect(authService.login(credentials)).rejects.toThrow('Incorrect email or password');
    });
  });

  describe('logout', () => {
    it('should clear all auth data and redirect to login', () => {
      // Setup initial state
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('login_timestamp', Date.now().toString());
      localStorage.setItem('user_data', JSON.stringify({ name: 'Test User' }));

      authService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('login_timestamp')).toBeNull();
      expect(localStorage.getItem('user_data')).toBeNull();
      expect(window.location.href).toBe('/login');
    });
  });

  describe('getCurrentUser', () => {
    it('should return cached user if valid and recent', () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Male',
        image: 'test.jpg',
        token: 'test-token',
      };

      localStorage.setItem('token', 'test-token');
      localStorage.setItem('login_timestamp', Date.now().toString());
      localStorage.setItem('user_data', JSON.stringify(mockUser));

      const user = authService.getCurrentUser();
      expect(user).toBeDefined();
      expect(user?.email).toBe('test@example.com');
    });

    it('should return null if token is invalid', () => {
      localStorage.removeItem('token');
      const user = authService.getCurrentUser();
      expect(user).toBeNull();
    });

    it('should handle corrupted user data', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('login_timestamp', Date.now().toString());
      localStorage.setItem('user_data', 'invalid-json');

      const user = authService.getCurrentUser();
      expect(user).toBeDefined(); // Should create mock user
      expect(localStorage.getItem('user_data')).toBeDefined(); // Should save new mock user
    });
  });

  describe('isSessionValid', () => {
    it('should return true for valid session', () => {
      const timestamp = Date.now();
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('login_timestamp', timestamp.toString());

      const isValid = authService.isSessionValid();
      expect(isValid).toBe(true);
    });

    it('should return false for expired session', () => {
      const expiredTimestamp = Date.now() - 25 * 60 * 60 * 1000; // 25 hours ago
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('login_timestamp', expiredTimestamp.toString());

      const isValid = authService.isSessionValid();
      expect(isValid).toBe(false);
    });

    it('should return false when token is missing', () => {
      localStorage.removeItem('token');
      localStorage.setItem('login_timestamp', Date.now().toString());

      const isValid = authService.isSessionValid();
      expect(isValid).toBe(false);
    });

    it('should use cached result within cache duration', () => {
      localStorage.setItem('token', 'test-token');
      localStorage.setItem('login_timestamp', Date.now().toString());

      const firstCheck = authService.isSessionValid();
      localStorage.removeItem('token'); // Remove token
      const secondCheck = authService.isSessionValid(); // Should use cached result

      expect(firstCheck).toBe(true);
      expect(secondCheck).toBe(true); // Should still be true from cache
    });
  });
});
