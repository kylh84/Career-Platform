import React from 'react';
import diagramIcon from '../../assets/icons/diagram.png';
import identityCardIcon from '../../assets/icons/identity-card.png';
import programIcon from '../../assets/icons/program.png';
import targetIcon from '../../assets/icons/target.png';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: identityCardIcon,
    title: 'CV Optimization',
    desc: 'Improve your resume with AI-driven insights',
  },
  {
    icon: programIcon,
    title: 'Code Review',
    desc: 'Get feedback on your code from analysis',
  },
  {
    icon: diagramIcon,
    title: 'Learning Roadmap',
    desc: 'Follow a tailored path to master new skills',
  },
  {
    icon: targetIcon,
    title: 'Career Guidance',
    desc: 'Receive advice on your IT career development',
  },
];

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center mx-auto p-10 ">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white cursor-pointer rounded-2xl shadow-lg p-2 flex flex-col border border-gray-100 min-h-[240px]"
            onClick={() => {
              if (feature.title === 'CV Optimization') navigate('/dashboard/cv');
              if (feature.title === 'Code Review') navigate('/dashboard/code');
              if (feature.title === 'Learning Roadmap') navigate('/dashboard/roadmap');
              if (feature.title === 'Career Guidance') navigate('/dashboard/career');
            }}
          >
            <img src={feature.icon} alt={feature.title} className="w-20 h-20 ml-4 mx-auto mb-6" />
            <div className="font-bold ml-4 text-xl mb-2">{feature.title}</div>
            <div className="text-gray-600 ml-4 text-base">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
