import { useEffect, useRef } from 'react';

/**
 * Hook để dễ dàng thêm và quản lý event listeners
 * @param eventName Tên sự kiện cần lắng nghe
 * @param handler Hàm xử lý sự kiện
 * @param element Element cần lắng nghe sự kiện, mặc định là window
 */
function useEventListener<T extends Event>(eventName: string, handler: (event: T) => void, element: HTMLElement | Window = window) {
  // Tạo ref để lưu handler
  const savedHandler = useRef<(event: T) => void>(handler);

  // Cập nhật ref nếu handler thay đổi
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Kiểm tra element có hỗ trợ addEventListener không
    const isSupported = Boolean(element && element.addEventListener);

    // Tạo event listener gọi handler lưu trong ref
    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event as T);
      }
    };

    if (isSupported) {
      // Thêm event listener
      element.addEventListener(eventName, eventListener);
    }

    // Dọn dẹp event listener khi component unmount
    return () => {
      if (isSupported) {
        element.removeEventListener(eventName, eventListener);
      }
    };
  }, [eventName, element]);
}

export default useEventListener;
