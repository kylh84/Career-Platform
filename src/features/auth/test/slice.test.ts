import { configureStore, EnhancedStore, AnyAction } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import authReducer, { login, logout, refreshUser, resetAuthState, setAuthenticated, setUser } from '../slice';
import authService from '../../../services/authService';
import { LoginCredentials, User, AuthState } from '../types';

jest.mock('../../../services/authService');

// Mock console methods
const originalConsole = { ...console };
beforeAll(() => {
  console.error = jest.fn();
  console.log = jest.fn();
});

afterAll(() => {
  console.error = originalConsole.error;
  console.log = originalConsole.log;
});

interface RootState {
  auth: AuthState;
}

type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

describe('auth slice', () => {
  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    gender: 'male',
    image: 'test.jpg',
    token: 'mock-token',
  };

  let store: EnhancedStore<RootState> & {
    dispatch: AppDispatch;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (authService.getCurrentUser as jest.Mock).mockReturnValue(null);
    (authService.isSessionValid as jest.Mock).mockReturnValue(false);

    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        },
      },
    });
  });

  describe('initial state', () => {
    it('should handle initial state with no user', () => {
      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle initial state with existing user', () => {
      (authService.getCurrentUser as jest.Mock).mockReturnValue(mockUser);
      (authService.isSessionValid as jest.Mock).mockReturnValue(true);

      store = configureStore({
        reducer: {
          auth: authReducer,
        },
      });

      const state = store.getState().auth;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle initial state with invalid session', () => {
      (authService.getCurrentUser as jest.Mock).mockReturnValue(mockUser);
      (authService.isSessionValid as jest.Mock).mockReturnValue(false);

      store = configureStore({
        reducer: {
          auth: authReducer,
        },
      });

      const state = store.getState().auth;
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('login thunk', () => {
    const credentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should handle successful login', async () => {
      (authService.login as jest.Mock).mockResolvedValue(mockUser);

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle login without token', async () => {
      const userWithoutToken = { ...mockUser, token: undefined };
      (authService.login as jest.Mock).mockResolvedValue(userWithoutToken);

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Login response missing token:', userWithoutToken);
    });

    it('should handle login failure with 401', async () => {
      const error = {
        response: {
          status: 401,
          data: { message: 'Invalid credentials' },
        },
      };
      (authService.login as jest.Mock).mockRejectedValue(error);

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe('Incorrect email or password');
    });

    it('should handle login failure with 400', async () => {
      const error = {
        response: {
          status: 400,
          data: { message: 'Invalid input' },
        },
      };
      (authService.login as jest.Mock).mockRejectedValue(error);

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.error).toBe('Invalid login information: Invalid input');
    });

    it('should handle login failure with 429', async () => {
      const error = {
        response: {
          status: 429,
          data: { message: 'Rate limit exceeded' },
        },
      };
      (authService.login as jest.Mock).mockRejectedValue(error);

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.error).toBe('Too many requests. Please try again later');
    });

    it('should handle login failure with network error', async () => {
      (authService.login as jest.Mock).mockRejectedValue(new Error('Network error'));

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.error).toBe('Network error');
    });

    it('should handle login failure with unknown error', async () => {
      (authService.login as jest.Mock).mockRejectedValue({});

      await store.dispatch(login(credentials));
      const state = store.getState().auth;

      expect(state.error).toBe('Unable to connect to the server. Please check your network and try again');
    });

    it('should handle loading state during login', () => {
      const promise = store.dispatch(login(credentials));
      const loadingState = store.getState().auth;

      expect(loadingState.isLoading).toBe(true);
      expect(loadingState.error).toBeNull();

      return promise; // Ensure the promise resolves
    });
  });

  describe('refreshUser thunk', () => {
    it('should handle successful user refresh', async () => {
      (authService.getCurrentUser as jest.Mock).mockReturnValue(mockUser);

      await store.dispatch(refreshUser());
      const state = store.getState().auth;

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should handle user refresh without token', async () => {
      const userWithoutToken = { ...mockUser, token: undefined };
      (authService.getCurrentUser as jest.Mock).mockReturnValue(userWithoutToken);

      await store.dispatch(refreshUser());
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(console.error).toHaveBeenCalledWith('Refresh user response invalid:', userWithoutToken);
    });

    it('should handle user refresh failure', async () => {
      (authService.getCurrentUser as jest.Mock).mockReturnValue(null);

      await store.dispatch(refreshUser());
      const state = store.getState().auth;

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(console.log).toHaveBeenCalledWith('Failed to refresh user data, authentication reset');
    });

    it('should handle user refresh with error', async () => {
      (authService.getCurrentUser as jest.Mock).mockImplementation(() => {
        throw new Error('Failed to get user');
      });

      await store.dispatch(refreshUser());
      const state = store.getState().auth;

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('logout thunk', () => {
    it('should handle logout', async () => {
      // Set initial authenticated state
      store.dispatch(setUser(mockUser));
      store.dispatch(setAuthenticated(true));

      await store.dispatch(logout());
      const state = store.getState().auth;

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
      expect(authService.logout).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('Auth state cleared after logout');
    });

    it('should handle logout when already logged out', async () => {
      await store.dispatch(logout());
      const state = store.getState().auth;

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBeNull();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('sync actions', () => {
    it('should handle resetAuthState', () => {
      store.dispatch(setUser(mockUser));
      store.dispatch(setAuthenticated(true));
      store.dispatch(resetAuthState());

      const state = store.getState().auth;
      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser); // User should remain unchanged
      expect(state.isAuthenticated).toBe(true); // Authentication should remain unchanged
    });

    it('should handle setAuthenticated', () => {
      store.dispatch(setAuthenticated(true));
      expect(store.getState().auth.isAuthenticated).toBe(true);

      store.dispatch(setAuthenticated(false));
      expect(store.getState().auth.isAuthenticated).toBe(false);
    });

    it('should handle setUser', () => {
      store.dispatch(setUser(mockUser));
      expect(store.getState().auth.user).toEqual(mockUser);

      store.dispatch(setUser(null));
      expect(store.getState().auth.user).toBeNull();
    });

    it('should handle multiple state updates', () => {
      store.dispatch(setUser(mockUser));
      store.dispatch(setAuthenticated(true));
      expect(store.getState().auth.user).toEqual(mockUser);
      expect(store.getState().auth.isAuthenticated).toBe(true);

      store.dispatch(resetAuthState());
      expect(store.getState().auth.error).toBeNull();
      expect(store.getState().auth.isLoading).toBe(false);

      store.dispatch(setUser(null));
      store.dispatch(setAuthenticated(false));
      expect(store.getState().auth.user).toBeNull();
      expect(store.getState().auth.isAuthenticated).toBe(false);
    });
  });
});
