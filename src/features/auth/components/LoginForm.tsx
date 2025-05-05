import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { login, resetAuthState } from '../slice';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { useToast } from '../../../hooks/useToast.hook';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../../i18n';

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rememberMe, setRememberMe] = useLocalStorage('rememberMe', false);
  const [savedUsername, setSavedUsername] = useLocalStorage('savedUsername', '');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const toast = useToast();
  const { t } = useI18n();

  // Memoize ngôn ngữ hiện tại để tránh tính toán lại
  const isEnglish = useMemo(() => t('languageSwitcher.locale') === 'en', [t]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<LoginCredentials>({
    defaultValues: {
      username: savedUsername || '',
      password: '',
    },
    mode: 'onChange',
  });

  // Điền username đã lưu (nếu có)
  useEffect(() => {
    console.log('LoginForm mounted');
    if (savedUsername) {
      setValue('username', savedUsername);
    }
  }, [savedUsername, setValue]);

  // Hiển thị thông báo khi đăng nhập thành công và chuyển hướng
  useEffect(() => {
    // Tránh thực hiện effect này khi component mới mount
    if (!isSubmitted) return;

    if (isAuthenticated && user) {
      toast.success(`Welcome, ${user.firstName || user.username}!`);
      navigate('/home', { replace: true });
    }
  }, [isAuthenticated, user, navigate, toast, isSubmitted]);

  // Reset auth state khi unmount
  useEffect(() => {
    return () => {
      console.log('LoginForm unmounting - resetting auth state');
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Hiển thị thông báo lỗi
  useEffect(() => {
    if (error && isSubmitted) {
      toast.error(error);
    }
  }, [error, isSubmitted, toast]);

  // Theo dõi thay đổi mật khẩu để đánh giá độ mạnh
  const password = watch('password');
  const username = watch('username');

  // Sử dụng useMemo để tính toán độ mạnh mật khẩu
  const calculatePasswordStrength = useCallback((pass: string, user: string): number => {
    // Kiểm tra trường hợp tài khoản test
    if (user === 'emilys' && pass === 'emilyspass') {
      return 5; // Mạnh nhất cho tài khoản test
    }

    if (!pass) return 0;

    let score = 0;
    // Độ dài
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;

    // Độ phức tạp
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    return Math.min(score, 5);
  }, []);

  // Memoize độ mạnh mật khẩu để tránh tính toán lại khi render
  useEffect(() => {
    const strength = calculatePasswordStrength(password || '', username || '');
    setPasswordStrength(strength);
  }, [password, username, calculatePasswordStrength]);

  // Memoize hàm xử lý đăng nhập
  const onSubmit = useCallback(
    async (data: LoginCredentials) => {
      setIsSubmitted(true);
      console.log('LoginForm - Submitting credentials:', { username: data.username, passwordLength: data.password.length });

      // Lưu username nếu chọn "Ghi nhớ đăng nhập"
      if (rememberMe) {
        setSavedUsername(data.username);
      } else if (!rememberMe && savedUsername) {
        // Xóa username đã lưu nếu không chọn "Ghi nhớ đăng nhập"
        setSavedUsername('');
      }

      try {
        console.log('LoginForm - Dispatching login action');
        const result = await dispatch(login(data)).unwrap();
        console.log('LoginForm - Login successful, API response:', result);

        // Kiểm tra xem kết quả có token không
        if (!result || !result.token) {
          console.error('LoginForm - Login response missing token!', result);
          toast.error('Đăng nhập không thành công: Thiếu token xác thực');
          return;
        }

        // Đảm bảo thông tin phiên đã được lưu vào localStorage
        if (!localStorage.getItem('token')) {
          console.warn('LoginForm - Token not saved in localStorage after login!');
          localStorage.setItem('token', result.token);
          localStorage.setItem('login_timestamp', new Date().getTime().toString());
        }

        // Không cần redirects thủ công ở đây
        // React Router sẽ tự động xử lý chuyển hướng dựa trên state Redux trong useEffect
      } catch (error) {
        console.error('LoginForm - Login error:', error);
        // Lỗi đã được xử lý trong useEffect
      }
    },
    [dispatch, rememberMe, savedUsername, setSavedUsername, toast]
  );

  // Memoize hàm xử lý checkbox "Remember me"
  const handleRememberMeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.target.checked);
    },
    [setRememberMe]
  );

  // Chức năng hiển thị/ẩn mật khẩu
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  // Memoize các thành phần UI để tránh render lại không cần thiết
  const passwordStrengthIndicator = useMemo(() => {
    if (!password || errors.password) return null;

    return (
      <div className="mt-2">
        <p className="text-xs text-gray-600 mb-1">{t('auth.login.passwordStrength')}</p>
        <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${passwordStrength < 2 ? 'bg-red-500' : passwordStrength < 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${(passwordStrength / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }, [password, errors.password, passwordStrength, t]);

  // Memoize nút submit
  const submitButton = useMemo(
    () => (
      <button
        type="submit"
        className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
        bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? (isEnglish ? 'Signing in...' : 'Đang đăng nhập...') : isEnglish ? 'Sign In' : 'Đăng nhập'}
      </button>
    ),
    [loading, isEnglish]
  );

  // Memoize thông báo lỗi
  const errorMessage = useMemo(() => {
    if (!error) return null;

    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 animate-fadeIn">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }, [error]);

  return (
    <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 p-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 -mx-6 -mt-6 px-6 py-4 mb-6">
        <h2 className="text-2xl font-bold text-white">{t('auth.login.title')}</h2>
        <p className="text-blue-100 text-sm">{t('auth.login.subtitle')}</p>
      </div>

      {errorMessage}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.login.username')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
            </div>
            <input
              id="username"
              type="text"
              placeholder={t('auth.login.username')}
              className={`pl-10 block w-full rounded-md shadow-sm border ${
                errors.username ? 'border-red-500' : dirtyFields.username ? 'border-green-500' : 'border-gray-300'
              } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('username', {
                required: t('auth.validation.required', { field: t('auth.login.username') }),
                minLength: {
                  value: 3,
                  message: t('auth.validation.minLength', { field: t('auth.login.username'), length: '3' }),
                },
                maxLength: {
                  value: 20,
                  message: t('auth.validation.maxLength', { field: t('auth.login.username'), length: '20' }),
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message: t('auth.validation.pattern', { field: t('auth.login.username') }) || 'Tên đăng nhập chỉ được chứa chữ cái, số và các ký tự . _ -',
                },
              })}
              disabled={loading}
            />
          </div>
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.login.password')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder={t('auth.login.password')}
              className={`pl-10 block w-full rounded-md shadow-sm border ${
                errors.password ? 'border-red-500' : dirtyFields.password ? 'border-green-500' : 'border-gray-300'
              } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('password', {
                required: t('auth.validation.required', { field: t('auth.login.password') }),
                minLength: {
                  value: 6,
                  message: t('auth.validation.minLength', { field: t('auth.login.password'), length: '6' }),
                },
                maxLength: {
                  value: 50,
                  message: t('auth.validation.maxLength', { field: t('auth.login.password'), length: '50' }),
                },
              })}
              disabled={loading}
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7.043a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}

          {passwordStrengthIndicator}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              {t('auth.login.remember')}
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              {t('auth.login.forgot')}
            </a>
          </div>
        </div>

        {submitButton}
      </form>
    </div>
  );
};

export default React.memo(LoginForm);
