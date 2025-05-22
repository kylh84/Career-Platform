import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FaUser, FaCreditCard, FaShieldCat, FaArrowUpRightFromSquare, FaRightFromBracket } from 'react-icons/fa6';
import { useAppSelector, useAppDispatch } from '../../store';
import { Button } from '../../components/common';
import { logout } from '../../features/auth/slice';
import { useNavigate } from 'react-router-dom';

const accountMenu = [
  { label: 'Profile', path: 'profile', icon: <FaUser size={22} /> },
  { label: 'Subscription', path: 'subscription', icon: <FaCreditCard size={22} /> },
  { label: 'Security', path: 'security', icon: <FaShieldCat size={22} /> },
];

const AccountLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/home');
  };

  const handleUpgrade = () => {
    navigate('/dashboard/upgrade');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#212d43] text-white flex flex-col py-8 px-4 min-h-screen">
        <div className="flex items-center mb-10 pl-2">
          <img src={user?.image || ''} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="font-semibold">{user?.firstName || 'User'}</div>
            <div className="text-xs text-blue-200">{user?.username}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          {accountMenu.map((item) => (
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
        <Button onClick={handleUpgrade} variant="primary" className="w-full flex items-center justify-center gap-2 mb-4">
          <FaArrowUpRightFromSquare className="inline" /> Upgrade
        </Button>
        <Button onClick={handleLogout} variant="light" className="w-full flex items-center justify-center gap-2">
          <FaRightFromBracket className="inline" /> Log out
        </Button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
