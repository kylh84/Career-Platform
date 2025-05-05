import React, { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  children: ReactNode;
  title?: string | ReactNode;
  footer?: ReactNode;
  isFullWidth?: boolean;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  headerAction?: ReactNode;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({ children, title, footer, isFullWidth = false, variant = 'elevated', padding = 'md', headerAction, isLoading = false, className = '', ...props }) => {
  const variantClasses = {
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-gray-200',
    filled: 'bg-gray-50',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
  };

  const widthClass = isFullWidth ? 'w-full' : '';

  const cardClasses = ['rounded-lg overflow-hidden', variantClasses[variant], widthClass, 'relative', className].filter(Boolean).join(' ');

  const headerPadding = padding === 'none' ? 'p-4' : paddingClasses[padding];
  const bodyPadding = paddingClasses[padding];
  const footerPadding = padding === 'none' ? 'p-4' : paddingClasses[padding];

  return (
    <div className={cardClasses} {...props} aria-busy={isLoading}>
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center" role="status" aria-label="Loading">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" aria-hidden="true" />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {(title || headerAction) && (
        <div className={`flex items-center justify-between border-b border-gray-200 ${headerPadding}`}>
          {typeof title === 'string' ? <h3 className="text-lg font-medium text-gray-900">{title}</h3> : title}
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      <div className={bodyPadding}>{children}</div>

      {footer && <div className={`border-t border-gray-200 ${footerPadding}`}>{footer}</div>}
    </div>
  );
};

export default Card;
