import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './hooks/ui/toast';
import { I18nProvider } from './i18n';
import './index.css';
import Assistant from './components/Assistant';
import { useAppSelector } from './store';

// ErrorBoundary component để bắt lỗi rendering
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 rounded-lg m-4 border border-red-300">
          <h2 className="text-2xl font-bold text-red-700 mb-4">An error occurred while displaying the application</h2>
          <p className="text-red-600 mb-4">Error details: {this.state.error?.message || 'Unknown error'}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Thêm component scroll to top khi chuyển trang
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

// Component nội dung chính, chỉ dùng hook trong function component này
const AppContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const prepareApp = async () => {
      try {
        if ('caches' in window) {
          console.log('Clearing cache to avoid 304 responses...');
          const cacheNames = await window.caches.keys();
          await Promise.all(
            cacheNames.map((cacheName) => {
              return window.caches.delete(cacheName);
            })
          );
        }
        const token = localStorage.getItem('token');
        console.log('App initialized, token exists:', !!token);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsAppReady(true);
      }
    };
    prepareApp();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      setIsFading(true);
      setTimeout(() => setShowLoading(false), 400);
    }
  }, [isAppReady]);

  return (
    <div className="app">
      {showLoading ? (
        <div className={`min-h-screen flex items-center justify-center bg-gray-50 transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center">
            <div data-testid="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-3 text-gray-700">Loading page...</p>
          </div>
        </div>
      ) : (
        children || (
          <>
            <AppRoutes />
            {isAuthenticated && <Assistant />}
          </>
        )
      )}
    </div>
  );
};

// Component chính để khởi tạo ứng dụng
const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <I18nProvider>
            <ToastProvider>
              <ScrollToTop />
              <AppContent>{children}</AppContent>
            </ToastProvider>
          </I18nProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
