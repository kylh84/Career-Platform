import { AxiosHeaders, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axiosInstance from '../axios';

// Mock axios
jest.mock('axios');

// Define types for interceptor handlers
type InterceptorHandler<T> = {
  fulfilled: (value: T) => T | Promise<T>;
  rejected: (error: unknown) => unknown;
};

// Define types for mocked interceptors
type MockedInterceptorManager<T> = {
  handlers: InterceptorHandler<T>[];
};

type MockedAxiosInstance = {
  interceptors: {
    request: MockedInterceptorManager<InternalAxiosRequestConfig>;
    response: MockedInterceptorManager<AxiosResponse>;
  };
};

// Mock axiosInstance
jest.mock('../axios', () => ({
  ...jest.requireActual('../axios'),
  default: {
    interceptors: {
      request: {
        handlers: [] as InterceptorHandler<InternalAxiosRequestConfig>[],
      },
      response: {
        handlers: [] as InterceptorHandler<AxiosResponse>[],
      },
    },
  },
}));

describe('axiosInstance', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Reset mock handlers
    (axiosInstance as unknown as MockedAxiosInstance).interceptors.request.handlers = [];
    (axiosInstance as unknown as MockedAxiosInstance).interceptors.response.handlers = [];
  });
  // Test case 1: Kiểm tra request interceptor thêm authorization header
  describe('request interceptor', () => {
    it('should add authorization header when token exists', async () => {
      localStorage.setItem('token', 'test-token');
      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
        url: '/test',
        method: 'get',
      };

      // Add mock handler
      (axiosInstance as unknown as MockedAxiosInstance).interceptors.request.handlers.push({
        fulfilled: (config: InternalAxiosRequestConfig) => {
          const headers = config.headers as AxiosHeaders;
          if (headers) {
            headers.set('Authorization', `Bearer test-token`);
          }
          return config;
        },
        rejected: (error: unknown) => error,
      });

      const result = await (axiosInstance as unknown as MockedAxiosInstance).interceptors.request.handlers[0].fulfilled(config);
      const resultHeaders = result.headers as AxiosHeaders;
      expect(resultHeaders.get('Authorization')).toBe('Bearer test-token');
    });
    // Test case 2: Kiểm tra request interceptor thêm timestamp
    it('should add timestamp to prevent caching', async () => {
      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders(),
        url: '/test',
        method: 'get',
      };

      // Add mock handler
      (axiosInstance as unknown as MockedAxiosInstance).interceptors.request.handlers.push({
        fulfilled: (config: InternalAxiosRequestConfig) => {
          if (config.url) {
            config.url += `?_t=${Date.now()}`;
          }
          return config;
        },
        rejected: (error: unknown) => error,
      });

      const result = await (axiosInstance as unknown as MockedAxiosInstance).interceptors.request.handlers[0].fulfilled(config);
      expect(result.url).toContain('_t=');
    });
  });
  // Test case 3: Kiểm tra response interceptor xử lý response thành công
  describe('response interceptor', () => {
    it('should handle successful response', async () => {
      const response: AxiosResponse = {
        status: 200,
        statusText: 'OK',
        config: {
          url: '/test',
          headers: new AxiosHeaders(),
        },
        data: { message: 'success' },
        headers: new AxiosHeaders(),
      };

      // Add mock handler
      (axiosInstance as unknown as MockedAxiosInstance).interceptors.response.handlers.push({
        fulfilled: (response: AxiosResponse) => response,
        rejected: (error: unknown) => error,
      });

      const result = await (axiosInstance as unknown as MockedAxiosInstance).interceptors.response.handlers[0].fulfilled(response);
      expect(result).toEqual(response);
    });
    // Test case 4: Kiểm tra response interceptor xử lý lỗi 401
    it('should handle 401 unauthorized response', async () => {
      const error: AxiosError = {
        response: {
          status: 401,
          statusText: 'Unauthorized',
          data: {},
          headers: new AxiosHeaders(),
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

      // Add mock handler
      (axiosInstance as unknown as MockedAxiosInstance).interceptors.response.handlers.push({
        fulfilled: (response: AxiosResponse) => response,
        rejected: (error: unknown) => {
          if (isAxiosError(error)) {
            localStorage.removeItem('token');
            return Promise.reject(error);
          }
          return error;
        },
      });

      await (axiosInstance as unknown as MockedAxiosInstance).interceptors.response.handlers[0].rejected(error);
      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });
});

// Helper function to check if error is AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError === true;
}
