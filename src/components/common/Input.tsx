import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isFullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, helperText, error, leftIcon, rightIcon, isFullWidth = false, className = '', id, ...props }, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  const baseInputClasses = [
    'block px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm',
    error ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    leftIcon ? 'pl-10' : '',
    rightIcon ? 'pr-10' : '',
    isFullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`${isFullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{leftIcon}</div>}

        <input ref={ref} id={inputId} className={baseInputClasses} aria-invalid={!!error} aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined} {...props} />

        {rightIcon && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{rightIcon}</div>}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500" id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
