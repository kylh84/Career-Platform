import { renderHook, act } from '@testing-library/react';
import useI18n from './useI18n';
import { I18nProvider } from './I18nProvider';
import { ReactNode } from 'react';

describe('useI18n', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => <I18nProvider defaultLocale="vi">{children}</I18nProvider>;

  test('returns translation function and current locale', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current.t).toBeDefined();
    expect(result.current.locale).toBe('vi');
  });

  test('translates text correctly', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    // Test Vietnamese translation
    expect(result.current.t('auth.login.title')).toBe('Đăng nhập');
    expect(result.current.t('auth.login.username')).toBe('Tên đăng nhập');

    // Change locale to English
    act(() => {
      result.current.setLocale('en');
    });

    // Test English translation
    expect(result.current.t('auth.login.title')).toBe('Login');
    expect(result.current.t('auth.login.username')).toBe('Username');
  });

  test('handles translation with parameters', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    const params = { name: 'John' };
    expect(result.current.t('common.welcome', params)).toBe('Xin chào John');

    act(() => {
      result.current.setLocale('en');
    });

    expect(result.current.t('common.welcome', params)).toBe('Welcome John');
  });

  test('returns available locales', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current.locales).toEqual(['vi', 'en']);
  });

  test('persists locale changes', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    act(() => {
      result.current.setLocale('en');
    });

    expect(localStorage.getItem('locale')).toBe('en');
    expect(result.current.locale).toBe('en');
  });

  test('falls back to default translation when key is missing', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });

  test('handles nested translation keys', () => {
    const { result } = renderHook(() => useI18n(), { wrapper });

    expect(result.current.t('auth.login.rememberMe')).toBe('Ghi nhớ đăng nhập');

    act(() => {
      result.current.setLocale('en');
    });

    expect(result.current.t('auth.login.rememberMe')).toBe('Remember me');
  });
});
