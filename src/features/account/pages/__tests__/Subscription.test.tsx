import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Subscription from '../Subscription';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate,
}));

describe('Subscription', () => {
  beforeEach(() => {
    navigate.mockClear();
  });

  test('renders subscription info', () => {
    render(
      <MemoryRouter>
        <Subscription />
      </MemoryRouter>
    );
    expect(screen.getByText(/Manage Subscription/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Billing Cycle/i)).toBeInTheDocument();
    expect(screen.getByText(/Expiration Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
  });

  test('shows Cancel Subscription button', () => {
    render(
      <MemoryRouter>
        <Subscription />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Cancel Subscription/i })).toBeInTheDocument();
  });

  test('navigates to cancel-confirm when Cancel Subscription is clicked', () => {
    render(
      <MemoryRouter>
        <Subscription />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel Subscription/i }));
    expect(navigate).toHaveBeenCalledWith('cancel-confirm');
  });
});
