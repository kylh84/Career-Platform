import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Error404 from '../404Error';

describe('404Error', () => {
  beforeEach(() => {
    // Clear any added links before each test
    document.head.innerHTML = '';
  });

  it('should render 404 layout correctly', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText("Look like you're lost")).toBeInTheDocument();
    expect(screen.getByText('the page you are looking for not avaible!')).toBeInTheDocument();
  });

  it('should dynamically load Bootstrap and Arvo font', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    // Check if Bootstrap CSS is loaded
    const bootstrapLink = document.querySelector('link[href*="bootstrap"]');
    expect(bootstrapLink).toBeInTheDocument();
    expect(bootstrapLink?.getAttribute('href')).toBe('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css');

    // Check if Arvo font is loaded
    const arvoLink = document.querySelector('link[href*="Arvo"]');
    expect(arvoLink).toBeInTheDocument();
    expect(arvoLink?.getAttribute('href')).toBe('https://fonts.googleapis.com/css?family=Arvo');
  });

  it('should cleanup dynamic links on unmount', () => {
    const { unmount } = render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    // Get references to links before unmount
    const bootstrapLink = document.querySelector('link[href*="bootstrap"]');
    const arvoLink = document.querySelector('link[href*="Arvo"]');

    // Unmount component
    unmount();

    // Check if links were removed
    expect(bootstrapLink).not.toBeInTheDocument();
    expect(arvoLink).not.toBeInTheDocument();
  });

  it('should render "Go to Dashboard" link that points to dashboard page', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    const dashboardLink = screen.getByRole('link', { name: 'Go to Dashboard' });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
  });

  it('should display correct error messages', () => {
    render(
      <BrowserRouter>
        <Error404 />
      </BrowserRouter>
    );

    expect(screen.getByText("Look like you're lost")).toBeInTheDocument();
    expect(screen.getByText('the page you are looking for not avaible!')).toBeInTheDocument();
  });
});
