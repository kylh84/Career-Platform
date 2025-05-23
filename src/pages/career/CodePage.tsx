import React, { useState, useEffect } from 'react';

const mockResult = `The code appears correct. It defines a generator function fibonacci(n) that yields values of the Fibonacci sequence. The function uses a simple iterative approach to generate the sequence, with variables a and b representing successive Fibonacci numbers.`;

const CodePage: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('Python');
  const [result, setResult] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationRequests, setEvaluationRequests] = useState({
    review: false,
    explain: false,
    bugDetection: false,
    optimize: false,
    testCase: false,
  });

  useEffect(() => {
    // Check if at least one evaluation request is selected
    const hasSelectedRequest = Object.values(evaluationRequests).some((value) => value);

    // Only trigger evaluation if all conditions are met
    if (code && language && hasSelectedRequest && !isEvaluating) {
      handleEvaluate();
    }
  }, [code, language, evaluationRequests, isEvaluating]);

  const handleEvaluate = () => {
    setIsEvaluating(true);

    // Simulate API call with a slight delay for better UX
    setTimeout(() => {
      setResult(mockResult);
      setIsEvaluating(false);
    }, 800);
  };

  const handleRequestChange = (key: keyof typeof evaluationRequests) => {
    setEvaluationRequests((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-left">Source Code Evaluation</h2>
        <div className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6 md:p-8 w-full mb-4 sm:mb-6 md:mb-8">
          <div className="mb-4">
            <label className="block font-medium mb-1 text-base sm:text-lg">Language</label>
            <select className="w-full border rounded px-3 py-2 text-sm sm:text-base" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>Python</option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-base sm:text-lg">Code</label>
            <textarea className="w-full border rounded px-3 py-2 text-sm sm:text-base" rows={6} placeholder="Paste your code here..." value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1 text-base sm:text-lg">Evaluation Requests</label>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1.5" checked={evaluationRequests.review} onChange={() => handleRequestChange('review')} /> Review
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-1.5" checked={evaluationRequests.explain} onChange={() => handleRequestChange('explain')} /> Explain
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-1.5" checked={evaluationRequests.bugDetection} onChange={() => handleRequestChange('bugDetection')} /> Bug Detection
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-1.5" checked={evaluationRequests.optimize} onChange={() => handleRequestChange('optimize')} /> Optimize
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-1.5" checked={evaluationRequests.testCase} onChange={() => handleRequestChange('testCase')} /> Test Case
              </label>
            </div>
          </div>
          {isEvaluating && !result && (
            <div className="flex justify-center mb-4">
              <svg className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {result && (
            <div className="bg-gray-100/70 border border-gray-200 rounded-md shadow p-4 sm:p-6 w-full transform transition-transform duration-500 ease-in-out">
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
