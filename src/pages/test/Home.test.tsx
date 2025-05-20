import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../Home';
import { RootState } from '../../store/rootReducer';
import authService from '../../services/authService';
import { User, AuthState } from '../../features/auth/types';

// Mock authService
jest.mock('../../services/authService', () => ({
  logout: jest.fn(),
  getCurrentUser: jest.fn(() => null),
  isSessionValid: jest.fn(() => false),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// @ts-expect-error: redux-mock-store and redux-thunk type incompatibility
const mockStore = configureMockStore<Partial<RootState>>([thunk]);

describe('Home', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    mockNavigate.mockClear();
    (authService.logout as jest.Mock).mockClear();
    (authService.getCurrentUser as jest.Mock).mockClear();
    (authService.isSessionValid as jest.Mock).mockClear();

    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      },
    });
  });

  const renderHome = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders landing page content correctly', () => {
    renderHome();

    // Check for main content
    expect(screen.getByText('Advance Your Tech Career')).toBeInTheDocument();
    expect(screen.getByText('Leverage AI to optimize your CV, evaluate source code, get personalized learning paths, and receive career guidance.')).toBeInTheDocument();
    expect(screen.getByText('Get Started for Free')).toBeInTheDocument();

    // Check for features
    expect(screen.getByText('CV Optimization')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
    expect(screen.getByText('Learning Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Career Guidance')).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    renderHome();

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
  });

  it('shows login button when not authenticated', () => {
    renderHome();

    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(loginButton);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows logout button when authenticated and handles logout correctly', async () => {
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      gender: 'male',
      image: '',
      token: 'test-token',
    };

    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: mockUser,
        isLoading: false,
        error: null,
      } as AuthState,
    } as RootState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe('auth/logout/pending');
      expect(actions[1].type).toBe('auth/logout/fulfilled');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

  it('navigates to home when clicking on logo', () => {
    renderHome();

    const logo = screen.getByText('Career Platform');
    fireEvent.click(logo);
    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });

  it('navigates to signup page when clicking Get Started', () => {
    renderHome();

    const getStartedButton = screen.getByText('Get Started for Free');
    expect(getStartedButton).toBeInTheDocument();

    fireEvent.click(getStartedButton);
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
  });

  it('handles loading state correctly', () => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: true,
        error: null,
      } as AuthState,
    } as RootState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    // Add assertions for loading state if there's loading UI
  });

  it('handles error state correctly', () => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: 'Authentication error',
      } as AuthState,
    } as RootState);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    // Add assertions for error state if there's error UI
  });
});
