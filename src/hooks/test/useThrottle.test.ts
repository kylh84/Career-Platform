import { renderHook, act } from '@testing-library/react';
import useThrottle from '../useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 1000));

    expect(result.current).toBe('initial');
  });

  it('should update value after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 1000), { initialProps: { value: 'initial' } });

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
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 1000), { initialProps: { value: 'initial' } });

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

  it('should handle multiple updates within delay', () => {
    const { result, rerender } = renderHook(({ value }) => useThrottle(value, 1000), { initialProps: { value: 'initial' } });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'update1' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'update2' });
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('update2');
  });

  it('should handle different types of values', () => {
    type TestValue = number | { name: string };
    const { result, rerender } = renderHook(({ value }) => useThrottle<TestValue>(value, 1000), {
      initialProps: { value: 0 as TestValue },
    });

    expect(result.current).toBe(0);

    act(() => {
      rerender({ value: { name: 'object' } as TestValue });
    });

    expect(result.current).toBe(0);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toEqual({ name: 'object' });
  });
});
