import React, { Fragment, ReactNode, useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer, size = 'md', closeOnClickOutside = true, closeOnEsc = true }) => {
  // Xử lý ESC key
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

  // Xử lý kích thước modal
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  // Xử lý overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Fragment>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center overflow-y-auto" onClick={handleOverlayClick}>
        {/* Modal container */}
        <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} z-50 mx-auto my-8`}>
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              {typeof title === 'string' ? <h3 className="text-lg font-medium text-gray-900">{title}</h3> : title}
              <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Close</span>
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

export default Modal;
