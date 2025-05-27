import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../pages/DashboardLayout';

// Mock the Outlet component from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
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
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    renderComponent();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('toggles sidebar on mobile menu button click', () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Initial state - sidebar closed on mobile
    expect(screen.getByRole('navigation')).toHaveClass('-translate-x-full');

    // Open sidebar
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).not.toHaveClass('-translate-x-full');

    // Close sidebar
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toHaveClass('-translate-x-full');
  });

  test('renders all navigation links', () => {
    renderComponent();

    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cv optimization/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /code review/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /learning roadmap/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /career guidance/i })).toBeInTheDocument();
  });

  test('navigation links have correct hrefs', () => {
    renderComponent();

    expect(screen.getByRole('link', { name: /profile/i })).toHaveAttribute('href', '/dashboard/profile');
    expect(screen.getByRole('link', { name: /cv optimization/i })).toHaveAttribute('href', '/dashboard/cv');
    expect(screen.getByRole('link', { name: /code review/i })).toHaveAttribute('href', '/dashboard/code');
    expect(screen.getByRole('link', { name: /learning roadmap/i })).toHaveAttribute('href', '/dashboard/roadmap');
    expect(screen.getByRole('link', { name: /career guidance/i })).toHaveAttribute('href', '/dashboard/career');
  });

  test('closes sidebar when clicking outside on mobile', () => {
    renderComponent();
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });

    // Open sidebar
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).not.toHaveClass('-translate-x-full');

    // Click outside (main content area)
    fireEvent.click(screen.getByTestId('outlet'));
    expect(screen.getByRole('navigation')).toHaveClass('-translate-x-full');
  });

  test('renders navigation icons', () => {
    renderComponent();
    const navLinks = screen.getAllByRole('link');

    navLinks.forEach((link) => {
      expect(link.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('applies active styles to current route', () => {
    renderComponent();
    const navLinks = screen.getAllByRole('link');

    navLinks.forEach((link) => {
      expect(link).toHaveClass('hover:bg-gray-50', 'hover:text-gray-900');
    });
  });
});
