import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Dashboard from '../Dashboard';
import { logout, refreshUser } from '../../features/auth/slice';

// Mock các dependencies
jest.mock('../../i18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'dashboard.title': 'Welcome',
        'dashboard.logout': 'Logout',
        'dashboard.welcome': 'Welcome to the app',
        'dashboard.loggedInAs': 'Logged in as',
        'dashboard.profile.title': 'Profile',
        'dashboard.profile.username': 'Username',
        'dashboard.profile.name': 'Name',
        'dashboard.profile.email': 'Email',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('../../i18n/components/LanguageSwitcher', () => {
  return function MockLanguageSwitcher() {
    return <div data-testid="language-switcher">Language Switcher</div>;
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Types
interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface AppState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
  };
}

// Setup mock store
const mockStore = configureStore<AppState>();

describe('Dashboard', () => {
  let store = mockStore({
    auth: {
      user: null,
      isAuthenticated: false,
    },
  });

  const mockUser: User = {
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
  };

  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    store = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
      },
    });
  });

  it('should show loading state when user is not available', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Đang tải thông tin người dùng...')).toBeInTheDocument();
    expect(screen.getByText('Đang khôi phục phiên đăng nhập của bạn.')).toBeInTheDocument();
  });

  it('should attempt to refresh user when token exists but no user data', () => {
    localStorage.setItem('token', 'fake-token');
    store = mockStore({
      auth: {
        user: null,
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    const actions = store.getActions();
    expect(actions).toContainEqual(refreshUser());
  });

  it('should display user information when loaded', () => {
    store = mockStore({
      auth: {
        user: mockUser,
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('should handle logout correctly', () => {
    store = mockStore({
      auth: {
        user: mockUser,
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    const actions = store.getActions();
    expect(actions).toContainEqual(logout());
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should navigate to todo page', () => {
    store = mockStore({
      auth: {
        user: mockUser,
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Go to Todo App' }));
    expect(mockNavigate).toHaveBeenCalledWith('/todo');
  });

  it('should render language switcher', () => {
    store = mockStore({
      auth: {
        user: mockUser,
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('should display translated content', () => {
    store = mockStore({
      auth: {
        user: mockUser,
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logged in as')).toBeInTheDocument();
  });
});
