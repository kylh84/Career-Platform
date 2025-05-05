import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TodoItem from './TodoItem';
import todoReducer from '../slice';
import { Todo } from '../../../types/todo';

// Mock todo item
const mockTodo: Todo = {
  id: '1',
  title: 'Test Todo',
  completed: false,
  createdAt: '2024-01-01T00:00:00.000Z',
};

// Create a mock store
const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// Wrapper component for providing store
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    // Check if todo title is rendered
    expect(screen.getByText('Test Todo')).toBeInTheDocument();

    // Check if checkbox is rendered and unchecked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // Check if edit and delete buttons are rendered
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();

    // Check if creation date is rendered
    expect(screen.getByText(/created:/i)).toBeInTheDocument();
  });

  test('toggles todo completion status', async () => {
    render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    // Check if the checkbox is checked
    expect(checkbox).toBeChecked();
  });

  test('enters edit mode and updates todo title', async () => {
    render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    // Click edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    // Check if input field appears
    const editInput = screen.getByRole('textbox');
    expect(editInput).toBeInTheDocument();
    expect(editInput).toHaveValue('Test Todo');

    // Update todo title
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Updated Todo');

    // Save changes
    const saveButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveButton);

    // Check if todo title is updated
    expect(screen.getByText('Updated Todo')).toBeInTheDocument();
  });

  test('cancels edit mode without saving changes', async () => {
    render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    // Change the input value
    const editInput = screen.getByRole('textbox');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Cancelled Update');

    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    // Check if original title is preserved
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.queryByText('Cancelled Update')).not.toBeInTheDocument();
  });

  test('handles empty input in edit mode', async () => {
    render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    // Enter edit mode
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Clear the input
    const editInput = screen.getByRole('textbox');
    await userEvent.clear(editInput);

    // Try to save empty value
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    // Check if original title is preserved
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  test('handles keyboard events in edit mode', async () => {
    render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    // Enter edit mode
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));
    const editInput = screen.getByRole('textbox');

    // Test Enter key to save
    await userEvent.type(editInput, 'Updated with Enter{enter}');
    expect(screen.getByText('Updated with Enter')).toBeInTheDocument();

    // Enter edit mode again
    await userEvent.click(screen.getByRole('button', { name: /edit/i }));

    // Test Escape key to cancel
    await userEvent.type(editInput, 'Cancelled with Escape{escape}');
    expect(screen.queryByText('Cancelled with Escape')).not.toBeInTheDocument();
  });

  test('deletes todo item', async () => {
    const { container } = render(<TodoItem todo={mockTodo} />, { wrapper: Wrapper });

    // Click delete button
    await userEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Check if the todo item is removed from the DOM
    expect(container.firstChild).toBeNull();
  });
});
