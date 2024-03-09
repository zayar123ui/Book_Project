import { configureStore } from '@reduxjs/toolkit';
import LoginReducer from './LoginReducer';

export const store = configureStore({
  reducer: {
    login: LoginReducer,
  },
});
