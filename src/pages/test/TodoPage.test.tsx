import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import TodoPage from '../TodoPage';
import { logout } from '../../features/auth/slice';

// Mock các dependencies
jest.mock('../../features/todo/components/TodoList', () => {
  return function MockTodoList() {
    return <div data-testid="mock-todo-list">TodoList Component</div>;
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Types
interface AppState {
  auth?: {
    user: null;
    isAuthenticated: boolean;
  };
}

// Setup mock store
const mockStore = configureStore<AppState>();

describe('TodoPage', () => {
  let store = mockStore({});

  beforeEach(() => {
    store = mockStore({});
    mockNavigate.mockClear();
  });

  it('should render correct layout with title "Todo App"', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Todo App' })).toBeInTheDocument();
  });

  it('should display logout button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('should handle logout correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoPage />
        </BrowserRouter>
      </Provider>
    );

    // Click logout button
    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    // Verify logout action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual(logout());

    // Verify navigation to login page
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should render TodoList component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TodoPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('mock-todo-list')).toBeInTheDocument();
  });
});
