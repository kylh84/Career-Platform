import { renderHook, act } from '@testing-library/react';
import useUpdateEffect from './useUpdateEffect';

describe('useUpdateEffect', () => {
  it('should not run effect on initial mount', () => {
    const effect = jest.fn();
    renderHook(() => useUpdateEffect(effect));

    expect(effect).not.toHaveBeenCalled();
  });

  it('should run effect on update', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ value }) => useUpdateEffect(effect, [value]), {
      initialProps: { value: 0 },
    });

    expect(effect).not.toHaveBeenCalled();

    act(() => {
      rerender({ value: 1 });
    });

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should not run effect when dependencies do not change', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ value }) => useUpdateEffect(effect, [value]), {
      initialProps: { value: 0 },
    });

    expect(effect).not.toHaveBeenCalled();

    act(() => {
      rerender({ value: 0 });
    });

    expect(effect).not.toHaveBeenCalled();
  });

  it('should run cleanup function on unmount', () => {
    const cleanup = jest.fn();
    const effect = jest.fn().mockReturnValue(cleanup);
    const { unmount } = renderHook(() => useUpdateEffect(effect));

    unmount();

    expect(cleanup).not.toHaveBeenCalled();
  });

  it('should run cleanup function when dependencies change', () => {
    const cleanup = jest.fn();
    const effect = jest.fn().mockReturnValue(cleanup);
    const { rerender } = renderHook(({ value }) => useUpdateEffect(effect, [value]), {
      initialProps: { value: 0 },
    });

    act(() => {
      rerender({ value: 1 });
    });

    expect(cleanup).not.toHaveBeenCalled();

    act(() => {
      rerender({ value: 2 });
    });

    expect(cleanup).toHaveBeenCalledTimes(1);
  });
});
