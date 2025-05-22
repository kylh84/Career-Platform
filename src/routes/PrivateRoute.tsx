import React, { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authService from '../services/authService';
import { setAuthenticated, refreshUser } from '../features/auth/slice';
import { useToast } from '../hooks/ui/toast';
import { RootState } from '../store/rootReducer';
import { useAppDispatch } from '../store';

// Simple loading screen component
const LoadingScreen: React.FC<{ message: string }> = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
      <p className="mt-3 text-gray-700">{message}</p>
    </div>
  </div>
);

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const authCheckComplete = useRef<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  // Get authentication state from Redux
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Memoize function to clear invalid session
  const clearInvalidSession = useCallback(() => {
    console.log('PrivateRoute - Clearing invalid session');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    dispatch(setAuthenticated(false));
    toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
  }, [dispatch, toast]);

  // Memoize the authentication verification function
  const verifyAuth = useCallback(async () => {
    if (authCheckComplete.current) {
      return; // Avoid running multiple times
    }

    console.log(`PrivateRoute - Verifying authentication for path: ${location.pathname}`);
    authCheckComplete.current = true;

    try {
      // If already authenticated in Redux store, use that
      if (isAuthenticated && user) {
        console.log('PrivateRoute - User already authenticated in Redux store');
        setHasAccess(true);
        setLoading(false);
        return;
      }

      // Check local storage for token and validate it
      const isValid = await authService.isSessionValid();
      console.log('PrivateRoute - Session validity check result:', isValid);

      if (isValid) {
        // Get current user data
        const currentUser = authService.getCurrentUser();
        console.log('PrivateRoute - Current user from storage:', currentUser);

        if (currentUser) {
          // Update Redux store with user data from localStorage
          dispatch(refreshUser());
          dispatch(setAuthenticated(true));
          setHasAccess(true);
        } else {
          // No user data found but token is valid (unusual case)
          console.warn('PrivateRoute - Token valid but no user data found');
          clearInvalidSession();
          setHasAccess(false);
        }
      } else {
        // Token is invalid or expired
        console.log('PrivateRoute - Session invalid, clearing auth data');
        clearInvalidSession();
        setHasAccess(false);
      }
    } catch (error) {
      console.error('PrivateRoute - Error during auth verification:', error);
      clearInvalidSession();
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, user, location.pathname, dispatch, clearInvalidSession]);

  // Effect for initial auth check
  useEffect(() => {
    console.log('PrivateRoute - Running initial auth check');
    verifyAuth();
  }, [verifyAuth]);

  // Monitor auth state changes from Redux
  useEffect(() => {
    console.log('PrivateRoute - Auth state changed in Redux', { isAuthenticated, user });
    if (isAuthenticated && user && !loading) {
      setHasAccess(true);
    }
  }, [isAuthenticated, user, loading]);

  if (loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }
  if (!hasAccess) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default React.memo(PrivateRoute);
