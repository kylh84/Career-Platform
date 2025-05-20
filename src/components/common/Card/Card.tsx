import React from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to be rendered inside the card */
  children: React.ReactNode;
  /** Visual style variant of the card */
  variant?: CardVariant;
  /** Size of the card padding */
  size?: CardSize;
  /** Whether to add hover effect */
  hoverable?: boolean;
  /** Whether the card should take full width */
  isFullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component for displaying content in a contained, styled container
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ variant = 'elevated', size = 'md', hoverable = false, isFullWidth = false, className = '', children, ...props }, ref) => {
  const variantClasses = {
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-gray-200',
    filled: 'bg-gray-50',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const hoverClasses = hoverable ? 'hover:transform hover:-translate-y-1 hover:shadow-lg cursor-pointer' : '';

  const widthClass = isFullWidth ? 'w-full' : '';

  return (
    <div ref={ref} data-testid="card" className={`rounded-lg transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses} ${widthClass} ${className}`} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
