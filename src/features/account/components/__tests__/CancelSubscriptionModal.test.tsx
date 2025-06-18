import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CancelSubscriptionModal from '../CancelSubscriptionModal';

describe('CancelSubscriptionModal', () => {
  const subscriptionData = { expirationDate: 'February 10, 2024' };

  test('renders modal content', () => {
    render(
      <MemoryRouter>
        <CancelSubscriptionModal subscriptionData={subscriptionData} />
      </MemoryRouter>
    );
    // Kiểm tra heading
    expect(screen.getByRole('heading', { name: /Cancel Subscription/i })).toBeInTheDocument();
    // Kiểm tra nút Cancel Subscription
    expect(screen.getByRole('button', { name: /Cancel Subscription/i })).toBeInTheDocument();
    // Kiểm tra nút Stay Premium
    expect(screen.getByRole('button', { name: /Stay Premium/i })).toBeInTheDocument();
    // Kiểm tra nội dung cảnh báo
    expect(screen.getByText(/You will lose access to premium features/i)).toBeInTheDocument();
  });

  test('renders with context', () => {
    // Giả lập truyền context qua Outlet
    const Wrapper = () => <CancelSubscriptionModal subscriptionData={subscriptionData} />;
    render(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>
    );
    expect(screen.getByText(/February 10, 2024/)).toBeInTheDocument();
  });
});
