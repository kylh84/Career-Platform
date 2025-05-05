import React from 'react';
import { Button } from '../../components/common';

const Security: React.FC = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Security</h2>
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Current Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" />
        </div>
        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm New Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" />
        </div>
        <Button variant="primary" className="w-full mt-4">
          Change Password
        </Button>
      </form>
      <div className="mt-8">
        <div className="font-semibold mb-2">Account Security</div>
        <ul className="text-sm list-disc pl-5">
          <li>Password last changed: 2 months ago</li>
          <li>2FA: Not enabled</li>
        </ul>
      </div>
    </div>
  );
};

export default Security;
