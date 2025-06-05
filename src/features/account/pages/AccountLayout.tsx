import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaUser, FaCreditCard, FaShieldCat, FaArrowUpRightFromSquare, FaRightFromBracket, FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../../../store';
import { Button } from '../../../components/common';
import { logout } from '../../../features/auth/slice';
import { useNavigate } from 'react-router-dom';

const accountMenu = [
  { label: 'Profile', path: 'profile', icon: <FaUser size={20} /> },
  { label: 'Subscription', path: 'subscription', icon: <FaCreditCard size={20} /> },
  { label: 'Security', path: 'security', icon: <FaShieldCat size={20} /> },
];

const AccountLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on window resize if screen becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  const handleUpgrade = () => {
    navigate('/dashboard/upgrade');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-[#212d43] text-white h-14 sm:h-16 flex items-center justify-between px-4 z-30">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-700/50 rounded-lg focus:outline-none" aria-label="Toggle menu">
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl font-semibold">Account Settings</div>
      </header>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#212d43] text-white flex flex-col py-4 sm:py-6 md:py-8 px-3 sm:px-4 z-40 
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[280px]`}
      >
        <div className="flex items-center mb-6 sm:mb-8 md:mb-10 pl-2 mt-14 md:mt-0">
          <img src={user?.image || ''} alt="avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3" />
          <div>
            <div className="font-semibold text-sm sm:text-base">{user?.firstName || 'User'}</div>
            <div className="text-xs text-blue-200">{user?.username}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 sm:space-y-2">
          {accountMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={handleNavigation}
              className={({ isActive }) =>
                `flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors gap-2 sm:gap-3
                ${isActive ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`
              }
            >
              <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          <div className=" flex flex-col gap-2 md:hidden">
            <Button onClick={handleUpgrade} variant="primary" className="w-full flex items-center justify-center mt-6 gap-2 text-sm sm:text-base">
              <FaArrowUpRightFromSquare className="text-base sm:text-lg" /> Upgrade
            </Button>
            <Button onClick={handleLogout} variant="light" className="w-full flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaRightFromBracket className="text-base sm:text-lg" /> Log out
            </Button>
          </div>
        </nav>
        <div className="hidden md:block mt-6 space-y-3">
          <Button onClick={handleUpgrade} variant="primary" className="w-full flex items-center justify-center gap-2 text-sm sm:text-base">
            <FaArrowUpRightFromSquare className="text-base sm:text-lg" /> Upgrade
          </Button>
          <Button onClick={handleLogout} variant="light" className="w-full flex items-center justify-center gap-2 text-sm sm:text-base">
            <FaRightFromBracket className="text-base sm:text-lg" /> Log out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`transition-all duration-300 ease-in-out min-h-screen bg-gray-50
          ${isSidebarOpen ? 'blur-sm' : ''} 
          md:ml-[240px]
          pt-16 md:pt-0`}
      >
        <div className="p-4 sm:p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AccountLayout;
