import { renderHook, act } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 1000));

    expect(result.current).toBe('initial');
  });

  it('should update value after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), { initialProps: { value: 'initial' } });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'updated' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('updated');
  });

  it('should not update value before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), { initialProps: { value: 'initial' } });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'updated' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');
  });

  it('should reset timer on new updates', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), { initialProps: { value: 'initial' } });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'update1' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    act(() => {
      rerender({ value: 'update2' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('update2');
  });

  describe('with different value types', () => {
    it('should handle number values', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), { initialProps: { value: 0 } });

      expect(result.current).toBe(0);

      act(() => {
        rerender({ value: 1 });
      });

      expect(result.current).toBe(0);

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current).toBe(1);
    });

    it('should handle object values', () => {
      const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), { initialProps: { value: { name: 'initial' } } });

      expect(result.current).toEqual({ name: 'initial' });

      act(() => {
        rerender({ value: { name: 'updated' } });
      });

      expect(result.current).toEqual({ name: 'initial' });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(result.current).toEqual({ name: 'updated' });
    });
  });
});
