import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Assistant from '../../Assistant';

describe('Assistant component', () => {
  it('renders open button in lite mode', () => {
    render(<Assistant />);
    expect(screen.getByLabelText(/open ai assistant/i)).toBeInTheDocument();
  });

  it('opens chat when button is clicked (lite mode)', () => {
    render(<Assistant />);
    fireEvent.click(screen.getByLabelText(/open ai assistant/i));
    expect(screen.getByText(/ai career copilot/i)).toBeInTheDocument();
  });

  it('renders in full page mode', () => {
    render(<Assistant isFullPage />);
    expect(screen.getByText(/ai career copilot/i)).toBeInTheDocument();
    expect(screen.getByText(/how can i assist you today/i)).toBeInTheDocument();
  });

  it('shows suggestions and allows sending a suggestion', async () => {
    render(<Assistant isFullPage />);
    const suggestion = screen.getByText(/what skills should i learn/i);
    fireEvent.click(suggestion);
    await waitFor(() => {
      expect(screen.getByText(/you should focus on both technical and soft skills/i)).toBeInTheDocument();
    });
  });

  it('allows sending a custom message and receives mock reply', async () => {
    render(<Assistant isFullPage />);
    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: 'How to improve my CV?' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText(/let me review your cv/i)).toBeInTheDocument();
    });
  });

  it('closes chat in lite mode', () => {
    render(<Assistant />);
    fireEvent.click(screen.getByLabelText(/open ai assistant/i));
    fireEvent.click(screen.getByLabelText(/close assistant/i));
    expect(screen.getByLabelText(/open ai assistant/i)).toBeInTheDocument();
  });
});
