import React, { ButtonHTMLAttributes, ReactNode, useCallback, KeyboardEvent } from 'react';

/**
 * Button variants available in the application
 * @typedef {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'light'|'dark'|'link')} ButtonVariant
 */
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';

/**
 * Button sizes available in the application
 * @typedef {('sm'|'md'|'lg')} ButtonSize
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 * @interface ButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>}
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to be rendered inside the button */
  children: ReactNode;
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button should take up the full width of its container */
  isFullWidth?: boolean;
  /** Icon to be displayed on the left side of the button content */
  leftIcon?: ReactNode;
  /** Icon to be displayed on the right side of the button content */
  rightIcon?: ReactNode;
}

/**
 * Custom error class for button-related errors
 */
class ButtonError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ButtonError';
  }
}

/**
 * A reusable button component with various styles and states
 * @component
 * @param {ButtonProps} props - The props for the Button component
 * @returns {React.ReactElement} A button element
 * @throws {ButtonError} When an invalid variant is provided
 */
const Button: React.FC<ButtonProps> = React.memo(
  ({ children, variant = 'primary', size = 'md', isLoading = false, isFullWidth = false, leftIcon, rightIcon, className = '', disabled, onClick, onKeyDown, ...props }) => {
    // Validate variant
    if (!['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'].includes(variant)) {
      throw new ButtonError(`Invalid button variant: ${variant}`);
    }

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        try {
          // Call provided onKeyDown handler if exists
          onKeyDown?.(event);

          // Trigger click on Enter or Space
          if ((event.key === 'Enter' || event.key === ' ') && !disabled && !isLoading) {
            event.preventDefault();
            const button = event.currentTarget;
            button.click();
          }
        } catch (error) {
          console.error('Error in button keydown handler:', error);
          // Add error tracking service here if needed
        }
      },
      [onKeyDown, disabled, isLoading]
    );

    // Handle click with error handling
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !isLoading) {
          try {
            onClick?.(event);
          } catch (error) {
            console.error('Error in button click handler:', error);
            // Add error tracking service here if needed
          }
        }
      },
      [onClick, disabled, isLoading]
    );

    // Base classes for all buttons
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-all';

    // Classes based on variant
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      info: 'bg-cyan-500 hover:bg-cyan-600 text-white',
      light: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300',
      dark: 'bg-gray-800 hover:bg-gray-900 text-white',
      link: 'bg-transparent text-blue-600 hover:text-blue-800 hover:underline',
    };

    // Classes based on size
    const sizeClasses = {
      sm: 'text-xs px-2.5 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    };

    // Classes for disabled or loading state
    const stateClasses = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer';

    // Classes for full width
    const widthClass = isFullWidth ? 'w-full' : '';

    const classes = [baseClasses, variantClasses[variant], sizeClasses[size], stateClasses, widthClass, className].join(' ');

    return (
      <button
        className={classes}
        disabled={disabled || isLoading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-busy={isLoading}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-testid="loading-spinner" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}

        {!isLoading && leftIcon && (
          <span className="mr-2" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
