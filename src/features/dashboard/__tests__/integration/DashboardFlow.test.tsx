import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardHome from '../../pages/DashboardHome';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Dashboard Integration Flow', () => {
  test('renders all feature cards', () => {
    renderWithRouter(<DashboardHome />);

    expect(screen.getByText('CV Optimization')).toBeInTheDocument();
    expect(screen.getByText('Code Review')).toBeInTheDocument();
    expect(screen.getByText('Learning Roadmap')).toBeInTheDocument();
    expect(screen.getByText('Career Guidance')).toBeInTheDocument();
  });

  test('feature cards are clickable', () => {
    renderWithRouter(<DashboardHome />);

    const cvCard = screen.getByText('CV Optimization').closest('div[class*="cursor-pointer"]');
    const codeCard = screen.getByText('Code Review').closest('div[class*="cursor-pointer"]');
    const roadmapCard = screen.getByText('Learning Roadmap').closest('div[class*="cursor-pointer"]');
    const careerCard = screen.getByText('Career Guidance').closest('div[class*="cursor-pointer"]');

    expect(cvCard).toBeTruthy();
    expect(codeCard).toBeTruthy();
    expect(roadmapCard).toBeTruthy();
    expect(careerCard).toBeTruthy();
  });
});
