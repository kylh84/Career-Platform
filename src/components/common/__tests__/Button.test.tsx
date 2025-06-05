import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button Component', () => {
  // Test rendering
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // Test variants
  it.each(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'])(
    'renders %s variant correctly',
    (variant) => {
      render(<Button variant={variant as any}>Button</Button>);
      const button = screen.getByText('Button');
      expect(button).toHaveClass(`bg-${variant === 'primary' ? 'blue' : variant === 'secondary' ? 'gray' : variant}-`);
    }
  );

  // Test sizes
  it.each(['sm', 'md', 'lg'])('renders %s size correctly', (size) => {
    render(<Button size={size as any}>Button</Button>);
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
}); 