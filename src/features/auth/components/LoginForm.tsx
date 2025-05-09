import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { useAppSelector, useAppDispatch } from '../../../store';
import { useToast } from '../../../hooks/useToast.hook';
import { login, resetAuthState } from '../slice';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface LoginCredentials {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading: loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<LoginCredentials>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

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

  // Sử dụng useMemo để tính toán độ mạnh mật khẩu
  const calculatePasswordStrength = useCallback((pass: string): number => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(score, 5);
  }, []);

  // Memoize độ mạnh mật khẩu để tránh tính toán lại khi render
  useEffect(() => {
    const strength = calculatePasswordStrength(password || '');
    setPasswordStrength(strength);
  }, [password, calculatePasswordStrength]);

  // Memoize hàm xử lý đăng nhập
  const onSubmit = useCallback(
    async (data: LoginCredentials) => {
      setIsSubmitted(true);
      console.log('LoginForm - Submitting credentials:', { email: data.email, passwordLength: data.password.length });
      try {
        console.log('LoginForm - Dispatching login action');
        const result = await dispatch(login(data)).unwrap();
        console.log('LoginForm - Login successful, API response:', result);
        if (!result || !result.token) {
          console.error('LoginForm - Login response missing token!', result);
          toast.error('Login failed: Missing authentication token');
          return;
        }
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('login_timestamp', new Date().getTime().toString());
        }
      } catch (error) {
        console.error('LoginForm - Login error:', error);
      }
    },
    [dispatch, toast]
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
        <p className="text-xs text-gray-600 mb-1">Password Strength</p>
        <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${passwordStrength < 2 ? 'bg-red-500' : passwordStrength < 4 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${(passwordStrength / 5) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }, [password, errors.password, passwordStrength]);

  // Memoize nút submit
  const submitButton = useMemo(
    () => (
      <button
        type="submit"
        className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
        bg-blue-600 hover:bg-blue-700 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    ),
    [loading]
  );

  // Memoize thông báo lỗi
  const errorMessage = useMemo(() => {
    if (!error) return null;

    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 animate-fadeIn">
        <div className="flex">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-red-500" />
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
      <div className=" -mx-6 -mt-6 px-6 py-4 mb-6 text-center">
        <h2 className="text-4xl font-bold mb-2 text-black">Login</h2>
        <p className="text-gray-500 text-lg">Welcome back!</p>
      </div>

      {errorMessage}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className={`pl-10 block w-full rounded-md shadow-sm border ${
                errors.email ? 'border-red-500' : dirtyFields.email ? 'border-green-500' : 'border-gray-300'
              } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('email', {
                required: 'Email is required',
                validate: (value) => {
                  const trimmed = value.trim();
                  if (!trimmed) return 'Email is required';
                  if (/\s/.test(trimmed)) return 'Email must not contain spaces';
                  if (!trimmed.includes('@')) return 'Email must include @';
                  if (!trimmed.toLowerCase().endsWith('.com')) return 'Email must end with .com';
                  if (trimmed.startsWith('.') || trimmed.endsWith('.')) return 'Email must not start or end with a dot (.)';
                  if ((trimmed.match(/@/g) || []).length !== 1) return 'Email must contain exactly one @';
                  if (trimmed.length < 6) return 'Email must be at least 6 characters';
                  if (trimmed.length > 50) return 'Email must be at most 50 characters';
                  return true;
                },
              })}
              disabled={loading}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className={`pl-10 block w-full rounded-md shadow-sm border ${
                errors.password ? 'border-red-500' : dirtyFields.password ? 'border-green-500' : 'border-gray-300'
              } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Password must be at most 50 characters',
                },
              })}
              disabled={loading}
            />
            <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}

          {passwordStrengthIndicator}
        </div>
        <div className="flex justify-end mb-6">
          <a href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            Forgot password?
          </a>
        </div>
        {submitButton}
      </form>
      <hr className="my-6 border-t border-gray-200" />
      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">Don't have an account? </p>
        <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);
