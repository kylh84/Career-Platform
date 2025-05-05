import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  describe('Basic Functionality', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-blue-600');
    });

    it('applies the correct variant classes', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-blue-600');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-gray-200');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-red-600');
    });

    it('applies the correct size classes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-xs');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-sm');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-base');
    });

    it('applies width class when isFullWidth is true', () => {
      render(<Button isFullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });
  });

  describe('Interactive Behavior', () => {
    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');

      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('handles onClick errors gracefully', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
      const errorHandler = jest.fn(() => {
        throw new Error('Test error');
      });

      render(<Button onClick={errorHandler}>Error Button</Button>);
      expect(() => {
        fireEvent.click(screen.getByRole('button'));
      }).not.toThrow();

      consoleError.mockRestore();
    });
  });

  describe('States', () => {
    it('displays loading state correctly', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-70');
      expect(button).toHaveAttribute('aria-busy', 'true');

      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('animate-spin');
    });

    it('handles disabled state correctly', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveAttribute('tabindex', '-1');
      expect(button).toBeDisabled();
    });
  });

  describe('Edge Cases', () => {
    it('handles invalid variant prop gracefully', () => {
      // @ts-expect-error Testing invalid variant
      render(<Button variant="invalid">Invalid</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
    });

    it('handles null/undefined children', () => {
      render(<Button>{null}</Button>);
      expect(screen.getByRole('button')).toBeEmptyDOMElement();
    });

    it('handles very long text content', () => {
      const longText = 'a'.repeat(100);
      render(<Button>{longText}</Button>);
      expect(screen.getByRole('button')).toHaveTextContent(longText);
    });
  });

  describe('Accessibility', () => {
    it('supports custom ARIA attributes', () => {
      render(<Button aria-label="Custom label">Click me</Button>);
      expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works with theme context', () => {
      const ThemeContext = React.createContext('light');
      const ThemedButton = () => {
        const theme = React.useContext(ThemeContext);
        return <Button className={theme}>Themed</Button>;
      };

      render(
        <ThemeContext.Provider value="dark">
          <ThemedButton />
        </ThemeContext.Provider>
      );

      expect(screen.getByRole('button')).toHaveClass('dark');
    });

    it('works within a form', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form role="form" onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );

      fireEvent.submit(screen.getByRole('form'));
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button Responsive Behavior', () => {
    test('uses size prop correctly', () => {
      const { rerender } = render(<Button size="sm">Responsive</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-xs');

      rerender(<Button size="md">Responsive</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-sm');

      rerender(<Button size="lg">Responsive</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-base');
    });
  });

  describe('Button Performance', () => {
    test('does not re-render unnecessarily', () => {
      const renderCount = jest.fn();
      const ButtonWithRenderCount = React.memo(() => {
        renderCount();
        return <Button>Click me</Button>;
      });

      const { rerender } = render(<ButtonWithRenderCount />);
      rerender(<ButtonWithRenderCount />);

      expect(renderCount).toHaveBeenCalledTimes(1);
    });

    // Test với large datasets
    test('handles large number of buttons efficiently', () => {
      const buttons = Array(1000)
        .fill(null)
        .map((_, i) => <Button key={i}>Button {i}</Button>);

      const { container } = render(<div>{buttons}</div>);
      expect(container.querySelectorAll('button')).toHaveLength(1000);
    });
  });

  describe('Button Keyboard Accessibility', () => {
    test('handles keyboard focus and blur', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');

      // Test focus
      button.focus();
      expect(button).toHaveFocus();

      // Test blur
      button.blur();
      expect(button).not.toHaveFocus();
    });
  });

  describe('Button Animation', () => {
    test('has hover classes', () => {
      render(<Button>Animated</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-blue-700');
    });
  });

  describe('Button Loading State', () => {
    test('shows loading spinner correctly', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');

      // Check loading spinner
      const spinner = button.querySelector('svg');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');

      // Check button is disabled
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });
});
