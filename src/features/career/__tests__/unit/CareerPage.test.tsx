import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CareerPage from '../../pages/CareerPage';

jest.mock('../../../../config/firebase', () => ({
  trackEvent: jest.fn(),
}));

describe('CareerPage', () => {
  it('renders input and button', () => {
    render(<CareerPage />);
    expect(screen.getByLabelText(/your question/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ask/i })).toBeInTheDocument();
  });

  it('allows user to type a question and get advice', async () => {
    render(<CareerPage />);
    const input = screen.getByPlaceholderText(/how to become a backend developer/i);
    fireEvent.change(input, { target: { value: 'How to improve my skills?' } });
    fireEvent.click(screen.getByRole('button', { name: /ask/i }));
    await waitFor(() => {
      expect(screen.getByText(/ai advice/i)).toBeInTheDocument();
      expect(screen.getByText(/focus on building real projects/i)).toBeInTheDocument();
    });
  });
});
