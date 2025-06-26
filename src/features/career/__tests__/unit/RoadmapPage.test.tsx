import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RoadmapPage from '../../pages/RoadmapPage';

describe('RoadmapPage', () => {
  it('renders form and suggest button', () => {
    render(<RoadmapPage />);
    expect(screen.getByText(/learning path suggestion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /suggest/i })).toBeInTheDocument();
  });

  it('shows courses after submitting form', async () => {
    render(<RoadmapPage />);
    fireEvent.click(screen.getByRole('button', { name: /suggest/i }));
    await waitFor(() => {
      expect(screen.getByText(/courses/i)).toBeInTheDocument();
      expect(screen.getAllByText(/introduction to data science/i).length).toBeGreaterThan(0);
    });
  });
});
