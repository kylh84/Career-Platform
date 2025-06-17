import React from 'react';
import { useAppSelector } from '../../../store';
import { Button } from '../../../components/common';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  // Mock usage & plan
  const cvUsage = 3,
    codeUsage = 2,
    cvLimit = 5,
    codeLimit = 5,
    plan = 'Freemium';

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img src={user?.image || ''} alt="avatar" className="w-20 h-20 rounded-full mb-2" />
        <div className="font-semibold text-lg">
          {user?.firstName} {user?.lastName}
        </div>
        <div className="text-gray-500">@{user?.username}</div>
      </div>
      <div className="mb-4">
        <div className="font-medium">
          Email: <span className="font-normal">{user?.email}</span>
        </div>
        <div className="font-medium">
          CV Usage:{' '}
          <span className="font-normal">
            {cvUsage}/{cvLimit}
          </span>
        </div>
        <div className="font-medium">
          Code Usage:{' '}
          <span className="font-normal">
            {codeUsage}/{codeLimit}
          </span>
        </div>
        <div className="font-medium">
          Current Plan: <span className="font-normal">{plan}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <Button variant="primary" onClick={() => navigate('/dashboard/account/edit')}>
          Edit
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
          Dashboard
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard/account/subscription')}>
          Change Plan
        </Button>
        <Button variant="secondary" onClick={() => navigate('/dashboard/account/security')}>
          Change Password
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            /* handle delete */
          }}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default Profile;
