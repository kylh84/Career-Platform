import { AxiosHeaders, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Mock axios
jest.mock('axios', () => {
  const mockAxios = {
    create: jest.fn(() => mockAxiosInstance),
    defaults: {
      headers: {
        common: {},
      },
    },
  };
  return mockAxios;
});

// Create a mock axios instance with interceptors
const mockAxiosInstance = {
  interceptors: {
    request: {
      use: jest.fn(),
      handlers: [],
    },
    response: {
      use: jest.fn(),
      handlers: [],
    },
  },
  defaults: {
    headers: {
      common: {},
    },
  },
};

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('axios interceptors', () => {
  let requestInterceptor: {
    fulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    rejected: (error: unknown) => unknown;
  };
  let responseInterceptor: {
    fulfilled: (response: AxiosResponse) => AxiosResponse;
    rejected: (error: unknown) => unknown;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.clear();

    // Capture the interceptors when they are registered
    mockAxiosInstance.interceptors.request.use.mockImplementation((fulfilled, rejected) => {
      requestInterceptor = { fulfilled, rejected };
      return 1; // Return a number as interceptor ID
    });

    mockAxiosInstance.interceptors.response.use.mockImplementation((fulfilled, rejected) => {
      responseInterceptor = { fulfilled, rejected };
      return 2; // Return a number as interceptor ID
    });

    // Import the module to trigger the interceptor registration
    jest.isolateModules(() => {
      // Using import instead of require
      import('../axios');
    });
  });

  describe('request interceptor', () => {
    it('should add authorization header when token exists', () => {
      // Setup
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'test-token';
        return null;
      });

      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
        url: '/test',
        method: 'get',
      };

      // Execute
      const result = requestInterceptor.fulfilled(config);

      // Assert
      expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    it('should add timestamp to prevent caching', () => {
      // Setup
      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
        url: '/test',
        method: 'get',
      };

      // Execute
      const result = requestInterceptor.fulfilled(config);

      // Assert
      expect(result.url).toContain('/test?_t=');
    });

    it('should add CSRF token for non-GET requests', () => {
      // Setup
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'csrf_token') return 'test-csrf-token';
        return null;
      });

      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
        url: '/test',
        method: 'post',
      };

      // Execute
      const result = requestInterceptor.fulfilled(config);

      // Assert
      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token');
    });
  });

  describe('response interceptor', () => {
    it('should return response for successful requests', () => {
      // Setup
      const response: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        config: {
          url: '/test',
          headers: new AxiosHeaders(),
        },
        data: { message: 'success' },
        headers: {},
      };

      // Execute
      const result = responseInterceptor.fulfilled(response);

      // Assert
      expect(result).toBe(response);
    });

    it('should handle unauthorized errors (401)', () => {
      // Setup
      const error: AxiosError = {
        response: {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: {},
          config: {
            url: '/test',
            headers: new AxiosHeaders(),
          },
        },
        config: {
          url: '/test',
          headers: new AxiosHeaders(),
        },
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Unauthorized',
        toJSON: () => ({}),
      };

      // Execute & Assert
      expect(() => responseInterceptor.rejected(error)).toThrow();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});
