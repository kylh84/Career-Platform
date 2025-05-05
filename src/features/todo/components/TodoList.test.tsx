import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoList from './TodoList';
import todoReducer from '../slice';

// Mock the initial state
const initialTodos = [
  { id: '1', title: 'Test Todo 1', completed: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Test Todo 2', completed: true, createdAt: new Date().toISOString() },
];

// Create a mock store
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
  preloadedState: {
    todo: {
      todos: initialTodos,
      isLoading: false,
      error: null,
    },
  },
});

// Wrapper component for providing store
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('TodoList', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    jest.clearAllMocks();
  });

  test('renders todo list with initial todos', () => {
    render(<TodoList />, { wrapper: Wrapper });

    // Check if todos are rendered
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('adds new todo', async () => {
    render(<TodoList />, { wrapper: Wrapper });

    // Get the input field and add button
    const input = screen.getByPlaceholderText(/add new todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Type new todo and submit
    await userEvent.type(input, 'New Test Todo');
    fireEvent.click(addButton);

    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
  });

  test('filters todos correctly', async () => {
    render(<TodoList />, { wrapper: Wrapper });

    // Get filter buttons
    const activeButton = screen.getByRole('button', { name: /active/i });
    const completedButton = screen.getByRole('button', { name: /completed/i });
    const allButton = screen.getByRole('button', { name: /all/i });

    // Test active filter
    await userEvent.click(activeButton);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Todo 2')).not.toBeInTheDocument();

    // Test completed filter
    await userEvent.click(completedButton);
    expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();

    // Test all filter
    await userEvent.click(allButton);
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  test('shows correct todo count', () => {
    render(<TodoList />, { wrapper: Wrapper });

    // Check if the counts are correct
    expect(screen.getByText(/1 active/i)).toBeInTheDocument();
    expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
  });

  test('prevents adding empty todo', async () => {
    render(<TodoList />, { wrapper: Wrapper });

    const addButton = screen.getByRole('button', { name: /add/i });
    const initialTodoCount = screen.getAllByRole('listitem').length;

    // Try to add empty todo
    fireEvent.click(addButton);

    // Check if todo count remains the same
    expect(screen.getAllByRole('listitem')).toHaveLength(initialTodoCount);
  });

  test('handles whitespace in new todo input', async () => {
    render(<TodoList />, { wrapper: Wrapper });

    const input = screen.getByPlaceholderText(/add new todo/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    // Type todo with whitespace
    await userEvent.type(input, '   Trimmed Todo   ');
    fireEvent.click(addButton);

    // Check if todo is added with trimmed text
    expect(screen.getByText('Trimmed Todo')).toBeInTheDocument();
  });
});
