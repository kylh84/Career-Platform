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
    <div>
      <h2 className="text-2xl font-bold mb-6">Learning Path Suggestion</h2>
      <form onSubmit={handleSuggest} className="bg-white rounded-xl shadow p-8 max-w-3xl mx-auto mb-8">
        <div className="mb-4">
          <label className="block font-medium mb-1">Desired Job Role</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g. Data Scientist" />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Current Knowledge / Skills</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g. Python, SQL, statistics" />
        </div>
        <button type="submit" className="w-full py-2.5 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium">
          Suggest
        </button>
      </form>
      {showResult && (
        <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
          <div className="font-semibold mb-2">Courses</div>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="text-left">Course</th>
                <th className="text-left">Duration</th>
                <th className="text-left">Skills Acquired</th>
                <th className="text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {mockCourses.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.duration}</td>
                  <td>{c.skills}</td>
                  <td>
                    <a href={c.link} className="text-blue-600 underline">
                      Link
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-semibold mb-2">Learning Path</div>
          <div className="flex gap-2 flex-wrap">
            {mockCourses.map((c, i) => (
              <div key={i} className="px-3 py-1 bg-blue-100 rounded">
                {c.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
