import React from 'react';
import { render, screen } from '@testing-library/react';
import Card, { CardVariant, CardSize } from './Card';

describe('Card Component', () => {
  // Test rendering
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  // Test variants
  const variants: CardVariant[] = ['elevated', 'outlined', 'filled'];
  it.each(variants)('renders %s variant correctly', (variant) => {
    render(<Card variant={variant}>Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(variant === 'elevated' ? 'bg-white shadow-md' : variant === 'outlined' ? 'bg-white border border-gray-200' : 'bg-gray-50');
  });

  // Test sizes
  const sizes: CardSize[] = ['sm', 'md', 'lg'];
  it.each(sizes)('renders %s size correctly', (size) => {
    render(<Card size={size}>Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass(size === 'sm' ? 'p-3' : size === 'md' ? 'p-4' : 'p-6');
  });

  // Test hoverable
  it('applies hover classes when hoverable is true', () => {
    render(<Card hoverable>Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('hover:transform', 'hover:-translate-y-1', 'hover:shadow-lg', 'cursor-pointer');
  });

  // Test full width
  it('applies full width class when isFullWidth is true', () => {
    render(<Card isFullWidth>Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('w-full');
  });

  // Test custom className
  it('applies custom className', () => {
    render(<Card className="custom-class">Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  // Test ref forwarding
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Card Content</Card>);
    expect(ref.current).toBe(screen.getByTestId('card'));
  });

  // Test default props
  it('uses default props correctly', () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('bg-white', 'shadow-md', 'p-4');
  });

  // Test complex content
  it('renders complex content correctly', () => {
    render(
      <Card>
        <h1>Title</h1>
        <p>Description</p>
        <button>Action</button>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
