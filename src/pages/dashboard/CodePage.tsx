import React, { useState } from 'react';

const mockResult = `The code appears correct. It defines a generator function fibonacci(n) that yields values of the Fibonacci sequence.`;

const CodePage: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    // Simulate API call with a slight delay for better UX
    setTimeout(() => {
      setResult(mockResult);
      setIsEvaluating(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-left">Source Code Evaluation</h2>
        <form onSubmit={handleEvaluate} className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto mb-8">
          <div className="mb-4">
            <label className="block font-medium mb-1">Language</label>
            <select className="w-full border rounded px-3 py-2">
              <option>Python</option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Code</label>
            <textarea className="w-full border rounded px-3 py-2" rows={6} placeholder="Paste your code here..." />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Evaluation Requests</label>
            <div className="flex gap-4 flex-wrap">
              <label>
                <input type="checkbox" /> Review
              </label>
              <label>
                <input type="checkbox" /> Explain
              </label>
              <label>
                <input type="checkbox" /> Bug Detection
              </label>
              <label>
                <input type="checkbox" /> Optimize
              </label>
              <label>
                <input type="checkbox" /> Test Case
              </label>
            </div>
          </div>
          <button type="submit" className="w-full py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium relative" disabled={isEvaluating}>
            {isEvaluating ? (
              <>
                <span className="opacity-0">Evaluate</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              'Evaluate'
            )}
          </button>
        </form>

        <div className={`transition-all duration-500 ease-in-out ${result ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto transform transition-transform duration-500 ease-in-out">
            <div className="font-semibold mb-2">Evaluation Result</div>
            <div className="whitespace-pre-line">{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
