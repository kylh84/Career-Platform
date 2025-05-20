import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '../../../hooks/useToast';
import LoginForm from './LoginForm';
import store from '../../../store';

const renderLoginForm = () => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <ToastProvider>
          <LoginForm />
        </ToastProvider>
      </BrowserRouter>
    </Provider>
  );
};

describe('LoginForm', () => {
  beforeEach(() => {
    // Clear any previous form submissions
    jest.clearAllMocks();
  });

  test('renders login form with all necessary fields', () => {
    renderLoginForm();

    // Check for form elements
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText('Password', { selector: 'input[type="password"]' });
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(loginButton).toBeInTheDocument();
  });

  test('shows validation errors for empty form submission', async () => {
    renderLoginForm();

    // Submit empty form
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    // Check for validation messages
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('shows password strength indicator when typing password', async () => {
    renderLoginForm();

    const passwordInput = screen.getByLabelText('Password', { selector: 'input[type="password"]' });

    // Type a weak password
    await userEvent.type(passwordInput, 'weak');
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();

    // Type a strong password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'StrongP@ssw0rd');
    expect(passwordInput).toHaveValue('StrongP@ssw0rd');
  });

  test('toggles password visibility', async () => {
    renderLoginForm();

    const passwordInput = screen.getByLabelText('Password', { selector: 'input[type="password"]' });
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
});
