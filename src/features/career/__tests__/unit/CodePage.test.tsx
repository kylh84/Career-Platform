import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import CodePage, { MOCK_RESULT, SUPPORTED_LANGUAGES } from '../../pages/CodePage';

describe('CodePage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('renders correctly with initial state', () => {
    render(<CodePage />);

    // Check title
    expect(screen.getByTestId('page-title')).toHaveTextContent('Source Code Evaluation');

    // Check language select
    const languageSelect = screen.getByTestId('language-select');
    expect(languageSelect).toHaveValue(SUPPORTED_LANGUAGES[0]);

    // Check code input
    const codeInput = screen.getByTestId('code-input');
    expect(codeInput).toHaveValue('');
    expect(codeInput).toHaveAttribute('placeholder', 'Paste your code here...');

    // Check evaluation requests
    const evaluationRequests = screen.getByTestId('evaluation-requests');
    expect(evaluationRequests).toBeInTheDocument();

    // Check all checkboxes are unchecked initially
    ['review', 'explain', 'bugDetection', 'optimize', 'testCase'].forEach((key) => {
      const checkbox = screen.getByTestId(`checkbox-${key}`);
      expect(checkbox).not.toBeChecked();
    });

    // Result should not be visible initially
    expect(screen.queryByTestId('result-container')).not.toBeInTheDocument();
  });

  it('handles language selection', () => {
    render(<CodePage />);
    const languageSelect = screen.getByTestId('language-select');

    SUPPORTED_LANGUAGES.forEach((language) => {
      act(() => {
        fireEvent.change(languageSelect, { target: { value: language } });
      });
      expect(languageSelect).toHaveValue(language);
    });
  });

  it('handles code input', () => {
    render(<CodePage />);
    const codeInput = screen.getByTestId('code-input');
    const testCode = 'def test(): pass';

    act(() => {
      fireEvent.change(codeInput, { target: { value: testCode } });
    });
    expect(codeInput).toHaveValue(testCode);
  });

  it('handles evaluation request checkboxes', () => {
    render(<CodePage />);

    ['review', 'explain', 'bugDetection', 'optimize', 'testCase'].forEach((key) => {
      const checkbox = screen.getByTestId(`checkbox-${key}`);
      act(() => {
        fireEvent.click(checkbox);
      });
      expect(checkbox).toBeChecked();
      act(() => {
        fireEvent.click(checkbox);
      });
      expect(checkbox).not.toBeChecked();
    });
  });

  it('shows loading state and result when conditions are met', async () => {
    render(<CodePage />);

    // Enter code
    const codeInput = screen.getByTestId('code-input');
    act(() => {
      fireEvent.change(codeInput, { target: { value: 'def test(): pass' } });
    });

    // Select a request
    const reviewCheckbox = screen.getByTestId('checkbox-review');
    act(() => {
      fireEvent.click(reviewCheckbox);
    });

    // Check loading state appears
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // Fast-forward timer
    act(() => {
      jest.advanceTimersByTime(800);
    });

    // Check result appears
    await waitFor(() => {
      expect(screen.getByTestId('result-container')).toBeInTheDocument();
      expect(screen.getByText(MOCK_RESULT)).toBeInTheDocument();
    });
  });

  it('does not evaluate if no code is entered', () => {
    render(<CodePage />);

    // Select a request without entering code
    const reviewCheckbox = screen.getByTestId('checkbox-review');
    act(() => {
      fireEvent.click(reviewCheckbox);
    });

    // Check loading state does not appear
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('does not evaluate if no request is selected', () => {
    render(<CodePage />);

    // Enter code without selecting a request
    const codeInput = screen.getByTestId('code-input');
    act(() => {
      fireEvent.change(codeInput, { target: { value: 'def test(): pass' } });
    });

    // Check loading state does not appear
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });
});
