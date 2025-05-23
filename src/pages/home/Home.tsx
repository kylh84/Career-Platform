import React, { useState } from 'react';
import { Button } from '../../components/common';
import { useAppSelector, useAppDispatch } from '../../store';
import { logout } from '../../features/auth/slice';
import { useNavigate, NavLink } from 'react-router-dom';
import roadmapIcon from '../../assets/icons/roadmap.png';
import cvcheckIcon from '../../assets/icons/cv-check.png';
import codereviewIcon from '../../assets/icons/code-review.png';
import targetIcon from '../../assets/icons/target.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-16 py-4 sm:py-6">
        <div className="flex justify-between items-center relative">
          <button onClick={toggleMenu} className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none z-10">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className="text-xl sm:text-2xl font-bold text-gray-900 cursor-pointer absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0" onClick={() => navigate('/home')}>
            Career Platform
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center space-x-8 text-gray-700 font-medium">
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
                <button onClick={handleLogout} className="hover:text-blue-600">
                  Logout
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="hover:text-blue-600">
                  Login
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center space-y-6 px-4 py-8">
          <NavLink to="/home" className={({ isActive }) => `text-center w-full ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`} onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="#features" className={({ isActive }) => `text-center w-full ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`} onClick={toggleMenu}>
            Features
          </NavLink>
          <NavLink to="#pricing" className={({ isActive }) => `text-center w-full ${isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600'}`} onClick={toggleMenu}>
            Pricing
          </NavLink>
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                toggleMenu();
              }}
              className="hover:text-blue-600 w-full text-center"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
                toggleMenu();
              }}
              className="hover:text-blue-600 w-full text-center"
            >
              Login
            </button>
          )}
        </div>
      </nav>
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
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 sm:gap-10 py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">Advance Your Tech Career</h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
            Leverage AI to optimize your CV, evaluate source code, get personalized learning paths, and receive career guidance.
          </p>
          <Button variant="primary" className="px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg w-full sm:w-auto" onClick={() => (window.location.href = '/signup')}>
            Get Started for Free
          </Button>
        </div>
        <div className="flex-1 w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 mt-8 md:mt-0">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white cursor-pointer rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg p-3 xs:p-4 
              flex flex-col items-center text-center border border-gray-100 
              min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] md:min-h-[240px]"
            >
              <div
                className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 
                flex items-center justify-center mb-2 mt-3 xs:mt-4 sm:mt-5 md:mt-6"
              >
                <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain" />
              </div>
              <div className="font-bold text-base xs:text-lg sm:text-xl mb-1 xs:mb-2">{feature.title}</div>
              <div className="text-gray-600 text-xs xs:text-sm sm:text-base">{feature.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
