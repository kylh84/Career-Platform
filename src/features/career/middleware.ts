import { Middleware } from '@reduxjs/toolkit';
import { analyzeCode, analyzeCodeSuccess, analyzeCodeFailure, uploadFile, formatCode } from './slice';

// Giả lập API call với một số kết quả mẫu
const mockAnalyzeCode = async (code: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập delay

  // Phân tích code Python mẫu
  if (code.includes('fibonacci')) {
    return {
      issues: [
        { type: 'Style', message: 'Consider adding type hints for parameters', line: 1 },
        { type: 'Performance', message: 'Using iterative approach might be more efficient', line: 2 },
      ],
      score: 85,
      suggestions: [
        { type: 'improvement', text: 'Add docstring to explain the function', priority: 'high' },
        { type: 'style', text: 'Use type hints for better code readability', priority: 'medium' },
      ],
    };
  }

  // Kết quả mặc định
  return {
    issues: [
      { type: 'Style', message: 'Consider using meaningful variable names', line: 1 },
      { type: 'Best Practice', message: 'Add comments to explain complex logic', line: 3 },
    ],
    score: 75,
    suggestions: [
      { type: 'improvement', text: 'Add error handling for edge cases', priority: 'high' },
      { type: 'style', text: 'Follow PEP 8 style guide', priority: 'medium' },
    ],
  };
};

export const codeMiddleware: Middleware = (store) => (next) => async (action) => {
  next(action);

  if (analyzeCode.match(action)) {
    try {
      const result = await mockAnalyzeCode(action.payload);
      store.dispatch(analyzeCodeSuccess(result));
    } catch (error) {
      store.dispatch(analyzeCodeFailure(error instanceof Error ? error.message : 'Failed to analyze code'));
    }
  }

  if (uploadFile.match(action)) {
    // Xử lý upload file ở đây
    try {
      const file = action.payload;
      const reader = new FileReader();
      reader.onload = async (e) => {
        const code = e.target?.result as string;
        store.dispatch(analyzeCode(code));
      };
      reader.readAsText(file);
    } catch (error) {
      store.dispatch(analyzeCodeFailure(error instanceof Error ? error.message : 'Failed to upload file'));
    }
  }

  if (formatCode.match(action)) {
    try {
      // Giả lập format code
      await new Promise((resolve) => setTimeout(resolve, 500));
      const currentState = store.getState();
      const currentCode = currentState.code.currentCode;
      if (currentCode) {
        // Giả lập format bằng cách thêm một số khoảng trắng
        const formattedCode = currentCode.replace(/\n/g, '\n  ');
        store.dispatch(analyzeCode(formattedCode));
      }
    } catch (error) {
      store.dispatch(analyzeCodeFailure(error instanceof Error ? error.message : 'Failed to format code'));
    }
  }
};
