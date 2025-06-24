import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import codeReducer from '../features/career/slice';
import dashboardReducer from '../features/dashboard/slice';

const rootReducer = combineReducers({
  auth: authReducer,
  code: codeReducer,
  dashboard: dashboardReducer,
  // Add more reducers here as your app grows
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
