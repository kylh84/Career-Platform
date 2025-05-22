import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with a label', () => {
      render(<Input label="Username" />);
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input helperText="This is helper text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });
  });

  // Props Tests
  describe('Props', () => {
    it('applies different sizes correctly', () => {
      const { rerender } = render(<Input size="sm" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('px-2', 'py-1', 'text-sm');

      rerender(<Input size="md" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('px-3', 'py-2', 'text-base');

      rerender(<Input size="lg" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('px-4', 'py-3', 'text-lg');
    });

    it('applies different variants correctly', () => {
      const { rerender } = render(<Input variant="primary" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('focus:border-blue-500', 'focus:ring-blue-500');

      rerender(<Input variant="secondary" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('focus:border-gray-500', 'focus:ring-gray-500');

      rerender(<Input variant="success" data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('focus:border-green-500', 'focus:ring-green-500');
    });

    it('handles full width prop', () => {
      render(<Input isFullWidth data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('w-full');
    });

    it('handles disabled state', () => {
      render(<Input disabled data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('opacity-50', 'cursor-not-allowed', 'bg-gray-50');
    });
  });

  // Icon Tests
  describe('Icons', () => {
    it('renders with left icon', () => {
      render(<Input leftIcon={<span>🔍</span>} />);
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(<Input rightIcon={<span>✉️</span>} />);
      expect(screen.getByText('✉️')).toBeInTheDocument();
    });

    it('applies correct padding with icons', () => {
      render(<Input leftIcon={<span>🔍</span>} rightIcon={<span>✉️</span>} data-testid="input" />);
      const input = screen.getByTestId('input');
      expect(input).toHaveClass('pl-10', 'pr-10');
    });
  });

  // Error State Tests
  describe('Error States', () => {
    it('shows error message', () => {
      render(<Input error="This field is required" isInvalid />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styles when invalid', () => {
      render(<Input isInvalid data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveClass('border-red-500', 'focus:ring-red-500');
    });

    it('sets aria-invalid when invalid', () => {
      render(<Input isInvalid data-testid="input" />);
      expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    it('handles onChange events', async () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('test');
    });

    it('handles focus and blur events', () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();

      render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');

      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalled();

      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  // Input Types Tests
  describe('Input Types', () => {
    it('renders different input types correctly', () => {
      const types = ['text', 'password', 'email', 'number', 'tel', 'url', 'search'] as const;

      types.forEach((type) => {
        const { rerender } = render(<Input type={type} data-testid="input" />);
        expect(screen.getByTestId('input')).toHaveAttribute('type', type);
        rerender(<></>);
      });
    });

    it('handles number type input correctly', async () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');

      await userEvent.type(input, '123');
      expect(input).toHaveValue(123);
    });

    it('masks password type input', () => {
      render(<Input type="password" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    it('associates label with input using htmlFor', () => {
      render(<Input label="Username" />);
      const input = screen.getByLabelText('Username');
      const label = screen.getByText('Username') as HTMLLabelElement;
      expect(input.id).toBe(label.htmlFor);
    });

    it('sets aria-describedby for helper text', () => {
      render(<Input helperText="Helper text" />);
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Helper text');
      expect(input.getAttribute('aria-describedby')).toBe(helperText.id);
    });

    it('sets aria-describedby for error message', () => {
      render(<Input error="Error message" isInvalid />);
      const input = screen.getByRole('textbox');
      const errorMessage = screen.getByText('Error message');
      expect(input.getAttribute('aria-describedby')).toBe(errorMessage.id);
    });
  });
});
