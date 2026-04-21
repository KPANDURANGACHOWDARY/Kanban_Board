import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import taskReducer from './slices/taskSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer,
    filter: filterReducer,
    ui: uiReducer,
  },
});
