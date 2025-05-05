import { renderHook } from '@testing-library/react';
import useEventListener from '../useEventListener';

describe('useEventListener', () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should add event listener on mount', () => {
    const handler = jest.fn();
    const eventName = 'click';

    renderHook(() => useEventListener(eventName, handler));

    expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, handler, undefined);
  });

  it('should remove event listener on unmount', () => {
    const handler = jest.fn();
    const eventName = 'click';

    const { unmount } = renderHook(() => useEventListener(eventName, handler));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(eventName, handler, undefined);
  });

  it('should update event listener when handler changes', () => {
    const initialHandler = jest.fn();
    const newHandler = jest.fn();
    const eventName = 'click';

    const { rerender } = renderHook(({ handler }) => useEventListener(eventName, handler), { initialProps: { handler: initialHandler } });

    rerender({ handler: newHandler });

    expect(removeEventListenerSpy).toHaveBeenCalledWith(eventName, initialHandler, undefined);
    expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, newHandler, undefined);
  });

  it('should handle custom element', () => {
    const handler = jest.fn();
    const eventName = 'click';
    const element = document.createElement('div');

    renderHook(() => useEventListener(eventName, handler, element));

    expect(addEventListenerSpy).not.toHaveBeenCalled();
    expect(element.addEventListener).toHaveBeenCalledWith(eventName, handler, undefined);
  });

  it('should handle options', () => {
    const handler = jest.fn();
    const eventName = 'click';
    const element = document.createElement('div');

    renderHook(() => useEventListener(eventName, handler, element));

    expect(addEventListenerSpy).toHaveBeenCalledWith(eventName, expect.any(Function));
  });
});
