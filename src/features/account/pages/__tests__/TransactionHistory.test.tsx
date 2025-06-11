import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TransactionHistory from '../TransactionHistory';

const navigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigate,
}));

describe('TransactionHistory', () => {
  beforeEach(() => {
    navigate.mockClear();
  });

  test('renders transaction history title', () => {
    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );
    expect(screen.getByText(/Transaction History/i)).toBeInTheDocument();
  });

  test('shows Cancel subscription button', () => {
    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /Cancel subscription/i })).toBeInTheDocument();
  });

  test('renders transaction table columns', () => {
    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Method/i)).toBeInTheDocument();
  });

  test('navigates to cancel-confirm when Cancel subscription is clicked', () => {
    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel subscription/i }));
    expect(navigate).toHaveBeenCalledWith('/dashboard/account/subscription/manage/cancel-confirm');
  });

  test('navigates to transaction detail when a row is clicked', () => {
    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );
    // Click the first row (table version)
    const firstRow = screen.getAllByRole('row')[1]; // skip header
    fireEvent.click(firstRow);
    expect(navigate).toHaveBeenCalledWith('/dashboard/account/subscription/transactions/0');
  });
});
