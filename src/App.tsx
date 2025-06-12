import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppRoutes from './routes/AppRoutes';
import { ToastProvider } from './hooks/ui/toast';
import { I18nProvider } from './i18n';
import './index.css';
import Assistant from './components/Assistant';

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
          <h2 className="text-2xl font-bold text-red-700 mb-4">Đã xảy ra lỗi khi hiển thị ứng dụng</h2>
          <p className="text-red-600 mb-4">Chi tiết lỗi: {this.state.error?.message || 'Không xác định'}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Tải lại trang
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

// Component chính để khởi tạo ứng dụng
const App: React.FC = () => {
  // Thêm state để theo dõi việc ứng dụng đã sẵn sàng chưa
  const [isAppReady, setIsAppReady] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Đảm bảo ứng dụng có thời gian để khởi tạo
    const prepareApp = async () => {
      try {
        // Clear cache nếu cần thiết
        if ('caches' in window) {
          console.log('Clearing cache to avoid 304 responses...');
          // Xóa cache cũ
          const cacheNames = await window.caches.keys();
          await Promise.all(
            cacheNames.map((cacheName) => {
              return window.caches.delete(cacheName);
            })
          );
        }

        // Kiểm tra xem người dùng đã đăng nhập chưa từ localStorage token
        const token = localStorage.getItem('token');
        console.log('App initialized, token exists:', !!token);

        // Thêm 1000ms delay để đảm bảo các component được render đúng
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
      setTimeout(() => setShowLoading(false), 400); // 400ms fade out
    }
  }, [isAppReady]);

  // Hiển thị loading screen khi ứng dụng chưa có dữ liệu
  if (showLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-3 text-gray-700">Đang tải ứng dụng...</p>
        </div>
      </div>
    );
  }

  // Sử dụng BrowserRouter thay vì HashRouter để có URL sạch hơn
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <I18nProvider>
            <ToastProvider>
              <ScrollToTop />
              <div className="app">
                <AppRoutes />
                <Assistant />
              </div>
            </ToastProvider>
          </I18nProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
