import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox, { CheckboxVariant, CheckboxSize } from './Checkbox';

describe('Checkbox Component', () => {
  // Test rendering
  it('renders checkbox with label', () => {
    render(<Checkbox label="Test Checkbox" />);
    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument();
  });

  // Test variants
  const variants: CheckboxVariant[] = ['primary', 'secondary', 'success', 'danger', 'warning'];
  it.each(variants)('renders %s variant correctly', (variant) => {
    render(<Checkbox label="Test" variant={variant} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(
      variant === 'primary'
        ? 'text-blue-600'
        : variant === 'secondary'
        ? 'text-gray-600'
        : variant === 'success'
        ? 'text-green-600'
        : variant === 'danger'
        ? 'text-red-600'
        : variant === 'warning'
        ? 'text-yellow-600'
        : ''
    );
  });

  // Test sizes
  const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];
  it.each(sizes)('renders %s size correctly', (size) => {
    render(<Checkbox label="Test" size={size} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5');
  });

  // Test disabled state
  it('handles disabled state correctly', () => {
    render(<Checkbox label="Test" disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  // Test error state
  it('shows error message when invalid', () => {
    const errorMessage = 'This field is required';
    render(<Checkbox label="Test" isInvalid error={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  // Test description
  it('renders description text', () => {
    const description = 'This is a description';
    render(<Checkbox label="Test" description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  // Test click handling
  it('handles click events', async () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test" onChange={handleChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  // Test keyboard interaction
  it('responds to keyboard events', async () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" checked={false} onChange={handleChange} />);

    // Focus and press space
    await userEvent.tab(); // Focus the checkbox
    await userEvent.keyboard(' '); // Press space
    expect(handleChange).toHaveBeenCalled();
  });

  // Test controlled component behavior
  it('handles controlled component behavior correctly', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Test Checkbox" checked={true} onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  // Test ref forwarding
  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox label="Test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Test complex content
  it('renders complex label content', () => {
    const ComplexLabel = () => (
      <div>
        <span>Complex</span>
        <strong>Label</strong>
      </div>
    );
    render(<Checkbox label={<ComplexLabel />} />);
    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  // Test className props
  it('applies custom classNames', () => {
    render(<Checkbox label="Test" className="custom-input" wrapperClassName="custom-wrapper" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-input');
    expect(screen.getByRole('checkbox').parentElement?.parentElement?.parentElement).toHaveClass('custom-wrapper');
  });

  // Test accessibility
  it('maintains accessibility features', () => {
    const description = 'Helper text';
    render(<Checkbox label="Test" description={description} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-describedby');
    expect(document.getElementById(checkbox.getAttribute('aria-describedby') || '')).toHaveTextContent(description);
  });
});
