import { useState, useEffect } from 'react';

/**
 * Custom hook that delays updating a value until a specified delay has passed
 * Useful for search inputs, filtering, etc.
 */
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Tạo timeout để trễ việc cập nhật debouncedValue
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout nếu value hoặc delay thay đổi
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
