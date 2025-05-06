import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import authReducer from '../slice';
import { I18nProvider } from '../../../i18n';

// Mock the store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Wrapper component for providing necessary context
const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <I18nProvider defaultLocale="en">
        <BrowserRouter>{children}</BrowserRouter>
      </I18nProvider>
    </Provider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    // Clear any previous form submissions
    jest.clearAllMocks();
  });

  test('renders login form with all necessary fields', () => {
    render(<LoginForm />, { wrapper: Wrapper });

    // Check for form elements
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty form submission', async () => {
    render(<LoginForm />, { wrapper: Wrapper });

    // Submit empty form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('shows password strength indicator when typing password', async () => {
    render(<LoginForm />, { wrapper: Wrapper });

    const passwordInput = screen.getByLabelText(/password/i);

    // Type a weak password
    await userEvent.type(passwordInput, 'weak');
    expect(screen.getByText(/password strength/i)).toBeInTheDocument();

    // Type a strong password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongP@ssw0rd');
    expect(screen.getByText(/password strength/i)).toBeInTheDocument();
  });

  test('toggles password visibility', async () => {
    render(<LoginForm />, { wrapper: Wrapper });

    const passwordInput = screen.getByLabelText(/password/i);
    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle button
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click toggle button again
    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('remembers user preference for "Remember me"', async () => {
    render(<LoginForm />, { wrapper: Wrapper });

    const rememberMeCheckbox = screen.getByRole('checkbox', { name: /remember me/i });

    // Check the remember me checkbox
    await userEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();

    // Uncheck the remember me checkbox
    await userEvent.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });
});
