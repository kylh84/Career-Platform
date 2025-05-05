import { renderHook } from '@testing-library/react';
import useTimeout from '../useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should call callback after delay', () => {
    const callback = jest.fn();
    const delay = 1000;

    renderHook(() => useTimeout(callback, delay));

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout on unmount', () => {
    const callback = jest.fn();
    const delay = 1000;

    const { unmount } = renderHook(() => useTimeout(callback, delay));

    unmount();

    jest.advanceTimersByTime(delay);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should update callback when it changes', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const delay = 1000;

    const { rerender } = renderHook(({ callback }) => useTimeout(callback, delay), {
      initialProps: { callback: callback1 },
    });

    rerender({ callback: callback2 });

    jest.advanceTimersByTime(delay);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
