import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Copilot from '../../pages/Copilot';

describe('Copilot', () => {
  it('renders Assistant in full page mode', () => {
    render(<Copilot />);
    expect(screen.getByText(/ai career copilot/i)).toBeInTheDocument();
    expect(screen.getByText(/how can i assist you today/i)).toBeInTheDocument();
  });

  it('shows suggestions and allows sending a message', async () => {
    render(<Copilot />);
    // Click a suggestion
    const suggestion = screen.getByText(/what skills should i learn/i);
    fireEvent.click(suggestion);
    await waitFor(() => {
      expect(screen.getByText(/you should focus on both technical and soft skills/i)).toBeInTheDocument();
    });
    // Send a custom message
    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: 'How to improve my CV?' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText(/let me review your cv/i)).toBeInTheDocument();
    });
  });
});
