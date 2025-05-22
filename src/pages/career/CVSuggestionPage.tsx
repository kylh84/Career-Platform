import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

const mockDraft = {
  summary: 'Results-oriented software engineer with expertise in Java and Python. Experienced in building responsive front-end applications.',
};

const CVSuggestionPage: React.FC = () => {
  const [position, setPosition] = useState('Software Engineer');
  const [skills, setSkills] = useState('Java, Python\nFront-end development');
  const [draft, setDraft] = useState<typeof mockDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate API call with a slight delay for better UX
    setTimeout(() => {
      setDraft(mockDraft);
      setIsGenerating(false);
    }, 800);
  };

  const handleDownload = () => {
    // Simple download as .txt (replace with docx/pdf export if needed)
    const element = document.createElement('a');
    const file = new Blob([draft?.summary || ''], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cv-draft.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-left">CV Presentation Suggestions</h2>
        <form onSubmit={handleGenerate} className="bg-white rounded-xl shadow border border-gray-200 max-w-3xl w-full mb-6 p-6">
          <div className="mb-4">
            <label className="block font-medium mb-1">Position</label>
            <input className="w-full border rounded px-3 py-2" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g. Software Engineer" />
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-1">Skills, Experience, Education</label>
            <textarea className="w-full border rounded px-3 py-2" rows={3} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. Java, Python, Front-end development" />
          </div>
          <button type="submit" className="w-1/2 py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-lg relative" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <span className="opacity-0">Generate</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              'Generate'
            )}
          </button>
        </form>

        <div className={`transition-all duration-500 ease-in-out ${draft ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="bg-white rounded-xl shadow border border-gray-200 max-w-3xl w-full p-6 mt-2 transform transition-transform duration-500 ease-in-out">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-lg">CV Draft</div>
              <button onClick={handleDownload} className="flex items-center text-blue-600 hover:underline text-sm">
                <FiDownload className="mr-1" /> Download
              </button>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <div className="font-bold mb-1">Summary</div>
              <div>{draft?.summary}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSuggestionPage;
