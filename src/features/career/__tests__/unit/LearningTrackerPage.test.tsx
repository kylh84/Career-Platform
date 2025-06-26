import { render, screen } from '@testing-library/react';
import LearningTrackerPage from '../../pages/LearningTrackerPage';

describe('LearningTrackerPage', () => {
  it('renders course progress and daily completion', () => {
    render(<LearningTrackerPage />);
    expect(screen.getByText(/course progress/i)).toBeInTheDocument();
    expect(screen.getByText(/daily completion/i)).toBeInTheDocument();
    expect(screen.getByText(/python/i)).toBeInTheDocument();
    expect(screen.getByText(/web development/i)).toBeInTheDocument();
  });

  it('renders view details button', () => {
    render(<LearningTrackerPage />);
    expect(screen.getByRole('button', { name: /view details/i })).toBeInTheDocument();
  });
});
