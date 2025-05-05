import { useContext } from 'react';
import { ToastContext } from './useToast.context';
import { ToastContextType } from './useToast.types';

export const useToast = () => {
  const context = useContext(ToastContext) as ToastContextType;
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return {
    success: context.success,
    error: context.error,
    info: context.info,
    warning: context.warning,
    dismiss: context.removeToast,
  };
};
