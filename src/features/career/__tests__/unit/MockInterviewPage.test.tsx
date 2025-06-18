import { render, screen, fireEvent } from '@testing-library/react';
import MockInterviewPage from '../../pages/MockInterviewPage';

describe('MockInterviewPage', () => {
  it('renders question and answer textarea', () => {
    render(<MockInterviewPage />);
    expect(screen.getByRole('heading', { name: /question/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your answer here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next question/i })).toBeInTheDocument();
  });

  it('shows feedback after clicking next question', () => {
    render(<MockInterviewPage />);
    fireEvent.change(screen.getByPlaceholderText(/type your answer here/i), { target: { value: 'RESTful API is ...' } });
    fireEvent.click(screen.getByRole('button', { name: /next question/i }));
    expect(screen.getByText(/ai feedback/i)).toBeInTheDocument();
    expect(screen.getByText(/what you did well/i)).toBeInTheDocument();
    expect(screen.getByText(/suggestions for improvement/i)).toBeInTheDocument();
  });
});
