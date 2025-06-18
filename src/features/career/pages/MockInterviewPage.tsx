import React, { useState } from 'react';

interface Feedback {
  whatYouDidWell: string[];
  suggestionsForImprovement: string[];
}

const MockInterviewPage: React.FC = () => {
  const [question, setQuestion] = useState<string>('Can you explain the concept of a RESTful API?');
  const [answer, setAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [interviewStatus, setInterviewStatus] = useState<'in-progress' | 'ended'>('in-progress');

  const handleNextQuestion = () => {
    // Simulate fetching next question or providing feedback based on current answer
    setFeedback({
      whatYouDidWell: ['You provided a clear explanation of the RESTful API principles.'],
      suggestionsForImprovement: ['Consider providing more examples to illustrate your points.', 'Extend your answer by discussing different HTTP methods and status codes'],
    });
    setQuestion('What are the main principles of OOP?'); // Mock next question
    setAnswer(''); // Clear previous answer
  };

  const handleEndInterview = () => {
    setInterviewStatus('ended');
    setFeedback(null); // Clear feedback when ending interview
    setAnswer('');
    setQuestion('');
  };

  const handleStartNewInterview = () => {
    // Implementation for starting a new interview
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Mock Interview</h1>

        <div className="flex flex-wrap justify-end gap-4 mb-8">
          {interviewStatus === 'in-progress' ? (
            <>
              <span className="bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg">In progress</span>
              <button onClick={handleEndInterview} className=" text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-200">
                End Interview
              </button>
            </>
          ) : (
            <button onClick={handleStartNewInterview} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
              Start New Interview
            </button>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Question</h2>
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-gray-800 min-h-[100px] flex items-center">{question}</div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Your Answer</h2>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={2}
            placeholder="Type your answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={interviewStatus === 'ended'}
          ></textarea>
        </div>

        <button onClick={handleNextQuestion} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mb-8" disabled={interviewStatus === 'ended'}>
          Next Question
        </button>

        {feedback && ( // Only show feedback if it exists
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">AI Feedback</h2>
            <div className="mb-4">
              <h3 className="font-bold text-blue-700 mb-2">What you did well</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1 pl-2">
                {feedback.whatYouDidWell.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Suggestions for improvement</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-1 pl-2">
                {feedback.suggestionsForImprovement.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterviewPage;
