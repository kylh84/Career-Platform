import React, { useState } from 'react';

const mockCourses = [
  { name: 'Introduction to Data Science', duration: '4 weeks', skills: 'Python, Data Analysis', link: '#' },
  { name: 'Python for Data Analysis', duration: '6 weeks', skills: 'Pandas, Numpy', link: '#' },
  { name: 'Statistics and Probability', duration: '4 weeks', skills: 'Statistics', link: '#' },
  { name: 'Machine Learning Fundamentals', duration: '8 weeks', skills: 'ML Basics', link: '#' },
];

const RoadmapPage: React.FC = () => {
  const [showResult, setShowResult] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuggesting(true);

    // Simulate API call with a slight delay for better UX
    setTimeout(() => {
      setShowResult(true);
      setIsSuggesting(false);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-6xl">
        <div className="rounded-t-lg sm:rounded-t-xl bg-blue-900 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">Learning Path Suggestion</h2>
        </div>
        <form onSubmit={handleSuggest} className="bg-white rounded-b-lg sm:rounded-b-xl shadow p-4 sm:p-6 md:p-8 w-full mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center mb-4">
            <label className="block font-medium mb-2 sm:mb-0 sm:mr-4 sm:w-1/3 sm:min-w-[180px] text-base sm:text-lg">Desired Job Role</label>
            <input className="flex-1 border rounded px-3 py-2 text-sm sm:text-base" placeholder="e.g. Data Scientist" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center mb-4">
            <label className="block font-medium mb-2 sm:mb-0 sm:mr-4 sm:w-1/3 sm:min-w-[180px] text-base sm:text-lg">Current Knowledge / Skills</label>
            <input className="flex-1 border rounded px-3 py-2 text-sm sm:text-base" placeholder="e.g. Python, SQL, statistics" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto py-2.5 px-6 sm:px-8 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium mb-6 sm:mb-8 mx-auto block relative text-sm sm:text-base"
            disabled={isSuggesting}
          >
            {isSuggesting ? (
              <>
                <span className="opacity-0 px-4">Suggest</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              'Suggest'
            )}
          </button>

          <div className={`transition-all duration-500 ease-in-out ${showResult ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <div className="w-full transform transition-transform duration-500 ease-in-out">
              <div className="font-semibold mb-2 text-xl sm:text-2xl">Courses</div>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full mb-4 border border-gray-300 border-collapse min-w-[600px]">
                  <thead>
                    <tr>
                      <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50 text-sm sm:text-base">Course</th>
                      <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50 text-sm sm:text-base">Duration</th>
                      <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50 text-sm sm:text-base">Skills Acquired</th>
                      <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50 text-sm sm:text-base">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCourses.map((c, i) => (
                      <tr key={i}>
                        <td className="border-b border-gray-200 px-3 py-2 text-sm sm:text-base">{c.name}</td>
                        <td className="border-b border-gray-200 px-3 py-2 text-sm sm:text-base">{c.duration}</td>
                        <td className="border-b border-gray-200 px-3 py-2 text-sm sm:text-base">{c.skills}</td>
                        <td className="border-b border-gray-200 px-3 py-2 text-sm sm:text-base">
                          <a href={c.link} className="text-blue-600 underline">
                            Link
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="font-semibold mb-2 text-base sm:text-lg">Learning Path</div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0">
                {mockCourses.map((c, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3 py-2 bg-blue-100 rounded border border-blue-300 font-medium whitespace-nowrap text-center min-w-[180px] sm:min-w-[200px] text-sm sm:text-base">{c.name}</div>
                    {i < mockCourses.length - 1 && <span className="text-xl sm:text-2xl text-gray-400 mx-1">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoadmapPage;
