import { FaRegLightbulb } from 'react-icons/fa';
import { useEffect } from 'react';
import { trackEvent } from '../../../config/firebase';

const mockActivity = [
  { label: 'Total Sessions', value: 42 },
  { label: 'CV Evaluations', value: 10 },
  { label: 'Career Quizzes', value: 5 },
];

const mockVisited = [
  { label: 'CV', value: 35 },
  { label: 'Code', value: 23 },
  { label: 'Road', value: 19 },
  { label: 'Career', value: 13 },
];

const recommendations = [
  {
    title: 'Improve Your CV',
    desc: 'Utilize CV evaluation for all sections in the document',
  },
];

const AnalyticsPage = () => {
  // Track page view when component mounts
  useEffect(() => {
    trackEvent('insight_page_view', {
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Track when user interacts with activity items
  const handleActivityClick = (label: string) => {
    trackEvent('insight_activity_click', {
      activity_type: label,
      timestamp: new Date().toISOString(),
    });
  };

  // Track when user hovers over chart bars
  const handleChartHover = (label: string, value: number) => {
    trackEvent('insight_chart_interaction', {
      page_type: label,
      value: value,
      timestamp: new Date().toISOString(),
    });
  };

  // Track when user clicks on recommendations
  const handleRecommendationClick = (title: string) => {
    trackEvent('insight_recommendation_click', {
      recommendation_title: title,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-start">Analytics & Recommendations</h1>

      {/* Main Analytics Card */}
      <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Activity */}
          <div>
            <h2 className="text-xl font-semibold mb-6">User Activity</h2>
            <div className="space-y-4">
              {mockActivity.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 px-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => handleActivityClick(item.label)}
                >
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visited Pages Chart */}
          <div className="w-full min-w-[180px] mt-2 max-w-xs sm:w-64 md:w-80 mx-auto">
            <h2 className="text-xl font-semibold mb-6">Visited Pages</h2>
            <div className="relative">
              {/* Y-axis labels */}
              <div className="flex">
                <div className="relative h-60 mr-2 w-4 select-none">
                  {[40, 30, 20, 10, 0].map((v, i) => (
                    <span
                      key={v}
                      className="absolute left-0 text-xs text-gray-700"
                      style={{
                        top: `${i * 25}%`,
                        transform: 'translateY(-50%)',
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>

                {/* Chart area */}
                <div className="flex-1 relative">
                  {/* Grid lines behind bars */}
                  <div className="absolute inset-0 h-60 flex flex-col justify-between pointer-events-none">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="border-t border-gray-200 w-full"></div>
                    ))}
                  </div>

                  {/* Bars container */}
                  <div className="h-60 flex items-end justify-around px-4 relative z-10">
                    {mockVisited.map((item) => (
                      <div key={item.label} className="flex flex-col items-center" onMouseEnter={() => handleChartHover(item.label, item.value)}>
                        <div className="bg-blue-500 rounded-t w-12 transition-all duration-300 hover:bg-blue-600" style={{ height: `${(item.value / 40) * 240}px` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Labels below chart */}
              <div className="flex justify-around mt-2 ml-12">
                {mockVisited.map((item) => (
                  <span key={item.label} className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Card */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-semibold mb-6">Personalized Recommendations</h2>
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleRecommendationClick(rec.title)}>
            <div className="mr-4 mt-1">
              <FaRegLightbulb className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{rec.title}</h3>
              <p className="text-gray-600">{rec.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
