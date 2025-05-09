import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';

const mockDraft = {
  summary: 'Results-oriented software engineer with expertise in Java and Python. Experienced in building responsive front-end applications.',
};

const CVSuggestionPage: React.FC = () => {
  const [position, setPosition] = useState('Software Engineer');
  const [skills, setSkills] = useState('Java, Python\nFront-end development');
  const [draft, setDraft] = useState<typeof mockDraft | null>(mockDraft);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API here, setDraft(response)
    setDraft(mockDraft);
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
          <button type="submit" className="w-1/2 py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-lg">
            Generate
          </button>
        </form>
        {draft && (
          <div className="bg-white rounded-xl shadow border border-gray-200 max-w-3xl w-full p-6 mt-2">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-lg">CV Draft</div>
              <button onClick={handleDownload} className="flex items-center text-blue-600 hover:underline text-sm">
                <FiDownload className="mr-1" /> Download
              </button>
            </div>
            <div className="bg-gray-50 rounded p-4">
              <div className="font-bold mb-1">Summary</div>
              <div>{draft.summary}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVSuggestionPage;
