import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CVOptimizationPage from '../../pages/CVOptimizationPage';

describe('CVOptimizationPage', () => {
  test('renders upload, JD input, and Evaluate button', () => {
    render(<CVOptimizationPage />);
    expect(screen.getByText(/evaluate a cv/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cv/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /evaluate/i })).toBeInTheDocument();
  });

  test('handles file upload and shows file name', () => {
    render(<CVOptimizationPage />);
    const file = new File(['dummy'], 'cv.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/cv/i, { selector: 'input' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText('cv.pdf')).toBeInTheDocument();
  });

  test('shows result after evaluate', async () => {
    render(<CVOptimizationPage />);
    fireEvent.click(screen.getByRole('button', { name: /evaluate/i }));
    await waitFor(() => {
      expect(screen.getByText(/ai feedback/i)).toBeInTheDocument();
      expect(screen.getByText(/experience with java and react\.js/i)).toBeInTheDocument();
      expect(screen.getByText(/project management skills/i)).toBeInTheDocument();
      expect(screen.getByText(/match score/i)).toBeInTheDocument();
      expect(screen.getByText(/84%/i)).toBeInTheDocument();
    });
  });
});
