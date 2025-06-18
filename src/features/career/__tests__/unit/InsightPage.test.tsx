import { render, screen, fireEvent } from '@testing-library/react';
import InsightPage from '../../pages/InsightPage';

jest.mock('../../../../config/firebase', () => ({
  trackEvent: jest.fn(),
}));

describe('InsightPage', () => {
  it('renders analytics and recommendations sections', () => {
    render(<InsightPage />);
    expect(screen.getByText(/analytics & recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/user activity/i)).toBeInTheDocument();
    expect(screen.getByText(/visited pages/i)).toBeInTheDocument();
    expect(screen.getByText(/personalized recommendations/i)).toBeInTheDocument();
  });

  it('handles activity and recommendation clicks', () => {
    render(<InsightPage />);
    const activity = screen.getByText(/total sessions/i);
    fireEvent.click(activity);
    const rec = screen.getByText(/improve your cv/i);
    fireEvent.click(rec);
    // No error means click handlers are working
  });
});
