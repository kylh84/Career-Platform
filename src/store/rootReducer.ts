import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import todoReducer from '../features/todo/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
  // Add more reducers here as your app grows
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
