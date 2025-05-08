import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaIdCard, FaUserGear, FaToolbox, FaCode, FaMap } from 'react-icons/fa6';

const sidebarMenu = [
  { label: 'CV', path: 'cv', icon: <FaIdCard size={26} /> },
  { label: 'Code', path: 'code', icon: <FaCode size={26} /> },
  { label: 'Roadmap', path: 'roadmap', icon: <FaMap size={26} /> },
  { label: 'Career', path: 'career', icon: <FaToolbox size={26} /> },
  { label: 'Account', path: 'account/profile', icon: <FaUserGear size={26} /> },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#212d43] text-white flex flex-col py-8 px-4">
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
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}
