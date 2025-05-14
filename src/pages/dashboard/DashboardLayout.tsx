import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaIdCard, FaUserLarge, FaBriefcase, FaCode, FaMap, FaChevronDown } from 'react-icons/fa6';
import { useState } from 'react';

const sidebarMenu = [
  {
    label: 'CV',
    path: 'cv',
    icon: <FaIdCard size={26} />,
    submenu: [
      { label: 'CV Optimization', path: 'cv/optimization' },
      { label: 'CV Presentation Suggestions', path: 'cv/presentation-suggestions' },
    ],
  },
  { label: 'Code', path: 'code', icon: <FaCode size={26} /> },
  { label: 'Roadmap', path: 'roadmap', icon: <FaMap size={26} /> },
  { label: 'Career', path: 'career', icon: <FaBriefcase size={26} /> },
  { label: 'Account', path: 'account/profile', icon: <FaUserLarge size={26} /> },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <div>
      {/* Sidebar  */}
      <aside className="fixed top-0 left-0 h-screen w-68 bg-[#212d43] text-white flex flex-col py-8 px-4 z-20">
        <div className="text-2xl font-bold mb-10 pl-2 text-center cursor-pointer select-none" onClick={() => navigate('/dashboard')}>
          Career Platform
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarMenu.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out gap-3
                    ${expandedMenu === item.label ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </div>
                    <FaChevronDown className={`transition-transform duration-300 ease-in-out ${expandedMenu === item.label ? 'rotate-180' : ''}`} size={14} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ml-9 mt-1 
                    ${expandedMenu === item.label ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {item.submenu.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                          ${isActive ? 'bg-slate-600/60 text-white' : 'hover:bg-slate-700/60 text-slate-200'}`
                        }
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors gap-3
                    ${isActive ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`
                  }
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>
      {/* Main content  */}
      <main className="ml-64 p-10 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
