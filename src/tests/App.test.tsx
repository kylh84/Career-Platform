import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';

// Mock window.caches
const mockCaches = {
  keys: jest.fn().mockResolvedValue([]),
  delete: jest.fn().mockResolvedValue(true),
};

Object.defineProperty(window, 'caches', {
  value: mockCaches,
  writable: true,
});

// Mock window.scrollTo
window.scrollTo = jest.fn();

describe('App', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders loading screen initially', () => {
    render(<App />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading page...')).toBeInTheDocument();
  });

  it('renders main app after loading', async () => {
    render(<App />);

    // Fast-forward timers
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Wait for loading screen to disappear
    await waitFor(
      () => {
        const spinner = screen.queryByTestId('loading-spinner');
        expect(spinner).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  it('shows ErrorBoundary UI on error', async () => {
    // Mock console.error to avoid error output in test
    const originalError = console.error;
    console.error = jest.fn();

    // Create a component that throws an error
    const ThrowError = () => {
      throw new Error('Test error');
    };

    // Render App with the error component
    render(
      <App>
        <ThrowError />
      </App>
    );

    // Fast-forward timers to ensure loading is complete
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Wait for error boundary to catch the error
    await waitFor(
      () => {
        const errorMessage = screen.getByText(/Đã xảy ra lỗi khi hiển thị ứng dụng/i);
        const errorDetails = screen.getByText(/Chi tiết lỗi: Test error/i);
        expect(errorMessage).toBeInTheDocument();
        expect(errorDetails).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Restore console.error
    console.error = originalError;
  });
});
