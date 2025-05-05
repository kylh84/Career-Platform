import { useEffect, useRef } from 'react';

/**
 * Hook để thiết lập timeout với React hooks
 * @param callback Hàm callback sẽ được gọi sau khi hết thời gian delay
 * @param delay Thời gian delay tính bằng milliseconds
 */
function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);

  // Cập nhật ref mỗi khi callback thay đổi
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (delay !== null && callback && typeof callback === 'function') {
      timer = setTimeout(callbackRef.current, delay);
    }

    // Dọn dẹp timer khi component unmount hoặc dependencies thay đổi
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [callback, delay]);
}

export default useTimeout;
