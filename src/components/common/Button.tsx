import React, { ButtonHTMLAttributes, ReactNode, useCallback, KeyboardEvent } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = React.memo(
  ({ children, variant = 'primary', size = 'md', isLoading = false, isFullWidth = false, leftIcon, rightIcon, className = '', disabled, onClick, onKeyDown, ...props }) => {
    // Xử lý keyboard events
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        // Gọi onKeyDown handler được truyền vào nếu có
        onKeyDown?.(event);

        // Kích hoạt click khi nhấn Enter hoặc Space
        if ((event.key === 'Enter' || event.key === ' ') && !disabled && !isLoading) {
          event.preventDefault();
          const button = event.currentTarget;
          button.click();
        }
      },
      [onKeyDown, disabled, isLoading]
    );

    // Xử lý click với error handling
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!disabled && !isLoading) {
          try {
            onClick?.(event);
          } catch (error) {
            console.error('Error in button click handler:', error);
          }
        }
      },
      [onClick, disabled, isLoading]
    );

    // Cơ bản cho tất cả nút
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-all';

    // Classes theo variant
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

    // Classes theo kích thước
    const sizeClasses = {
      sm: 'text-xs px-2.5 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-6 py-3',
    };

    // Classes khi disabled hoặc loading
    const stateClasses = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer';

    // Classes khi full width
    const widthClass = isFullWidth ? 'w-full' : '';

    // Đảm bảo variant hợp lệ
    const safeVariant = variant in variantClasses ? variant : 'primary';

    const classes = [baseClasses, variantClasses[safeVariant], sizeClasses[size], stateClasses, widthClass, className].join(' ');

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
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-testid="loading-spinner">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
