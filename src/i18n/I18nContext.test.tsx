import { useContext } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import I18nContext from './I18nContext';
import { I18nProvider } from './I18nProvider';

// Test component that uses the context
const TestComponent = () => {
  const { t, locale, setLocale, locales } = useContext(I18nContext);
  return (
    <div>
      <div data-testid="current-locale">{locale}</div>
      <div data-testid="available-locales">{locales.join(',')}</div>
      <div data-testid="translated-text">{t('auth.login.title')}</div>
      <button onClick={() => setLocale('en')}>Switch to English</button>
      <button onClick={() => setLocale('vi')}>Switch to Vietnamese</button>
    </div>
  );
};

describe('I18nContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('provides default locale (vi) when no locale is stored', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('current-locale')).toHaveTextContent('vi');
  });

  test('provides stored locale from localStorage', () => {
    localStorage.setItem('locale', 'en');

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('current-locale')).toHaveTextContent('en');
  });

  test('provides list of available locales', () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId('available-locales')).toHaveTextContent('vi,en');
  });

  test('translates text according to current locale', async () => {
    const user = userEvent.setup();

    render(
      <I18nProvider defaultLocale="en">
        <TestComponent />
      </I18nProvider>
    );

    // Check English translation
    expect(screen.getByTestId('translated-text')).toHaveTextContent('Login');

    // Switch to Vietnamese
    await user.click(screen.getByText('Switch to Vietnamese'));

    // Wait for the state update and check Vietnamese translation
    await waitFor(() => {
      expect(screen.getByTestId('translated-text')).toHaveTextContent('Đăng nhập');
    });
  });

  test('persists locale change to localStorage', async () => {
    const user = userEvent.setup();

    render(
      <I18nProvider defaultLocale="vi">
        <TestComponent />
      </I18nProvider>
    );

    // Switch to English
    await user.click(screen.getByText('Switch to English'));

    // Check if locale was saved to localStorage
    await waitFor(() => {
      expect(localStorage.getItem('locale')).toBe('en');
    });
  });

  test('handles invalid stored locale', () => {
    // Set invalid locale in localStorage
    localStorage.setItem('locale', 'invalid');

    render(
      <I18nProvider defaultLocale="vi">
        <TestComponent />
      </I18nProvider>
    );

    // Should fall back to default locale
    expect(screen.getByTestId('current-locale')).toHaveTextContent('vi');
  });
});
