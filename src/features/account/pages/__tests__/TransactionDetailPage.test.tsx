import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TransactionDetailPage from '../TransactionDetailPage';

test('renders billing details', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard/account/subscription/transactions/0']}>
      <Routes>
        <Route path="/dashboard/account/subscription/transactions/:transactionId" element={<TransactionDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/Billing Details/i)).toBeInTheDocument();
  expect(screen.getByText(/Transaction ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Amount/i)).toBeInTheDocument();
});

test('shows not found for invalid transactionId', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard/account/subscription/transactions/999']}>
      <Routes>
        <Route path="/dashboard/account/subscription/transactions/:transactionId" element={<TransactionDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/Transaction not found/i)).toBeInTheDocument();
});
