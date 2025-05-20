import React, { forwardRef, useId } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label for the select */
  label?: React.ReactNode;
  /** Helper text below the select */
  helperText?: React.ReactNode;
  /** Size of the select */
  size?: SelectSize;
  /** Visual style variant */
  variant?: SelectVariant;
  /** Array of options */
  options: SelectOption[];
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Whether the select is invalid */
  isInvalid?: boolean;
  /** Whether the select is full width */
  isFullWidth?: boolean;
  /** Placeholder text (first option) */
  placeholder?: string;
  /** Additional className for the wrapper */
  wrapperClassName?: string;
}

/**
 * Select component with support for labels, options, and error states
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      size = 'md',
      variant = 'primary',
      options,
      leftIcon,
      error,
      isInvalid = false,
      isFullWidth = false,
      disabled = false,
      placeholder,
      className = '',
      wrapperClassName = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const id = providedId || uniqueId;

    // Base classes for the select
    const baseSelectClasses = 'block rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-opacity-50 transition-all duration-200 appearance-none pr-8';

    // Size classes
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    // Variant classes (colors)
    const variantClasses = {
      primary: 'focus:border-blue-500 focus:ring-blue-500',
      secondary: 'focus:border-gray-500 focus:ring-gray-500',
      success: 'focus:border-green-500 focus:ring-green-500',
      danger: 'focus:border-red-500 focus:ring-red-500',
      warning: 'focus:border-yellow-500 focus:ring-yellow-500',
    };

    // State classes
    const stateClasses = {
      disabled: disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
      error: isInvalid ? 'border-red-500 focus:ring-red-500' : '',
      withLeftIcon: leftIcon ? 'pl-10' : '',
      fullWidth: isFullWidth ? 'w-full' : 'w-auto',
    };

    // Label size classes
    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const selectClasses = [baseSelectClasses, sizeClasses[size], variantClasses[variant], stateClasses.disabled, stateClasses.error, stateClasses.withLeftIcon, stateClasses.fullWidth, className].join(
      ' '
    );

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        {label && (
          <label htmlFor={id} className={`block mb-1 font-medium text-gray-700 ${labelSizeClasses[size]} ${disabled ? 'opacity-50' : ''}`}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{leftIcon}</div>}
          <select id={id} ref={ref} disabled={disabled} className={selectClasses} aria-invalid={isInvalid} aria-describedby={helperText || error ? `${id}-description` : undefined} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {(helperText || error) && (
          <p id={`${id}-description`} className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
