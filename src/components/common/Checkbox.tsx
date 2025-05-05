import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  checked?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, helperText, error, checked, className = '', id, ...props }, ref) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          checked={checked}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${error ? 'border-red-300' : ''} ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm">
        {label && (
          <label htmlFor={checkboxId} className="font-medium text-gray-700">
            {label}
          </label>
        )}

        {error && (
          <p className="text-red-600" id={`${checkboxId}-error`}>
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-gray-500" id={`${checkboxId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
