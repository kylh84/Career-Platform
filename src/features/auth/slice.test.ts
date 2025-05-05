import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from './slice';
import { LoginCredentials, AuthState } from './types';
import { AppDispatch } from '../../store';

// Define RootState type
interface RootState {
  auth: AuthState;
}

describe('auth slice', () => {
  let store: ReturnType<typeof configureStore<RootState>> & {
    dispatch: AppDispatch;
  };

  beforeEach(() => {
    store = configureStore<RootState>({
      reducer: {
        auth: authReducer,
      },
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().auth).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  describe('login thunk', () => {
    const mockCredentials: LoginCredentials = {
      username: 'testuser',
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

      // Mock successful API call
      jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUser),
        } as Response)
      );

      await store.dispatch(login(mockCredentials));
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(false);
    });

    it('should handle login failure', async () => {
      const errorMessage = 'Invalid credentials';

      // Mock failed API call
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

      await store.dispatch(login(mockCredentials));
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBe(errorMessage);
      expect(state.isLoading).toBe(false);
    });

    it('should handle loading state during login', () => {
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

      await store.dispatch(logout());
      const state = store.getState().auth;

      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});
