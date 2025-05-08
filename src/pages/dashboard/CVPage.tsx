import React, { useRef, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const mockResult = {
  strengths: ['Experience with Java and React.js'],
  missing: ['Project management skills'],
  score: 84,
};

const CVPage: React.FC = () => {
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(mockResult); // Replace with API call later
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10 ">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Evaluate a CV</h2>
      {/* Card input */}
      <form onSubmit={handleEvaluate} className="bg-white rounded-xl shadow border border-gray-200 max-w-3xl w-full mb-6">
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 p-6">
          {/* CV Upload */}
          <div className="flex-1 flex flex-col">
            <label className="block font-medium mb-2 w-full text-lg">CV</label>
            <div className="flex-1 flex flex-col items-center justify-center border border-gray-200  rounded-lg p-6 mr-0 md:mr-2 mb-4 md:mb-0 bg-gray-50">
              <label htmlFor="cv-upload" className="flex flex-col items-center justify-center w-full h-24 cursor-pointer">
                <FaRegFilePdf className="text-8xl text-gray-400 mb-2" />
                <span className="text-gray-500 text-sm">Upload PDF or text file</span>
                <input id="cv-upload" ref={fileInputRef} type="file" accept=".pdf,.txt" className="hidden" onChange={handleFileChange} />
                {fileName && <span className="mt-2 text-xs text-gray-700 truncate max-w-full">{fileName}</span>}
              </label>
            </div>
          </div>
          {/* JD Input */}
          <div className="flex-1 flex flex-col">
            <label className="block font-medium mb-2 text-lg">Job Description</label>
            <textarea className="block w-full border border-gray-200 rounded-lg px-3 py-2 h-36 resize-none bg-gray-50" />
          </div>
        </div>
        <div className="px-6 pb-6">
          <button type="submit" className="w-1/2 py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-lg">
            Evaluate
          </button>
        </div>
      </form>
      {/* Result */}
      {result && (
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl w-full">
          {/* AI Feedback */}
          <div className="flex-1 bg-white rounded-xl shadow border border-gray-200 p-6">
            <div className="font-semibold mb-2 text-lg">AI Feedback</div>
            <div>
              <div className="font-bold mb-1">Strengths</div>
              <ul className="list-disc pl-5 mb-2">
                {result.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <div className="font-bold mb-1">Missing Points</div>
              <ul className="list-disc pl-5">
                {result.missing.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Match Score */}
          <div className="w-full md:w-48 bg-white rounded-xl shadow border border-gray-200 p-6 flex flex-col items-center justify-center">
            <div className="text-lg font-semibold mb-2">Match Score</div>
            <div className="text-5xl font-bold text-blue-700">{result.score}%</div>
          </div>
        </div>
      )}
      <p className="text-center mt-4">
        Want to generate a CV draft?{' '}
        <button type="button" className="text-blue-600 underline hover:text-blue-800 font-medium" onClick={() => navigate('/dashboard/cv/suggestion')}>
          Click here!
        </button>
      </p>
    </div>
  );
};

export default CVPage;
