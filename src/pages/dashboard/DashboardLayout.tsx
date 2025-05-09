import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaIdCard, FaUserGear, FaBriefcase, FaCode, FaMap } from 'react-icons/fa6';

const sidebarMenu = [
  { label: 'CV', path: 'cv', icon: <FaIdCard size={26} /> },
  { label: 'Code', path: 'code', icon: <FaCode size={26} /> },
  { label: 'Roadmap', path: 'roadmap', icon: <FaMap size={26} /> },
  { label: 'Career', path: 'career', icon: <FaBriefcase size={26} /> },
  { label: 'Account', path: 'account/profile', icon: <FaUserGear size={26} /> },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Sidebar  */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#212d43] text-white flex flex-col py-8 px-4 z-20">
        <div className="text-2xl font-bold mb-10 pl-2 text-center cursor-pointer select-none" onClick={() => navigate('/dashboard')}>
          Career Platform
        </div>
        <nav className="flex-1 space-y-2">
          {sidebarMenu.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-3 rounded-lg text-lg font-medium transition-colors gap-3
                ${isActive ? 'bg-slate-600/80 text-white shadow' : 'hover:bg-slate-700/80 text-white'}`
              }
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </NavLink>
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
