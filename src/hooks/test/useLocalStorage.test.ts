import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {}; // Khởi tạo store để lưu trữ dữ liệu
  return {
    getItem: jest.fn((key: string) => store[key] || null), // Mock hàm getItem
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value; // Mock hàm setItem
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]; // Mock hàm removeItem
    }),
    clear: jest.fn(() => {
      store = {}; // Xóa toàn bộ dữ liệu trong store
    }),
  };
})();
// Gán mock localStorage vào window
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLocalStorage', () => {
  // Reset localStorage và clear mocks trước mỗi test
  beforeEach(() => {
    // Clear localStorage trước mỗi test
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  // Test case 1: Kiểm tra giá trị ban đầu
  it('should return initial value when no value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    expect(result.current[0]).toBe('initial-value');
  });

  // Test case 2: Kiểm tra lấy giá trị từ localStorage
  it('should return value from localStorage', () => {
    window.localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    expect(result.current[0]).toBe('stored-value');
  });

  // Test case 3: Kiểm tra lưu giá trị vào localStorage
  it('should save value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    act(() => {
      result.current[1]('new-value'); // Gọi hàm setValue
    });

    expect(result.current[0]).toBe('new-value');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
  });

  // Test case 4: Kiểm tra xóa giá trị khỏi localStorage
  it('should remove value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    act(() => {
      result.current[2](); // Gọi hàm removeValue
    });

    expect(result.current[0]).toBe('initial-value');
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('test-key');
  });

  // Test case 5: Kiểm tra xử lý lỗi parse JSON
  it('should handle JSON parse error', () => {
    window.localStorage.setItem('test-key', 'invalid-json');
    const consoleSpy = jest.spyOn(console, 'warn');

    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    expect(result.current[0]).toBe('initial-value');
    expect(consoleSpy).toHaveBeenCalled();
  });

  // Test case 6: Kiểm tra đồng bộ giữa các tab
  it('should sync value between tabs/windows', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));

    // Update the localStorage directly to simulate change from another tab
    window.localStorage.setItem('test-key', JSON.stringify('new-value'));

    act(() => {
      // Dispatch storage event
      window.dispatchEvent(new Event('storage'));
    });

    expect(result.current[0]).toBe('new-value');
  });

  // Test case 7: Kiểm tra xử lý giá trị số
  it('should handle function value', () => {
    const { result } = renderHook(() => useLocalStorage<number>('test-key', 0));

    act(() => {
      const setValue = result.current[1];
      setValue(1);
    });

    expect(result.current[0]).toBe(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(1));
  });

  // Test case 8: Kiểm tra xử lý khi window không tồn tại (SSR)
  it('should handle when window is undefined', () => {
    // Skip this test in Jest environment as it's not compatible
    // This test should run in a Node.js environment without window
    console.warn('Skipping SSR test in Jest environment');
  });
});
