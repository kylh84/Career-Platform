import React, { useState, useEffect } from 'react';

// Move mock data to a separate constant
export const MOCK_RESULT = `The code appears correct. It defines a generator function fibonacci(n) that yields values of the Fibonacci sequence. The function uses a simple iterative approach to generate the sequence, with variables a and b representing successive Fibonacci numbers.`;

export const SUPPORTED_LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++'];

export interface EvaluationRequests {
  review: boolean;
  explain: boolean;
  bugDetection: boolean;
  optimize: boolean;
  testCase: boolean;
}

const CodePage: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [result, setResult] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationRequests, setEvaluationRequests] = useState<EvaluationRequests>({
    review: false,
    explain: false,
    bugDetection: false,
    optimize: false,
    testCase: false,
  });

  useEffect(() => {
    const hasSelectedRequest = Object.values(evaluationRequests).some((value) => value);
    if (code && language && hasSelectedRequest && !isEvaluating) {
      handleEvaluate();
    }
  }, [code, language, evaluationRequests, isEvaluating]);

  const handleEvaluate = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setIsEvaluating(false);
    }, 800);
  };

  const handleRequestChange = (key: keyof EvaluationRequests) => {
    setEvaluationRequests((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 px-4 sm:px-6" data-testid="code-page">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-left" data-testid="page-title">
          Source Code Evaluation
        </h2>
        <div className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6 md:p-8 w-full mb-4 sm:mb-6 md:mb-8">
          <div className="mb-4">
            <label className="block font-medium mb-1 text-base sm:text-lg">Language</label>
            <select className="w-full border rounded px-3 py-2 text-sm sm:text-base" value={language} onChange={(e) => setLanguage(e.target.value)} data-testid="language-select">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-base sm:text-lg">Code</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-sm sm:text-base"
              rows={6}
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              data-testid="code-input"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-base sm:text-lg">Evaluation Requests</label>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base" data-testid="evaluation-requests">
              {Object.entries(evaluationRequests).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input type="checkbox" className="mr-1.5" checked={value} onChange={() => handleRequestChange(key as keyof EvaluationRequests)} data-testid={`checkbox-${key}`} />
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
              ))}
            </div>
          </div>
          {isEvaluating && !result && (
            <div className="flex justify-center mb-4" data-testid="loading-spinner">
              <svg className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {result && (
            <div className="bg-gray-100/70 border border-gray-200 rounded-md shadow p-4 sm:p-6 w-full transform transition-transform duration-500 ease-in-out" data-testid="result-container">
              <div className="font-semibold mb-2 text-base sm:text-lg">Evaluation Result</div>
              <div className="whitespace-pre-line text-sm sm:text-base">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
