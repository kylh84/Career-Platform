import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CVSuggestionPage from '../../pages/CVSuggestionPage';

describe('CVSuggestionPage', () => {
  it('renders form fields and button', () => {
    render(<CVSuggestionPage />);
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/skills, experience, education/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument();
  });

  it('generates CV draft after submitting form', async () => {
    render(<CVSuggestionPage />);
    fireEvent.change(screen.getByLabelText(/position/i), { target: { value: 'Frontend Developer' } });
    fireEvent.change(screen.getByLabelText(/skills, experience, education/i), { target: { value: 'React, CSS' } });
    fireEvent.click(screen.getByRole('button', { name: /generate/i }));
    await waitFor(() => {
      expect(screen.getByText(/cv draft/i)).toBeInTheDocument();
      expect(screen.getByText(/results-oriented software engineer/i)).toBeInTheDocument();
    });
  });
});
