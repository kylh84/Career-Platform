import React from 'react';
import { Button } from '../components/common';
import { useAppSelector, useAppDispatch } from '../store';
import { logout } from '../features/auth/slice';
import { useNavigate, NavLink } from 'react-router-dom';
import roadmapIcon from '../assets/icons/roadmap.png';
import cvcheckIcon from '../assets/icons/cv-check.png';
import codereviewIcon from '../assets/icons/code-review.png';
import targetIcon from '../assets/icons/target.png';

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <header className="flex justify-between items-center px-16 py-6 bg-white shadow-sm">
      <div className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate('/home')}>
        Career Platform
      </div>
      <div className="flex items-center gap-6">
        <nav className="flex items-center space-x-8 text-gray-700 font-medium">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600')}>
            Home
          </NavLink>
          <NavLink to="#features" className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600')}>
            Features
          </NavLink>
          <NavLink to="#pricing" className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600')}>
            Pricing
          </NavLink>
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="hover:text-blue-600">
                Logout
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="hover:text-blue-600">
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

const Home: React.FC = () => {
  const features = [
    {
      icon: cvcheckIcon,
      title: 'CV Optimization',
      desc: 'Improve your resume with AI-driven insights',
    },
    {
      icon: codereviewIcon,
      title: 'Code Review',
      desc: 'Get feedback on your code from analysis',
    },
    {
      icon: roadmapIcon,
      title: 'Learning Roadmap',
      desc: 'Follow a tailored path to master new skills',
    },
    {
      icon: targetIcon,
      title: 'Career Guidance',
      desc: 'Receive advice on your IT career development',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 py-16 px-6">
        <div className="flex-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Advance Your Tech Career</h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg">Leverage AI to optimize your CV, evaluate source code, get personalized learning paths, and receive career guidance.</p>
          <Button variant="primary" className="px-8 py-3 text-lg" onClick={() => (window.location.href = '/signup')}>
            Get Started for Free
          </Button>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white cursor-pointer rounded-2xl shadow-lg p-2 flex flex-col items-center text-center border border-gray-100 min-h-[240px]">
              <img src={feature.icon} alt={feature.title} className="w-25 h-20 mx-auto mb-2 mt-6" />
              <div className="font-bold text-xl mb-2">{feature.title}</div>
              <div className="text-gray-600 text-base">{feature.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
