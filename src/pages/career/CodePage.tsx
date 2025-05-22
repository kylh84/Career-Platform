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
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-left">Source Code Evaluation</h2>
        <div className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto mb-8">
          <div className="mb-4">
            <label className="block font-medium mb-1">Language</label>
            <select className="w-full border rounded px-3 py-2" value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>Python</option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Code</label>
            <textarea className="w-full border rounded px-3 py-2" rows={6} placeholder="Paste your code here..." value={code} onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Evaluation Requests</label>
            <div className="flex gap-4 flex-wrap">
              <label>
                <input type="checkbox" checked={evaluationRequests.review} onChange={() => handleRequestChange('review')} /> Review
              </label>
              <label>
                <input type="checkbox" checked={evaluationRequests.explain} onChange={() => handleRequestChange('explain')} /> Explain
              </label>
              <label>
                <input type="checkbox" checked={evaluationRequests.bugDetection} onChange={() => handleRequestChange('bugDetection')} /> Bug Detection
              </label>
              <label>
                <input type="checkbox" checked={evaluationRequests.optimize} onChange={() => handleRequestChange('optimize')} /> Optimize
              </label>
              <label>
                <input type="checkbox" checked={evaluationRequests.testCase} onChange={() => handleRequestChange('testCase')} /> Test Case
              </label>
            </div>
          </div>
          {isEvaluating && !result && (
            <div className="flex justify-center mb-4">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}

          {result && (
            <div className="bg-gray-100/70 border border-gray-200 rounded-md shadow p-6 max-w-3xl mx-auto transform transition-transform duration-500 ease-in-out">
              <div className="font-semibold mb-2">Evaluation Result</div>
              <div className="whitespace-pre-line">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePage;
