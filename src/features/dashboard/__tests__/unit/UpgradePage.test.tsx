import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UpgradePage from '../../pages/UpgradePage';

const mockStore = configureStore([]);

describe('UpgradePage Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      subscription: {
        currentPlan: 'free',
        loading: false,
        error: null,
      },
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <UpgradePage />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders subscription plans', () => {
    renderComponent();
    expect(screen.getByText(/Pro Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise Plan/i)).toBeInTheDocument();
  });

  test('displays plan features', () => {
    renderComponent();
    expect(screen.getByText(/Unlimited CV Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Priority Support/i)).toBeInTheDocument();
    expect(screen.getByText(/Advanced Analytics/i)).toBeInTheDocument();
  });

  test('shows current plan indicator', () => {
    renderComponent();
    expect(screen.getByText(/Current Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Free/i)).toBeInTheDocument();
  });

  test('handles plan selection', () => {
    renderComponent();
    const proPlanButton = screen.getByRole('button', { name: /Choose Pro/i });

    fireEvent.click(proPlanButton);

    const actions = store.getActions();
    expect(actions).toContainEqual(
      expect.objectContaining({
        type: 'subscription/selectPlan',
        payload: 'pro',
      })
    );
  });

  test('displays pricing information', () => {
    renderComponent();
    expect(screen.getByText(/\$9.99\/month/i)).toBeInTheDocument();
    expect(screen.getByText(/\$29.99\/month/i)).toBeInTheDocument();
  });

  test('shows feature comparison', () => {
    renderComponent();
    const comparisonTable = screen.getByRole('table');
    expect(comparisonTable).toBeInTheDocument();

    expect(screen.getByText(/Feature Comparison/i)).toBeInTheDocument();
    expect(screen.getAllByRole('row').length).toBeGreaterThan(1);
  });

  test('displays upgrade benefits', () => {
    renderComponent();
    expect(screen.getByText(/Benefits of Upgrading/i)).toBeInTheDocument();
    expect(screen.getByText(/Access to premium features/i)).toBeInTheDocument();
  });

  test('handles loading state', () => {
    store = mockStore({
      subscription: {
        currentPlan: 'free',
        loading: true,
        error: null,
      },
    });

    renderComponent();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('displays error message', () => {
    store = mockStore({
      subscription: {
        currentPlan: 'free',
        loading: false,
        error: 'Failed to load subscription plans',
      },
    });

    renderComponent();
    expect(screen.getByText(/Failed to load subscription plans/i)).toBeInTheDocument();
  });
});
