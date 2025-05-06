import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCode, FiMap, FiTarget, FiSettings } from 'react-icons/fi';
import diagramIcon from '../assets/icons/diagram.png';
import identityCardIcon from '../assets/icons/identity-card.png';
import programIcon from '../assets/icons/program.png';
import targetIcon from '../assets/icons/target.png';

const sidebarMenu = [
  { icon: <FiUser size={24} />, label: 'CV' },
  { icon: <FiCode size={24} />, label: 'Code' },
  { icon: <FiMap size={24} />, label: 'Roadmap' },
  { icon: <FiTarget size={24} />, label: 'Career' },
  { icon: <FiSettings size={24} />, label: 'Account' },
];

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

const Dashboard: React.FC = () => {
  const [active, setActive] = useState('CV');
  const navigate = useNavigate();

  useEffect(() => {
    if (active === 'Account') {
      navigate('/account');
    }
  }, [active, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col py-8 px-4 min-h-screen">
        <div className="text-2xl font-bold mb-10 pl-2 text-center cursor-pointer" onClick={() => navigate('/dashboard')}>
          Career Platform
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarMenu.map((item) => (
            <button
              key={item.label}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors ${active === item.label ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              onClick={() => setActive(item.label)}
            >
              <span className="text-2xl mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10   ">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center mx-auto p-10 ">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white cursor-pointer rounded-2xl shadow-lg p-2 flex flex-col  border border-gray-100 min-h-[240px]">
              <img src={feature.icon} alt={feature.title} className="w-20 h-20 ml-4 mx-auto mb-6" />
              <div className="font-bold ml-4 text-xl mb-2">{feature.title}</div>
              <div className="text-gray-600 ml-4 text-base">{feature.desc}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
