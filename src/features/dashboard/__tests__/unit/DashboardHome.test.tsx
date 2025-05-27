import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import DashboardHome from '../../pages/DashboardHome';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DashboardHome Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <DashboardHome />
      </BrowserRouter>
    );
  };

  test('renders dashboard title', () => {
    renderComponent();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders all feature cards', () => {
    renderComponent();
    expect(screen.getByText('CV Optimization')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
    expect(screen.getByText('Learning Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Career Guidance')).toBeInTheDocument();
  });

  test('renders feature descriptions', () => {
    renderComponent();
    expect(screen.getByText('Improve your resume with AI-driven insights')).toBeInTheDocument();
    expect(screen.getByText('Get feedback on your code from analysis')).toBeInTheDocument();
    expect(screen.getByText('Follow a tailored path to master new skills')).toBeInTheDocument();
    expect(screen.getByText('Receive advice on your IT career development')).toBeInTheDocument();
  });

  test('navigates to correct routes when clicking feature cards', () => {
    renderComponent();

    // CV Optimization card
    fireEvent.click(screen.getByText('CV Optimization').closest('div')!);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/cv');

    // Code Review card
    fireEvent.click(screen.getByText('Code Review').closest('div')!);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/code');

    // Learning Roadmap card
    fireEvent.click(screen.getByText('Learning Roadmap').closest('div')!);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/roadmap');

    // Career Guidance card
    fireEvent.click(screen.getByText('Career Guidance').closest('div')!);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/career');
  });

  test('renders feature icons', () => {
    renderComponent();
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);

    expect(images[0]).toHaveAttribute('alt', 'CV Optimization');
    expect(images[1]).toHaveAttribute('alt', 'Code Review');
    expect(images[2]).toHaveAttribute('alt', 'Learning Roadmap');
    expect(images[3]).toHaveAttribute('alt', 'Career Guidance');
  });

  test('applies hover styles to feature cards', () => {
    renderComponent();
    const cards = screen.getAllByRole('img').map((img) => img.closest('div')!.parentElement);

    cards.forEach((card) => {
      expect(card).toHaveClass('hover:shadow-lg');
      expect(card).toHaveClass('transition-shadow');
      expect(card).toHaveClass('duration-300');
    });
  });
});
