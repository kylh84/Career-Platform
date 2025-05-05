import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiCode, FiMap, FiTarget, FiSettings } from 'react-icons/fi';

const sidebarMenu = [
  { icon: <FiUser size={24} />, label: 'CV' },
  { icon: <FiCode size={24} />, label: 'Code' },
  { icon: <FiMap size={24} />, label: 'Roadmap' },
  { icon: <FiTarget size={24} />, label: 'Career' },
  { icon: <FiSettings size={24} />, label: 'Account' },
];

const features = [
  {
    icon: '👤',
    title: 'CV Optimization',
    desc: 'Improve your resume with AI-powered suggestions.',
  },
  {
    icon: '💻',
    title: 'Code Review',
    desc: 'Get feedback and insights on your source code',
  },
  {
    icon: '🛣️',
    title: 'Learning Roadmap',
    desc: 'Receive a personalized path for skill development',
  },
  {
    icon: '🎯',
    title: 'Career Guidance',
    desc: 'Discover career paths that align with your profile',
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
        <div className="text-2xl font-bold mb-10 pl-2">Career Platform</div>
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
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl shadow p-8 flex flex-col items-center text-center border border-gray-100">
              <div className="text-4xl mb-3">{f.icon}</div>
              <div className="font-semibold text-xl mb-2">{f.title}</div>
              <div className="text-gray-600 text-base">{f.desc}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
