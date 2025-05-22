import { createContext } from 'react';
import { ToastContextType } from './useToast.types';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
