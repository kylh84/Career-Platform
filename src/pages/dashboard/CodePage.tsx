import React, { useState } from 'react';

const mockResult = `The code appears correct. It defines a generator function fibonacci(n) that yields values of the Fibonacci sequence.`;

const CodePage: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(mockResult); // Replace with API call later
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Source Code Evaluation</h2>
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
        <button type="submit" className="w-full py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium">
          Evaluate
        </button>
      </form>
      {result && (
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
          <div className="font-semibold mb-2">Evaluation Result</div>
          <div className="whitespace-pre-line">{result}</div>
        </div>
      )}
    </div>
  );
};

export default CodePage;
