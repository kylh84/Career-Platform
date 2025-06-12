import React, { useState } from 'react';

const mockCourses = [
  { name: 'Introduction to Data Science', duration: '4 weeks', link: '#' },
  { name: 'Python for Data Analysis', duration: '6 weeks', link: '#' },
  { name: 'Statistics and Probability', duration: '4 weeks', link: '#' },
  { name: 'Machine Learning Fundamentals', duration: '8 weeks', link: '#' },
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
    <div className="min-h-screen bg-gray-50 py-6 px-2 sm:px-4 md:px-8 xl:px-14 overflow-x-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <div className="rounded-t-lg sm:rounded-t-xl bg-blue-900 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">Learning Path Suggestion</h2>
        </div>
        <form onSubmit={handleSuggest} className="bg-white rounded-b-lg sm:rounded-b-xl shadow p-3 sm:p-4 md:p-6 w-full mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center mb-4">
            <label className="block font-medium mb-2 lg:mb-0 lg:mr-4 lg:w-1/3 lg:min-w-[180px] text-base">Desired Job Role</label>
            <input className="flex-1 border rounded px-3 py-2 text-sm sm:text-base w-full lg:w-auto" placeholder="e.g. Data Scientist" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center mb-4">
            <label className="block font-medium mb-2 lg:mb-0 lg:mr-4 lg:w-1/3 lg:min-w-[180px] text-base">Current Knowledge / Skills</label>
            <input className="flex-1 border rounded px-3 py-2 text-sm sm:text-base w-full lg:w-auto" placeholder="e.g. Python, SQL, statistics" />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto py-2.5 px-6 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium mb-6 mx-auto block relative text-sm sm:text-base"
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
              <div className="font-semibold mb-4 text-xl">Courses</div>

              {/* Desktop Table View */}
              <div className="hidden lg:block mb-6">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 border border-gray-200 font-medium">Course</th>
                      <th className="text-left py-3 px-4 border border-gray-200 font-medium w-[120px]">Duration</th>
                      <th className="text-left py-3 px-4 border border-gray-200 font-medium w-[180px]">Skills Acquired</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCourses.map((c, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="py-3 px-4 border border-gray-200">{c.name}</td>
                        <td className="py-3 px-4 border border-gray-200">{c.duration}</td>
                        <td className="py-3 px-4 border border-gray-200">
                          <a href={c.link} className="text-blue-600 hover:underline">
                            Link
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4 mb-6">
                {mockCourses.map((c, i) => (
                  <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
                    <h3 className="font-medium text-base mb-2">{c.name}</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Duration:</span> {c.duration}
                      </p>
                      <p>
                        <span className="font-medium">Skills Acquired:</span>{' '}
                        <a href={c.link} className="text-blue-600 hover:underline">
                          Link
                        </a>
                      </p>

                      <a href={c.link} className="text-blue-600 hover:underline block mt-2">
                        View Course
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="font-semibold mb-2 text-base">Learning Path</div>

              {/* Desktop/Tablet Horizontal Path */}
              <div className="hidden lg:flex items-center gap-2 mb-4 flex-wrap">
                {mockCourses.map((c, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3 py-2 bg-gray-200 rounded border border-gray-400 font-medium text-center text-sm flex-1 min-w-[150px]">{c.name}</div>
                    {i < mockCourses.length - 1 && <span className="text-xl text-gray-400">→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Mobile Vertical Path */}
              <div className="lg:hidden space-y-2">
                {mockCourses.map((c, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3 py-2 bg-blue-100 rounded border border-blue-300 font-medium text-center text-sm">{c.name}</div>
                    {i < mockCourses.length - 1 && (
                      <div className="flex justify-center">
                        <span className="text-xl text-gray-400 transform rotate-90">→</span>
                      </div>
                    )}
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
