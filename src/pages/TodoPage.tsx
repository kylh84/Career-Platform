import React from 'react';
import TodoList from '../features/todo/components/TodoList';
import { Button } from '../components/common';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { logout } from '../features/auth/slice';

const TodoPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
            <Button variant="light" onClick={handleLogout}>
              Logout
            </Button>
          </div>

          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
