import React from 'react';
import { Button } from '../components/common';
import { useAppSelector, useAppDispatch } from '../store';
import { logout } from '../features/auth/slice';
import { useNavigate, NavLink } from 'react-router-dom';
import LanguageSwitcher from '../i18n/components/LanguageSwitcher';
import { useI18n } from '../i18n';
import diagramIcon from '../assets/icons/diagram.png';
import identityCardIcon from '../assets/icons/identity-card.png';
import programIcon from '../assets/icons/program.png';
import targetIcon from '../assets/icons/target.png';

const Header: React.FC = () => {
  const { t } = useI18n();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  return (
    <header className="flex justify-between items-center px-8 py-6 bg-white shadow-sm">
      <div className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate('/home')}>
        Career Platform
      </div>
      <div className="flex items-center gap-6">
        <nav className="flex items-center space-x-8 text-gray-700 font-medium">
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600')}>
            {t('header.home')}
          </NavLink>
          <NavLink to="#features" className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600')}>
            {t('header.features')}
          </NavLink>
          <NavLink to="#pricing" className={({ isActive }) => (isActive ? 'text-blue-600 font-bold' : 'hover:text-blue-600')}>
            {t('header.pricing')}
          </NavLink>
          {isAuthenticated ? (
            <>
              <span className="mr-4">{t('header.hello', { name: user?.firstName || user?.username || '' })}</span>
              <button onClick={handleLogout} className="hover:text-blue-600">
                {t('header.logout')}
              </button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="hover:text-blue-600">
              {t('header.login')}
            </button>
          )}
        </nav>
        <LanguageSwitcher showLabel={false} />
      </div>
    </header>
  );
};

const Home: React.FC = () => {
  const { t } = useI18n();

  const features = [
    {
      icon: identityCardIcon,
      title: t('home.features.cv.title'),
      desc: t('home.features.cv.desc'),
    },
    {
      icon: programIcon,
      title: t('home.features.code.title'),
      desc: t('home.features.code.desc'),
    },
    {
      icon: diagramIcon,
      title: t('home.features.roadmap.title'),
      desc: t('home.features.roadmap.desc'),
    },
    {
      icon: targetIcon,
      title: t('home.features.career.title'),
      desc: t('home.features.career.desc'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 py-16 px-6">
        <div className="flex-2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            {t('home.heroTitle')
              .split('\n')
              .map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg">Leverage AI to optimize your CV, evaluate source code, get personalized learning paths, and receive career guidance.</p>
          <Button variant="primary" className="px-8 py-3 text-lg" onClick={() => (window.location.href = '/signup')}>
            {t('home.getStarted')}
          </Button>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white cursor-pointer rounded-2xl shadow-lg p-2 flex flex-col items-center text-center border border-gray-100 min-h-[240px]">
              <img src={feature.icon} alt={feature.title} className="w-20 h-20 mx-auto mb-6" />
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
