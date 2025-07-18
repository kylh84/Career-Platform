import React from 'react';
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageSkeleton from '../../../components/skeletons/PageSkeleton';
import SuspenseWithDelay from '../../../components/SuspenseWithDelay';
import { FaIdCard, FaUserLarge, FaBriefcase, FaCode, FaMap, FaChevronDown, FaBars, FaCalendarCheck, FaComments } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
// import { VscCopilot } from 'react-icons/vsc';
import { SiGoogleanalytics } from 'react-icons/si';

// --- Prefetcher functions for lazy-loaded pages ---
// For a larger application, consider moving these to a dedicated 'src/routes/prefetchers.ts' file.
const prefetchCVOptimization = () => import('../../career/pages/CVOptimizationPage');
const prefetchCVSuggestion = () => import('../../career/pages/CVSuggestionPage');
const prefetchCode = () => import('../../career/pages/CodePage');
const prefetchRoadmap = () => import('../../career/pages/RoadmapPage');
const prefetchCareer = () => import('../../career/pages/CareerPage');
const prefetchMockInterview = () => import('../../career/pages/MockInterviewPage');
const prefetchLearningTracker = () => import('../../career/pages/LearningTrackerPage');
const prefetchCopilot = () => import('../../career/pages/Copilot');
const prefetchInsight = () => import('../../career/pages/InsightPage');
// The 'Account' link navigates to a different layout, but we can still prefetch its main page.
const prefetchAccountProfile = () => import('../../account/pages/Profile');

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const sidebarMenu = [
  {
    label: 'CV',
    path: 'cv',
    icon: <FaIdCard size={20} />,
    submenu: [
      { label: 'CV Optimization', path: 'cv/optimization', prefetch: prefetchCVOptimization },
      { label: 'CV Presentation Suggestions', path: 'cv/presentation-suggestions', prefetch: prefetchCVSuggestion },
    ],
  },
  { label: 'Code', path: 'code', icon: <FaCode size={20} />, prefetch: prefetchCode },
  { label: 'Roadmap', path: 'roadmap', icon: <FaMap size={20} />, prefetch: prefetchRoadmap },
  { label: 'Career', path: 'career', icon: <FaBriefcase size={20} />, prefetch: prefetchCareer },
  { label: 'Mock Interview', path: 'mock-interview', icon: <FaComments size={20} />, prefetch: prefetchMockInterview },
  { label: 'Learning Tracker', path: 'learning-tracker', icon: <FaCalendarCheck size={20} />, prefetch: prefetchLearningTracker },
  { label: 'AI Copilot', path: 'copilot', prefetch: prefetchCopilot },
  { label: 'Insight', path: 'insight', icon: <SiGoogleanalytics size={20} />, prefetch: prefetchInsight },
  { label: 'Account', path: 'account/profile', icon: <FaUserLarge size={20} />, prefetch: prefetchAccountProfile },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  console.log('DashboardLayout mounted');
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
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

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
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
        <div className="absolute left-1/2 -translate-x-1/2 text-lg sm:text-xl font-semibold">Career Platform</div>
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
        <div className="text-xl sm:text-2xl font-bold mb-8 sm:mb-10 text-center cursor-pointer select-none hidden md:block" onClick={() => navigate('/dashboard')}>
          Career Platform
        </div>
        <nav className="flex-1 space-y-1 sm:space-y-2 mt-14 md:mt-0 overflow-y-auto">
          {sidebarMenu.map((item) => (
            <div key={item.label} className="px-2">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm sm:text-base 
                      font-medium transition-all duration-300 ease-in-out gap-3
                      ${expandedMenu === item.label ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <FaChevronDown className={`transition-transform duration-300 ease-in-out ${expandedMenu === item.label ? 'rotate-180' : ''}`} size={14} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedMenu === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pl-2 pr-2 py-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          onMouseEnter={subItem.prefetch}
                          onClick={handleNavigation}
                          className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                            ${isActive ? 'bg-slate-600/60 text-white' : 'hover:bg-slate-700/60 text-slate-200'}`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  onMouseEnter={item.prefetch}
                  onClick={handleNavigation}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors gap-3
                    ${isActive ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`
                  }
                >
                  <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={`transition-all duration-300 ease-in-out min-h-screen bg-gray-50
          ${isSidebarOpen ? 'blur-sm' : ''} 
          md:ml-[240px]
          pt-16 md:pt-0`}
      >
        <SuspenseWithDelay fallback={<PageSkeleton />} minDuration={1000}>
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <Outlet />
              {children}
            </motion.div>
          </AnimatePresence>
        </SuspenseWithDelay>
      </main>
    </div>
  );
};

export default DashboardLayout;
