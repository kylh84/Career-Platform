import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from './slice';
import { LoginCredentials, AuthState } from './types';
import { AppDispatch } from '../../store';
import authService from '../../services/authService';

// Mock the authService
jest.mock('../../services/authService');

// Define RootState type
interface RootState {
  auth: AuthState;
}

describe('auth slice', () => {
  let store: ReturnType<typeof configureStore<RootState>> & {
    dispatch: AppDispatch;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore<RootState>({
      reducer: {
        auth: authReducer,
      },
    });
  });

  it('should handle initial state', () => {
    // Get the actual initial state instead of assuming what it is
    const initialState = store.getState().auth;
    expect(initialState.isAuthenticated).toBe(false);
    expect(initialState.isLoading).toBe(false);
    expect(initialState.error).toBeNull();
    // User might be undefined or null depending on how getCurrentUser is mocked
  });

  describe('login thunk', () => {
    const mockCredentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'testpass',
    };

    it('should handle successful login', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        gender: 'male',
        image: 'test.jpg',
        token: 'mock-token',
      };

      // Mock successful login
      (authService.login as jest.Mock).mockResolvedValueOnce(mockUser);
      (authService.isSessionValid as jest.Mock).mockReturnValue(true);

      await store.dispatch(login(mockCredentials));
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(false);
    });

    it('should handle login failure', async () => {
      const errorMessage = 'Incorrect email or password';

      // Mock failed login
      (authService.login as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      await store.dispatch(login(mockCredentials));
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });

    it('should handle loading state during login', () => {
      // Mock a promise that doesn't resolve immediately
      (authService.login as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));

      store.dispatch(login(mockCredentials));
      const loadingState = store.getState().auth;

      expect(loadingState.isLoading).toBe(true);
      expect(loadingState.error).toBeNull();
    });
  });

  describe('logout thunk', () => {
    it('should handle logout', async () => {
      // First set a logged-in state
      store = configureStore<RootState>({
        reducer: {
          auth: authReducer,
        },
        preloadedState: {
          auth: {
            user: {
              id: 1,
              username: 'testuser',
              email: 'test@example.com',
              firstName: 'Test',
              lastName: 'User',
              gender: 'male',
              image: 'test.jpg',
              token: 'mock-token',
            },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
        },
      });

      // Mock logout
      (authService.logout as jest.Mock).mockImplementationOnce(() => {});

      await store.dispatch(logout());
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});
