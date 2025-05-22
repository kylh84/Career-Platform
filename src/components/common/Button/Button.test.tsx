import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button, { ButtonVariant, ButtonSize } from './Button';

describe('Button Component', () => {
  // Test rendering
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Test variants
  const variants: ButtonVariant[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'];
  it.each(variants)('renders %s variant correctly', (variant) => {
    render(<Button variant={variant}>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass(
      variant === 'primary'
        ? 'bg-blue-600'
        : variant === 'secondary'
        ? 'bg-gray-200'
        : variant === 'success'
        ? 'bg-green-600'
        : variant === 'danger'
        ? 'bg-red-600'
        : variant === 'warning'
        ? 'bg-yellow-500'
        : variant === 'info'
        ? 'bg-cyan-500'
        : variant === 'light'
        ? 'bg-gray-100'
        : variant === 'dark'
        ? 'bg-gray-800'
        : variant === 'link'
        ? 'bg-transparent'
        : ''
    );
  });

  // Test sizes
  const sizes: ButtonSize[] = ['sm', 'md', 'lg'];
  it.each(sizes)('renders %s size correctly', (size) => {
    render(<Button size={size}>Button</Button>);
    const button = screen.getByText('Button');
    expect(button).toHaveClass(`text-${size === 'sm' ? 'xs' : size === 'md' ? 'sm' : 'base'}`);
  });

  // Test loading state
  it('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Button</Button>);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  // Test disabled state
  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Button</Button>);
    expect(screen.getByText('Button')).toBeDisabled();
  });

  // Test click handler
  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Button</Button>);
    await userEvent.click(screen.getByText('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test keyboard interaction
  it('triggers click on Enter key', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Button</Button>);
    const button = screen.getByText('Button');
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test icons
  it('renders left and right icons correctly', () => {
    const leftIcon = <span data-testid="left-icon">←</span>;
    const rightIcon = <span data-testid="right-icon">→</span>;
    render(
      <Button leftIcon={leftIcon} rightIcon={rightIcon}>
        Button
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  // Test full width
  it('applies full width class when isFullWidth is true', () => {
    render(<Button isFullWidth>Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('w-full');
  });

  // Test error handling
  it('handles click errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('Test error');
    const handleClick = () => {
      throw error;
    };
    render(<Button onClick={handleClick}>Button</Button>);
    await userEvent.click(screen.getByText('Button'));
    expect(consoleSpy).toHaveBeenCalledWith('Error in button click handler:', error);
    consoleSpy.mockRestore();
  });

  // Test invalid variant error
  it('throws ButtonError for invalid variant', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    expect(() => {
      render(<Button variant={'invalid' as ButtonVariant}>Button</Button>);
    }).toThrow('Invalid button variant: invalid');
    consoleSpy.mockRestore();
  });
});
