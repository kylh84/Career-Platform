import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo';
import todoService from '../../services/todoService';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: todoService.getAllTodos(),
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = todoService.addTodo(action.payload);
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const todo = todoService.toggleTodoStatus(id);

      if (todo) {
        const index = state.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
          state.todos[index].completed = todo.completed;
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const success = todoService.deleteTodo(id);

      if (success) {
        state.todos = state.todos.filter((todo) => todo.id !== id);
      }
    },
    updateTodoTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const { id, title } = action.payload;
      const updatedTodo = todoService.updateTodoTitle(id, title);

      if (updatedTodo) {
        const index = state.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
          state.todos[index].title = title;
        }
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo, updateTodoTitle, setError, setLoading } = todoSlice.actions;

export default todoSlice.reducer;
