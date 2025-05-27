import React, { useRef, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';

const mockResult = {
  strengths: ['Experience with Java and React.js'],
  missing: ['Project management skills'],
  score: 84,
};

const CVOptimizationPage: React.FC = () => {
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);

    // Simulate API call with a slight delay for better UX
    setTimeout(() => {
      setResult(mockResult);
      setIsEvaluating(false);
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-900 text-left">Evaluate a CV</h2>
        {/* Card input */}
        <form onSubmit={handleEvaluate} className="bg-white rounded-lg sm:rounded-xl shadow border border-gray-200 w-full mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 sm:p-6">
            {/* CV Upload */}
            <div className="flex-1 flex flex-col">
              <label className="block font-medium mb-2 w-full text-base sm:text-lg">CV</label>
              <div className="flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
                <label htmlFor="cv-upload" className="flex flex-col items-center justify-center w-full h-20 sm:h-24 cursor-pointer">
                  <FaRegFilePdf className="text-6xl sm:text-8xl text-gray-400 mb-2" />
                  <span className="text-gray-500 text-xs sm:text-sm">Upload PDF or text file</span>
                  <input id="cv-upload" ref={fileInputRef} type="file" accept=".pdf,.txt" className="hidden" onChange={handleFileChange} />
                  {fileName && <span className="mt-2 text-xs text-gray-700 truncate max-w-full">{fileName}</span>}
                </label>
              </div>
            </div>
            {/* JD Input */}
            <div className="flex-1 flex flex-col">
              <label className="block font-medium mb-2 text-base sm:text-lg">Job Description</label>
              <textarea className="block w-full border border-gray-200 rounded-lg px-3 py-2 h-32 sm:h-36 resize-none bg-gray-50" />
            </div>
          </div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <button type="submit" className="w-full sm:w-1/2 py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-base sm:text-lg relative" disabled={isEvaluating}>
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
          </div>
        </form>
        {/* Result */}
        <div className={`transition-all duration-500 ease-in-out ${result ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="flex flex-col md:flex-row gap-4 w-full transform transition-transform duration-500 ease-in-out">
            {/* AI Feedback */}
            <div className="flex-1 bg-white rounded-lg sm:rounded-xl shadow border border-gray-200 p-4 sm:p-6">
              <div className="font-semibold mb-2 text-base sm:text-lg">AI Feedback</div>
              <div>
                <div className="font-bold mb-1">Strengths</div>
                <ul className="list-disc pl-5 mb-2">
                  {result?.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <div className="font-bold mb-1">Missing Points</div>
                <ul className="list-disc pl-5">
                  {result?.missing.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Match Score */}
            <div className="w-full md:w-48 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col items-center justify-center">
              <div className="text-lg font-semibold mb-2">Match Score</div>
              <div className="text-5xl font-bold text-blue-700">{result?.score}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVOptimizationPage;
