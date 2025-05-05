import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store';
import { addTodo } from '../slice';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { todos } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      dispatch(addTodo(newTodoTitle.trim()));
      setNewTodoTitle('');
    }
  };

  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  // Count items
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>

      {/* Add new todo form */}
      <form onSubmit={handleAddTodo} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add new todo..."
            className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Add
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="flex justify-between mb-4 text-sm">
        <div>
          <span className="text-gray-700">
            {activeCount} active, {completedCount} completed
          </span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setFilter('all')} className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            All
          </button>
          <button onClick={() => setFilter('active')} className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Active
          </button>
          <button onClick={() => setFilter('completed')} className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            Completed
          </button>
        </div>
      </div>

      {/* Todo items list */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? <div className="text-center py-4 text-gray-500">No todos found</div> : filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
};

export default TodoList;
