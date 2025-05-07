import React, { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface MockUser {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<SignUpData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const password = watch('password');
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState<string | null>(null);

  // Password strength calculation (same as LoginForm)
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

  React.useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password || ''));
  }, [password, calculatePasswordStrength]);

  // Password strength indicator UI
  const passwordStrengthIndicator = useMemo(() => {
    if (!password) return null;
    let color = 'bg-red-500';
    let label = 'Weak';
    if (passwordStrength >= 4) {
      color = 'bg-green-500';
      label = 'Strong';
    } else if (passwordStrength >= 2) {
      color = 'bg-yellow-500';
      label = 'Medium';
    }
    return (
      <div className="mt-2">
        <p className="text-xs text-gray-600 mb-1">
          Password Strength: <span className={`font-semibold ${passwordStrength < 2 ? 'text-red-500' : passwordStrength < 4 ? 'text-yellow-500' : 'text-green-600'}`}>{label}</span>
        </p>
        <div className="bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${(passwordStrength / 5) * 100}%` }}></div>
        </div>
      </div>
    );
  }, [password, passwordStrength]);

  const onSubmit = useCallback(
    (data: SignUpData) => {
      setSignUpError(null);
      // Get users from localStorage
      const usersRaw = localStorage.getItem('mock_users');
      const users: MockUser[] = usersRaw ? JSON.parse(usersRaw) : [];
      // Check if email exists
      if (users.some((u: MockUser) => u.email === data.email)) {
        setSignUpError('Email is already registered. Please use another email.');
        return;
      }
      // Add new user
      users.push({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem('mock_users', JSON.stringify(users));
      // Redirect to login with success message
      setTimeout(() => {
        navigate('/login', { state: { signUpSuccess: true } });
      }, 500);
    },
    [navigate]
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 p-6 w-full">
            <div className="-mx-6 -mt-6 px-6 py-4 mb-6 text-center">
              <h2 className="text-4xl font-bold mb-2 text-black">Sign Up</h2>
              <p className="text-gray-500 text-lg">Create a new account</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              {signUpError && <div className="mb-4 text-red-600 text-sm font-medium">{signUpError}</div>}
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className={`pl-10 block w-full rounded-md shadow-sm border ${
                      errors.name ? 'border-red-500' : dirtyFields.name ? 'border-green-500' : 'border-gray-300'
                    } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 50, message: 'Name must be at most 50 characters' },
                    })}
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email address"
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
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              {/* Password */}
              <div className="mb-4">
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
                      minLength: { value: 6, message: 'Password must be at least 6 characters' },
                      maxLength: { value: 50, message: 'Password must be at most 50 characters' },
                      validate: (value) => {
                        if (calculatePasswordStrength(value) < 2) return 'Password is too weak';
                        return true;
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setPasswordVisible((v) => !v)}
                  >
                    {passwordVisible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                {passwordStrengthIndicator}
              </div>
              {/* Confirm Password */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={confirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm password"
                    className={`pl-10 block w-full rounded-md shadow-sm border ${
                      errors.confirmPassword ? 'border-red-500' : dirtyFields.confirmPassword ? 'border-green-500' : 'border-gray-300'
                    } bg-white text-gray-900 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === password || 'Passwords do not match',
                    })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    onClick={() => setConfirmPasswordVisible((v) => !v)}
                  >
                    {confirmPasswordVisible ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center mt-2 mb-2">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SignUpForm);
