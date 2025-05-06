import React, { useEffect, Suspense } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
const Home = React.lazy(() => import('../pages/Home'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const TodoPage = React.lazy(() => import('../pages/TodoPage'));
const ErrorPage = React.lazy(() => import('../pages/error-pages/404Error'));
const AccountSettings = React.lazy(() => import('../pages/account/AccountSettings'));
const Profile = React.lazy(() => import('../pages/account/Profile'));
const Subscription = React.lazy(() => import('../pages/account/Subscription'));
const Security = React.lazy(() => import('../pages/account/Security'));
import { useAppSelector } from '../store';
import PrivateRoute from './PrivateRoute';

const LoadingScreen = ({ message }: { message: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
      <p className="mt-3 text-gray-700">{message}</p>
    </div>
  </div>
);

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('Current route:', location.pathname);
    console.log('User authentication state:', isAuthenticated ? 'authenticated' : 'not authenticated');
  }, [location, isAuthenticated]);

  return (
    <Suspense fallback={<LoadingScreen message="Loading page..." />}>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* --- Protected Routes --- */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
        {/* Account and nested protected routes */}
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountSettings />
            </PrivateRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="security" element={<Security />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

        {/* --- Catch-all Route (404) --- */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
