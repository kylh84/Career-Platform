import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AccountUpgradePage from '../AccountUpgradePage';

describe('UpgradePage', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <AccountUpgradePage />
      </BrowserRouter>
    );

  test('renders main sections', () => {
    renderComponent();
    expect(screen.getByText(/upgrade to premium/i)).toBeInTheDocument();
    expect(screen.getByText(/current plan/i)).toBeInTheDocument();
    expect(screen.getAllByText(/premium/i).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText(/payment method/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upgrade/i })).toBeInTheDocument();
  });

  test('can switch billing cycle and see correct price', () => {
    renderComponent();
    // Mặc định là monthly
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    // Chuyển sang yearly
    fireEvent.click(screen.getByRole('button', { name: /yearly/i }));
    expect(screen.getByText('$199.99')).toBeInTheDocument();
    // Chuyển lại monthly
    fireEvent.click(screen.getByRole('button', { name: /monthly/i }));
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });

  test('can select payment method', () => {
    renderComponent();
    // Mặc định là MoMo
    const momoRadio = screen.getByRole('radio', { name: /momo/i });
    expect(momoRadio).toBeChecked();
    // Chọn VNPAY
    const vnpayRadio = screen.getByRole('radio', { name: /vnpay/i });
    fireEvent.click(vnpayRadio);
    expect(vnpayRadio).toBeChecked();
    // Chọn Card
    const cardRadio = screen.getByRole('radio', { name: /visa o mastercard/i });
    fireEvent.click(cardRadio);
    expect(cardRadio).toBeChecked();
    // Chọn Bank
    const bankRadio = screen.getByRole('radio', { name: /bank/i });
    fireEvent.click(bankRadio);
    expect(bankRadio).toBeChecked();
  });

  test('shows processing state when upgrading', async () => {
    renderComponent();
    const upgradeBtn = screen.getByRole('button', { name: /upgrade/i });
    fireEvent.click(upgradeBtn);
    expect(upgradeBtn).toBeDisabled();
    expect(upgradeBtn).toHaveTextContent(/processing/i);
    // Đợi hết processing
    await waitFor(() => expect(upgradeBtn).not.toBeDisabled(), { timeout: 1500 });
    expect(upgradeBtn).toHaveTextContent(/upgrade/i);
  });
});
