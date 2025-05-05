import React from 'react';
import { useAppSelector } from '../../store';
import { Button } from '../../components/common';
import { NavLink, Outlet } from 'react-router-dom';
import { FiUser, FiCreditCard, FiShield, FiLogOut } from 'react-icons/fi';

const AccountSettings: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col py-8 px-4 min-h-screen">
        <div className="flex items-center mb-10 pl-2">
          <img src={user?.image || ''} alt="avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <div className="font-semibold">{user?.firstName || 'User'}</div>
            <div className="text-xs text-blue-200">{user?.username}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <NavLink to="profile" className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-lg font-medium hover:bg-blue-800 ${isActive ? 'bg-blue-700' : ''}`}>
            <FiUser className="mr-3 text-2xl" /> Profile
          </NavLink>
          <NavLink to="subscription" className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-lg font-medium hover:bg-blue-800 ${isActive ? 'bg-blue-700' : ''}`}>
            <FiCreditCard className="mr-3 text-2xl" /> Subscription
          </NavLink>
          <NavLink to="security" className={({ isActive }) => `flex items-center px-4 py-3 rounded-lg text-lg font-medium hover:bg-blue-800 ${isActive ? 'bg-blue-700' : ''}`}>
            <FiShield className="mr-3 text-2xl" /> Security
          </NavLink>
        </nav>
        <Button variant="light" className="mt-10">
          <FiLogOut className="inline mr-2" /> Log out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountSettings;
