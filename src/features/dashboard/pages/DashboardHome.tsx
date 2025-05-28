import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import feature icons
import learningRoadmapIcon from '../../../assets/icons/learningRoadmapIcon.png';
import cardProfileIcon from '../../../assets/icons/cardProfileIcon.png';
import programIcon from '../../../assets/icons/programIcon.png';
import careerIcon from '../../../assets/icons/career.png';

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
    <div className="pt-2 px-6 sm:pt-4 sm:px-10 md:pt-6 md:px-14 lg:pt-8 lg:px-16 xl:px-18 2xl:px-20">
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => navigate(feature.path)}
            className="bg-white cursor-pointer rounded-lg sm:rounded-xl md:rounded-2xl 
              shadow-md hover:shadow-lg transition-shadow duration-300
              p-6 sm:p-7 md:p-8
              flex flex-col border border-gray-100 
              min-h-[160px] sm:min-h-[200px] md:min-h-[220px]"
          >
            <div
              className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 
              flex items-center justify-center mb-4 sm:mb-5"
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
