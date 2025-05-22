import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook để lưu trữ và đồng bộ state với localStorage
 * @param key Khóa lưu trữ trong localStorage
 * @param initialValue Giá trị ban đầu nếu không có dữ liệu trong localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  // Lấy giá trị từ localStorage hoặc sử dụng initialValue
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // State để lưu trữ giá trị hiện tại
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Trả về một phương thức được wrap với try/catch để cập nhật giá trị localStorage
  const setValue = (value: T): void => {
    try {
      // Cho phép value là một function để tương tự như method của useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Lưu state
      setStoredValue(valueToStore);

      // Lưu vào localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Phát sự kiện để các component khác sử dụng cùng hook biết
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Xóa item khỏi localStorage
  const removeValue = (): void => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        // Cập nhật state về lại initialValue
        setStoredValue(initialValue);
        // Phát sự kiện để các component khác sử dụng cùng hook biết
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    // Cập nhật state nếu giá trị localStorage thay đổi từ bên ngoài component
    const handleStorageChange = (): void => {
      setStoredValue(readValue());
    };

    // Handler này chỉ được gọi khi thay đổi xảy ra trong tab/window khác
    window.addEventListener('storage', handleStorageChange);
    // Handler này được gọi khi thay đổi xảy ra trong cùng tab/window
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
