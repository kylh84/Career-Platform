import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import CVOptimizationPage from '../../pages/CVOptimizationPage';

const mockStore = configureStore([]);

describe('CVOptimizationPage Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      cv: {
        currentCV: null,
        analysis: null,
        loading: false,
        error: null,
      },
    });
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <CVOptimizationPage />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders CV upload section', () => {
    renderComponent();
    expect(screen.getByText(/Upload your CV/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /upload/i })).toBeInTheDocument();
  });

  test('handles file upload', async () => {
    renderComponent();
    const file = new File(['dummy content'], 'cv.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/choose file/i);

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: 'cv/uploadCV',
          payload: expect.any(File),
        })
      );
    });
  });

  test('displays file validation errors', () => {
    renderComponent();
    const file = new File(['dummy content'], 'cv.txt', { type: 'text/plain' });
    const input = screen.getByLabelText(/choose file/i);

    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(/Please upload a PDF file/i)).toBeInTheDocument();
  });

  test('shows analysis results', () => {
    store = mockStore({
      cv: {
        currentCV: { name: 'cv.pdf', url: 'http://example.com/cv.pdf' },
        analysis: {
          score: 85,
          suggestions: [
            { type: 'improvement', text: 'Add more keywords' },
            { type: 'strength', text: 'Good structure' },
          ],
        },
        loading: false,
        error: null,
      },
    });

    renderComponent();
    expect(screen.getByText(/CV Score: 85/i)).toBeInTheDocument();
    expect(screen.getByText(/Add more keywords/i)).toBeInTheDocument();
    expect(screen.getByText(/Good structure/i)).toBeInTheDocument();
  });

  test('displays loading state', () => {
    store = mockStore({
      cv: {
        currentCV: null,
        analysis: null,
        loading: true,
        error: null,
      },
    });

    renderComponent();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('shows error message', () => {
    store = mockStore({
      cv: {
        currentCV: null,
        analysis: null,
        loading: false,
        error: 'Failed to analyze CV',
      },
    });

    renderComponent();
    expect(screen.getByText(/Failed to analyze CV/i)).toBeInTheDocument();
  });

  test('handles download of optimized CV', async () => {
    store = mockStore({
      cv: {
        currentCV: { name: 'cv.pdf', url: 'http://example.com/cv.pdf' },
        analysis: {
          score: 85,
          optimizedCV: 'http://example.com/optimized-cv.pdf',
        },
        loading: false,
        error: null,
      },
    });

    renderComponent();
    const downloadButton = screen.getByRole('button', { name: /download optimized cv/i });

    fireEvent.click(downloadButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: 'cv/downloadOptimizedCV',
        })
      );
    });
  });

  test('displays optimization suggestions', () => {
    store = mockStore({
      cv: {
        currentCV: { name: 'cv.pdf', url: 'http://example.com/cv.pdf' },
        analysis: {
          score: 85,
          suggestions: [
            { type: 'improvement', text: 'Add more keywords', priority: 'high' },
            { type: 'strength', text: 'Good structure', priority: 'medium' },
          ],
        },
        loading: false,
        error: null,
      },
    });

    renderComponent();

    const suggestions = screen.getAllByTestId('suggestion-item');
    expect(suggestions).toHaveLength(2);

    expect(screen.getByText(/high priority/i)).toBeInTheDocument();
    expect(screen.getByText(/medium priority/i)).toBeInTheDocument();
  });

  test('allows suggestion feedback', async () => {
    store = mockStore({
      cv: {
        currentCV: { name: 'cv.pdf', url: 'http://example.com/cv.pdf' },
        analysis: {
          score: 85,
          suggestions: [{ id: 1, type: 'improvement', text: 'Add more keywords' }],
        },
        loading: false,
        error: null,
      },
    });

    renderComponent();

    const feedbackButton = screen.getByRole('button', { name: /helpful/i });
    fireEvent.click(feedbackButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        expect.objectContaining({
          type: 'cv/submitSuggestionFeedback',
          payload: { suggestionId: 1, helpful: true },
        })
      );
    });
  });
});
