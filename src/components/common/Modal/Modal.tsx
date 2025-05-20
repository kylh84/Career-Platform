import React, { Fragment, ReactNode, useEffect } from 'react';

export interface ModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Function to call when the modal should close */
  onClose: () => void;
  /** Modal title - can be string or custom component */
  title?: string | ReactNode;
  /** Modal content */
  children: ReactNode;
  /** Modal footer content */
  footer?: ReactNode;
  /** Modal size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  /** Whether clicking outside the modal should close it */
  closeOnClickOutside?: boolean;
  /** Whether pressing ESC should close the modal */
  closeOnEsc?: boolean;
  /** Additional class name for the modal container */
  className?: string;
  /** Additional class name for the backdrop */
  backdropClassName?: string;
}

/**
 * Modal component for displaying content in a layer above the app.
 * Supports different sizes, custom headers, and various closing behaviors.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, size = 'md', closeOnClickOutside = true, closeOnEsc = true, className = '', backdropClassName = '' }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Restore scrolling when modal closes
    };
  }, [isOpen, onClose, closeOnEsc]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center overflow-y-auto ${backdropClassName}`}
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Modal container */}
        <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} z-50 mx-auto my-8 ${className}`} role="document">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {typeof title === 'string' ? (
                <h3 id="modal-title" className="text-lg font-medium text-gray-900">
                  {title}
                </h3>
              ) : (
                title
              )}
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Body */}
          <div className="p-4">{children}</div>

          {/* Footer */}
          {footer && <div className="p-4 border-t border-gray-200">{footer}</div>}
        </div>
      </div>
    </Fragment>
  );
};

Modal.displayName = 'Modal';

export default Modal;
