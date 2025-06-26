import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
// Remove thunk middleware as it cannot be resolved in this environment
const mockStore = configureMockStore<Partial<RootState>>([]);
import Home from '../Home';
import { RootState } from '../../../store/rootReducer';
import authService from '../../../services/authService';

// Mock logout to return a plain action
jest.mock('../../../features/auth/slice', () => ({
  ...jest.requireActual('../../../features/auth/slice'),
  logout: () => ({ type: 'auth/logout' }),
}));

// const mockNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockNavigate,
// }));

// Mock authService with jest.fn() for all methods
jest.mock('../../../services/authService', () => ({
  logout: jest.fn(),
  getCurrentUser: jest.fn(() => null),
  isSessionValid: jest.fn(() => false),
}));

// describe('Home', () => {
//   let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    mockNavigate.mockClear();
    // Only call mockClear if the function is a jest mock
    if (typeof authService.logout === 'function' && 'mockClear' in authService.logout) {
      (authService.logout as jest.Mock).mockClear();
    }
    if (typeof authService.getCurrentUser === 'function' && 'mockClear' in authService.getCurrentUser) {
      (authService.getCurrentUser as jest.Mock).mockClear();
    }
    if (typeof authService.isSessionValid === 'function' && 'mockClear' in authService.isSessionValid) {
      (authService.isSessionValid as jest.Mock).mockClear();
    }

//     store = mockStore({
//       auth: {
//         isAuthenticated: false,
//         user: null,
//         isLoading: false,
//         error: null,
//       },
//     });
//   });

//   const renderHome = () => {
//     return render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Home />
//         </BrowserRouter>
//       </Provider>
//     );
//   };

//   it('renders landing page content correctly', () => {
//     renderHome();

//     // Check for main content
//     expect(screen.getByText('Advance Your Tech Career')).toBeInTheDocument();
//     expect(screen.getByText('Leverage AI to optimize your CV, evaluate source code, get personalized learning paths, and receive career guidance.')).toBeInTheDocument();
//     expect(screen.getByText('Get Started for Free')).toBeInTheDocument();

//     // Check for features
//     expect(screen.getByText('CV Optimization')).toBeInTheDocument();
//     expect(screen.getByText('Code Review')).toBeInTheDocument();
//     expect(screen.getByText('Learning Roadmap')).toBeInTheDocument();
//     expect(screen.getByText('Career Guidance')).toBeInTheDocument();
//   });

//   it('renders navigation links correctly', () => {
//     renderHome();

    // There are multiple 'Home', 'Features', 'Pricing' links (desktop & mobile)
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks.length).toBeGreaterThan(0);
    const featuresLinks = screen.getAllByText('Features');
    expect(featuresLinks.length).toBeGreaterThan(0);
    const pricingLinks = screen.getAllByText('Pricing');
    expect(pricingLinks.length).toBeGreaterThan(0);
  });

//   it('shows login button when not authenticated', () => {
//     renderHome();

    // There are multiple Login buttons (desktop & mobile)
    const loginButtons = screen.getAllByRole('button', { name: 'Login' });
    expect(loginButtons.length).toBeGreaterThan(0);
    // Click the first visible login button
    fireEvent.click(loginButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows logout button when authenticated and handles logout correctly', async () => {
    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          id: 1,
          email: 'test@example.com',
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          gender: 'male',
          image: '',
          token: 'test-token',
        },
        isLoading: false,
        error: null,
      },
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const logoutButtons = screen.getAllByText('Logout');
    fireEvent.click(logoutButtons[0]);
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe('auth/logout');
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });

//   it('navigates to home when clicking on logo', () => {
//     renderHome();

//     const logo = screen.getByText('Career Platform');
//     fireEvent.click(logo);
//     expect(mockNavigate).toHaveBeenCalledWith('/home');
//   });

//   it('navigates to signup page when clicking Get Started', () => {
//     renderHome();

    const getStartedButton = screen.getByText('Get Started for Free');
    expect(getStartedButton).toBeInTheDocument();

    // Mock window.location.href
    const originalLocation = window.location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).location;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = { href: '' };

    fireEvent.click(getStartedButton);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((window as any).location.href).toBe('/signup');

    // Restore original location
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).location = originalLocation as unknown as Location;
  });

  it('handles loading state correctly', () => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: true,
        error: null,
      },
    });

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Home />
//         </BrowserRouter>
//       </Provider>
//     );

//     // Add assertions for loading state if there's loading UI
//   });

  it('handles error state correctly', () => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: 'Authentication error',
      },
    });

//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Home />
//         </BrowserRouter>
//       </Provider>
//     );

//     // Add assertions for error state if there's error UI
//   });
// });
