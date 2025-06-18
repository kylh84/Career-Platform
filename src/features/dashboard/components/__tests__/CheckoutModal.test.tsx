import { render, screen, fireEvent } from '@testing-library/react';
import CheckoutModal from '../CheckoutModal';

describe('CheckoutModal', () => {
  const props = {
    isOpen: true,
    onClose: jest.fn(),
    amount: 19.99,
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=test',
    expiryTime: 300,
  };

  test('renders checkout modal', () => {
    render(<CheckoutModal {...props} />);
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Copy payment link/i)).toBeInTheDocument();
  });

  test('calls onClose when overlay is clicked', () => {
    render(<CheckoutModal {...props} />);
    const overlay = screen.getByTestId('modal-overlay');
    if (overlay) fireEvent.click(overlay);
    expect(props.onClose).toHaveBeenCalled();
  });

  test('copies payment link when button is clicked', () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
    render(<CheckoutModal {...props} />);
    const copyBtn = screen.getByText(/Copy payment link/i);
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
