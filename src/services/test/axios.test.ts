import { AxiosError, AxiosRequestHeaders, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import axiosInstance from '../axios';

// Mock axios
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

jest.mock('axios', () => ({
  create: jest.fn(() => mockAxiosInstance),
  defaults: {
    headers: {
      common: {},
    },
  },
}));

interface MockLocalStorage {
  store: Record<string, string>;
  getItem: jest.Mock<string | null, [string]>;
  setItem: jest.Mock<void, [string, string]>;
  removeItem: jest.Mock<void, [string]>;
  clear: jest.Mock<void, []>;
}

// Mock localStorage
const mockLocalStorage: MockLocalStorage = {
  store: {},
  getItem: jest.fn((key: string): string | null => mockLocalStorage.store[key] || null),
  setItem: jest.fn((key: string, value: string): void => {
    mockLocalStorage.store[key] = value;
  }),
  removeItem: jest.fn((key: string): void => {
    delete mockLocalStorage.store[key];
  }),
  clear: jest.fn((): void => {
    mockLocalStorage.store = {};
  }),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

interface ErrorResponse {
  message: string;
}

describe('axios interceptors', () => {
  const mockRequestInterceptor = jest.fn((config: InternalAxiosRequestConfig) => config);
  const mockRequestErrorHandler = jest.fn((error: unknown) => Promise.reject(error));
  const mockResponseInterceptor = jest.fn((response: AxiosResponse) => response);
  const mockResponseErrorHandler = jest.fn((error: unknown) => Promise.reject(error));

  beforeEach(() => {
    jest.clearAllMocks();

    axiosInstance.interceptors.request.use(mockRequestInterceptor, mockRequestErrorHandler);

    axiosInstance.interceptors.response.use(mockResponseInterceptor, mockResponseErrorHandler);
  });

  describe('request interceptor', () => {
    it('should add authorization header when token exists', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'token') return 'test-token';
        return null;
      });

      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        url: '/test',
        method: 'get',
      };

      const result = mockRequestInterceptor(config);

      expect(result.headers.Authorization).toBe('Bearer test-token');
    });

    it('should not add authorization header when token does not exist', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        url: '/test',
        method: 'get',
      };

      const result = mockRequestInterceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });

    it('should add timestamp to prevent caching', () => {
      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        url: '/test',
        method: 'get',
      };

      const result = mockRequestInterceptor(config);

      expect(result.url).toMatch(/\/test\?_t=\d+/);
    });

    it('should append timestamp to existing query parameters', () => {
      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        url: '/test?param=value',
        method: 'get',
      };

      const result = mockRequestInterceptor(config);

      expect(result.url).toMatch(/\/test\?param=value&_t=\d+/);
    });

    it('should add CSRF token for non-GET requests', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'csrf_token') return 'test-csrf-token';
        return null;
      });

      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        url: '/test',
        method: 'post',
      };

      const result = mockRequestInterceptor(config);

      expect(result.headers['X-CSRF-Token']).toBe('test-csrf-token');
    });

    it('should not add CSRF token for GET requests', () => {
      mockLocalStorage.getItem.mockImplementation((key) => {
        if (key === 'csrf_token') return 'test-csrf-token';
        return null;
      });

      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        url: '/test',
        method: 'get',
      };

      const result = mockRequestInterceptor(config);

      expect(result.headers['X-CSRF-Token']).toBeUndefined();
    });

    it('should handle request errors', async () => {
      const error = new Error('Network error');
      await expect(mockRequestErrorHandler(error)).rejects.toThrow('Network error');
    });

    it('should handle request with missing URL', () => {
      const config: InternalAxiosRequestConfig = {
        headers: {} as AxiosRequestHeaders,
        method: 'get',
      };

      const result = mockRequestInterceptor(config);

      expect(result.url).toMatch(/\?_t=\d+/);
    });
  });

  describe('response interceptor', () => {
    it('should return response for successful requests', () => {
      const response: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        config: {
          url: '/test',
          headers: {} as AxiosRequestHeaders,
        },
        data: { message: 'success' },
        headers: {},
      };

      const result = mockResponseInterceptor(response);

      expect(result).toBe(response);
    });

    it('should handle unauthorized errors (401)', async () => {
      const error: AxiosError = {
        response: {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: {},
          config: {
            url: '/test',
            headers: {} as AxiosRequestHeaders,
          },
        },
        config: {
          url: '/test',
          headers: {} as AxiosRequestHeaders,
        },
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Unauthorized',
        toJSON: () => ({}),
      };

      try {
        await mockResponseErrorHandler(error);
        expect(true).toBe(false); // This should never execute
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toHaveProperty('message', 'Unauthorized');
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('token');
      }
    });

    it('should handle network errors', async () => {
      const error = new Error('Network error');
      try {
        await mockResponseErrorHandler(error);
        expect(true).toBe(false); // This should never execute
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toHaveProperty('message', 'Network error');
      }
    });

    it('should handle response with missing config', async () => {
      const error: AxiosError = {
        response: {
          status: 500,
          statusText: 'Internal Server Error',
          data: {},
          headers: {},
          config: {
            url: '/test',
            headers: {} as AxiosRequestHeaders,
          },
        },
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Internal Server Error',
        toJSON: () => ({}),
      };

      try {
        await mockResponseErrorHandler(error);
        expect(true).toBe(false); // This should never execute
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toHaveProperty('message', 'Internal Server Error');
      }
    });

    it('should handle response with custom error data', async () => {
      const error: AxiosError = {
        response: {
          status: 400,
          statusText: 'Bad Request',
          data: {
            message: 'Custom error message',
          },
          headers: {},
          config: {
            url: '/test',
            headers: {} as AxiosRequestHeaders,
          },
        },
        config: {
          url: '/test',
          headers: {} as AxiosRequestHeaders,
        },
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Bad Request',
        toJSON: () => ({}),
      };

      try {
        await mockResponseErrorHandler(error);
        // If we reach here, the interceptor didn't throw as expected
        throw new Error('Expected interceptor to throw');
      } catch (err) {
        if (err instanceof Error && 'response' in err) {
          const axiosError = err as AxiosError<ErrorResponse>;
          expect(axiosError.response?.data.message).toBe('Custom error message');
        } else {
          throw new Error('Expected an AxiosError');
        }
      }
    });
  });
});
