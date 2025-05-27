import React, { useState } from 'react';
import { Button } from '../../../components/common';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store';
import { setUser } from '../../../features/auth/slice';
import type { User } from '../../../features/auth/types';

type MockUser = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  [key: string]: unknown;
};

const EditProfile: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    name: user ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    password: '********',
  });
  // Lưu lại email gốc
  const originalEmail = user?.email;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lấy danh sách user từ localStorage
    const usersRaw = localStorage.getItem('mock_users');
    const users: MockUser[] = usersRaw ? JSON.parse(usersRaw) : [];
    // Tìm user hiện tại theo email gốc
    const idx = users.findIndex((u: MockUser) => u.email === originalEmail);
    if (idx === -1) {
      alert('User not found!');
      return;
    }
    // Cập nhật thông tin
    users[idx].email = form.email;
    const [firstName, ...lastNameArr] = form.name.split(' ');
    users[idx].firstName = firstName;
    users[idx].lastName = lastNameArr.join(' ');
    // Lưu lại vào localStorage
    localStorage.setItem('mock_users', JSON.stringify(users));
    // Tạo object đủ trường User
    const updatedUser: User = {
      id: user?.id ?? 0,
      username: user?.username ?? '',
      email: users[idx].email,
      firstName: users[idx].firstName,
      lastName: users[idx].lastName,
      gender: user?.gender ?? '',
      image: user?.image ?? '',
      token: user?.token ?? '',
    };
    // Đồng bộ lại Redux store
    dispatch(setUser(updatedUser));
    // Thông báo thành công và điều hướng về profile
    alert('Profile updated successfully!');
    navigate('/dashboard/account/profile');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6 md:p-8 border border-blue-300">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Account Settings</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base">Name</label>
          <input className="w-full border rounded px-3 py-2 text-sm sm:text-base" type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label className="block font-medium mb-1 text-sm sm:text-base">Email</label>
          <input className="w-full border rounded px-3 py-2 text-sm sm:text-base" type="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="font-medium text-sm sm:text-base">Password</label>
            <Link to="/dashboard/account/security" className="text-blue-600 hover:underline text-xs sm:text-sm">
              Change password
            </Link>
          </div>
          <input className="w-full border rounded px-3 py-2 text-sm sm:text-base bg-gray-50" type="password" name="password" value={form.password} disabled />
        </div>
        <Button variant="primary" className="w-full mt-4 text-sm sm:text-base" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
