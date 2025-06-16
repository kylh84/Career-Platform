import React from 'react';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import { TooltipItem } from 'chart.js';
// import { RecommendationEngine, Recommendation } from '../services/recommendationEngine';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

const LearningTrackerPage: React.FC = () => {
  // const [nextSuggestions, setNextSuggestions] = useState<Recommendation[]>([]);

  const courseProgress = [
    { name: 'Python', progress: 50 },
    { name: 'Web Development', progress: 30 },
    // { name: 'Data Structures', progress: 75 },
    // { name: 'Algorithms', progress: 20 },
  ];

  // Mock data for daily completion (S M T W T F S )
  // 0: empty, 1: completed
  const dailyCompletion = [
    [-1, -1, -1, 0, 0, 0, 1], // Week 1 (Example matching image: S-empty, M-empty, T-completed, etc.)
    [0, 1, 0, 0, 0, 0, 0], // Week 2
    [0, 0, 0, 1, 0, 0, 0], // Week 3
    [0, 0, 0, 0, 1, 0, 0], // Week 4
    [0, 0, 0, 0], // Week 5
  ];

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // // Mock data for Skills Achieved
  // const skillsAchieved = [
  //   'JavaScript Basics',
  //   'React Fundamentals',
  //   'Node.js Express',
  //   'Python Core',
  // ];

  // // Data for Gantt-like chart (Bar Chart)
  // const chartData = {
  //   labels: courseProgress.map(course => course.name),
  //   datasets: [
  //     {
  //       label: 'Progress',
  //       data: courseProgress.map(course => course.progress),
  //       backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue-500 equivalent
  //       borderColor: 'rgba(59, 130, 246, 1)',
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   indexAxis: 'y' as const, // Makes it a horizontal bar chart
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       position: 'top' as const,
  //     },
  //     title: {
  //       display: false,
  //       text: 'Course Progress',
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function(context: TooltipItem<'bar'>) {
  //           let label = context.dataset.label || '';
  //           if (label) {
  //             label += ': ';
  //           }
  //           if (context.parsed.x !== null) {
  //             label += context.parsed.x + '%';
  //           }
  //           return label;
  //         }
  //       }
  //     }
  //   },
  //   scales: {
  //     x: {
  //       min: 0,
  //       max: 100,
  //       title: {
  //         display: true,
  //         text: 'Completion (%)',
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: 'Course',
  //       },
  //     },
  //   },
  // };

  // useEffect(() => {
  //   // Simulate user activity for the recommendation engine
  //   const userActivity = {
  //     totalSessions: 50, // Example value, could be derived from actual user data
  //     cvEvaluations: 3,  // Example value
  //     careerQuizzes: 2,  // Example value
  //     visitedPages: {
  //       cv: 15,    // Example value
  //       code: 25,  // Example value
  //       road: 10,  // Example value
  //       career: 5, // Example value
  //     },
  //   };

  //   const engine = new RecommendationEngine(userActivity);
  //   const suggestions = engine.getRecommendations();
  //   setNextSuggestions(suggestions);
  // }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6 sm:py-8 md:py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Learning Tracker</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress */}
          <div>
            <h2 className="text-xl font-bold mb-4">Course Progress</h2>
            {courseProgress.map((course) => (
              <div key={course.name} className="mb-4">
                <p className="text-lg font-medium mb-1">{course.name}</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-100 rounded-md h-10 flex-1 relative">
                    <div className="bg-blue-600 h-full rounded-md" style={{ width: `${course.progress}%` }}></div>
                    <p className="absolute top-1/2 right-2 -translate-y-1/2 text-lg text-gray-700">{course.progress}% complete</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Completion */}
          <div>
            <h2 className="text-xl font-bold mb-4">Daily Completion</h2>
            <div className="grid grid-cols-8 gap-2 mb-2">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center text-md font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            {dailyCompletion.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-8 gap-2 mb-2">
                {week.map((dayStatus, dayIndex) =>
                  dayStatus === -1 ? (
                    <div key={dayIndex}></div> // Render an empty div for truly absent cells
                  ) : (
                    <div
                      key={dayIndex}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center
                      ${dayStatus === 1 ? 'bg-blue-600' : 'bg-gray-50'}
                    `}
                    ></div>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Achieved */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Skills Achieved</h2>
          <div className="flex flex-wrap gap-2">
            {skillsAchieved.map((skill, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div> */}

        {/* Next Suggestions based on Roadmap */}
        {/* <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Next Suggestions</h2>
          <div className="space-y-4">
            {nextSuggestions.length > 0 ? (
              nextSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-1">{suggestion.title}</h3>
                  <p className="text-blue-700 text-sm">{suggestion.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No new suggestions at the moment. Keep up the good work!</p>
            )}
          </div>
        </div> */}

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg text-lg">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default LearningTrackerPage;
