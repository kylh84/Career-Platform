import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import DashboardLayout from '../../pages/DashboardLayout';
import DashboardHome from '../../pages/DashboardHome';
import UpgradePage from '../../pages/UpgradePage';

interface RootState {
  auth: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      image: string;
    };
    isAuthenticated: boolean;
  };
  dashboard: {
    stats: {
      cvReviews: number;
      codeReviews: number;
      totalProjects: number;
    };
    activities: Array<{
      id: number;
      type: string;
      date: string;
    }>;
  };
}

const mockStore = configureStore<RootState>([]);

describe('Dashboard Integration Flow', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          image: 'avatar.jpg',
        },
        isAuthenticated: true,
      },
      dashboard: {
        stats: {
          cvReviews: 5,
          codeReviews: 3,
          totalProjects: 8,
        },
        activities: [
          { id: 1, type: 'cv_review', date: '2024-03-27' },
          { id: 2, type: 'code_review', date: '2024-03-26' },
        ],
      },
    });
  });

  const renderWithRouter = (initialRoute = '/dashboard') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="cv" element={<div>CV Page</div>} />
            <Route path="code" element={<div>Code Page</div>} />
            <Route path="roadmap" element={<div>Roadmap Page</div>} />
            <Route path="career" element={<div>Career Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  test('navigates through dashboard features', async () => {
    renderWithRouter();

    // Verify dashboard home is shown initially
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('CV Optimization')).toBeInTheDocument();

    // Click CV Optimization and verify navigation
    fireEvent.click(screen.getByText('CV Optimization').closest('div')!);
    await waitFor(() => {
      expect(screen.getByText('CV Page')).toBeInTheDocument();
    });

    // Navigate back to dashboard
    fireEvent.click(screen.getByRole('link', { name: /dashboard/i }));
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    // Click Code Review and verify navigation
    fireEvent.click(screen.getByText('Code Review').closest('div')!);
    await waitFor(() => {
      expect(screen.getByText('Code Page')).toBeInTheDocument();
    });
  });

  test('sidebar navigation works correctly', async () => {
    renderWithRouter();

    // Click each navigation link and verify content changes
    const navLinks = [
      { name: /cv optimization/i, content: 'CV Page' },
      { name: /code review/i, content: 'Code Page' },
      { name: /learning roadmap/i, content: 'Roadmap Page' },
      { name: /career guidance/i, content: 'Career Page' },
    ];

    for (const link of navLinks) {
      fireEvent.click(screen.getByRole('link', { name: link.name }));
      await waitFor(() => {
        expect(screen.getByText(link.content)).toBeInTheDocument();
      });
    }
  });

  test('mobile responsive behavior', async () => {
    renderWithRouter();

    // Initially sidebar should be hidden on mobile
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveClass('-translate-x-full');

    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(menuButton);
    expect(navigation).not.toHaveClass('-translate-x-full');

    // Click a link should navigate and close menu
    fireEvent.click(screen.getByRole('link', { name: /cv optimization/i }));
    await waitFor(() => {
      expect(screen.getByText('CV Page')).toBeInTheDocument();
      expect(navigation).toHaveClass('-translate-x-full');
    });
  });

  test('maintains navigation state', async () => {
    renderWithRouter('/dashboard/cv');

    // Should start at CV page
    expect(screen.getByText('CV Page')).toBeInTheDocument();

    // Navigate to Code page
    fireEvent.click(screen.getByRole('link', { name: /code review/i }));
    await waitFor(() => {
      expect(screen.getByText('Code Page')).toBeInTheDocument();
    });

    // Navigate to Roadmap page
    fireEvent.click(screen.getByRole('link', { name: /learning roadmap/i }));
    await waitFor(() => {
      expect(screen.getByText('Roadmap Page')).toBeInTheDocument();
    });

    // Go back should return to Code page
    window.history.back();
    await waitFor(() => {
      expect(screen.getByText('Code Page')).toBeInTheDocument();
    });
  });

  test('complete dashboard navigation flow', async () => {
    renderWithRouter();

    // Check initial dashboard render
    expect(screen.getByText(/Welcome back, John/i)).toBeInTheDocument();
    expect(screen.getByText(/Recent Activity/i)).toBeInTheDocument();

    // Test CV optimization flow
    const cvButton = screen.getByText(/Optimize CV/i);
    fireEvent.click(cvButton);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard/cv/optimization');
    });

    // Test code review flow
    const codeButton = screen.getByText(/Review Code/i);
    fireEvent.click(codeButton);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard/code');
    });

    // Test upgrade flow
    const upgradeButton = screen.getByText(/Upgrade/i);
    fireEvent.click(upgradeButton);
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard/upgrade');
    });
  });

  test('dashboard data loading and display', async () => {
    renderWithRouter();

    // Verify stats loading
    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument(); // CV Reviews
      expect(screen.getByText('3')).toBeInTheDocument(); // Code Reviews
      expect(screen.getByText('8')).toBeInTheDocument(); // Total Projects
    });

    // Verify activities loading
    await waitFor(() => {
      expect(screen.getByText(/cv_review/i)).toBeInTheDocument();
      expect(screen.getByText(/code_review/i)).toBeInTheDocument();
    });
  });

  test('dashboard state updates', async () => {
    renderWithRouter();

    // Simulate new activity
    store.dispatch({
      type: 'dashboard/addActivity',
      payload: { id: 3, type: 'cv_review', date: '2024-03-28' },
    });

    await waitFor(() => {
      const activities = screen.getAllByTestId('activity-item');
      expect(activities).toHaveLength(3);
    });

    // Simulate stats update
    store.dispatch({
      type: 'dashboard/updateStats',
      payload: { cvReviews: 6, codeReviews: 3, totalProjects: 9 },
    });

    await waitFor(() => {
      expect(screen.getByText('6')).toBeInTheDocument(); // Updated CV Reviews
      expect(screen.getByText('9')).toBeInTheDocument(); // Updated Total Projects
    });
  });

  test('upgrade flow integration', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UpgradePage />
        </BrowserRouter>
      </Provider>
    );

    // Check plan display
    expect(screen.getByText(/Pro Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise Plan/i)).toBeInTheDocument();

    // Test plan selection
    const proPlanButton = screen.getByText(/Choose Pro/i);
    fireEvent.click(proPlanButton);

    await waitFor(() => {
      expect(store.getActions()).toContainEqual(
        expect.objectContaining({
          type: 'subscription/selectPlan',
          payload: expect.any(String),
        })
      );
    });
  });
});
