import { Todo } from '../types/todo';

// Helper to get todos from localStorage
const getTodosFromStorage = (): Todo[] => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

// Helper to save todos to localStorage
const saveTodosToStorage = (todos: Todo[]): void => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const todoService = {
  // Get all todos
  getAllTodos: (): Todo[] => {
    return getTodosFromStorage();
  },

  // Add a new todo
  addTodo: (title: string): Todo => {
    const todos = getTodosFromStorage();
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    saveTodosToStorage(todos);
    return newTodo;
  },

  // Toggle todo completion status
  toggleTodoStatus: (id: string): Todo | null => {
    const todos = getTodosFromStorage();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) return null;

    todos[todoIndex].completed = !todos[todoIndex].completed;
    saveTodosToStorage(todos);
    return todos[todoIndex];
  },

  // Delete a todo
  deleteTodo: (id: string): boolean => {
    const todos = getTodosFromStorage();
    const newTodos = todos.filter((todo) => todo.id !== id);

    if (newTodos.length === todos.length) return false;

    saveTodosToStorage(newTodos);
    return true;
  },

  // Update todo title
  updateTodoTitle: (id: string, title: string): Todo | null => {
    const todos = getTodosFromStorage();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) return null;

    todos[todoIndex].title = title;
    saveTodosToStorage(todos);
    return todos[todoIndex];
  },
};

export default todoService;
