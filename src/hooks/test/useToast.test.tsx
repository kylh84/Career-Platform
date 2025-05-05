import { renderHook, act } from '@testing-library/react';
import { useToast } from '../useToast.hook';
import { ToastProvider } from '../useToast';

describe('useToast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should show success toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ToastProvider>{children}</ToastProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.success('Test message');
    });

    // Kiểm tra xem toast đã được thêm vào DOM chưa
    const toastElement = document.querySelector('.bg-green-50');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('Test message');
  });

  it('should show error toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ToastProvider>{children}</ToastProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.error('Test message');
    });

    const toastElement = document.querySelector('.bg-red-50');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('Test message');
  });

  it('should show info toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ToastProvider>{children}</ToastProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.info('Test message');
    });

    const toastElement = document.querySelector('.bg-blue-50');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('Test message');
  });

  it('should show warning toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ToastProvider>{children}</ToastProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.warning('Test message');
    });

    const toastElement = document.querySelector('.bg-yellow-50');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveTextContent('Test message');
  });

  it('should dismiss toast', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ToastProvider>{children}</ToastProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.success('Test message');
    });

    const toastElement = document.querySelector('.bg-green-50');
    expect(toastElement).toBeInTheDocument();

    act(() => {
      const dismissButton = toastElement?.querySelector('button');
      if (dismissButton) {
        dismissButton.click();
      }
    });

    expect(toastElement).not.toBeInTheDocument();
  });

  it('should auto dismiss toast after duration', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ToastProvider>{children}</ToastProvider>;
    const { result } = renderHook(() => useToast(), { wrapper });

    act(() => {
      result.current.success('Test message', 1000);
    });

    const toastElement = document.querySelector('.bg-green-50');
    expect(toastElement).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(toastElement).not.toBeInTheDocument();
  });
});
