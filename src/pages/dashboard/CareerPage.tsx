import React, { useState } from 'react';

const mockAdvice = 'Focus on building real projects, contribute to open source, and improve your communication skills.';

const CareerPage: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(mockAdvice); // Replace with API call later
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-left">Career Guidance</h2>
        <form onSubmit={handleAsk} className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto mb-8">
          <div className="mb-4">
            <label className="block font-medium mb-1">Your Question</label>
            <input className="w-full border rounded px-3 py-2" placeholder="e.g. How to become a backend developer?" />
          </div>
          <button type="submit" className="w-full py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium">
            Ask
          </button>
        </form>
        {result && (
          <div className="bg-white rounded-xl shadow p-6 max-w-3xl mx-auto">
            <div className="font-semibold mb-2">AI Advice</div>
            <div>{result}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPage;
