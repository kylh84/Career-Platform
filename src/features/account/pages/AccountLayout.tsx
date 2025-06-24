import React, { useState, useEffect, startTransition } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/common';
import { logout } from '../../../features/auth/slice';
import { useAppSelector, useAppDispatch } from '../../../store';
import { FaUser, FaCreditCard, FaShieldCat, FaArrowUpRightFromSquare, FaTableColumns, FaRightFromBracket, FaChevronDown, FaBars } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { MdOutlineManageHistory } from 'react-icons/md';
import PageSkeleton from '../../../components/skeletons/PageSkeleton';
import SuspenseWithDelay from '../../../components/SuspenseWithDelay';

// --- Prefetcher functions for lazy-loaded account pages ---
const prefetchProfile = () => import('./Profile');
const prefetchSubscription = () => import('./Subscription');
const prefetchSecurity = () => import('./Security');
const prefetchTransactions = () => import('./TransactionHistory');

const accountMenu = [
  { label: 'Profile', path: 'profile', icon: <FaUser size={20} />, prefetch: prefetchProfile },
  {
    label: 'Subscription',
    path: 'subscription/manage',
    icon: <FaCreditCard size={20} />,
    prefetch: prefetchSubscription,
    submenu: [{ label: 'Transactions History', path: 'subscription/transactions', icon: <MdOutlineManageHistory size={20} />, prefetch: prefetchTransactions }],
  },
  { label: 'Security', path: 'security', icon: <FaShieldCat size={20} />, prefetch: prefetchSecurity },
];

const AccountLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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
    startTransition(() => {
      navigate('/home');
    });
  };

  const handleUpgrade = () => {
    navigate('/dashboard/account/upgrade');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
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
            <div key={item.label} className="relative">
              {item.submenu ? (
                <div className="flex items-center">
                  {/* NavLink cho label Subscription */}
                  <NavLink
                    to={item.path}
                    onMouseEnter={item.prefetch}
                    onClick={handleNavigation}
                    className={({ isActive }) =>
                      `flex items-center flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all gap-2 sm:gap-3
                      ${isActive ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`
                    }
                    style={{ minWidth: 0 }}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                  {/* Nút mở/collapse submenu */}
                  <button onClick={() => toggleSubmenu(item.label)} className="flex items-center px-2 focus:outline-none" tabIndex={-1} aria-label="Toggle submenu">
                    <FaChevronDown className={`transition-transform duration-300 ease-in-out ${expandedMenu === item.label ? 'rotate-180' : ''}`} size={14} />
                  </button>
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  onMouseEnter={item.prefetch}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors gap-2 sm:gap-3
                    ${isActive ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`
                  }
                >
                  <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                  {item.label}
                </NavLink>
              )}
              {/* Submenu */}
              {item.submenu && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${expandedMenu === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pl-8 pr-2 py-1 space-y-1">
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.label}
                        to={sub.path}
                        onMouseEnter={sub.prefetch}
                        onClick={handleNavigation}
                        className={({ isActive }) =>
                          `flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors gap-2
                          ${isActive ? 'bg-slate-500/80 text-white shadow' : 'hover:bg-slate-700/60 text-blue-100'}`
                        }
                      >
                        <span className="w-4 h-4 flex items-center justify-center">{sub.icon}</span>
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className=" flex flex-col gap-2 md:hidden">
            <Button onClick={handleDashboard} variant="primary" className="w-full flex items-center justify-center mt-6 gap-2 text-sm sm:text-base">
              <FaTableColumns className="text-base sm:text-lg" /> Dashboard
            </Button>
            <Button onClick={handleUpgrade} variant="primary" className="w-full flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaArrowUpRightFromSquare className="text-base sm:text-lg" /> Upgrade
            </Button>
            <Button onClick={handleLogout} variant="light" className="w-full flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaRightFromBracket className="text-base sm:text-lg" /> Log out
            </Button>
          </div>
        </nav>
        <div className="hidden md:block mt-6 space-y-2.5">
          <Button onClick={handleDashboard} variant="primary" className="w-full flex items-center justify-center gap-2.5 py-2.5 text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors">
            <FaTableColumns className="text-base" /> Dashboard
          </Button>
          <Button onClick={handleUpgrade} variant="primary" className="w-full flex items-center justify-center gap-2.5 py-2.5 text-sm sm:text-base font-medium hover:bg-blue-600 transition-colors">
            <FaArrowUpRightFromSquare className="text-base" /> Upgrade
          </Button>
          <Button onClick={handleLogout} variant="light" className="w-full flex items-center justify-center gap-2.5 py-2.5 text-sm sm:text-base font-medium hover:bg-gray-400 transition-colors">
            <FaRightFromBracket className="text-base" /> Log out
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
          <SuspenseWithDelay fallback={<PageSkeleton />} minDuration={1000}>
            <Outlet />
          </SuspenseWithDelay>
        </div>
      </main>
    </div>
  );
};

export default AccountLayout;
