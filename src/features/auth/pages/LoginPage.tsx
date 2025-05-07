import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import LoginForm from '../components/LoginForm';
import { useToast } from '../../../hooks/useToast.hook';

interface LocationState {
  from?: {
    pathname: string;
  };
}

const LoginPage: React.FC = () => {
  console.log('Rendering LoginPage');
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const toast = useToast();

  // Lấy đường dẫn trước đó từ state (nếu có)
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/home';

  // Redirect if already authenticated
  useEffect(() => {
    console.log('LoginPage useEffect - isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      // Chuyển hướng đến trang trước đó nếu có, hoặc đến homepage
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  useEffect(() => {
    if (location.state?.signUpSuccess) {
      toast.success('Sign up successful! Please log in.');
      // Clear state to prevent duplicate toasts
      navigate(location.pathname, { replace: true });
    }
  }, [location, toast, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-6"></div>
          <div className="text-lg text-gray-700">Signing in...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main content  */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Login form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
