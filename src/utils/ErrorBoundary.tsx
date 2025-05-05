import React, { ErrorInfo, PropsWithChildren } from 'react';

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);

    // Có thể gửi lỗi đến dịch vụ theo dõi lỗi như Sentry
    // if (typeof window.Sentry !== 'undefined') {
    //   window.Sentry.captureException(error);
    // }
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-300 shadow-sm">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Đã xảy ra lỗi</h2>
          <p className="text-red-600 mb-3">{this.state.error?.message || 'Lỗi không xác định'}</p>
          <details className="mb-4">
            <summary className="text-sm cursor-pointer text-red-500 hover:text-red-700">Chi tiết lỗi</summary>
            <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">{this.state.error?.stack}</pre>
          </details>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
