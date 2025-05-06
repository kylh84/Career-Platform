import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import LoginForm from '../components/LoginForm';
import { useI18n } from '../../../i18n';
import LanguageSwitcher from '../../../i18n/components/LanguageSwitcher';

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
  const { t } = useI18n();

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-6"></div>
          <div className="text-lg text-gray-700">Đang đăng nhập...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header với Language Switcher ở góc phải trên cùng */}
      <div className="fixed top-4 right-4 z-10">
        <LanguageSwitcher showLabel={true} />
      </div>

      {/* Main content  */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          {/* Login form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full">
            <LoginForm />
            <div className="text-center mt-4 mb-6">
              <p className="text-sm text-gray-600">
                {t('auth.login.noAccount')}{' '}
                <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  {t('auth.login.signup')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
