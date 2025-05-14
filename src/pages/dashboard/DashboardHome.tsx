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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center mx-auto p-10 ">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white cursor-pointer rounded-2xl shadow-lg p-2 flex flex-col border border-gray-100 min-h-[240px]" onClick={() => navigate(feature.path)}>
            <img src={feature.icon} alt={feature.title} className="w-20 h-20 ml-4 mx-auto mb-2 mt-6" />
            <div className="font-bold ml-4 text-xl mb-2">{feature.title}</div>
            <div className="text-gray-600 ml-4 text-base">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
