import React, { useState } from 'react';
import { trackEvent } from '../../../config/firebase';

const mockAdvice = 'Focus on building real projects, contribute to open source, and improve your communication skills.';

const CareerPage: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);
  const [question, setQuestion] = useState('');

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAsking(true);

    // Track the question being asked
    trackEvent('career_question_asked', {
      question: question,
      timestamp: new Date().toISOString(),
    });

    // Simulate API call with a slight delay for better UX
    setTimeout(() => {
      setResult(mockAdvice);
      setIsAsking(false);

      // Track when advice is received
      trackEvent('career_advice_received', {
        question: question,
        has_advice: true,
      });
    }, 800);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-left">Career Guidance</h2>
        <form onSubmit={handleAsk} className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6 md:p-8 w-full mb-4 sm:mb-6 md:mb-8">
          <div className="mb-4">
            <label htmlFor="career-question" className="block font-medium mb-1 text-base sm:text-lg">
              Your Question
            </label>
            <input
              id="career-question"
              className="w-full border rounded px-3 py-2 text-sm sm:text-base"
              placeholder="e.g. How to become a backend developer?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-sm sm:text-base relative"
            disabled={isAsking}
            onClick={() => trackEvent('career_guidance_button_click')}
          >
            {isAsking ? (
              <>
                <span className="opacity-0">Ask</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              'Ask'
            )}
          </button>
        </form>

        <div className={`transition-all duration-500 ease-in-out ${result ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6 w-full transform transition-transform duration-500 ease-in-out">
            <div className="font-semibold mb-2 text-base sm:text-lg">AI Advice</div>
            <div className="text-sm sm:text-base">{result}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPage;
