import { useEffect, useRef } from 'react';

/**
 * Hook để lưu giữ giá trị trước đó của một biến
 * @param value Giá trị cần theo dõi
 * @returns Giá trị trước đó của biến
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  // Lưu giá trị hiện tại vào ref
  useEffect(() => {
    ref.current = value;
  }, [value]);

  // Trả về giá trị trước đó (xảy ra trước khi cập nhật trong useEffect ở trên)
  return ref.current;
}

export default usePrevious;
