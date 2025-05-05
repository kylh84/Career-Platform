import { renderHook, act } from '@testing-library/react';
import usePrevious from '../usePrevious';

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(0));

    expect(result.current).toBeUndefined();
  });

  it('should return previous value after update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), { initialProps: { value: 0 } });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: 1 });
    });

    expect(result.current).toBe(0);

    act(() => {
      rerender({ value: 2 });
    });

    expect(result.current).toBe(1);
  });

  it('should handle different types of values', () => {
    type TestValue = string | { name: string } | number[];
    const { result, rerender } = renderHook(({ value }) => usePrevious<TestValue>(value), {
      initialProps: { value: 'initial' as TestValue },
    });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: { name: 'object' } as TestValue });
    });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: [1, 2, 3] as TestValue });
    });

    expect(result.current).toEqual({ name: 'object' });
  });

  it('should handle null and undefined values', () => {
    type TestValue = string | null | undefined;
    const { result, rerender } = renderHook(({ value }) => usePrevious<TestValue>(value), {
      initialProps: { value: null as TestValue },
    });

    expect(result.current).toBeUndefined();

    act(() => {
      rerender({ value: undefined as TestValue });
    });

    expect(result.current).toBeNull();

    act(() => {
      rerender({ value: 'value' as TestValue });
    });

    expect(result.current).toBeUndefined();
  });
});
