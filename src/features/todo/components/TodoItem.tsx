import React, { useState } from 'react';
import { Todo } from '../../../types/todo';
import { useAppDispatch } from '../../../store';
import { toggleTodo, deleteTodo, updateTodoTitle } from '../slice';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  const handleSave = () => {
    if (editValue.trim() !== '') {
      dispatch(updateTodoTitle({ id: todo.id, title: editValue.trim() }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(todo.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Format the creation date
  const formattedDate = new Date(todo.createdAt).toLocaleDateString();

  return (
    <div className={`border rounded-md p-4 mb-2 ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <input type="checkbox" checked={todo.completed} onChange={handleToggle} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />

          {isEditing ? (
            <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleKeyDown} autoFocus className="ml-3 p-1 border rounded w-full" />
          ) : (
            <span className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{todo.title}</span>
          )}
        </div>

        <div className="flex space-x-2 ml-4">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                Save
              </button>
              <button onClick={handleCancel} className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEdit} className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
              <button onClick={handleDelete} className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">Created: {formattedDate}</div>
    </div>
  );
};

export default TodoItem;
