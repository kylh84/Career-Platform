import React from 'react';
import { useAppSelector } from '../../store';
import { Button } from '../../components/common';

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
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
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input className="w-full border rounded px-3 py-2" defaultValue={user?.firstName + ' ' + user?.lastName} />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input className="w-full border rounded px-3 py-2" defaultValue={user?.email} />
        </div>
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <input className="w-full border rounded px-3 py-2" defaultValue={user?.gender} />
        </div>
        <Button variant="primary" className="w-full mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;
