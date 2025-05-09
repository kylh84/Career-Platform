import React, { useState } from 'react';

const mockCourses = [
  { name: 'Introduction to Data Science', duration: '4 weeks', skills: 'Python, Data Analysis', link: '#' },
  { name: 'Python for Data Analysis', duration: '6 weeks', skills: 'Pandas, Numpy', link: '#' },
  { name: 'Statistics and Probability', duration: '4 weeks', skills: 'Statistics', link: '#' },
  { name: 'Machine Learning Fundamentals', duration: '8 weeks', skills: 'ML Basics', link: '#' },
];

const RoadmapPage: React.FC = () => {
  const [showResult, setShowResult] = useState(false);

  const handleSuggest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl w-full">
        <div className="rounded-t-xl bg-blue-900 px-8 py-4">
          <h2 className="text-3xl font-bold text-white text-center">Learning Path Suggestion</h2>
        </div>
        <form onSubmit={handleSuggest} className="bg-white rounded-b-xl shadow p-8 max-w-6xl mx-auto mb-8">
          <div className="flex items-center mb-4">
            <label className="block font-medium mr-4 w-1/3 min-w-[180px]">Desired Job Role</label>
            <input className="flex-1 border rounded px-3 py-2" placeholder="e.g. Data Scientist" />
          </div>
          <div className="flex items-center mb-4">
            <label className="block font-medium mr-4 w-1/3 min-w-[180px]">Current Knowledge / Skills</label>
            <input className="flex-1 border rounded px-3 py-2" placeholder="e.g. Python, SQL, statistics" />
          </div>
          <button type="submit" className="py-2.5 px-8 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium mb-8 mx-auto block">
            Suggest
          </button>
          {showResult && (
            <div className="max-w-6xl mx-auto">
              <div className="font-semibold mb-2 text-2xl">Courses</div>
              <table className="w-full mb-4 border border-gray-300 border-collapse">
                <thead>
                  <tr>
                    <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50">Course</th>
                    <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50">Duration</th>
                    <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50">Skills Acquired</th>
                    <th className="text-left border-b border-gray-300 px-3 py-2 bg-gray-50">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.map((c, i) => (
                    <tr key={i}>
                      <td className="border-b border-gray-200 px-3 py-2">{c.name}</td>
                      <td className="border-b border-gray-200 px-3 py-2">{c.duration}</td>
                      <td className="border-b border-gray-200 px-3 py-2">{c.skills}</td>
                      <td className="border-b border-gray-200 px-3 py-2">
                        <a href={c.link} className="text-blue-600 underline">
                          Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="font-semibold mb-2">Learning Path</div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {mockCourses.map((c, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3 py-2 bg-blue-100 rounded border border-blue-300 font-medium whitespace-nowrap text-center min-w-[200px]">{c.name}</div>
                    {i < mockCourses.length - 1 && <span className="text-2xl text-gray-400 mx-1">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RoadmapPage;
