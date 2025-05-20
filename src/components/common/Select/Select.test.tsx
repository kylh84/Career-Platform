import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from './Select';
import { CiUser } from 'react-icons/ci';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
  { value: '4', label: 'Option 4' },
];

describe('Select', () => {
  it('renders correctly with default props', () => {
    render(<Select options={options} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('renders with a label', () => {
    render(<Select options={options} label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with a placeholder', () => {
    render(<Select options={options} placeholder="Select an option" />);
    const placeholderOption = screen.getByRole('option', { name: 'Select an option' });
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toBeDisabled();
  });

  it('renders with helper text', () => {
    render(<Select options={options} helperText="Helper text" />);
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(<Select options={options} isInvalid error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders with left icon', () => {
    render(<Select options={options} leftIcon={<CiUser data-testid="left-icon" />} />);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Select options={options} disabled />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeDisabled();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    const selectElement = screen.getByRole('combobox');

    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(handleChange).toHaveBeenCalled();
    expect(selectElement).toHaveValue('2');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Select options={options} size="sm" />);
    let selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('text-sm');

    rerender(<Select options={options} size="md" />);
    selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('text-base');

    rerender(<Select options={options} size="lg" />);
    selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('text-lg');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Select options={options} variant="primary" />);
    let selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('focus:ring-blue-500');

    rerender(<Select options={options} variant="danger" />);
    selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('focus:ring-red-500');
  });

  it('renders full width', () => {
    render(<Select options={options} isFullWidth />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveClass('w-full');
  });

  it('handles disabled options', () => {
    render(<Select options={options} />);
    const disabledOption = screen.getByRole('option', { name: 'Option 3' });
    expect(disabledOption).toBeDisabled();
  });
});
