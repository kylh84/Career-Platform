import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * Hook hoạt động giống như useEffect nhưng chỉ chạy khi component cập nhật
 * và không chạy khi component mount lần đầu
 * @param effect Hàm effect cần thực thi
 * @param deps Danh sách dependencies
 */
const useUpdateEffect = (effect: EffectCallback, deps: DependencyList = []) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useUpdateEffect;
