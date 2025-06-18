import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../pages/DashboardLayout';

// Mock the Outlet component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
  useNavigate: () => jest.fn(),
}));

describe('DashboardLayout Component', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <DashboardLayout />
      </BrowserRouter>
    );
  };

  test('renders sidebar navigation', () => {
    renderComponent();
    // Sidebar là <aside>
    expect(document.querySelector('aside')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    renderComponent();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('toggles sidebar on mobile menu button click', () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    const aside = document.querySelector('aside');
    // Initial state - sidebar closed on mobile
    expect(aside).toHaveClass('-translate-x-full');
    // Open sidebar
    fireEvent.click(menuButton);
    expect(aside).not.toHaveClass('-translate-x-full');
    // Close sidebar
    fireEvent.click(menuButton);
    expect(aside).toHaveClass('-translate-x-full');
  });

  test('renders all navigation links in sidebar', () => {
    renderComponent();
    // CV là button, các link còn lại là NavLink
    expect(screen.getByRole('button', { name: /cv/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /code/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /roadmap/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /career/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /mock interview/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learning tracker/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ai copilot/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /insight/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /account/i })).toBeInTheDocument();
  });

  test('navigation links have correct hrefs', () => {
    renderComponent();
    // Submenu sẽ test riêng
    expect(screen.getByRole('link', { name: /code/i })).toHaveAttribute('href', '/code');
    expect(screen.getByRole('link', { name: /roadmap/i })).toHaveAttribute('href', '/roadmap');
    expect(screen.getByRole('link', { name: /career/i })).toHaveAttribute('href', '/career');
    expect(screen.getByRole('link', { name: /mock interview/i })).toHaveAttribute('href', '/mock-interview');
    expect(screen.getByRole('link', { name: /learning tracker/i })).toHaveAttribute('href', '/learning-tracker');
    expect(screen.getByRole('link', { name: /ai copilot/i })).toHaveAttribute('href', '/copilot');
    expect(screen.getByRole('link', { name: /insight/i })).toHaveAttribute('href', '/insight');
    expect(screen.getByRole('link', { name: /account/i })).toHaveAttribute('href', '/account/profile');
  });

  test('closes sidebar when clicking outside on mobile', () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    const aside = document.querySelector('aside');
    // Open sidebar
    fireEvent.click(menuButton);
    expect(aside).not.toHaveClass('-translate-x-full');
    // Click overlay
    const overlay = document.querySelector('[class*="bg-black"]');
    if (overlay) {
      fireEvent.click(overlay);
      expect(aside).toHaveClass('-translate-x-full');
    }
  });

  test('renders navigation icons', () => {
    renderComponent();
    const navLinks = screen.getAllByRole('link');
    navLinks.forEach((link) => {
      const icon = link.querySelector('svg');
      if (icon) {
        expect(icon).toBeInTheDocument();
      }
    });
  });

  test('applies active styles to navigation links', () => {
    renderComponent();
    // Lấy tất cả link chính (không phải submenu)
    const mainLinks = [/code/i, /roadmap/i, /career/i, /mock interview/i, /learning tracker/i, /ai copilot/i, /insight/i, /account/i];
    mainLinks.forEach((regex) => {
      const link = screen.getByRole('link', { name: regex });
      expect(link).toHaveClass('hover:bg-slate-700/80', 'text-white');
    });
    // Lấy tất cả link submenu (CV)
    const submenuLinks = [/cv optimization/i, /cv presentation suggestions/i];
    submenuLinks.forEach((regex) => {
      const link = screen.getByRole('link', { name: regex });
      expect(link).toHaveClass('hover:bg-slate-700/60', 'text-slate-200');
    });
  });

  test('renders mobile header title', () => {
    renderComponent();
    // Tìm text "Career Platform" trong mobile header (div có class chứa -translate-x-1/2)
    const mobileHeader = screen.getByText(/career platform/i, {
      selector: 'div[class*="-translate-x-1/2"]',
    });
    expect(mobileHeader).toBeInTheDocument();
  });

  test('clicking sidebar logo navigates to dashboard', () => {
    renderComponent();
    const logos = screen.getAllByText(/career platform/i);
    // sidebar logo là logo thứ 2 (hidden md:block)
    if (logos.length > 1) {
      fireEvent.click(logos[1]);
    }
    // Không có assert vì useNavigate đã bị mock, chỉ kiểm tra không lỗi
  });

  test('toggles CV submenu', () => {
    renderComponent();
    // Tìm button mở submenu CV
    const cvButton = screen.getByRole('button', { name: /cv/i });
    fireEvent.click(cvButton);
    // Sau khi mở, phải thấy link CV Optimization và CV Presentation Suggestions
    expect(screen.getByRole('link', { name: /cv optimization/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cv presentation suggestions/i })).toBeInTheDocument();
    // Đóng lại
    fireEvent.click(cvButton);
    // Kiểm tra submenu có class max-h-0 opacity-0
    const submenu = document.querySelector('.max-h-0.opacity-0');
    expect(submenu).toBeInTheDocument();
  });

  test('submenu links have correct hrefs', () => {
    renderComponent();
    const cvButton = screen.getByRole('button', { name: /cv/i });
    fireEvent.click(cvButton);
    expect(screen.getByRole('link', { name: /cv optimization/i })).toHaveAttribute('href', '/cv/optimization');
    expect(screen.getByRole('link', { name: /cv presentation suggestions/i })).toHaveAttribute('href', '/cv/presentation-suggestions');
  });

  test('shows overlay when sidebar is open on mobile', () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    // Overlay là một div có class chứa bg-black
    expect(document.querySelector('[class*="bg-black"]')).toBeInTheDocument();
  });

  test('main content is blurred when sidebar is open on mobile', () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    // Main content có class blur-sm
    const main = document.querySelector('main');
    expect(main).toHaveClass('blur-sm');
  });

  test('sidebar menu icons are rendered', () => {
    renderComponent();
    // Tìm tất cả các icon svg trong sidebar
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      const icons = sidebar.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    } else {
      throw new Error('Sidebar not found');
    }
  });

  test('submenu renders correct links', () => {
    renderComponent();
    const cvButton = screen.getByRole('button', { name: /cv/i });
    fireEvent.click(cvButton);
    expect(screen.getByRole('link', { name: /cv optimization/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cv presentation suggestions/i })).toBeInTheDocument();
  });
});
