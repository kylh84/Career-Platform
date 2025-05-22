import React, { useEffect, Suspense } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import SignUpForm from '../features/auth/components/SignUpForm';
import PrivateRoute from './PrivateRoute';
import { useAppSelector } from '../store';

// Lazy load public pages
const Home = React.lazy(() => import('../pages/home/Home'));
const ErrorPage = React.lazy(() => import('../pages/error-pages/404Error'));

// Lazy load dashboard and account pages
const DashboardLayout = React.lazy(() => import('../pages/dashboard/DashboardLayout'));
const DashboardHome = React.lazy(() => import('../pages/dashboard/DashboardHome'));
const CVOptimizationPage = React.lazy(() => import('../pages/career/CVOptimizationPage'));
const CodePage = React.lazy(() => import('../pages/career/CodePage'));
const CVSuggestionPage = React.lazy(() => import('../pages/career/CVSuggestionPage'));
const RoadmapPage = React.lazy(() => import('../pages/career/RoadmapPage'));
const CareerPage = React.lazy(() => import('../pages/career/CareerPage'));
const UpgradePage = React.lazy(() => import('../pages/dashboard/UpgradePage'));
const AccountLayout = React.lazy(() => import('../pages/account/AccountLayout'));
const Profile = React.lazy(() => import('../pages/account/Profile'));
const Subscription = React.lazy(() => import('../pages/account/Subscription'));
const Security = React.lazy(() => import('../pages/account/Security'));
const EditProfile = React.lazy(() => import('../pages/account/EditProfile'));

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
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* --- Protected Dashboard Routes --- */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="cv">
            <Route path="optimization" element={<CVOptimizationPage />} />
            <Route path="presentation-suggestions" element={<CVSuggestionPage />} />
          </Route>
          <Route path="code" element={<CodePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="upgrade" element={<UpgradePage />} />
        </Route>

        {/* --- Account Standalone Layout --- */}
        <Route
          path="/dashboard/account"
          element={
            <PrivateRoute>
              <AccountLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="subscription" element={<Subscription />} />
          <Route path="security" element={<Security />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>

        {/* --- Catch-all Route (404) --- */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
