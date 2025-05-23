import React from 'react';
import learningRoadmapIcon from '../../assets/icons/learningRoadmapIcon.png';
import cardProfileIcon from '../../assets/icons/cardProfileIcon.png';
import programIcon from '../../assets/icons/programIcon.png';
import careerIcon from '../../assets/icons/career.png';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: cardProfileIcon,
    title: 'CV Optimization',
    desc: 'Improve your resume with AI-driven insights',
    path: '/dashboard/cv',
  },
  {
    icon: programIcon,
    title: 'Code Review',
    desc: 'Get feedback on your code from analysis',
    path: '/dashboard/code',
  },
  {
    icon: learningRoadmapIcon,
    title: 'Learning Roadmap',
    desc: 'Follow a tailored path to master new skills',
    path: '/dashboard/roadmap',
  },
  {
    icon: careerIcon,
    title: 'Career Guidance',
    desc: 'Receive advice on your IT career development',
    path: '/dashboard/career',
  },
];

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => navigate(feature.path)}
            className="bg-white cursor-pointer rounded-lg sm:rounded-xl md:rounded-2xl 
              shadow-md hover:shadow-lg transition-shadow duration-300
              p-4 sm:p-5 md:p-6
              flex flex-col border border-gray-100 
              min-h-[160px] sm:min-h-[200px] md:min-h-[220px]"
          >
            <div
              className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
              flex items-center justify-center mb-3 sm:mb-4"
            >
              <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
