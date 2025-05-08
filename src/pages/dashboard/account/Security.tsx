import React, { useState } from 'react';
import { Button } from '../../../components/common';
import { useAppSelector } from '../../../store';

type MockUser = {
  email: string;
  password: string;
  [key: string]: unknown;
};

const Security: React.FC = () => {
  const [form, setForm] = useState({ current: '', new: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const user = useAppSelector((state) => state.auth.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.current || !form.new || !form.confirm) {
      setError('Please fill all fields');
      return;
    }
    if (form.new !== form.confirm) {
      setError('New passwords do not match');
      return;
    }
    // Đổi mật khẩu mock bằng localStorage
    const usersRaw = localStorage.getItem('mock_users');
    const users: MockUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    const idx = users.findIndex((u: MockUser) => u.email === user?.email);
    if (idx === -1) {
      setError('User not found');
      return;
    }
    if (users[idx].password !== form.current) {
      setError('Current password is incorrect');
      return;
    }
    users[idx].password = form.new;
    localStorage.setItem('mock_users', JSON.stringify(users));
    setSuccess('Password changed successfully!');
    setForm({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Security</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Current Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" name="current" value={form.current} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" name="new" value={form.new} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1">Confirm New Password</label>
          <input className="w-full border rounded px-3 py-2" type="password" name="confirm" value={form.confirm} onChange={handleChange} />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Button variant="primary" className="w-full mt-4" type="submit">
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
