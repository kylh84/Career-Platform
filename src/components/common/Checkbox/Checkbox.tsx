import React, { forwardRef, useId } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the checkbox */
  label?: React.ReactNode;
  /** Description text below the label */
  description?: React.ReactNode;
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** Visual style variant */
  variant?: CheckboxVariant;
  /** Error message */
  error?: string;
  /** Whether the checkbox is invalid */
  isInvalid?: boolean;
  /** Additional className for the wrapper */
  wrapperClassName?: string;
}

/**
 * Checkbox component with support for labels, descriptions, and error states
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, size = 'md', variant = 'primary', error, isInvalid = false, disabled = false, className = '', wrapperClassName = '', id: providedId, ...props }, ref) => {
    const uniqueId = useId();
    const id = providedId || uniqueId;

    // Base classes for the checkbox input
    const baseInputClasses = 'form-checkbox rounded transition-all duration-200 cursor-pointer';

    // Size classes
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    // Variant classes (colors)
    const variantClasses = {
      primary: 'text-blue-600 focus:ring-blue-500',
      secondary: 'text-gray-600 focus:ring-gray-500',
      success: 'text-green-600 focus:ring-green-500',
      danger: 'text-red-600 focus:ring-red-500',
      warning: 'text-yellow-600 focus:ring-yellow-500',
    };

    // State classes
    const stateClasses = {
      disabled: disabled ? 'opacity-50 cursor-not-allowed' : '',
      error: isInvalid ? 'border-red-500 focus:ring-red-500' : '',
    };

    // Label size classes
    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const inputClasses = [baseInputClasses, sizeClasses[size], variantClasses[variant], stateClasses.disabled, stateClasses.error, className].join(' ');

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        <label className={`inline-flex items-start ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id={id}
              ref={ref}
              disabled={disabled}
              className={inputClasses}
              aria-invalid={isInvalid}
              aria-describedby={description || error ? `${id}-description` : undefined}
              {...props}
            />
          </div>
          {(label || description) && (
            <div className="ml-2">
              {label && <span className={`${labelSizeClasses[size]} ${disabled ? 'text-gray-500' : 'text-gray-900'}`}>{label}</span>}
              {description && (
                <p id={`${id}-description`} className="mt-1 text-sm text-gray-500">
                  {description}
                </p>
              )}
            </div>
          )}
        </label>
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
