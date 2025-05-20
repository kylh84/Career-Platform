import React, { forwardRef, useId } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label for the input */
  label?: React.ReactNode;
  /** Helper text below the input */
  helperText?: React.ReactNode;
  /** Size of the input */
  size?: InputSize;
  /** Visual style variant */
  variant?: InputVariant;
  /** Type of the input */
  type?: InputType;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
  /** Error message */
  error?: string;
  /** Whether the input is invalid */
  isInvalid?: boolean;
  /** Whether the input is full width */
  isFullWidth?: boolean;
  /** Additional className for the wrapper */
  wrapperClassName?: string;
}

/**
 * Input component with support for labels, icons, and error states
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      size = 'md',
      variant = 'primary',
      type = 'text',
      leftIcon,
      rightIcon,
      error,
      isInvalid = false,
      isFullWidth = false,
      disabled = false,
      className = '',
      wrapperClassName = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const id = providedId || uniqueId;

    // Base classes for the input
    const baseInputClasses = 'block rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-opacity-50 transition-all duration-200';

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
      withRightIcon: rightIcon ? 'pr-10' : '',
      fullWidth: isFullWidth ? 'w-full' : 'w-auto',
    };

    // Label size classes
    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const inputClasses = [
      baseInputClasses,
      sizeClasses[size],
      variantClasses[variant],
      stateClasses.disabled,
      stateClasses.error,
      stateClasses.withLeftIcon,
      stateClasses.withRightIcon,
      stateClasses.fullWidth,
      className,
    ].join(' ');

    return (
      <div className={`flex flex-col ${wrapperClassName}`}>
        {label && (
          <label htmlFor={id} className={`block mb-1 font-medium text-gray-700 ${labelSizeClasses[size]} ${disabled ? 'opacity-50' : ''}`}>
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">{leftIcon}</div>}
          <input
            id={id}
            ref={ref}
            type={type}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={isInvalid}
            aria-describedby={helperText || error ? `${id}-description` : undefined}
            {...props}
          />
          {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">{rightIcon}</div>}
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

Input.displayName = 'Input';

export default Input;
